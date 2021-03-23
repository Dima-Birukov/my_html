
const person = {}; //has property __proto__ which is an object

console.log(person.hasOwnProperty('toString')) //property toString belongs to person's proto - Object


const v = 5;
let x = 5;
x = 6;

const p = {
    name: 'dima',
    age: 30,
    isAlive: true,
    //getName: getName()
}

//p.city = 'maalot' //can add fields to objects


const arr = [];// array object


function getName(name){
    return "my name is" + name;
}


const itemArr = [
    {id:1,title:"first item"},
    {id:2, title: "second item"}
]

const itemToPush = {
    id: 3,
    title: "third item",
    completed : false
}


function pushToMyArr(itemArr, itemToPush){
    for(let i = 0; i < itemArr.length; i++){
        if(itemArr[i] === itemToPush) return;
    }
    itemArr.push(itemToPush)
}
function popFromMyArr(itemArr, itemToPop){
    itemArr.splice(itemArr.indexOf(itemToPop), 1)
}

function getCompleted(itemArr){
    const ret = [];
    itemArr.forEach( e => { if(e.completed) ret.push(e) } )
    return ret
}


pushToMyArr(itemArr, itemToPush)
console.log(itemArr)

popFromMyArr(itemArr, itemToPush)
console.log(itemArr)

for(let i = 0; i < itemArr.length; i++){
    console.log(itemArr[i]);
}
/////////////////////////////////////////////////////////
class TodoItem{
    private readonly _id: number;
    public title: string;
    public completed: boolean;

    constructor(title: string) {
        this.title = title;
        this._id = Date.now();
    }
    get id(){
        return this._id;
    }
    toggleCompleted(): void{
        this.completed = !this.completed;
    }
}

class TodoList<T>{
    private _list: Array<T>;
    title: string;

    constructor( title: string, list?: Array<T>) {
        this._list = list;
        this.title = title;
    }

    get list(): Array<T> {
        return this._list;
    }
    add(item: T): void{

        this._list.push(item)
    }
    remove(item: T): void{
        this._list = this._list
            .filter(e =>  e != item)
    }
    getCount(): number{
        return this._list.length;
    }


}

const myTodoList = new TodoList<TodoItem>("my_list", []);
/////////////////////////////////////////////////////////

const h1: HTMLHeadingElement = document.getElementById("title") as HTMLHeadingElement;
const addButton: HTMLButtonElement = document.getElementById("addButton") as HTMLButtonElement;
const li: HTMLLIElement = document.getElementById("listElement") as HTMLLIElement;
const itemInput: HTMLInputElement = document.getElementById("itemInput") as HTMLInputElement;
let myHtmlList: HTMLUListElement = null;
h1.innerText = "Todo List";
addButton.addEventListener('click', onAddClick);
updateCount(0);

function onAddClick(): void{
    const inputVal = itemInput.value;
    const newItem = new TodoItem(inputVal);
    myTodoList.add(newItem);

    if(myTodoList.getCount() == 1) myHtmlList = createUnorderedList();

    myHtmlList.appendChild(
        createMyListItem(itemInput.value, newItem.id.toString(), newItem)
    );

    updateCount(myTodoList.getCount());

}

function updateCount(count: number): void{
    document.getElementById("counter").innerText =
        count + " items left";
}

function createUnorderedList(): HTMLUListElement{
    const newList: HTMLUListElement = document.createElement('ul') as HTMLUListElement;
    document.body.appendChild(newList);
    return newList;
}
function onXClick(id: string, item: TodoItem): void{
    myHtmlList.removeChild(
        document.getElementById(id)
    )

    myTodoList.remove(item);

    if(!myTodoList.getCount()) {
        document.body.removeChild(myHtmlList);
    }
    updateCount(myTodoList.getCount());
}
function createMyListItem(title: string, id: string, item: TodoItem): HTMLLIElement{
    const newListItem: HTMLLIElement = document.createElement('li') as HTMLLIElement;
    newListItem.setAttribute("id", id);

    const checkBox: HTMLInputElement = document.createElement('input') as HTMLInputElement;
    checkBox.setAttribute('type', 'checkbox');

    const span: HTMLSpanElement = document.createElement('span') as HTMLSpanElement;
    span.textContent = title;

    const button: HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
    button.textContent = "X";

    button.addEventListener('click', ev => {onXClick(id, item)});

    newListItem.appendChild(checkBox);
    newListItem.appendChild(span);
    newListItem.appendChild(button);

    return newListItem
}






