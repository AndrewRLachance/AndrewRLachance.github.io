import _ from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js";
import { toMetricBase } from './conversions.js';
import { buildSchemas, loadInventoryData, loadSales } from './ingestion.js';
import { getWeekOfMonth, getMonth, isEqual, getDay } from "https://cdn.jsdelivr.net/npm/date-fns@3/+esm";

class Schemas {

    Recipes = {}
    Inventory = {}
    Products = {}
    sales = []
    initialInventory = []

    constructor({ Recipes_Specification, Inventory_Specification, Products_Specification }) {
        this.Recipes = Recipes_Specification.reduce((p, c) => Object.assign(p, { [c.name]: new RecipeData(c, this) }), {})
        this.Inventory = Inventory_Specification.reduce((p, c) => Object.assign(p, { [c.name]: new InventoryData(c, this) }), {})
        this.Products = Products_Specification.reduce((p, c) => Object.assign(p, { [c.name]: new SalesData(c, this) }), {})
    }

    getRecipes() {
        const recipes = {}
        for (const k in this.Recipes) recipes[k] = this.Recipes[k].data
        return recipes
    }
    getProducts() {
        const products = {}
        for (const k in this.Products) products[k] = this.Products[k].data
        return products
    }

    getInventory() {
        const inventory = {}
        for (const k in this.Inventory) inventory[k] = this.Inventory[k].data
        return inventory
    }

    setInitialInventory(initialInventory) {
        this.initialInventory = initialInventory
    }

    addInitialInventory(initialInventory=this.initialInventory) {
        initialInventory.forEach(({ name, ...data }) => this.Inventory[name].data.push(data))
    }

    setSales(sales) {
        this.sales = sales.sort((x, y) => x.data <= y.date)
    }

    runSales() {

        this.sales.forEach(({ name, ...data }) => this.Products[name].update(data))

    }


    resetData() {

        for (const k in this.Recipes) this.Recipes[k].reset()
        for (const k in this.Inventory) this.Inventory[k].reset()
        for (const k in this.Products) this.Products[k].reset()

        this.addInitialInventory(this.initialInventory)
    }

}

class InventoryData {

    value
    data = []


    latest() { return this?.data?.slice(-1)?.[0] }
    reset() { this.data = [] }
    update(change, date) {
        
        const prevAmount = this.latest()?.amount ?? 0
        const prevDate = this.latest()?.date 

        const newAmount = prevAmount + change
        
        if(isEqual(prevDate, date)) this.latest().amount = newAmount <= 0 ? 0 : newAmount
        else this.data.push({ ...this.latest(), amount: newAmount <= 0 ? 0 : newAmount, date })

        return newAmount
    }

    constructor(value) { this.value = value }
}

class RecipeData {

    name
    ingredientsType
    ingredients
    data = []
    unitAmount
    schemas
    currentIngredient = 0

    constructor(value, schemas) {
        this.name = value.name
        this.ingredients = value.ingredients.items
        this.ingredientsType = value.ingredients.type
        this.schemas = schemas
    }

    reset() { this.data = [] }

    getUnitAmount(ingredientIndex) {

        const isSameIngredient = ingredientIndex === this.currentIngredient || ingredientIndex === undefined

        const toUnitAmount = (ing) => toMetricBase(ing.unit, ing.amount)

        if (isSameIngredient && typeof this.unitAmount === 'number') return this.unitAmount

        if (!isSameIngredient) this.currentIngredient = ingredientIndex ?? 0

        if (this.ingredientsType === 'list' && this.ingredients.length) this.unitAmount = this.ingredients.reduce((p, c) => p + toUnitAmount(c), 0) || 1;
        if (this.ingredientsType === 'alternative') this.unitAmount = toUnitAmount(this.ingredients[this.currentIngredient]) || 1;
        return this.unitAmount ?? 1
    }

    setCurrentIngredient(i) {
        this.currentIngredient = i
    }

    updateDependencies({ amount, date }) {


        const updateDeps = (currAmount, ingIndx) => (i) => {
            if (currAmount) {
                if (i.name in this.schemas.Recipes) {
                    const ingredientAmount = toMetricBase(i.unit, i.amount) * currAmount

                    const recipeAmount = this.schemas.Recipes[i.name].toRecipeAmount(ingredientAmount, this.schemas.Recipes[i.name].ingredientType === 'alternative' ? ingIndx : undefined)

                    return this.schemas.Recipes?.[i.name]?.update({ amount: recipeAmount, date })
                }
            }
            return 0
        }

        if (this.ingredientsType === 'list') this.ingredients.forEach(updateDeps(amount))
        if (this.ingredientsType === 'alternative') this.ingredients.forEach((c, i) => {
            if (amount > 0) {
                const remainder = updateDeps(amount, i)(c)
                amount -= remainder
            }
        });



        return amount <= 0 ? 0 : amount
    }

    toInventoryAmount(amount, ingredientIndex) {
        return this.getUnitAmount(ingredientIndex) * amount
    }

    toRecipeAmount(amount, ingredientIndex) {
        return amount / this.getUnitAmount(ingredientIndex)
    }

    latest() { return this?.data?.slice(-1)?.[0] }

    update({ amount, date }) {
        if(isEqual(this.latest()?.date, date)) this.latest().amount += amount
        else this.data.push({ amount, date })

        if (this.schemas.Inventory?.[this.name]) {

            const inventoryAmount = this.toInventoryAmount(amount) * -1

            const remainder = this.schemas.Inventory?.[this.name]?.update(inventoryAmount, date) ?? 0

            amount += this.toRecipeAmount(remainder)
        }
        return this.updateDependencies({ amount, date })
    }

}

class ProductsItemData {
    name
    required
    choices

    constructor({ name, required, choices }) {
        this.name = name
        this.required = required
        this.choices = choices.reduce((p, { name, price }) => ({ ...p, [name]: price }), {})
    }

    hasChoice(choice) {
        return choice in this.choices
    }


    isOptional() {
        return !this.required
    }
}

class SalesData {
    name
    items
    price
    data = []
    schemas

    constructor(value, schemas) {
        this.name = value.name
        this.items = value.items.map(i => new ProductsItemData(i))
        this.price = value.price
        this.schemas = schemas
    }

    reset() { this.data = [] }

    isValidChoice({ name, amount }) {
        return this.items.some(i => i.hasChoice(name))
    }


    isOptionalItem(item) {
        return this.items.find(i => i.name === item)?.isOptional() ?? true
    }

    update({ amount, date, choices }) {
        // Must map to a Recipes or Inventory
        // choices = choices.filter(choice => this.isValidChoice(choice))

        // Add Inventory Items to Recipes automatically after parsing for this to work
        /**
         * Each choice is a Recipes
         */

        choices.forEach(({ name, amount }) => this.schemas.Recipes[name].update({ amount, date }))

        this.data.push({ amount, date, choices })
    }
}

// const Inventory_Specification = loadCsv(readFileSync('/home/ai-developer/development/restaurant-reports/csvs/Inventory_Specification.csv', 'utf-8'))
// const Products_Specification = loadCsv(readFileSync('/home/ai-developer/development/restaurant-reports/csvs/Products_Specification.csv', 'utf-8'))
// const Recipes_Specification = loadCsv(readFileSync('/home/ai-developer/development/restaurant-reports/csvs/Recipes_Specification.csv', 'utf-8'))

// const specs = buildSchemas({ Inventory_Specification, Products_Specification, Recipes_Specification })
// const schema = new Schemas(specs)

// const salesData = loadCsv(readFileSync('/home/ai-developer/development/restaurant-reports/csvs/Sales_Data.csv', 'utf-8'))
// const inventoryData = loadCsv(readFileSync('/home/ai-developer/development/restaurant-reports/csvs/Inventory_Data.csv', 'utf-8'))

// const inventory = loadInventoryData(inventoryData)
// const soldProducts = loadProducts(salesData)

// const initialInventory = Object.values(inventory.reduce((p, c) => (!(c.name in p) || c.date <= p[c.name]?.date) ? ({ ...p,  [c.name]: c }) : p, {}))
// // console.log(initialInventory)
// schema.setInitialInventory(initialInventory)
// schema.addInitialInventory()

// schema.setSales(soldProducts)

// schema.runSales()

// console.log(JSON.stringify({
//     inventory,
//     expectedInventory: schema.getInventory(),
//     sales: schema.getProducts(),
//     recipes: schema.getRecipes()
// }))


export function simulate({ Inventory_Specification, Products_Specification, Recipes_Specification, Sales_Data, Inventory_Data }) {
    const specs = buildSchemas({ Inventory_Specification, Products_Specification, Recipes_Specification })
    const schema = new Schemas(specs)

    const inventoryData = loadInventoryData(Inventory_Data)
    const salesData = loadSales(Sales_Data)

    const initialInventory = Object.values(inventoryData.reduce((p, c) => (!(c.name in p) || c.date <= p[c.name]?.date) ? ({ ...p,  [c.name]: c }) : p, {}))

    schema.setInitialInventory(initialInventory)
    schema.addInitialInventory()

    schema.setSales(salesData)

    schema.runSales()

    return {
        inventory: inventoryData,
        expectedInventory: schema.getInventory(),
        sales: schema.getProducts(),
        recipes: schema.getRecipes()
    }
}

export function groupByTimeUnit(data, timeUnit) {

  const timeUnitFn = {
    day: getDay,
    week: getWeekOfMonth,
    month: getMonth
  }[timeUnit]

  return _.groupBy(data, ({ date }) => timeUnitFn(date))
}

export function getLast(arr) {
  return arr?.slice(-1)?.[0]
}

export function fromGramsToOz(amount) {
  return fromBase('oz', toImperialBase('g', amount))
}

export function toStackedGraphDataset(inventory, recipes, expectedInventory, key) {
  const actual = inventory.filter(({ name }) => name === key).map(x => ({ ...x, dType: 'actualInventory' }))
  const usage = recipes?.[key]?.map(x => ({ ...x, dType: 'recipeUsage' }))
  const expected = expectedInventory?.[key]?.map(x => ({ ...x, dType: 'expectedInventory' }))

  const dataset1 = []
  const dataset2 = []
  const dataset3 = []

  const grouped = groupByTimeUnit(actual.concat(usage).concat(expected), 'day')

  for (const k in grouped) grouped[k] = _.groupBy(grouped[k], ({ dType }) => dType)

  for (const day in grouped) {

    const recipeUsage = grouped[day]?.recipeUsage?.[0]?.amount ?? 0
    const actualInventory = grouped[day]?.actualInventory?.[0]?.amount ?? 0
    const expectedInventory = grouped[day]?.expectedInventory?.[0]?.amount ?? getLast(dataset3) ?? 0

    const difference = (getLast(dataset3) && actualInventory) ? actualInventory - getLast(dataset3) : 0

    dataset1.push(recipeUsage)
    dataset2.push(Math.abs(difference))
    dataset3.push(difference < 0 ? expectedInventory + difference : expectedInventory)

  }

  return { dataset1, dataset2, dataset3 }
}
