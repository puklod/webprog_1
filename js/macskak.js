const url = "http://localhost:3000/cats";
let searchQuery = url + "?";
let lastQueryParams = "";
let currentCatList;
const mainField = document.querySelector('main');
const catsField = document.querySelector('main > .cats-field');
const catsTable = document.querySelector('main > .cats-field > .cats-table');
const nameInputField = document.getElementById('input-cat-name');
const originInputField = document.getElementById('input-cat-origin');
const catSearchForm = document.querySelector('main > .cats-field > .cat-search-form');
const searchButton = document.getElementById('search-cat-button');
let params = new URLSearchParams();

catSearchForm.addEventListener('submit',searchData);


getCatsData(url);

async function getCatsData(query) {
    try
    {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        if (catsField.classList.contains('error')){
            document.querySelector('main .error-string').remove();
            catsField.classList.remove('error')
        }
        currentCatList = await response.json();

        readData(currentCatList);
    }
    catch(error)
    {
        console.error(error.message);
        let span = document.createElement('span');
            span.textContent = "Adatbázishiba";
            span.classList.add("error-string");

        mainField.append(span);
        catsField.classList.add('error');
    }
}


/*
function setLastQueryParams(query) {
    let queryParams = query.split("?")[1];

    if(queryParams == undefined){
        lastQueryParams = "";
    }
    else
    {
        lastQueryParams = queryParams;
    }
}
*/
function readData(result) {
    let tbody = document.createElement('tbody');

    for(let cat of result) {
        let tr = document.createElement('tr');
        let idCell = document.createElement('td');
        let lengthCell =  document.createElement('td');
        let originCell = document.createElement('td');
        let nameCell = document.createElement('td');
        let removeButton = document.createElement('button');

        if(toString(cat.id).length > 0){
            idCell.textContent = cat.id;
        }
        if(toString(cat.length).length > 0){
            lengthCell.textContent = cat.length;
        }
        if(toString(cat.origin).length > 0){
            originCell.textContent = cat.origin;
        }
        if(toString(cat.name).length > 0){
            nameCell.textContent = cat.name;
        }


        removeButton.addEventListener('click',() => removeCatRow(cat.id));

        tr.append(idCell);
        tr.append(nameCell);
        tr.append(originCell);
        tr.append(lengthCell);
        tr.append(removeButton);

        tbody.append(tr);
    }

    catsTable.append(tbody)
}

async function removeCatRow(excludedId){
    try
    {
         if (catsField.classList.contains('error')){
            document.querySelector('main .error-string').remove();
            catsField.classList.remove('error')
        }
    const response = await fetch(url + `/${excludedId}`,{
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    document.querySelector("main > .cats-field > .cats-table tbody").remove();
        if(lastQueryParams == "")
        {
            getCatsData(url);
        }
        else
        {
            getCatsData(searchQuery + lastQueryParams);
        }
    


    }
    catch(error) {
        console.error(error.message);
        let span = document.createElement('span');
            span.textContent = "Adatbázishiba";
            span.classList.add("error-string");

        mainField.append(span);
        catsField.classList.add('error');
    }
}

function searchData(event){
    event.preventDefault();

    let searchedCatName = nameInputField.value;
    let searchedCatOrigin = originInputField.value;

    if(searchedCatName.trim().length > 0 && searchedCatOrigin.trim().length > 0)
    {
        params.append("name",searchedCatName);
        params.append("origin",searchedCatOrigin);
    }
    else if (searchedCatName.trim().length > 0)
    {
        params.append("name",searchedCatName);
    }
    else if(searchedCatOrigin.trim().length > 0)
    {
        params.append("origin",searchedCatOrigin);
    }

    if(lastQueryParams !== params.toString()){
        lastQueryParams = params.toString();
        document.querySelector("main > .cats-field >.cats-table tbody").remove();

        if(params.toString() == "")
        {
            getCatsData(url);
        }
        else
        {
            getCatsData(searchQuery + params);
        }
        
    }

    clearParams();
}

function clearParams() {
    params.delete("id");
    params.delete("name");
    params.delete("origin");
}