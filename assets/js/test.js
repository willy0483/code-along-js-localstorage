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

function removeList(listIndex) {
  myData.splice(listIndex, 1);
}

function removeItem(listIndex, itemIndex) {
  let myList = myData[listIndex];

  myList.listItems.splice(itemIndex, 1);
}

function editList(listIndex, oldName) {
  const editContainer = document.createElement("div");
  document.body.appendChild(editContainer);

  let input = document.createElement("input");
  input.value = oldName;
  editContainer.appendChild(input);
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
    showList(0);

    document.body.removeChild(editContainer);
  });

  cancelEditButton.addEventListener("click", (e) => {
    document.body.removeChild(editContainer);
  });
}

function editItem(listIndex, itemIndex, oldName) {
  const editContainer = document.createElement("div");
  document.body.appendChild(editContainer);

  let input = document.createElement("input");
  input.value = oldName;
  editContainer.appendChild(input);
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
    showList(0);

    document.body.removeChild(editContainer);
  });

  cancelEditButton.addEventListener("click", (e) => {
    document.body.removeChild(editContainer);
  });
}

//------------------------------------------

function showList() {
  let myListElement = document.getElementById("listElement");

  myListElement.innerHTML = "";

  let MyHtml = "";

  myData.forEach((myListData, listIndex) => {
    MyHtml += `<h2>${myListData.name}</h2>
              <button onclick="listCallBackRemove(${listIndex})">Done</button>
              <button onclick="listCallBackRemove(${listIndex})">Remove</button>
              <button onclick="ListCallBackEdit(${listIndex},'${myListData.name}')">Edit</button>
              <ul>`;

    myListData.listItems.forEach((listItem, itemIndex) => {
      MyHtml += `<li>${listItem.name}
                  <header id="headerIcons-${listIndex}-${itemIndex}">
                    <!-- The icon will be added here via JS -->
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

  // Add the menu icons and event listeners
  myData.forEach((myListData, listIndex) => {
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

function itemCallBackRemove(listIndex, indexClicked) {
  removeItem(listIndex, indexClicked);

  showList(0);
}

function itemCallBackEdit(listIndex, itemIndex, itemName) {
  editItem(listIndex, itemIndex, itemName);

  showList(0);
}

function listCallBackRemove(listIndex) {
  removeList(listIndex);

  showList(0);
}

function ListCallBackEdit(listIndex, listName) {
  editList(listIndex, listName);
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
