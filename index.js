import {menuArray} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
//console.log(menuArray)
let orderArray = []
const modal = document.getElementById('modal')


document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        getSelectedItemToAdd(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        getSelectedItemToRemove(e.target.dataset.remove)
    }else if(e.target.dataset.completeBtn){
        openPayModal(e.target.dataset.completeBtn)
    }else if(e.target.dataset.payBtn){
        restart(e.target.dataset.payBtn)
    }})
function getFeedHtml(){
    let feedHtml = ''
    menuArray.forEach(function(item){
        //console.log(item)
        feedHtml += `
        <div class="menu">
            <div class="menu-item">
                <div class="emoji-pic">
                    ${item.emoji}
                </div>
                <div class="item-info">
                    <p class="name">
                        ${item.name}
                    </p>
                    <p class="ingredients">
                        ${item.ingredients}
                    </p>
                    <p class="price">
                        $${item.price}
                    </p>
                </div>
                <i class="fa-thin fa-plus"
                data-add="${item.uuid}"></i>    
            </div>
            <div class="divider">
            </div>
        </div>
        `
    })
    document.getElementById('menu').innerHTML = feedHtml   
}
function getSelectedItemToAdd(itemUuid){
    const selectedItem = menuArray.filter(function(item){
        return item.uuid === itemUuid
    })[0]  
    add(selectedItem)   
}
function getSelectedItemToRemove(itemUuid){
    const selectedItem = orderArray.filter(function(item){
        return item.uuid === itemUuid
    })[0]  
    removeSelectedItem(selectedItem)   
}
function add(itemObj){
    orderArray.push({
    name: itemObj.name,
    ingredients: itemObj.ingredients,
    id: itemObj.id,
    price: itemObj.price,
    emoji: itemObj.emoji,
    isRemoved: false,
    uuid: uuidv4(),
    })       
    drawOrder()
}
function drawOrder(){
    let order = ''
    document.getElementById('order-bill').classList.add("hidden")
    let totalPrice = 0
    orderArray.forEach(function(orderedItem){
        if(!orderedItem.isRemoved){
            //console.log(orderedItem)
            
            order += `  
                <div class="order-item">
                    <div class="name">
                    ${orderedItem.name}<label class="remove"
                    for="${orderedItem}"
                    data-remove="${orderedItem.uuid}">remove</label>
                    </div>
                    <p class="price">
                    $${orderedItem.price}
                    </p>    
                </div>   
            `
            
            totalPrice += orderedItem.price
            console.log(orderedItem.price)
            let orderTitle = '<h1 id="order-title">Your order<h1>'
            document.getElementById('order-title').innerHTML = orderTitle
            document.getElementById('order').innerHTML = order
            document.getElementById('total-price').innerHTML = '$' + totalPrice
            document.getElementById('order-bill').classList.remove("hidden")
        }
        
        
    })
    console.log('I work')
    console.log(orderArray)
    
}
function removeSelectedItem(itemObj){
    itemObj.isRemoved = true
    drawOrder()
    console.log(itemObj)
}      

function openPayModal() {
     modal.innerHTML = `
    <div class="modal-inner" id="modal-inner">
			<h2 id="details-title">Enter cards details</h2>
			<form id="consent-form">
				<input type="text" name="fullName" placeholder="Enter your name" required/>
				<input type="text" name="card" placeholder="Enter card number" required/>
                <input type="text" name="cvv" placeholder="Enter CVV" required/>

				<div class="modal-choice-btns" id="modal-choice-btns">
					<button type="submit" class="pay-btn" id="pay-btn"
                    data-pay-btn="pay-btn">Pay</button>
				</div>
    `
    document.getElementById('modal').classList.remove("hidden")
    const consentForm = document.getElementById('consent-form')
    consentForm.addEventListener('submit', function(event){
        event.preventDefault()
        const consentFormData = new FormData(consentForm)
        const fullName = consentFormData.get('fullName')
        //console.log(fullName)  
        setTimeout(function(){
            document.getElementById('modal').classList.add("hidden")
            document.getElementById('order-bill').classList.add("thanks")
            document.getElementById('order-bill').innerHTML = `
            <div class="thanks-box" id="thanks-box">
            <h2 class="thanks-text">Thanks, <span class="modal-display-name">${fullName}</span>! Your order is on its way!</h2>
            </div>
        `
        }, 100)   
    })   
}
getFeedHtml()




