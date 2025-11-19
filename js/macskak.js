const catsTableBody = document.querySelector('main > .cats-table > tbody');
const nameInputField = document.getElementById('input-cat-name');
const originInputField = document.getElementById('input-cat-origin');
const inputField = document.querySelector('main > .input-field');
const searchButton = document.getElementById('search-cat-button');
const params = new URLSearchParams();

searchButton.addEventListener('click',clickEvent);
nameInputField.addEventListener('input',removeWarning);
nameInputField.addEventListener('click',removeWarning);
originInputField.addEventListener('input',removeWarning);
originInputField.addEventListener('click',removeWarning);

function clickEvent() {
    if(nameInputField.value.trim().length < 1 && originInputField.value.trim().length < 1)
    {
        inputErrorAction();
    }
    else
    {
        searchdata()
    }
}

function inputErrorAction() {
    nameInputField.setCustomValidity("Legalább az egyik mezőt ki kell tölteni!")

    nameInputField.style.setProperty("outline","none");
    nameInputField.style.setProperty("border-color","red");
    originInputField.style.setProperty("border-color","red");

    nameInputField.reportValidity();

    setTimeout(()=> removeWarning(),2000);

}

function removeWarning() {
        nameInputField.style.removeProperty("outline");
        nameInputField.style.removeProperty("border-color");
        originInputField.style.removeProperty("border-color");

        nameInputField.report;
}

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