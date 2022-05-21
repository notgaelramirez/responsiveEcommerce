//Open menu
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)
  
  if (toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('show')
    })
  }      
}

showMenu('nav-toggle','nav-menu')
//Close menu
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  //Active Link
  navLink.forEach(n => n.classList.remove('active'))
  this.classList.add('active')

  //Remove menu mobile
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click',linkAction))


//Cart CLose

var cartIcon = document.querySelector('.nav__cart')
var cart = document.querySelector('.cart')
var closeCart = document.querySelector('.close-cart')

cartIcon.onclick = () =>{
  cart.classList.add('active')
}

closeCart.onclick = () =>{
  cart.classList.remove('active')
}

// cart code

if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else{
  ready()
}

function ready(){
  //remove item
  var removeCartButton = document.getElementsByClassName('remove-cart')
  console.log(removeCartButton)

  for (var i = 0; i<removeCartButton.length; i++){
    var button = removeCartButton[i]
    button.addEventListener('click', removeCartItem)
  }
  //Quantity Changes
  var quantityInputs = document.getElementsByClassName('cart-quantity')

  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }
  //Add to cart
  var addCart = document.getElementsByClassName('add-cart')
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener('click', addCartClicked)
  }

  //Buy Button Work
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

//Buy Button
function buyButtonClicked(){
  alert('Your Order is placed')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updatetotal()
}

//Remove item from cart
function removeCartItem(e){
  var buttonClicked = e.target
  buttonClicked.parentElement.remove()
  updatetotal()
}

//Quantity Changes
function quantityChanged(e){
  var input = e.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updatetotal()
}

//Add to cart
function addCartClicked(e){
  var button = e.target
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName('featured__name')[0].innerText
  var price = shopProducts.getElementsByClassName('featured__price')[0].innerText
  var productImg = shopProducts.getElementsByClassName('featured__img')[0].src
  addProductToCart(title, price, productImg)
  updatetotal()
}

function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement("div")
  cartShopBox.classList.add("cart-box")
  var cartItems = document.getElementsByClassName('cart-content')[0]
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
  
  for (var i = 0; i<cartItemsNames.length; i++){
    if (cartItemsNames[i].innerText == title){
      alert(`You have already add this item to your cart.
You can modify the quantity in your cart section`)
      return
    }
    
  }



  var cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <!-- remove -->
      <i class='bx bxs-trash remove-cart' ></i>
  `

  cartShopBox.innerHTML = cartBoxContent
  cartItems.append(cartShopBox)
  cartShopBox.getElementsByClassName('remove-cart')[0].addEventListener('click', removeCartItem)
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
  updatetotal()
}                   
 
//Update total
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total = 0

  for (var j = 0; j < cartBoxes.length; j++){
    var cartBox = cartBoxes[j]
    var priceElement = cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
    var price = parseInt(priceElement.innerText.replace("$", ""))
    var quantity = quantityElement.value

    total = total + price * quantity
    console.log(quantityElement,price, total)
  }
    //For too much cents values
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('total-price')[0].innerText = "$" + total
  
}