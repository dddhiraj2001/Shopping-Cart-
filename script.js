const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearAll = document.getElementById('clear')

const filter = document.querySelector('.filter')
const addItem = e => {
    e.preventDefault()

    if(itemInput.value === ''){
        alert('Please enter an item');
        return 
    }
    console.log('Sucess');
    const child = createDiv(itemInput.value)
    itemList.appendChild(child)
    checkUI();
    // console.log(itemInput.value)
    itemInput.value=''
    
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
        e.target.parentElement.parentElement.remove();
        checkUI();
    }
}
}
const emptyList = () =>  {
    itemList.innerHTML = " " ;
    checkUI();
}
const checkUI = () => {
    const items = document.querySelectorAll('li')
    console.log(items.length)
    if(items.length===0){
        filter.style.display = 'none'
        clearAll.style.display = 'none'
    }else{
        filter.style.display = 'block'
        clearAll.style.display = 'block'
    }
}
itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',removeItem)
clearAll.addEventListener('click',emptyList)

checkUI();
