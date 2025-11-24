let transformString = "";
let confirmArea = document.querySelector("main .confirmation-area");
let inputAreaWrapper = document.querySelector("main .input-area-wrapper");
let backButton = document.getElementById("back-button");
let confirmButton = document.getElementById("yes-button")
let resetButton = document.getElementById("reset-button");
let square = document.getElementById("square");

resetButton.addEventListener('click',showConfirmArea);
backButton.addEventListener('click',hideConfirmArea);
confirmButton.addEventListener('click',resetValues);


resetValues();
document.addEventListener("input",() => transformSquare(document.activeElement));

function transformSquare(element) {
    let transformProperty = element.getAttribute("name");
    let value = getElementValue(element);

    setTransformString(transformProperty,value);
    setTransformProperty(transformString,value);
}

function getElementValue(element) {
    if(element.value.length < 1)
    {
        return "0";
    }
    else
    {
        return element.value;
    }
}

function setTransformString(transformProperty,value) {
    let measurement = getMeasurement(transformProperty);
    let pattern = transformProperty + "\\(.*\\)";
    let regex = new RegExp(pattern);

        if(transformString === "")
    {
        transformString = transformProperty + "(" + value + measurement + ")";
    }
    else if(transformString.match(regex) !== null)
    {
        transformString = transformString.replace(regex,transformProperty + "(" + value + measurement + ")");
    }
    else
    {
        transformString = transformString + " " + transformProperty + "(" + value + measurement + ")";
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

function setTransformProperty(transformString,value) {
    if(isNaN(value) === false && value.length > 0){
        square.style.setProperty("transform",transformString);
    }
}

function resetValues() {
    for (input of document.getElementsByTagName('input')){
      input.value = 0;
    }

    square.style.removeProperty('transform');
    transformString = "";
    hideConfirmArea();
}

function hideConfirmArea() {
    inputAreaWrapper.style.setProperty("opacity","1");
    confirmArea.style.setProperty("z-index",0);
}

function showConfirmArea() {
    inputAreaWrapper.style.setProperty("opacity","0");
    confirmArea.style.setProperty("z-index",2);

}