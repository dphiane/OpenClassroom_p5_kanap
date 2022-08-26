let cartItem= document.getElementById("cart__items")// récupère la div cart__items
let kanapInfos = JSON.parse(localStorage.getItem("product"));//Json vers javascript


    for (let product of kanapInfos) {//parcours localstorage
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
})}
/*Changement de quantité*/
let inputQuantity=document.querySelectorAll(".itemQuantity")// récupère la class dans le dom
for (let i =0; i<inputQuantity.length; i++){//on fait une boucle de tous les itemQuantité
  inputQuantity[i].addEventListener("change",(event)=>{
    let newValue=event.target.value//on écoute la valeur ciblé
    let items=inputQuantity[i].closest("article")//sert à récupérer l'objet le plus proche
      for (let k in productLocalStorage){
        if (productLocalStorage[k].productId== items.dataset.id &&//compare id & couleur
          productLocalStorage[k].colorValue== items.dataset.color)
          {
            (productLocalStorage[k].quantityProduct= parseInt(newValue)),// change la nouvelle valeur du dom vers le local storage
            localStorage.setItem("product",JSON.stringify(productLocalStorage))//envoie au local storage
          }
}})}

/*suprimer article*/
let deleteBtn=document.querySelectorAll(".deleteItem")// récupère les boutons supprimer
console.log(deleteBtn)
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
 



