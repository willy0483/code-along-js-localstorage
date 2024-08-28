//#region Global Variables

// Array that contains all the list descriptions
let myData = [];

const myApp = document.getElementById("app");

//#endregion

//#region Initialization

buildHeader();

// Load saved data or create dummy data if none exists
myData = ReadObject("SavedData", []);
if (myData.length === 0) {
  makeDummyData();
}
showList();

let myListButton = document.getElementById("listbutton");
const divHolder = document.createElement("div");
divHolder.classList.add("hidden");
let imgElement = document.createElement("img");
imgElement.className = "addList";
imgElement.setAttribute("src", "assets/images/Svg/plus.svg");

myApp.appendChild(imgElement);
myApp.appendChild(divHolder);

divHolder.appendChild(myListButton);
divHolder.appendChild(myListname);

imgElement.addEventListener("click", (e) => {
  divHolder.classList.toggle("hidden");
});

// Set up event listener for the "Add List" button
myListButton.addEventListener("click", (e) => {
  let myName = document.getElementById("myListname").value;
  makeList(myName);
  showList(myData);
  divHolder.classList.toggle("hidden");
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

  yesEditButton.addEventListener("click", (e) => {
    let newName = input.value;
    myData[listIndex].name = newName;
    SaveObject(myData, "SavedData"); // Save after making changes
    showList();
    document.body.removeChild(editContainer);
  });

  cancelEditButton.addEventListener("click", (e) => {
    document.body.removeChild(editContainer);
  });
}

//#endregion

//#region Item Management

// Function to create a new item in the first to-do list
function makeItem(index, myName) {
  let myListItem = {
    name: myName,
    status: true, // Item status, true could mean 'not done'
  };

  myData[index].listItems.push(myListItem);
  SaveObject(myData, "SavedData"); // Save after making changes
}

// Remove an item from a list
function removeItem(listIndex, itemIndex) {
  let myList = myData[listIndex];
  myList.listItems.splice(itemIndex, 1);
  SaveObject(myData, "SavedData"); // Save after making changes
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

  yesEditButton.addEventListener("click", (e) => {
    let newName = input.value;
    myData[listIndex].listItems[itemIndex].name = newName;
    SaveObject(myData, "SavedData"); // Save after making changes
    showList();
    document.body.removeChild(editContainer);
  });

  cancelEditButton.addEventListener("click", (e) => {
    document.body.removeChild(editContainer);
  });
}

// Function to add a new item to a list
function addItem(listIndex) {
  let addItemContainer = document.getElementById("addItem");
  let imgElement = document.createElement("img");

  imgElement.className = "addItemIcon";
  imgElement.setAttribute("src", "assets/images/Svg/plus.svg");
  addItemContainer.appendChild(imgElement);

  imgElement.addEventListener("click", () => {
    const addItemDiv = document.createElement("div");
    addItemContainer.appendChild(addItemDiv);

    let addItemName = document.createElement("input");
    addItemDiv.appendChild(addItemName);

    const yesButton = document.createElement("button");
    yesButton.innerHTML = "Yes";
    addItemDiv.appendChild(yesButton);

    const noButton = document.createElement("button");
    noButton.innerHTML = "No";
    addItemDiv.appendChild(noButton);

    yesButton.addEventListener("click", (e) => {
      let myName = addItemName.value;
      makeItem(listIndex, myName);
      addItemContainer.removeChild(addItemDiv);
      addItemContainer.removeChild(imgElement);
      showList();
    });

    noButton.addEventListener("click", (e) => {
      addItemContainer.removeChild(addItemDiv);
      addItemContainer.removeChild(imgElement);
    });
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
    MyHtml += `<header><h2 onclick="listOnclick(${listIndex})">${myListData.name} </h2> <div id="headerIcons-${listIndex}"></div></header>                     
                      <section id="dropdownContent-${listIndex}" class="hidden">
                      
              <button onclick="listCallBackRemove(${listIndex})">Done</button>
              <button onclick="listCallBackRemove(${listIndex})">Remove</button>
              <button onclick="ListCallBackEdit(${listIndex},'${myListData.name}')">Edit</button>
                                </section>

              <ul>`;

    myListData.listItems.forEach((listItem, itemIndex) => {
      MyHtml += `<li>${listItem.name}
                  <header id="headerIcons-${listIndex}-${itemIndex}">
                  </header>
                  <section id="dropdownContent-${listIndex}-${itemIndex}" class="hidden">
                    <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">Done</button>
                    <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">Remove</button>
                    <button onclick="itemCallBackEdit(${listIndex},${itemIndex},'${listItem.name}')">Edit</button>
                  </section>
                </li>`;
    });

    MyHtml += "</ul>";
  });

  myListElement.innerHTML = MyHtml;

  // Add menu icons and event listeners
  myData.forEach((myListData, listIndex) => {
    let headerIcons = document.getElementById(`headerIcons-${listIndex}`);
    let imgElement = document.createElement("img");

    imgElement.className = "myMenu";
    imgElement.setAttribute("src", "assets/images/Svg/menu.svg");
    headerIcons.appendChild(imgElement);

    imgElement.addEventListener("click", (e) => {
      let myDropDown = document.getElementById(`dropdownContent-${listIndex}`);
      myDropDown.classList.toggle("hidden");
    });

    myListData.listItems.forEach((listItem, itemIndex) => {
      let headerIcons = document.getElementById(
        `headerIcons-${listIndex}-${itemIndex}`
      );
      let imgElement = document.createElement("img");

      imgElement.className = "myMenu";
      imgElement.setAttribute("src", "assets/images/Svg/menu.svg");
      headerIcons.appendChild(imgElement);

      imgElement.addEventListener("click", (e) => {
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
  showList();
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
  let mybasketstring = localStorage.getItem(itemName);
  let myBasket = JSON.parse(mybasketstring);
  return myBasket;
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
      <div></div>
      </hgroup>
    </header>`;

  headerContainer.appendChild(headerHtml);
}
