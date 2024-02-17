const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearAll = document.getElementById('clear')
const filter = document.querySelector('.filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false; 
const onaddItemSubmit = e => {
    e.preventDefault()

    if(itemInput.value === ''){
        alert('Please enter an item');
        return 
    }
    
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit);
        isEditMode=false;
        itemToEdit.classList.remove('edit-mode')

    }else{

        if(alreadyExists(itemInput.value)===true){
            alert("Already Exists please enter a different item")
            return
        }
    }
    console.log('Sucess');
    addItemToDom(itemInput.value)
    addItemToStorage(itemInput.value)
    itemInput.value=""
    
    
}
const alreadyExists = (item)=>{
    if (localStorage.getItem('items')===null){
        return false
    }
    const itemsList = JSON.parse(localStorage.getItem('items'));
    if (itemsList.indexOf(item)===-1){
        return false
    }else{
        return true
    }
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
    if(isEditMode === false){
    if (e.target.tagName === "I" ){
        if(confirm('Are you sure')){
        removeItemFromStorage( e.target.parentElement.parentElement)
    
        const x = checkUI();
        
        if(x===true){
            localStorage.clear()
        }
    }
}else{
        setItemToEdit(e.target);
    
}}}
const removeItemFromStorage = (item) => {
        const temp_text = item.innerText
        item.remove();
        const temp = JSON.parse(localStorage.getItem('items'));
        
        temp.splice(temp.indexOf(temp_text),1)
        localStorage.setItem('items',JSON.stringify(temp))
}

const setItemToEdit = (item)=>{
    isEditMode = true;
    const items = itemList.querySelectorAll('li');
    items.forEach((i)=> i.classList.remove('edit-mode'))
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    itemInput.value = item.textContent;
    formBtn.style.backgroundColor = '#228B22';
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
    
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;

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
