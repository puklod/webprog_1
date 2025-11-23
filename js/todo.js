class Card {
    static currentUndoneCardsCount = 0;

    constructor(text){
        this.container = document.createElement('div');
        this.textField = document.createElement('h2');
        this.removeButton = document.createElement('button');
        this.checkButton = document.createElement('button');

        this.init();
        this.setClasses();
        this.setListeners();
        this.setTextFieldData(text);
        
        Card.currentUndoneCardsCount++;
    }

    init() {
        this.removeButton.textContent = '\u2716'
        this.checkButton.textContent = '\u2714'
        this.container.append(this.textField);
        this.container.append(this.removeButton);
        this.container.append(this.checkButton);
    }

    setClasses() {
        this.container.classList.add('todo-card');
        this.textField.classList.add('todo-card-text');
        this.removeButton.classList.add('remove-card-button');
        this.checkButton.classList.add('check-card-button');
    }

    setListeners() {
        this.removeButton.addEventListener('click',() => this.removeEvent(this.container));
        this.checkButton.addEventListener('click',() => this.checkEvent(this.container));
    }
     
    removeEvent(removeableElement) {
        removeableElement.remove();
        Card.currentUndoneCardsCount--;
        modifyCountTextRegion();
    }

    checkEvent(parentElement) {
        this.setDoneStyle();

        for(let child of parentElement.childNodes){
            if(child.classList.contains("remove-card-button"))
                this.removeEvent(child);
        }
    }

    setDoneStyle() {
        this.container.style.setProperty('background',"#1a6f1a");
        this.container.style.setProperty('color',"#cde1c8");
        this.checkButton.style.setProperty('color','#cde1c8');
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
    addCardForm: document.querySelector('main .add-card-form'),
    countText: document.querySelector('main .todo-text-region > h1'),
    cardRegion: document.querySelector('main .todo-card-region')
}

staticPageElements.addCardForm.addEventListener('submit',submitEvent);
staticPageElements.inputField.addEventListener('input',removeWarning);

function submitEvent(event) {
    event.preventDefault();

    if (staticPageElements.inputField.value.trim().length == 0 )
    {
        inputErrorAction();
    }
    else
    {
        submitCard();
        clearInputField();
        modifyCountTextRegion();
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

function modifyCountTextRegion() {
    staticPageElements.countText.textContent = `Jelenleg ${Card.currentUndoneCardsCount}db befejezetlen teendő van.`
}