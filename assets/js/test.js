if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

//#region Global Variables

// Array that contains all the list descriptions
let myData = [];

//#endregion

//#region Initialization

buildHeader();
buildFooter();

// Load saved data or create dummy data if none exists
(myData = ReadObject("SavedData")), [];
if (myData.length === 0) {
  makeDummyData();
}
showList();

const myApp = document.getElementById("app");

let yesListbutton = document.getElementById("yesListbutton");
let noListbutton = document.getElementById("noListbutton");

const divHolder = document.createElement("div");
divHolder.classList.add("hidden");
myApp.classList.add("hidden");

let imgElement = document.getElementById("imgElement");
let myListname = document.getElementById("myListname");

myApp.appendChild(divHolder);

divHolder.classList.add("addList");

let iconHolder = document.createElement("div");
iconHolder.classList.add("iconHolder");
divHolder.appendChild(iconHolder);
iconHolder.appendChild(yesListbutton);
iconHolder.appendChild(noListbutton);

divHolder.appendChild(myListname);

imgElement.addEventListener("click", () => {
  divHolder.classList.toggle("hidden");
});

// Set up event listener for the "Add List" button
yesListbutton.addEventListener("click", () => {
  let myName = myListname.value;
  makeList(myName);
  showList();
  divHolder.classList.add("hidden");
  myApp.classList.toggle("hidden");
});

noListbutton.addEventListener("click", () => {
  divHolder.classList.add("hidden");
  myApp.classList.toggle("hidden");
});

imgElement.addEventListener("click", () => {
  myApp.classList.toggle("hidden");
});

//#endregion

//#region List Management

// Function to create a new list and store it in myData
function makeList(myName) {
  let myList = {
    name: myName, // List name
    listItems: [], // Items in the list
  };

  myData.push(myList);
  SaveObject(myData, "SavedData"); // Save after making changes
}

// Remove a list by its index
function removeList(listIndex) {
  myData.splice(listIndex, 1);
  SaveObject(myData, "SavedData"); // Save after making changes
}

// Edit the name of a list
function editList(listIndex, oldName) {
  const editContainer = document.createElement("div");
  document.body.appendChild(editContainer);

  let input = document.createElement("input");
  input.value = oldName;
  editContainer.appendChild(input);

  let yesEditButton = document.createElement("button");
  yesEditButton.innerHTML = "Yes";
  editContainer.appendChild(yesEditButton);

  let cancelEditButton = document.createElement("button");
  cancelEditButton.innerHTML = "Cancel";
  editContainer.appendChild(cancelEditButton);

  yesEditButton.addEventListener("click", () => {
    let newName = input.value;
    myData[listIndex].name = newName;
    SaveObject(myData, "SavedData");
    showList();
    document.body.removeChild(editContainer);
  });

  cancelEditButton.addEventListener("click", () => {
    document.body.removeChild(editContainer);
  });
}

//#endregion

//#region Item Management

// Function to create a new item in the first to-do list
function makeItem(index, myName) {
  let myListItem = {
    name: myName,
    status: true,
  };

  myData[index].listItems.push(myListItem);
  SaveObject(myData, "SavedData");
}

// Remove an item from a list
function removeItem(listIndex, itemIndex) {
  let myList = myData[listIndex];
  myList.listItems.splice(itemIndex, 1);
  SaveObject(myData, "SavedData");
}

// Edit an item in a list
function editItem(listIndex, itemIndex, oldName) {
  const editContainer = document.createElement("div");
  document.body.appendChild(editContainer);

  let input = document.createElement("input");
  input.value = oldName;
  editContainer.appendChild(input);

  let yesEditButton = document.createElement("button");
  yesEditButton.innerHTML = "Yes";
  editContainer.appendChild(yesEditButton);

  let cancelEditButton = document.createElement("button");
  cancelEditButton.innerHTML = "Cancel";
  editContainer.appendChild(cancelEditButton);

  yesEditButton.addEventListener("click", () => {
    let newName = input.value;
    myData[listIndex].listItems[itemIndex].name = newName;
    SaveObject(myData, "SavedData");
    showList();
    document.body.removeChild(editContainer);
  });

  cancelEditButton.addEventListener("click", () => {
    document.body.removeChild(editContainer);
  });
}

// Function to add a new item to a list
function addItem(listIndex) {
  const navFooter = document.getElementById("navFooter");
  navFooter.innerHTML = "";

  navFooter.classList.add("footerHomeAdd");

  // Home Icon

  const homeIcon = document.createElement("img");
  homeIcon.className = "addHomeIcon";
  homeIcon.setAttribute("src", "assets/images/Svg/Home.svg");

  navFooter.appendChild(homeIcon);

  navFooter.style.display = "grid";
  navFooter.style.gridTemplateColumns = "1fr 1fr";
  navFooter.style.gap = "7.5rem";
  navFooter.style.justifyItems = "center";
  navFooter.style.marginLeft = "-12rem";

  let = white = document.getElementById("whiteHolder");

  white.classList.add("whiteHolder");
  homeWhite.classList.toggle("hidden");

  // Home white line

  // addItemIcon

  if (document.querySelector(".addItemIcon")) return;

  const imgElementItem = document.createElement("img");
  imgElement.classList.add("hidden");

  imgElementItem.className = "addItemIcon";
  imgElementItem.setAttribute("src", "assets/images/Svg/Icon Plus.svg");
  navFooter.appendChild(imgElementItem);

  let addItemContainer = document.getElementById("addItem");
  if (!addItemContainer) {
    addItemContainer = document.createElement("div");
    addItemContainer.id = "addItem";
    navFooter.appendChild(addItemContainer);
  }
  addItemContainer.classList.add("hidden");

  const addItemDiv = document.createElement("div");
  addItemDiv.classList.add("addItemDiv");
  addItemContainer.appendChild(addItemDiv);

  const addItemName = document.createElement("input");
  addItemName.classList.add("addItemInput");
  addItemDiv.appendChild(addItemName);

  const yesButton = document.createElement("img");
  yesButton.setAttribute("src", "assets/images/Svg/Check_ring.svg");
  addItemDiv.appendChild(yesButton);

  const noButton = document.createElement("img");
  noButton.setAttribute("src", "assets/images/Svg/Dell_light.svg");
  addItemDiv.appendChild(noButton);

  imgElementItem.addEventListener("click", () => {
    addItemContainer.classList.toggle("hidden");
  });

  homeIcon.addEventListener("click", () => {
    navFooter.style.display = "";
    navFooter.style.gridTemplateColumns = "";
    navFooter.style.gap = "";
    navFooter.style.justifyItems = "";
    navFooter.style.marginLeft = "";

    white.classList.remove("whiteHolder");

    homeIcon.classList.toggle("hidden");
    white.classList.add("hidden");
    white.classList.toggle("hidden");
    homeWhite.classList.toggle("hidden");
    imgElement.classList.toggle("hidden");
    showList();
  });

  yesButton.addEventListener("click", () => {
    const myName = addItemName.value;
    makeItem(listIndex, myName);
    addItemContainer.classList.toggle("hidden");
    showItems(listIndex);
  });

  // Handle No button click
  noButton.addEventListener("click", () => {
    addItemContainer.classList.toggle("hidden");
    showItems(listIndex);
  });
}

//#endregion

//#region Display Functions

// Function to display all lists and their items
function showList() {
  let myListElement = document.getElementById("listElement");
  myListElement.innerHTML = "";
  let MyHtml = "";

  myData.forEach((myListData, listIndex) => {
    MyHtml += `<header id="headerIcons-${listIndex}" onclick="showItems(${listIndex}, '${myListData.name}')" class="headerList"><h2 onclick="listOnclick(${listIndex})">${myListData.name}</h2></header>                     
                      <section id="dropdownContent-${listIndex}" class="dropdown hidden">
              <button onclick="listCallBackRemove(${listIndex})">Done</button>
              <button onclick="listCallBackRemove(${listIndex})">Remove</button>
              <button onclick="ListCallBackEdit(${listIndex},'${myListData.name}')">Edit</button>
                                </section>`;
    myListData.listItems.forEach((listItem, itemIndex) => {
      MyHtml += `<li class="listItem hidden">
  <header class="listItemHeader" id="headerIcons-${listIndex}-${itemIndex}">
    <h2>${listItem.name}</h2>
  </header>
  <section id="dropdownContent-${listIndex}-${itemIndex}" class="hidden">
    <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">Done</button>
    <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">Remove</button>
    <button onclick="itemCallBackEdit(${listIndex}, ${itemIndex},'${listItem.name}')">Edit</button>
  </section>
</li>`;
    });
  });

  myListElement.innerHTML = MyHtml;

  // Add menu icons and event listeners
  myData.forEach((myListData, listIndex) => {
    let headerIcons = document.getElementById(`headerIcons-${listIndex}`);
    let imgElement = document.createElement("img");

    imgElement.className = "myMenu";
    imgElement.setAttribute("src", "assets/images/Svg/Menu Button 1.svg");
    headerIcons.appendChild(imgElement);

    imgElement.addEventListener("click", () => {
      let myDropDown = document.getElementById(`dropdownContent-${listIndex}`);
      myDropDown.classList.toggle("hidden");
    });

    myListData.listItems.forEach((listItem, itemIndex) => {
      let headerIcons = document.getElementById(
        `headerIcons-${listIndex}-${itemIndex}`
      );
      let imgElement = document.createElement("img");

      imgElement.className = "myMenu";
      imgElement.setAttribute("src", "assets/images/Svg/Menu Button 1.svg");
      headerIcons.appendChild(imgElement);

      imgElement.addEventListener("click", () => {
        let myDropDown = document.getElementById(
          `dropdownContent-${listIndex}-${itemIndex}`
        );
        myDropDown.classList.toggle("hidden");
      });
    });
  });
}

//#endregion

//#region Callback Functions

// Callback to remove an item
function itemCallBackRemove(listIndex, indexClicked) {
  removeItem(listIndex, indexClicked);
  showList();
}

// Callback to edit an item
function itemCallBackEdit(listIndex, itemIndex, itemName) {
  editItem(listIndex, itemIndex, itemName);
  showList();
}

// Callback to remove a list
function listCallBackRemove(listIndex) {
  removeList(listIndex);
  showList();
}

// Callback to edit a list
function ListCallBackEdit(listIndex, listName) {
  editList(listIndex, listName);
  showList();
}

// Handle list click (e.g., add item)
function listOnclick(listIndex) {
  addItem(listIndex);
}

//#endregion

//#region Local Storage Functions

// Save the list data to local storage
function SaveObject(myData, itemName) {
  let mySerializedData = JSON.stringify(myData);
  localStorage.setItem(itemName, mySerializedData);
}

// Read the list data from local storage
function ReadObject(itemName) {
  let myBasketString = localStorage.getItem(itemName);
  return JSON.parse(myBasketString) || [];
}

//#endregion

//#region Dummy Data

function makeDummyData() {
  makeList("liste 1");

  makeItem(0, "opgave 1");
  makeItem(0, "opgave 2");
  makeItem(0, "opgave 3");
  makeItem(0, "opgave 4");
}

//#endregion

function buildHeader() {
  let headerHtml = document.createElement("div");

  headerHtml.innerHTML = `
    <header class="header-main">
    <hgroup>
      <div></div>
      <h1>All Tasks</h1>
      </hgroup>
    </header>
     <div></div>`;

  headerContainer.appendChild(headerHtml);
}

function buildFooter() {
  let footerHtml = document.createElement("div");

  footerHtml.innerHTML = `
  <section>
      <footer class="footer-main">
      <nav id="navFooter">
        <img class="addListSvg" src="assets/images/Svg/Icon Plus.svg" id="imgElement" alt="addList svg" />
      </nav>
          <section id="whiteHolder">
               <div id="addItem"></div>
    <div id="homeWhite" class="hidden"></div>
          </section>
    </footer>
    </section>
  `;

  footerContainer.appendChild(footerHtml);
}

function showItems(listIndex) {
  const listElement = document.getElementById("listElement");
  listElement.innerHTML = "";

  const listItems = myData[listIndex].listItems;

  let MyHtml = "";
  listItems.forEach((listItem, itemIndex) => {
    MyHtml += `<li class="listItem">
      <header class="listItemHeader" id="headerIcons-${listIndex}-${itemIndex}">
        <h2>${listItem.name}</h2>
      </header>
      <section id="dropdownContent-${listIndex}-${itemIndex}" class="dropdown hidden">
        <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">Done</button>
        <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">Remove</button>
        <button onclick="itemCallBackEdit(${listIndex}, ${itemIndex}, '${listItem.name}')">Edit</button>
      </section>
    </li>`;
  });

  listElement.innerHTML = MyHtml;

  // Now, attach the event listeners after the HTML is set
  myData[listIndex].listItems.forEach((listItem, itemIndex) => {
    let headerIcons = document.getElementById(
      `headerIcons-${listIndex}-${itemIndex}`
    );
    let imgElement = document.createElement("img");

    imgElement.className = "myMenu";
    imgElement.setAttribute("src", "assets/images/Svg/Menu Button 1.svg");
    headerIcons.appendChild(imgElement);

    imgElement.addEventListener("click", (e) => {
      let myDropDown = document.getElementById(
        `dropdownContent-${listIndex}-${itemIndex}`
      );
      myDropDown.classList.toggle("hidden");
    });
  });
}
