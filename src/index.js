const person = {}; //has property __proto__ which is an object
console.log(person.hasOwnProperty('toString')); //property toString belongs to person's proto - Object
const v = 5;
let x = 5;
x = 6;
const p = {
    name: 'dima',
    age: 30,
    isAlive: true,
    //getName: getName()
};
//p.city = 'maalot' //can add fields to objects
const arr = []; // array object
function getName(name) {
    return "my name is" + name;
}
const itemArr = [
    { id: 1, title: "first item" },
    { id: 2, title: "second item" }
];
const itemToPush = {
    id: 3,
    title: "third item",
    completed: false
};
function pushToMyArr(itemArr, itemToPush) {
    for (let i = 0; i < itemArr.length; i++) {
        if (itemArr[i] === itemToPush)
            return;
    }
    itemArr.push(itemToPush);
}
function popFromMyArr(itemArr, itemToPop) {
    itemArr.splice(itemArr.indexOf(itemToPop), 1);
}
function getCompleted(itemArr) {
    const ret = [];
    itemArr.forEach(e => { if (e.completed)
        ret.push(e); });
    return ret;
}
pushToMyArr(itemArr, itemToPush);
console.log(itemArr);
popFromMyArr(itemArr, itemToPush);
console.log(itemArr);
for (let i = 0; i < itemArr.length; i++) {
    console.log(itemArr[i]);
}
/////////////////////////////////////////////////////////
class TodoItem {
    constructor(title) {
        this.title = title;
        this._id = Date.now();
    }
    get id() {
        return this._id;
    }
    toggleCompleted() {
        this.completed = !this.completed;
    }
}
class TodoList {
    constructor(title, list) {
        this._list = list;
        this.title = title;
    }
    get list() {
        return this._list;
    }
    add(item) {
        this._list.push(item);
    }
    remove(item) {
        this._list = this._list
            .filter(e => e != item);
    }
    getCount() {
        return this._list.length;
    }
}
const myTodoList = new TodoList("my_list", []);
/////////////////////////////////////////////////////////
const h1 = document.getElementById("title");
const addButton = document.getElementById("addButton");
const li = document.getElementById("listElement");
const itemInput = document.getElementById("itemInput");
let myHtmlList = null;
h1.innerText = "Todo List";
addButton.addEventListener('click', onAddClick);
updateCount(0);
function onAddClick() {
    const inputVal = itemInput.value;
    const newItem = new TodoItem(inputVal);
    myTodoList.add(newItem);
    if (myTodoList.getCount() == 1)
        myHtmlList = createUnorderedList();
    myHtmlList.appendChild(createMyListItem(itemInput.value, newItem.id.toString(), newItem));
    updateCount(myTodoList.getCount());
}
function updateCount(count) {
    document.getElementById("counter").innerText =
        count + " items left";
}
function createUnorderedList() {
    const newList = document.createElement('ul');
    document.body.appendChild(newList);
    return newList;
}
function onXClick(id, item) {
    myHtmlList.removeChild(document.getElementById(id));
    myTodoList.remove(item);
    if (!myTodoList.getCount()) {
        document.body.removeChild(myHtmlList);
    }
    updateCount(myTodoList.getCount());
}
function createMyListItem(title, id, item) {
    const newListItem = document.createElement('li');
    newListItem.setAttribute("id", id);
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    const span = document.createElement('span');
    span.textContent = title;
    const button = document.createElement('button');
    button.textContent = "X";
    button.addEventListener('click', ev => { onXClick(id, item); });
    newListItem.appendChild(checkBox);
    newListItem.appendChild(span);
    newListItem.appendChild(button);
    return newListItem;
}
