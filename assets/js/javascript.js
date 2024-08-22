const myApp = document.getElementById("app");
const inputDivList = document.createElement("div");

myApp.appendChild(inputDivList);

let inputBoxList = document.createElement("input");
let inputButtonList = document.createElement("button");

inputDivList.appendChild(inputBoxList);
inputDivList.appendChild(inputButtonList);

inputButtonList.innerHTML = "Add List";

inputButtonList.addEventListener("click", (e) => {
  makeList(inputBoxList.value);
});

const inputDivItem = document.createElement("div");

myApp.appendChild(inputDivItem);

let inputBoxItem = document.createElement("input");
let inputBoxItemIndex = document.createElement("input");
let inputButtonItem = document.createElement("button");

inputDivItem.appendChild(inputBoxItem);
inputDivItem.appendChild(inputBoxItemIndex);
inputDivItem.appendChild(inputButtonItem);

inputButtonItem.innerHTML = "Add Item";

inputButtonItem.addEventListener("click", (e) => {
  let index = inputBoxItemIndex.value;
  let item = inputBoxItem.value;

  makeListItem(item, index);
});

listContainer = document.createElement("ul");
myApp.appendChild(listContainer);

let myData = []; // array der indeholder all list descriptions

// modtager et navn string ------------------
function makeList(myName) {
  const listItem = document.createElement("li");
  listItem.innerHTML = myName;

  listContainer.appendChild(listItem);

  let myList = {
    name: myName, // Key-value pair
    listItem: [],
  };

  myData.push(myList);

  let index = myData.length - 1;

  listItem.addEventListener("click", (e) => {
    console.log(index, myName); // Log the index when clicked
  });

  console.table(myData);
}

// ------------------------
function makeListItem(index, myItemName) {
  let myListItem = {
    name: myItemName,
    status: true,
  };

  myData[index].listItem.push(myListItem);

  console.table(myData);
}

// modtager et index for listen, og et index for item, og fjerner dette item fra listen

function removeItem(listIndex, itemIndex) {
  let myList = myData[listIndex];

  myList.listItem.splice(itemIndex, 1);

  console.log(myList.name);
}
// removeItem(0, 0);
