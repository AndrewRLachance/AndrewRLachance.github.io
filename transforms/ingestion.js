import Papa from "https://cdn.jsdelivr.net/npm/papaparse@5.4.1/+esm";
import { toMetricBase } from './conversions.js';

const toUnit = ({ IngredientName: name, Amount: amount, Unit: unit }) => ({ name, amount, unit })

const toSaleItem = ({
    name,
    required,
    choices = []
}, {
    ItemName,
    IsRequired,
    Choices
}) => ({
    name: name || ItemName,
    required: typeof required === 'boolean'
        ? required
        : IsRequired,
    choices: choices.concat([{ name: Choices }])
})

const toProductsSpec = rows => rows.reduce(({
    name,
    items = []
}, { 
    Name,
    ...item
}) => ({
    name: Name || name,
    items: item?.ItemName
        ? items.concat([toSaleItem({ name: '', price: '', choices: [] }, item)])
        : items.concat([toSaleItem(items.pop(), item)])
}), {
    name: '',
    items: []
})

const toRecipesSpec = rows => rows.reduce(({
    name,
    ingredients: { type, items }
}, {
    Name,
    IngredientType,
    ...item
}) => ({
    name: Name || name,
    ingredients: {
        type: IngredientType || type || 'list',
        items: items.concat([toUnit(item)])
    }
}), { name: '', ingredients: { type: '', items: [] } })


const toInventorySpec = rows => rows.map(({ Name: name, Type: type }) => ({ name, type })).pop()

const aggregate = (p, c) => c?.Name
        ? p.concat([[c]])
        : p.concat([p.pop().concat([c])])


export function buildSchemas({
    Inventory_Specification,
    Recipes_Specification,
    Products_Specification
}) {
    
    Inventory_Specification = Inventory_Specification
        .reduce(aggregate, [])
        .map(toInventorySpec)
           
    Recipes_Specification = Recipes_Specification
        .reduce(aggregate, [])
        .map(toRecipesSpec)

    Products_Specification = Products_Specification
        .reduce(aggregate, [])
        .map(toProductsSpec)

    Inventory_Specification.forEach(({ name }) => Recipes_Specification.push({ name, ingredients: { type: 'list', items: [] } }))
    
    return {
        Inventory_Specification,
        Recipes_Specification,
        Products_Specification
    }
}

const toChoice = ({ Choices: name, ChoiceAmount: amount, Upcharge: upcharge }) => ({ name, upcharge, amount })

const toSalesData = rows => rows.reduce(({
    name,
    amount,
    price,
    date,
    choices
}, {
    Name,
    Amount,
    Price,
    Date: Date_,
    ...choice
}) => ({
    name: Name || name,  
    amount: Amount || amount, 
    price: Price || price,
    date: Date_ ? new Date(Date_) : date,
    choices: choices.concat([toChoice(choice)])
}), {
    name: '',
    amount: '',
    price: 0,
    date: new Date(),
    choices: []
})

export function loadSales(sales) {
    sales = sales.reduce(aggregate, [])
    sales = sales.map(toSalesData).sort((x, y) => x.date <= y.date)
    return sales
}

export function loadInventoryData(inventory) {
    return inventory.map(({ Name, Price, Amount, Unit, Date: Date_ }) => ({ 
        name: Name, 
        amount: toMetricBase(Unit, Amount), 
        price: Price, 
        date: new Date(Date_) 
    }))
}


export function loadCsv(dataString) {
    return Papa.parse(dataString, { dynamicTyping: true, header: true }).data
}
