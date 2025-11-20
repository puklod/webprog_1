const url = "http://localhost:3000/cats";
let searchQuery = url + "?";
let lastQueryParams = "";
const catsTable = document.querySelector('main > .cats-table');
const nameInputField = document.getElementById('input-cat-name');
const originInputField = document.getElementById('input-cat-origin');
const inputField = document.querySelector('main > .input-field');
const searchButton = document.getElementById('search-cat-button');
let params = new URLSearchParams();

searchButton.addEventListener('click',searchData);


getCatsData(url);

async function getCatsData(query) {
    try
    {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        console.log(await response.formData().then((name)=>{name == "ez"}));
        const result = await response.json();

        readData(result);
    }
    catch(error)
    {
        console.error(error.message);
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


        tr.append(idCell);
        tr.append(nameCell);
        tr.append(originCell);
        tr.append(lengthCell);
        tr.append(removeButton);

        tbody.append(tr);
    }

    catsTable.append(tbody)
}

function searchData(){
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

    params.append("exclude","Simon");

    if(lastQueryParams !== params.toString()){
        lastQueryParams = params.toString();
        console.log(params.toString());
        document.querySelector("main > .cats-table tbody").remove();

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
    params.delete("name");
    params.delete("origin");
}