const navigation = {
    parentElement: document.querySelector('body > nav'),
    menuLabels: ["Rólam","CSS","TODO","Macskák"],
    hrefs: ["/index.html","/pages/css.html","/pages/todo.html","/pages/macskak.html"],
}

setMenuType();
createNavigation();
window.addEventListener("resize",switchMenuType);

function setMenuType() {
    if(window.innerWidth <= 651)
    {
        navigation.parentElement.classList.add("mobile");
        navigation.parentElement.classList.add("closed");
    }
    else
    {
        navigation.parentElement.classList.add("desktop");
    }
}

function createNavigation() {
    let parentElement = navigation.parentElement;
    let button = createMenuButton();
    let ul = document.createElement('ul');

    for(let i=0; i<navigation.menuLabels.length; i++){
        let isCurrentPage = document.URL.includes(navigation.hrefs[i]);
        let a = document.createElement('a');
                        a.setAttribute("href",navigation.hrefs[i]);
                        a.append(navigation.menuLabels[i]);
        let li = document.createElement('li');
                        li.append(a);
        if(isCurrentPage)
                        li.classList.add("active");
        ul.append(li);
    }

    parentElement.append(button);
    parentElement.append(ul);
}

function createMenuButton() {
    let lineOne = document.createElement('span');
                  lineOne.textContent = "\u2015";
                  lineOne.classList.add('line-one');
    let lineTwo = document.createElement('span');
                  lineTwo.textContent = "\u2015";
                  lineTwo.classList.add('line-two');
    let menuButton = document.createElement('button');
             menuButton.classList.add("button")
             menuButton.append(lineOne);
             menuButton.append(lineTwo);
             menuButton.addEventListener('click',manipulateMenu);

    return menuButton;
}

function manipulateMenu() {
    let parentElement = navigation.parentElement;

    if(parentElement.classList.contains("closed"))
    {
        parentElement.classList.remove("closed");
        parentElement.classList.add("opened");
    }
    else
    {
        parentElement.classList.remove("opened");
        parentElement.classList.add("closed");
    }
}


function switchMenuType() {
    let parentElement = navigation.parentElement;

    if(window.innerWidth <= 650 && parentElement.classList.contains("desktop"))
    {
        parentElement.classList.remove("desktop");
        parentElement.classList.add("mobile");
        parentElement.classList.add("closed");
    }
    else if(window.innerWidth >= 651 && parentElement.classList.contains("mobile"))
    {
        parentElement.classList.remove("mobile");
        parentElement.classList.add("desktop");
        parentElement.classList.remove("opened");
        parentElement.classList.remove("closed");
    }   
}