const myApp = document.getElementById("app");
const inputDivList = document.createElement("div");

myApp.appendChild(inputDivList);

let inputBoxList = document.createElement("input");
let inputButtonList = document.createElement("button");

inputDivList.appendChild(inputBoxList);
inputDivList.appendChild(inputButtonList);

inputButtonList.innerHTML = "Add";

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

inputButtonItem.innerHTML = "Add";

inputButtonItem.addEventListener("click", (e) => {
  let index = inputBoxItemIndex.value;
  let item = inputBoxItem.value;

  makeListItem(item, index);
});

let myData = []; // array der indeholder all list descriptions

// modtager et navn string ------------------
function makeList(myName) {
  let myList = {
    name: myName, // key value pair
    listItem: [],
  };

  myData.push(myList);

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
