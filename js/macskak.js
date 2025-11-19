const catsTableBody = document.querySelector('main > .cats-table > tbody');
const nameInputField = document.getElementById('input-cat-name');
const originInputField = document.getElementById('input-cat-origin');
const searchButton = document.getElementById('cat-search-button');
const params = new URLSearchParams();

getCatsData();

async function getCatsData() {
    const url = "http://localhost:3000/cats" + "?" + params;
    console.log(url);
    try
    {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        readData(result);
    }
    catch(error)
    {
        console.error(error.message);
    }
}

function readData(result) {
    for(let cat of result) {
        let tr = document.createElement('tr');
        let idCell = document.createElement('td');
        let lengthCell =  document.createElement('td');
        let originCell = document.createElement('td');
        let nameCell = document.createElement('td');

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

        catsTableBody.append(tr);
    }
}