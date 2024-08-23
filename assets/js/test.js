// write cool JS hwere!!
let myData = []; // array der indeholder alle list descriptions

makeDummyData();
showList();

// setup statics

let myListButton = document.getElementById("listbutton");

myListButton.addEventListener("click", (e) => {
  let myName = document.getElementById("myListname").value;

  makeList(myName);
  console.table(myData);
  showList(myData);
});

// modtager et navn,string og skaber et ny liste dataobjekt og gemmer det i myData-------------------------
function makeList(myName) {
  let myList = {
    name: myName, //key value pair
    listItems: [],
  };

  myData.push(myList);
}

// --------------------------------------------------------

// modtager et navn og opretter list item i første to do list

function makeItem(index, myName) {
  let myListItem = {
    name: myName,
    status: true,
  };

  myData[index].listItems.push(myListItem);
}

// modtager et index for listen, og et index for item, og fjerner dette item fra listen.

function removeItem(listIndex, itemIndex) {
  let myList = myData[listIndex];

  myList.listItems.splice(itemIndex, 1);
}

//------------------------------------------

function showList() {
  //   dom element
  let myListElement = document.getElementById("listElement");

  // tømmer dom element
  myListElement.innerHTML = "";

  // tekst variabel indeholdende html
  let MyHtml = "";

  myData.forEach((myListData, listIndex) => {
    MyHtml += `<h2>${myListData.name}</h2><ul>`;

    myListData.listItems.forEach((listItem, itemIndex) => {
      MyHtml += `<li>${listItem.name}      
      <button onclick="itemCallBackRemove(${listIndex}, ${itemIndex})">remove</button>
      <button onclick="itemCallBackEdit(${listIndex}, ${itemIndex}, '${listItem.name}')">edit</button>
      </li>`;
    });

    MyHtml += "</ul>";
  });

  myListElement.innerHTML = MyHtml;
}

function itemCallBackRemove(listIndex, indexClicked) {
  //   alert("Item Call: " + indexClicked);

  removeItem(listIndex, indexClicked);

  //   console.log(myData[0]);
  // opdater
  showList(0);
}

function itemCallBackEdit(listIndex, indexClicked) {
  //   alert("Item Call: " + indexClicked);

  editItem(listIndex, indexClicked);

  //   console.log(myData[0]);
  // opdater
  showList(0);
}

//----------------------------------------------------------------------

function makeDummyData() {
  makeList("liste 1");
  makeList("liste 2");
  makeList("liste 3");
  makeList("liste 4");

  makeItem(0, "opgave 1");
  makeItem(0, "opgave 2");
  makeItem(0, "opgave 3");
  makeItem(0, "opgave 4");

  makeItem(1, "opgave 1");
  makeItem(1, "opgave 2");
  makeItem(1, "opgave 3");
  makeItem(1, "opgave 4");

  makeItem(2, "opgave 1");
  makeItem(2, "opgave 2");
  makeItem(2, "opgave 3");
  makeItem(2, "opgave 4");

  makeItem(3, "opgave 1");
  makeItem(3, "opgave 2");
  makeItem(3, "opgave 3");
  makeItem(3, "opgave 4");
}
