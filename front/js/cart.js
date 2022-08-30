let cartItem= document.getElementById("cart__items")// récupère la div cart__items
let productLocalStorage = JSON.parse(localStorage.getItem("product"));//Json vers javascript
let sumQuantityHtml=[]//création d'un tableau vide pour les quantitées
let total=[]
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
        <p>${product.price}€</p>
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
        
      })}
  //total quantité
  totalQuantity= document.getElementById('totalQuantity')//récupère l'id total quantité
 
function updatequantity(){

      let sumQuantityLocal=item.quantity
      sumQuantityHtml.push(sumQuantityLocal)//ajout les quantitées dans sumQuantityHtml
  console.log(sumQuantityHtml)
 const reducerQuantity=(accumulator,currentValue)=>accumulator+currentValue//methode reduce = réduit les valeurs d'une liste à une seule valeur
 const totalQuantityInCart=sumQuantityHtml.reduce(reducerQuantity,0)
 totalQuantity.innerHTML=totalQuantityInCart//ajout de la valeur dans le HTML 
}
updatequantity()
//prix Total
  totalPrice=document.getElementById("totalPrice")
function calculateTotalPrice(){
    
    const productTotal = product.price * item.quantity;
    total.push(productTotal)
    let totalF = total.reduce((a,b)=>a+b);
    console.log(total)
    totalPrice.innerHTML=totalF
}
calculateTotalPrice()
})}

console.log(total)



