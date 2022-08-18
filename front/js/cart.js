let productLocalStorage=JSON.parse(localStorage.getItem("product"));//Json vers javascript
let cartItem= document.getElementById("cart__items")// récupère la div cart__items



for (i=0;i < productLocalStorage.length; i++){//parcour le tableau product dans le local storage
//constante pour l'affichage du panier via les éléments du local storage   
    const PRODUCTCART=`
    <article class='cart__item' data-id='{product-ID}' data-color='{product-color}'>
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