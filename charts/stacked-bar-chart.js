import { Chart } from 'chart.js';
import initialData from '../data/initial-data.js';
import * as Utils from './utils.js'
import _, { } from 'lodash';
import { simulate, toStackedGraphDataset } from '../transforms/datagenerator.js';

let {
  Recipes_Specification, Products_Specification, Inventory_Specification, Sales_Data, Inventory_Data
} = initialData

const ingredientDropdown = []

let selectedIngredient = null
let chart = null
const htmlIdJsonMap = {
  'inventory-specification': Inventory_Specification,
  'products-specification': Products_Specification,
  'recipes-specification': Recipes_Specification,
  'sales-data': Sales_Data,
  'inventory-data': Inventory_Data
}

for(const k of htmlIdJsonMap) replaceTableWithEditableJSON(`${k}-table`, htmlIdJsonMap[k])



function replaceTableWithEditableJSON(tableId, jsonData) {

    const oldTable = document.getElementById(tableId);
    if (!oldTable || !Array.isArray(jsonData) || jsonData.length === 0) return;

    const keys = Object.keys(jsonData[0]);

    const table = document.createElement("table");

    // THEAD
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    keys.forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // TBODY
    const tbody = document.createElement("tbody");

    jsonData.forEach(row => {

        const tr = document.createElement("tr");

        keys.forEach(key => {
            const td = document.createElement("td");
            td.contentEditable = "true";
            td.textContent = row[key];
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    // Replace old table
    oldTable.replaceWith(table);

}





function loadCSV(file, cb) { 
  Papa.parse(file, { dynamicTyping: true, header: true, complete: cb })
}

function populateDropdown(selectId, values) {

    const dropdown = document.getElementById(selectId);

    dropdown.innerHTML = "";

    values.forEach(value => {

        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;

        dropdown.appendChild(option);

    });
}

function tryPopulateDropdown() {
    if(!Inventory_Specification) return 
    ingredientDropdown.push(...Inventory_Data.map(({ name }) => name))
    populateDropdown('ingredients-dropdown', ingredientDropdown)
}

function onDropdownSelection(selectId, callback) {

    const dropdown = document.getElementById(selectId);

    dropdown.addEventListener("change", function () {

        const selectedValue = this.value;

        if (selectedValue !== "") {
            callback(selectedValue);
        }

    });

}

function tryRenderChart() {

  if (!Inventory_Specification || !Products_Specification || !Recipes_Specification || !Sales_Data || !Inventory_Data) return;

  const { inventory, expectedInventory, sales, recipes } = simulate({ Inventory_Specification, Products_Specification, Recipes_Specification, Sales_Data, Inventory_Data })

  const { dataset1, dataset2, dataset3 } = toStackedGraphDataset(inventory, recipes, expectedInventory, selectedIngredient || 'burger')

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Inventory',
        data: dataset3.map(fromGramsToOz),
        backgroundColor: Utils.CHART_COLORS.green,
        stack: 'Stack 0',
      },
      {
        label: 'Inventory Difference',
        data: dataset2.map(fromGramsToOz),
        backgroundColor: Utils.CHART_COLORS.red,
        stack: 'Stack 0',
      },
      {
        label: 'Recipe Usage',
        data: dataset1.map(fromGramsToOz),
        backgroundColor: Utils.CHART_COLORS.blue,
        stack: 'Stack 0',
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: `Expected Inventory: ${stockKey[0].toUpperCase() + stockKey.slice(1)}`
        },
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };


  if (chart) chart.destroy();

  chart = new Chart(
    document.getElementById("chart"),
    config
  );
}


document.addEventListener("DOMContentLoaded", () => {

  Object.keys(htmlIdJsonMap).forEach(id => document.getElementById(id).addEventListener("change", e => {

    loadCSV(e.target.files[0], d => {

      Inventory_Specification = id === 'inventory-specification' ? d : Inventory_Specification
      Products_Specification = id === 'products-specification' ? d : Products_Specification
      Recipes_Specification = id === 'recipes-specification' ? d : Recipes_Specification
      Sales_Data = id === 'sales-data' ? d : Sales_Data
      Inventory_Data = id === 'inventory-data' ? d : Inventory_Data
    
      tryPopulateDropdown();
      tryRenderChart();
    });

  }))

  onDropdownSelection("columnDropdown", selectedValue => selectedIngredient = selectedValue);

});
