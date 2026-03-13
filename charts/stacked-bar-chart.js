import {Chart} from "https://cdn.jsdelivr.net/npm/chart.js/+esm";
import initialData from '../data/initial-data.js';
import { simulate, toStackedGraphDataset, fromGramsToOz } from '../transforms/datagenerator.js';

let {
  Recipes_Specification, Products_Specification, Inventory_Specification, Sales_Data, Inventory_Data
} = initialData

const ingredientDropdown = []

let selectedIngredient = 'burger'
let chart = null
const htmlIdJsonMap = {
  'inventory-specification': initialData.Inventory_Specification,
  'products-specification': initialData.Products_Specification,
  'recipes-specification': initialData.Recipes_Specification,
  'sales-data': initialData.Sales_Data,
  'inventory-data': initialData.Inventory_Data
}



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
    
    ingredientDropdown.push(...Inventory_Data.map(({ Name='', name }) => Name || name))

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
const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

function tryRenderChart() {

  if (!Inventory_Specification || !Products_Specification || !Recipes_Specification || !Sales_Data || !Inventory_Data) return;

  const { inventory, expectedInventory, sales, recipes } = simulate({ Inventory_Specification, Products_Specification, Recipes_Specification, Sales_Data, Inventory_Data })
  
  const { dataset1, dataset2, dataset3 } = toStackedGraphDataset(inventory, recipes, expectedInventory, selectedIngredient)

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Inventory',
        data: dataset3.map(fromGramsToOz),
        backgroundColor: CHART_COLORS.green,
        stack: 'Stack 0',
      },
      {
        label: 'Inventory Difference',
        data: dataset2.map(fromGramsToOz),
        backgroundColor: CHART_COLORS.red,
        stack: 'Stack 0',
      },
      {
        label: 'Recipe Usage',
        data: dataset1.map(fromGramsToOz),
        backgroundColor: CHART_COLORS.blue,
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
          text: `Expected Inventory: ${selectedIngredient[0].toUpperCase() + selectedIngredient.slice(1)}`
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

  for(const k in htmlIdJsonMap) replaceTableWithEditableJSON(`${k}-table`, htmlIdJsonMap[k])

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

  tryPopulateDropdown();
  onDropdownSelection("ingredients-dropdown", selectedValue => {selectedIngredient = selectedValue});
  tryRenderChart();
});
