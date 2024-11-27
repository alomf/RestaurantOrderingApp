import {menuArray} from '/data.js'

const filter = document.getElementById('filter')
let menuHtml = document.getElementById('menu')
let order = document.getElementById('order')
let orderItems = document.getElementById('order-items')
let totalPriceEl = document.getElementById('total-price')
const orderBtn = document.getElementById('order-btn')
const form = document.getElementById('form')
const payBtn = document.getElementById('pay-btn')
const thanksEl = document.getElementById('thanks-el')

let orderList = menuArray.map(item => 
    ({ 
        name:item.name,
        id: item.id,
        price: item.price,
        numberOfOrder: 0
    }))

document.addEventListener("click", function(e){
    //if click is a '+' button
    if(e.target.dataset.addId){
        const addItemId = e.target.dataset.addId

        for (let item of orderList){
            if (item.id === Number(addItemId)){
                item.numberOfOrder++
                break
            }
        }
        renderOrder()        
    }
    //if click is a 'remove' click
    else if(e.target.dataset.removeId){
        const removeItemId = e.target.dataset.removeId

        for (let item of orderList){
            if (item.id === Number(removeItemId)){
                item.numberOfOrder--
                break
            }
        }
        renderOrder()        
    }
    //if click is the order button
    else if(e.target.id === 'order-btn'){
        filter.style.display = "block"
        form.style.display = 'flex'

    }
    //if click is the "close modal" button
    else if(e.target.id === 'close-icon' || e.target.id === 'close-btn'){
        e.preventDefault()
        filter.style.display = "none"
        order.style.display = 'flex'
        form.style.display = 'none'
    }
})

form.addEventListener("submit", function(e){
    
        e.preventDefault()
        const formData = new FormData(form)
        const fullName = formData.get('fullName')
        
        filter.style.display = "none"
        order.style.display = 'none'
        form.style.display = 'none'

        thanksEl.style.display = 'block'
        thanksEl.innerHTML = `Thanks, ${fullName}! Your order is on its way!`
})

function renderOrder(){
    orderItems.innerHTML = ''
    totalPriceEl.innerHTML = ''
    let totalOrderPrice = 0

    orderList.forEach( function(item){
        if (item.numberOfOrder > 0){
            totalOrderPrice += item.price * item.numberOfOrder

            orderItems.innerHTML += `
                <div class="order-item">
                    <h4>${item.name}</h4>
                    <span class="item-multiplier">${item.numberOfOrder > 1 ? ("X" + item.numberOfOrder) : '' }</span>
                    <span class="remove-span" data-remove-id="${item.id}">remove</span>
                    <span class="order-item-price">$${item.price * item.numberOfOrder}</span>
                </div>`
        }
    });

    totalPriceEl.innerHTML = '$' + totalOrderPrice    
    order.style.display = orderItems.innerHTML ? "flex" : "none"
}

function renderMenu(){
    return menuArray.map(element =>
        `<article class="menu-item">
            <div class="menu-item-emoji">${element.emoji}</div>
            <div class="menu-item-text">
                <h3>${element.name}</h3>
                <p>${element.ingredients.join(', ').toString()}</p>
                <span>$${element.price}</span>
            </div>
            <button class="menu-item-btn" data-add-id="${element.id}">+</button>
        </article>`).join('')
}

menuHtml.innerHTML = renderMenu()
