let productLocalStorage=JSON.parse(localStorage.getItem("product"));//Json vers javascript
let cartItem= document.getElementById("cart__items")// récupère la div cart__items
console.log(productLocalStorage)
for (i=0;i < productLocalStorage.length; i++){//parcour le tableau product dans le local storage
//constante pour l'affichage du panier via les éléments du local storage   
    const PRODUCTCART=`
    <article class='cart__item' data-id='${productLocalStorage[i].productId}' data-color='${productLocalStorage[i].colorValue}'>
    <div class='cart__item__img'>
      <img src='${productLocalStorage[i].imgProduct}' alt='${productLocalStorage[i].altProduct}'>
    </div>
    <div class='cart__item__content'>
      <div class='cart__item__content__description'>
        <h2>${productLocalStorage[i].productName}</h2>
        <p>Couleur ${productLocalStorage[i].colorValue}</p>
        <p>${productLocalStorage[i].price}€</p>
      </div>
      <div class='cart__item__content__settings'>
        <div class='cart__item__content__settings__quantity'>
          <p>Qté :</p>
          <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value=${productLocalStorage[i].quantityProduct}>
        </div>
        <div class='cart__item__content__settings__delete'>
          <p class='deleteItem'>Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
cartItem.innerHTML +=PRODUCTCART;//Ajout des constant HTML
}

let inputQuantity=document.querySelectorAll(".itemQuantity")
for (let i =0; i<inputQuantity.length; i++){
  inputQuantity[i].addEventListener("change",(event)=>{
    event.preventDefault()
    let inputNewQuantity=inputQuantity[i].closest("article")
    console.log(inputNewQuantity)
    let inputValue=event.target.value
    console.log(inputValue)
  })
}


let deleteBtn=document.querySelectorAll(".deleteItem")
console.log(deleteBtn)
for (let i=0; i< deleteBtn.length;i++){
    deleteBtn[i].addEventListener("click",(event)=>{
        event.preventDefault()
        let removeProduct=deleteBtn[i].closest("article")
        removeProduct.remove()
        const productToDeleteId=removeProduct.dataset.id
        const productToDeleteColor=removeProduct.dataset.color
        console.log(productToDeleteId)

        let productToRemove=productLocalStorage.filter((el) => el.productId !=productToDeleteId || el.colorValue !=productToDeleteColor)
        
        console.log(productLocalStorage)
        localStorage.setItem("product",JSON.stringify(productToRemove))
        console.log(productToRemove)
    })}
 



