//#region Global Variables

// Array that contains all the list descriptions
let myData = [];

//#endregion

//#region Initialization

buildHeader();
buildFooter();

// Load saved data or create dummy data if none exists
(myData = ReadObject("SavedData")) || [];
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
    SaveObject(myData, "SavedData"); // Save after making changes
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

  yesEditButton.addEventListener("click", () => {
    let newName = input.value;
    myData[listIndex].listItems[itemIndex].name = newName;
    SaveObject(myData, "SavedData"); // Save after making changes
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

  // Check if the add item button already exists
  if (document.querySelector(".addItemIcon")) return;

  const addItemDiv = document.createElement("div");
  addItemDiv.classList.add("hidden");

  imgElement.classList.add("hidden");

  let addItemContainer = document.getElementById("addItem");
  let imgElementItem = document.createElement("img");

  imgElementItem.className = "addItemIcon";
  imgElementItem.setAttribute("src", "assets/images/Svg/Icon Plus.svg");
  navFooter.appendChild(imgElementItem);

  imgElementItem.addEventListener("click", () => {
    addItemDiv.classList.add("addItemDiv");
    addItemContainer.appendChild(addItemDiv);

    let addItemName = document.createElement("input");
    addItemName.classList.add("addItemInput");
    addItemDiv.appendChild(addItemName);

    const yesButton = document.createElement("img");
    yesButton.setAttribute("src", "assets/images/Svg/Check_ring.svg");
    addItemDiv.appendChild(yesButton);

    const noButton = document.createElement("img");
    noButton.setAttribute("src", "assets/images/Svg/Dell_light.svg");
    addItemDiv.appendChild(noButton);

    yesButton.addEventListener("click", () => {
      let myName = addItemName.value;
      makeItem(listIndex, myName);
      addItemContainer.removeChild(addItemDiv);
      showList();
      myApp.classList.toggle("hidden");
    });

    noButton.addEventListener("click", () => {
      addItemContainer.removeChild(addItemDiv);
      myApp.classList.toggle("hidden");
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
    MyHtml += `<header id="headerIcons-${listIndex}" class="headerList"><h2 onclick="listOnclick(${listIndex})">${myListData.name}</h2></header>                     
                      <section id="dropdownContent-${listIndex}" class="hidden">
              <button onclick="listCallBackRemove(${listIndex})">Done</button>
              <button onclick="listCallBackRemove(${listIndex})">Remove</button>
              <button onclick="ListCallBackEdit(${listIndex},'${myListData.name}')">Edit</button>
                                </section>

              <ul>`;
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
</li>
`;
    });

    MyHtml += "</ul>";
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
      <div id="addItem"></div>
    </footer>
    </section>
  `;

  footerContainer.appendChild(footerHtml);
}
