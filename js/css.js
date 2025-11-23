const inputfield = {
    translateX: document.getElementById("input-translateX"),
    transaletY: document.getElementById("input-translateY"),
    rotate: document.getElementById("input-rotate"),
    scale: document.getElementById("input-scale"),
    skewX: document.getElementById("input-skewX")
}

let element;
let elementName;
let elementValue;
let confirmArea = document.querySelector("main .confirmation-area");
let inputAreadWrapper = document.querySelector("main .input-area-wrapper");
let backButton = document.getElementById("back-button");
let confirmButton = document.getElementById("yes-button")
let resetButton = document.getElementById("reset-button");
let square = document.getElementById("square");

resetButton.addEventListener('click',showConfirmArea);
backButton.addEventListener('click',hideConfirmArea);
confirmButton.addEventListener('click',resetValues);


resetValues();
document.addEventListener("input",transformSquare);

function transformSquare() {
    element = document.activeElement;
    elementName = element.getAttribute("name");
    if(element.value.length < 1)
    {
        elementValue = "0";
    }
    else
    {
        elementValue = element.value;
    }

    doTransformation(elementName);
}

function doTransformation(elementName) {
    let measurement = getMeasurement(elementName);
    transformProperty = elementName + "(" + elementValue + measurement + ")";

    if(isNaN(elementValue) === false && elementValue.length > 0){
        square.style.setProperty("transform",transformProperty);
    }

}

function getMeasurement(name) {

    if(name.includes("rotate") || name.includes("skewX")){
        return "deg";
    }
    else if(name.includes("translate"))
    {
        return "px";
    }
    else
    {
        return "";
    }
}

function resetValues() {
    for (input of document.getElementsByTagName('input')){
      input.value = 0;
    }

    square.style.removeProperty('transform')
    hideConfirmArea();
}

function showConfirmArea() {
    inputAreadWrapper.style.setProperty("opacity","0");
    confirmArea.style.setProperty("z-index",2);

}

function hideConfirmArea() {
    inputAreadWrapper.style.setProperty("opacity","1");
    confirmArea.style.setProperty("z-index",0);
}