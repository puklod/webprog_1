class Card {
    static currentCardsCount = 0;

    constructor(text){
        this.container = document.createElement('div');
        this.textField = document.createElement('span');
        this.removeButton = document.createElement('button');
        this.checkButton = document.createElement('button');

        this.init();
        this.setClasses();
        this.setListeners();
        this.setTextFieldData(text);
        
        Card.currentCardsCount++;
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
        Card.currentCardsCount--;
        modifyTodoTextRegion();
    }

    checkEvent(parentElement) {
        for(let child of parentElement.childNodes){
            if(child.classList.contains("remove-card-button"))
                child.remove();
        }
    }

    setTextFieldData(textFieldData) {
        this.textField.textContent = textFieldData;
    }

    getCard(){
        return this.container;
    }

}

staticPageElements = {
    inputField: document.getElementById("input-todo"),
    submitButton: document.getElementById("add-todo"),
    countText: document.querySelector('main > .todo-text-region > p'),
    cardRegion: document.querySelector('main > .todo-card-region')
}

staticPageElements.submitButton.addEventListener('click',submitEvent);
staticPageElements.inputField.addEventListener('input',removeWarning)

function submitEvent() {
    if (staticPageElements.inputField.value.trim().length == 0 )
    {
        inputErrorAction();
    }
    else
    {
        submitCard();
        clearInputField();
        modifyTodoTextRegion();
    }
}

function inputErrorAction() {
    staticPageElements.inputField.setCustomValidity("A mező nem lehet üres!")
    staticPageElements.inputField.reportValidity();
}

function removeWarning() {
    if(staticPageElements.inputField.validationMessage !== "")
           staticPageElements.inputField.setCustomValidity("");
}

function submitCard() {
    let cardText = staticPageElements.inputField.value.trim();
    let card = new Card(cardText);

    appendCard(card.getCard());
}

function appendCard(div) {
    staticPageElements.cardRegion.appendChild(div);
}

function clearInputField() {
    staticPageElements.inputField.value = "";
}

function modifyTodoTextRegion() {
    staticPageElements.countText.textContent = "Jelenleg " + Card.currentCardsCount +"db befejezetlen teendő van."
}