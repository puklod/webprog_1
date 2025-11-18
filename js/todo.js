const inputField = document.getElementById("input-todo");
const submitButton = document.getElementById("add-todo");
const textRegion = document.querySelector('main > .todo-text-region');
const cardRegion = document.querySelector('main > .todo-card-region');

class Card {
    constructor(text){
        this.container = document.createElement('div');
        this.textField = document.createElement('span');
        this.removeButton = document.createElement('button');
        this.checkButton = document.createElement('button');

        this.init();
        this.setClasses();
        this.setListeners();
        this.setTextFieldData(text);
    }

    init() {
        this.container.append(this.textField);
        this.container.append(this.removeButton);
        this.container.append(this.checkButton);
    }

    setClasses() {
        this.container.classList.add('todo-card');
        this.textField.classList.add('todo-card-text');
        this.removeButton.classList.add('remove-card-button');
        this.checkButton.classList.add('todo-done-button');
    }

    setListeners() {
        this.removeButton.addEventListener('click',() => this.removeEvent(this.container));
        this.checkButton.addEventListener('click',() => this.checkEvent(this.container));
    }

    removeEvent(parentElement) {
        parentElement.remove();
    }

    checkEvent(parentElement) {
        console.log("done")
    }

    setTextFieldData(textFieldData) {
        this.textField.textContent = textFieldData;
    }

    getCard(){
        return this.container;
    }
}

submitButton.addEventListener('click',submitEvent)

function submitEvent() {
    if (inputField.value.trim().length == 0 )
    {
        inputErrorAction();
    }
    else
    {
        submitCard();
        clearInputField();
    }
}

function inputErrorAction() {
    inputField.setCustomValidity("A mező nem lehet üres!")
    inputField.reportValidity();
}

function submitCard() {
    let cardText = inputField.value.trim();
    let card = new Card(cardText);

    appendCard(card.getCard());
}


function appendCard(div) {
    cardRegion.appendChild(div);
}

function clearInputField() {
    inputField.value = "";
}