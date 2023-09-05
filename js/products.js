//URL que contiene los datos
const URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.catID + '.json';
let data = [];
let newArray = [];

//Variable creada para contener el div 'list-container'
const listContainer = document.getElementsByClassName('list-container');

//Funcion que hace el fetch de la url
async function getJsonData(url) {
    const response = await fetch(url);
    data = await response.json();
    showData(data.products);
};

getJsonData(URL);

//Funcion que muestra los datos
function showData(dataArray) {
    listContainer[0].innerHTML = '';

    for(const item of dataArray) {
        listContainer[0].innerHTML += `
        <div  class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                    <img src="${item.image}" alt="Imagen del modelo ${item.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name} - USD ${item.cost}</h4>
                            <small class="text-muted">${item.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                    </div>
                </div>
            </div>
        `;
    }
}


//Funcion que ordena los datos, segun el tipo
function sortData(dataArray, sortType) {
    newArray = [...dataArray.products];

    if(sortType === 'desc') {
        newArray.sort((a, b) => b.cost - a.cost);
    } else if(sortType === 'asc') {
        newArray.sort((a, b) => 
            a.cost - b.cost
        );
    } else {
        newArray.sort((a, b) => 
            b.soldCount - a.soldCount
        );
    }

    return newArray;
}


//Variables creadas para localizar los inputs
let min = document.getElementById('price-range-min');
let max = document.getElementById('price-range-max');

//Funcion que filtra los datos, segun un rango de precio
function priceRangeFilter(dataArray, min, max) {
    newArray = [];

    if(min.value == '' && max.value == '') {
        alert('Ingrese un valor para filtrar');
    } else if(min.value && max.value == '') {
        newArray = dataArray.products.filter((item) => item.cost > min.value);
    } else if(min.value == '' && max.value) {
        newArray = dataArray.products.filter((item) => item.cost < max.value);
    } else {
        newArray = dataArray.products.filter((item) => item.cost > min.value && item.cost < max.value);
    }

    min.value = '';
    max.value = '';

    showData(newArray);
}


//EventListeners

document.getElementById('sort-price-desc').addEventListener('click', () => {
    showData(sortData(data, 'desc'));
});

document.getElementById('sort-price-asc').addEventListener('click', () => {
    showData(sortData(data, 'asc'));
});

document.getElementById('sort-rel').addEventListener('click', () => {
    showData(sortData(data, 'sort-rel'));
});

document.getElementById('range-filter-button').addEventListener('click', () => {
    priceRangeFilter(data, min, max)
});

document.getElementById('clear-range-filter').addEventListener('click', () => {showData(data.productos)});