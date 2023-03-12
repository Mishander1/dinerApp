import {menuArray} from './data.js'
//console.log(menuArray)
let totalPrice = 0
let orderArray = []
const modal = document.getElementById('modal')


document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        getSelectedItem(parseInt(e.target.dataset.add))
    }else if(e.target.dataset.remove){
        removeSelectedItem(parseInt(e.target.dataset.remove))
    }else if(e.target.dataset.completeBtn){
        openPayModal()
    }else if(e.target.dataset.payBtn){
        restart()
    }})
function getFeedHtml(){
    let feedHtml = ''
    menuArray.forEach(function(item){
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
                data-add="${item.id}">+</i>    
            </div>
            <div class="divider">
            </div>
        </div>
        `
    })
    

    //console.log(feedHtml)
    document.getElementById('menu').innerHTML = feedHtml
    
}



function getSelectedItem(itemId){
    //console.log(typeof itemId)
    const selectedItem = menuArray.filter(function(item){
        return item.id === itemId
    })
    bill(selectedItem)
    //console.log(selectedItem)    
}
function removeSelectedItem(itemId){
    const selectedItem = orderArray.filter(function(item){
        return item.id = itemId
    })
    orderArray.splice(selectedItem,1)
    let order = ''
    totalPrice = 0
    orderArray.forEach(function(ordered){
        order += `
            
            <div class="order-item">
                <div class="name">
                ${ordered.name}<label class="remove"
                data-remove="${ordered.id}">remove</label>
                </div>
                <p class="price">
                $${ordered.price}
                </p>
                
            </div>
            
        `

        totalPrice += ordered.price
    })
    
    document.getElementById('order').innerHTML = order
    document.getElementById('total-price').innerHTML = '$' + totalPrice
}

function bill(itemObj){
    //console.log(itemObj)
    let orderTitle = '<h1 id="order-title">Your order<h1>'
    let order = ''
    
    itemObj.forEach(function(selected){
        orderArray.push(selected)
        order += `
            
            <div class="order-item">
                <div class="name">
                ${selected.name}<label class="remove"
                data-remove="${selected.id}">remove</label>
                </div>
                <p class="price">
                $${selected.price}
                </p>
                
            </div>
            
        `
        totalPrice += selected.price
       
        
    })
    document.getElementById('order-title').innerHTML = orderTitle
    document.getElementById('order').innerHTML += order
    //document.getElementById('total').innerHTML = totalHtml
    document.getElementById('total-price').innerHTML = '$' + totalPrice
    document.getElementById('order-bill').classList.remove("hidden")
    
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
        console.log(fullName)  
        
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
