/*===== MENU SHOW =====*/ 
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
/*===== REMOVE MENU MOBILE =====*/
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


//Cart

let cartIcon = document.querySelector('.nav__cart')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('.close-cart')

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
  let removeCartButton = document.getElementsByClassName('remove-cart')
  console.log(removeCartButton)

  for (var i = 0; i<removeCartButton.length; i++){
    let button = removeCartButton[i]
    button.addEventListener('click', removeCartItem)
  }
}

function removeCartItem(event){
  let buttonClicked = event.target
  buttonClicked.parentElement.remove()
}