let element;
let elementName;
let elementValue;
let square = document.getElementById("square");
let translateXInput = document.getElementById("input-translateX");
let transaletYInput = document.getElementById("input-translateY");
let rotateInput = document.getElementById("input-rotate");
let scaleInput = document.getElementById("input-scale");
let scaveXInput = document.getElementById("input-scaveX");
let resetButton = document.getElementById("reset-button");

document.addEventListener("input",checkValueChange);

function checkValueChange() {
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
    let measurement = getMeasurement(elementName);
    transformProperty = elementName + "(" + elementValue + measurement + ")";

            console.log(transformProperty)

    console.log(transformProperty)

    if(isNaN(elementValue) === false && elementValue.length > 0){
        square.style.setProperty("transform",transformProperty);
        console.log("lefut")
    }
}


function getMeasurement(name) {

    if(name.includes("rotate") || name.includes("skew")){
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