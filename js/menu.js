const navigation = {
    parentElement: document.querySelector('body > nav'),
    menuLabels: ["Rólam","CSS","TODO","Macskák"],
    hrefs: ["/index.html","/pages/css.html","/pages/todo.html","/pages/macskak.html"],
}

setMenuType();
appendMenu();
window.addEventListener("resize",switchMenuType);

function setMenuType() {
    if(window.outerWidth < 600)
    {
        navigation.parentElement.classList.add("mobile")
    }
    else
    {
        navigation.parentElement.classList.add("desktop")
    }
}

function appendMenu(){
    let parentElement = navigation.parentElement;
    let linkList = createLinkList();

    if(parentElement.classList.contains("desktop"))
    {
        parentElement.append(linkList);
    }
    else
    {
        linkList.classList.add("closed");
        parentElement.append(createMenuButton());
        parentElement.append(linkList);
    }
}

function createLinkList() {
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

    return ul;
}

function createMenuButton() {
    let menuButton = document.createElement('button');
             menuButton.classList.add("button")
             menuButton.append("ÉNVAGYOKAZIKON");
             menuButton.addEventListener('click',manipulateMenu);

    return menuButton;
}

function manipulateMenu() {
    let linkList = navigation.parentElement.querySelector('ul');

    if(linkList.classList.contains("closed"))
    {
        linkList.classList.remove("closed");
        linkList.classList.add("opened");
    }
    else
    {
        linkList.classList.remove("opened");
        linkList.classList.add("closed");
    }
}


function switchMenuType() {
    let parentElement = navigation.parentElement;
    const ul = parentElement.querySelector('ul');
    const button = parentElement.querySelector('.button');

    if(window.outerWidth < 600 && parentElement.classList.contains("desktop"))
    {
        parentElement.classList.remove("desktop");
        parentElement.classList.add("mobile");
        parentElement.removeChild(ul);
        appendMenu();
    }
    else if(window.outerWidth > 600 && parentElement.classList.contains("mobile"))
    {
        parentElement.classList.remove("mobile");
        parentElement.classList.add("desktop");
        if(button && ul){
            parentElement.removeChild(button);
            parentElement.removeChild(ul);
        }
        appendMenu();
    }   
}