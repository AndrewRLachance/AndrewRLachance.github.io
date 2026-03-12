export const measurements = {
    mg: {
        name: "milligram",
        symbol: "mg",
        base_conversion: 0.001,
        system: "metric",
        type: 'mass'
    },
    cg: {
        name: "centigram",
        symbol: "cg",
        base_conversion: 0.01,
        system: "metric",
        type: 'mass'
    },
    dg: {
        name: "decigram",
        symbol: "dg",
        base_conversion: 0.1,
        system: "metric",
        type: 'mass'
    },
    g: {
        name: "gram",
        symbol: "g",
        base_conversion: 1,
        system: "metric",
        type: 'mass'
    },
    dag: {
        name: "decagram",
        symbol: "dag",
        base_conversion: 10,
        system: "metric",
        type: 'mass'
    },
    hg: {
        name: "hectogram",
        symbol: "hg",
        base_conversion: 100,
        system: "metric",
        type: 'mass'
    },
    kg: {
        name: "kilogram",
        symbol: "kg",
        base_conversion: 1000,
        system: "metric",
        type: 'mass'
    },
    t: {
        name: "metric ton (tonne)",
        symbol: "t",
        base_conversion: 1000000,
        system: "metric",
        type: 'mass'
    },
    fl_oz: {
        name: "fluid ounce (UK)",
        symbol: "fl_oz",
        base_conversion: 1,
        system: "imperial",
        type: 'volume'
    },
    gi: {
        name: "gill (UK)",
        symbol: "gi",
        base_conversion: 5,
        system: "imperial",
        type: 'volume'
    },
    pt: {
        name: "pint (UK)",
        symbol: "pt",
        base_conversion: 20,
        system: "imperial",
        type: 'volume'
    },
    qt: {
        name: "quart (UK)",
        symbol: "qt",
        base_conversion: 40,
        system: "imperial",
        type: 'volume'
    },
    gal: {
        name: "gallon (UK)",
        symbol: "gal",
        base_conversion: 160,
        system: "imperial",
        type: 'volume'
    },
    gr: {
        name: "grain",
        symbol: "gr",
        base_conversion: 0.0365714286,
        system: "imperial",
        type: 'mass'
    },
    dr: {
        name: "dram",
        symbol: "dr",
        base_conversion: 1,
        system: "imperial",
        type: 'mass'
    },
    oz: {
        name: "ounce",
        symbol: "oz",
        base_conversion: 16,
        system: "imperial",
        type: 'mass'
    },
    lb: {
        name: "pound",
        symbol: "lb",
        base_conversion: 256,
        system: "imperial",
        type: 'mass'
    },
    lt: {
        name: "ton (UK long ton)",
        symbol: "lt",
        base_conversion: 573440,
        system: "imperial",
        type: 'mass'
    },
    mL: {
        name: "milliliter",
        symbol: "mL",
        base_conversion: 0.001,
        system: "metric",
        type: 'volume'
    },
    cL: {
        name: "centiliter",
        symbol: "cL",
        base_conversion: 0.01,
        system: "metric",
        type: 'volume'
    },
    dL: {
        name: "deciliter",
        symbol: "dL",
        base_conversion: 0.1,
        system: "metric",
        type: 'volume'
    },
    L: {
        name: "liter",
        symbol: "L",
        base_conversion: 1,
        system: "metric",
        type: 'volume'
    },
    daL: {
        name: "dekaliter",
        symbol: "daL",
        base_conversion: 10,
        system: "metric",
        type: 'volume'
    },
    hL: {
        name: "hectoliter",
        symbol: "hL",
        base_conversion: 100,
        system: "metric",
        type: 'volume'
    },
    kL: {
        name: "kiloliter",
        symbol: "kL",
        base_conversion: 1000,
        system: "metric",
        type: 'volume'
    }
}

export const systemConversionMap= {
    imperial: {
        mass: { value: 1.77185, type: 'dram_to_gram' },
        volume: { value: 33.814, type: 'fl_oz_to_liter' }
    },
    metric: {
        mass: { value: 1 / 1.77185, type: 'gram_to_dram' },
        volume: { value: 1 / 33.814, type: 'liter_to_fl_oz' }
    }
}

export const baseConversion = (symbol, amount) => amount * measurements[symbol].base_conversion
export const fromBase = (toSymbol, amount) => amount / measurements[toSymbol].base_conversion

export const systemConversion = (symbol, amount) => baseConversion(symbol, amount) * systemConversionMap[measurements[symbol].system][measurements[symbol].type].value

export const toMetricBase = (symbol, amount) => measurements[symbol].system === 'imperial' ? systemConversion(symbol, amount) : baseConversion(symbol, amount)
export const toImperialBase = (symbol, amount) => measurements[symbol].system === 'metric' ? systemConversion(symbol, amount) : baseConversion(symbol, amount)

export const toInventoryAmount = (unitAmount) => (amt) => unitAmount * amt * -1
export const toRecipeAmount = (unitAmount) => (amt) => amt / unitAmount * -1

