const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearAll = document.getElementById('clear')
const filter = document.querySelector('.filter')
const onaddItemSubmit = e => {
    e.preventDefault()

    if(itemInput.value === ''){
        alert('Please enter an item');
        return 
    }
    console.log('Sucess');
    addItemToDom(itemInput.value)
    addItemToStorage(itemInput.value)
    
    
}
const addItemToDom = (input) =>{
    const child = createDiv(input)
    itemList.appendChild(child)
    checkUI();
    // console.log(itemInput.value)
    input='';

}
const addItemToStorage = (item) =>{
    let itemsFromStorage;

    if (localStorage.getItem('items') === null){
        itemsFromStorage = []

    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
     
    itemsFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));

        
}
const createDiv = shoppingItem =>{

    const listItem = document.createElement('li')
    const crossButton = document.createElement('button')
    const iStyle = document.createElement('i')
    const text_node =  document.createTextNode(shoppingItem)
    crossButton.className = "remove-item btn-link text-red"
    iStyle.className = "fa-solid fa-xmark"
    // console.log(crossButton.outerHTML)
    crossButton.setAttribute('class',"remove-item btn-link text-red")
    iStyle.setAttribute('class',"fa-solid fa-xmark") 
    // console.log(crossButton.outerHTML)
    listItem.appendChild(text_node)
    listItem.appendChild(crossButton)
    crossButton.appendChild(iStyle)

    return listItem

}

const removeItem = e => {
    // console.log(e.target.tagName)
    // console.log(e.target.parentElement)
    if (e.target.tagName === "I"){
        if(confirm('Are you sure')){
        const item = e.target.parentElement.parentElement.innerText; 
        e.target.parentElement.parentElement.remove();
        const temp = JSON.parse(localStorage.getItem('items'));
        
        temp.splice(temp.indexOf(item),1)
        localStorage.setItem('items',JSON.stringify(temp))
        const x = checkUI();
        if(x===true){
            localStorage.clear()
        }
    }
    
}
}
const emptyList = () =>  {
    itemList.innerHTML = " " ;
    const x = checkUI();
    if(x===true){
        localStorage.clear()
    }

}
const checkUI = () => {
    const items = document.querySelectorAll('li')
    console.log(items.length)
    if(items.length===0){
        filter.style.display = 'none'
        clearAll.style.display = 'none'
        return true
    }else{
        filter.style.display = 'block'
        clearAll.style.display = 'block'
    }
}
const filterItems = (e)=>{
    const items = document.querySelectorAll('li')
    const input = e.target.value.toLowerCase();
    
    items.forEach((item)=>{
        const itemName = item.innerText
    
        if (itemName.indexOf(input) != -1)
        {
            item.style.display = 'flex';
        }else
        {
    item.style.display = 'none'
    }
        
    })
}
const loadWindow = ()=>{
    if(localStorage.getItem('items')!==null){
    const names = JSON.parse(localStorage.getItem('items'));
    names.forEach((item)=>{
        console.log(item)
        addItemToDom(item)
    })
}
}
itemForm.addEventListener('submit',onaddItemSubmit);
itemList.addEventListener('click',removeItem);
clearAll.addEventListener('click',emptyList);
filter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',loadWindow)

localStorage.setItem('name','Dev');
console.log(localStorage.getItem('name'));
// localStorage.removeItem('name');
// localStorage.clear();
checkUI();
