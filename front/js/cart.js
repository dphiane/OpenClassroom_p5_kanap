let cartItem= document.getElementById("cart__items")// récupère la div cart__items
let productLocalStorage = JSON.parse(localStorage.getItem("product"));//Json vers javascript


for (let product of productLocalStorage) {//parcours localstorage
      let item = {//création variable du localstorage
        Id: product.productId,
        color: product.colorValue,
        quantity: product.quantityProduct,
}

fetch("http://localhost:3000/api/products/" + item.Id)//appell l'api en fonction de id
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
.then(function(product) {//retourne les caractéristiques des produits du panier

    const PRODUCTCART=`
    <article class='cart__item' data-id='${item.Id}' data-color='${item.color}'>
    <div class='cart__item__img'>
      <img src='${product.imageUrl}' alt='${product.altTxt}'>
    </div>
    <div class='cart__item__content'>
      <div class='cart__item__content__description'>
        <h2>${product.name}</h2>
        <p>Couleur ${item.color} </p>
        <p class='product__Price'>${product.price}€</p>
      </div>
      <div class='cart__item__content__settings'>
        <div class='cart__item__content__settings__quantity'>
          <p>Qté :</p>
          <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value=${item.quantity}>
        </div>
        <div class='cart__item__content__settings__delete'>
          <p class='deleteItem'>Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
cartItem.innerHTML +=PRODUCTCART;//Ajout des constant HTML


/*Changement de quantité*/
let inputQuantity=document.querySelectorAll(".itemQuantity")// récupère la class dans le dom
for (let i =0; i<inputQuantity.length; i++){//on fait une boucle de tous les itemQuantité
  inputQuantity[i].addEventListener("change",(event)=>{
    let newValue=event.target.value//on écoute la valeur ciblé
    if (newValue<=0 || newValue >=100 ||isNaN(newValue)){
      alert ("Veuillez choisir une quantité entre 1 et 100")
      newValue=1
    }
    let items=inputQuantity[i].closest("article")//sert à récupérer l'objet le plus proche

      for (let k in productLocalStorage){
        if (productLocalStorage[k].productId=== items.dataset.id &&//compare id & couleur
          productLocalStorage[k].colorValue=== items.dataset.color){
            productLocalStorage[k].quantityProduct= parseInt(newValue),// change la nouvelle valeur du dom vers le local storage
            localStorage.setItem("product",JSON.stringify(productLocalStorage))//envoie au local storage
              updateCartTotal()
              updatequantity()
          }
}
})}

/*suprimer article*/
let deleteBtn=document.querySelectorAll(".deleteItem")// récupère les boutons supprimer
for (let i=0; i< deleteBtn.length;i++){//boucle sur les boutons
    deleteBtn[i].addEventListener("click",(event)=>{
        event.preventDefault()
        let removeProduct=deleteBtn[i].closest("article")
        removeProduct.remove()//supprimer du dom

        const productToDeleteId=removeProduct.dataset.id
        const productToDeleteColor=removeProduct.dataset.color

        let productToRemove=productLocalStorage.filter((el) => el.productId !=productToDeleteId || el.colorValue !=productToDeleteColor)//compare les id & couleurs
        localStorage.setItem("product",JSON.stringify(productToRemove))//envoie au local storage
        location.reload()
      })}


  //total quantité
  totalQuantity= document.getElementById('totalQuantity')//récupère l'id total quantité
  let sumQuantityHtml=[]//création d'un tableau vide pour les quantitées
  //fonction mise a jour quantité total
function updatequantity(){
      sumQuantityHtml.splice(0)// remise a zero du tableau sumQuantityHtml
      for(i=0;i < productLocalStorage.length;i++){
        let quantityInLocalStorage= productLocalStorage[i].quantityProduct// attribut la quantité du localstorage a la variable quantityInLocalStorage
        let sumQuantityLocal=quantityInLocalStorage
      sumQuantityHtml.push(sumQuantityLocal)//ajout les quantitées dans sumQuantityHtml
 const reducerQuantity=(accumulator,currentValue)=>accumulator+currentValue//methode reduce = réduit les valeurs d'une liste à une seule valeur
 const totalQuantityInCart=sumQuantityHtml.reduce(reducerQuantity,0)//0=valeur defaut
 totalQuantity.innerHTML=totalQuantityInCart//ajout de la valeur dans le HTML
}}
updatequantity()

//fonction mise a jour prix total
function updateCartTotal(){
  let cart__items=document.getElementById("cart__items")
  let cart__item=cart__items.getElementsByClassName("cart__item")
  let total=0
  
  for ( let i= 0; i < cart__item.length; i++){//boucle sur le nombre d'article du panier
    let article= cart__item[i];//me permet de récupérer l'article HTML du produit concerné
    let priceElement=article.getElementsByClassName("product__Price")[0];
    console.log(priceElement)
    let quantityElement=article.getElementsByClassName("itemQuantity")[0];
    let price=parseInt(priceElement.innerText.replace('€',''))
    let quantity=quantityElement.value
    total = total + (price*quantity)
  }
  document.getElementById("totalPrice").innerHTML=total
}
updateCartTotal()
})}




//Formulaire
let regexForm= document.querySelector(".cart__order__form")//Récupère le formulaire

/*regex prenom nom ville*/
let regexName = /^[a-zA-Z\'\s\é\è\ê\-]{2,20}$/ 
let firstName=document.getElementById("firstName")
let firstNameErrorMsg=document.getElementById("firstNameErrorMsg")

//Ecoute le champ prenom & vérifie la regexName
regexForm.firstName.addEventListener("input",function(){
  let firstNameValid=regexName.test(this.value)
    if (firstNameValid){
      
      firstNameErrorMsg.innerHTML=""
  }else{

    firstNameErrorMsg.innerHTML="Votre prénom n'est pas valide"
  }
})

//Ecoute le champ nom & vérifie la regexName
let lastName=document.getElementById("lastName")
let lastNameErrorMsg=document.getElementById("lastNameErrorMsg")

regexForm.lastName.addEventListener("input",function(){
  let lastNameValide=regexName.test(this.value)
  if (lastNameValide){
   
    lastNameErrorMsg.innerHTML=""
  }else{
   
    lastNameErrorMsg.innerHTML="Votre nom n'est pas valide"
  }
})
//Ecoute le champ addresse & vérifie la regexAddress
let regexAddress = /[a-zA-Z0-9\s,'-]{5,80}$/
let address=document.getElementById("address")
let addressErrorMsg=document.getElementById("addressErrorMsg")

regexForm.address.addEventListener("input",function(){
  let addressValid=regexAddress.test(this.value)
  if(addressValid){
   
    addressErrorMsg.innerHTML=""
  }else{
   
    addressErrorMsg.innerHTML="Votre adresse n'est pas valide"
  }
})
//Ecoute le champ ville & vérifie la regexName
let city=document.getElementById("city")
let cityErrorMsg=document.getElementById("cityErrorMsg")

regexForm.city.addEventListener("input",function(){
  let cityValid=regexName.test(this.value)
  if(cityValid){
    
    cityErrorMsg.innerHTML=""
  }else{
    
    cityErrorMsg.innerHTML="Votre ville n'est pas valide"
  }
})

//Ecoute le champ email & vérifie la regexEmail
let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
let email=document.getElementById("email")
let emailErrorMsg=document.getElementById("emailErrorMsg")

regexForm.email.addEventListener("input",function(){
  let emailValid=regexEmail.test(this.value)
  if(emailValid){
    
    emailErrorMsg.innerHTML=""
  }else{
   
    emailErrorMsg.innerHTML="Votre addresse email n'est pas valide"
  }
})


let command=document.getElementById('order')

command.addEventListener("click",(e)=>{
e.preventDefault()
  let idOfProductBuy=[]
for (product of productLocalStorage){
  idOfProductBuy.push(product.productId)
}
const commande= {
  contact:{
    firstName:document.getElementById('firstName').value,
    lastName:document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  },
  products:idOfProductBuy,
}
console.log(commande)

fetch("http://localhost:3000/api/products/order", {
  method: 'POST',
  body: JSON.stringify(commande),
  headers: { 
    "Content-Type" : "application/json",

  },
  
})
  .then((res) => res.json())
  .then((promise) => {
    let responseServeur=promise
    console.log(responseServeur)
    //localStorage.clear()
    window.location.href= "confirmation.html?orderId=" + responseServeur.orderId
  })
})





