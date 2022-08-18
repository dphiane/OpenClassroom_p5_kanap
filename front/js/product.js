const queryString_URL_Id= window.location.search;//récupérer chaine de l'url apres "?" par id dans la page window

const urlSearchParams= new URLSearchParams(queryString_URL_Id);//recherche parametre

const id= urlSearchParams.get("id");//(recupère "l'id")

let URL = "http://localhost:3000/api/products/"
    
let cardsFetch= function(){
  fetch(URL+id)
  .then(response => response.json())
  .then(data => {console.log(data) 

document.getElementsByClassName("item__img")[0].innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`//ajout image 
document.getElementById('title').innerHTML=`${data.name}`//ajout titre
document.getElementById('description').innerHTML=`${data.description}`//ajout description
document.getElementById('price').innerHTML=`${data.price}`//ajout prix

for (let i=0; i<data.colors.length;i++){//tableau a parcourir par i pour les options 
  let select=document.getElementById('colors')//selection de la partie choisi une couleur
  let option= document.createElement ('option')// création des options de couleur

  option.innerHTML=`${data.colors[i]}`// ajout des options de couleur dans HTML
  option.value=`${data.colors[i]}`// ajout de la valeur des couleur back

  select.appendChild(option)// option enfant de select
}
})} 

cardsFetch()
// Ecoute du bouton ajouter au panier
let addToCart=document.getElementById("addToCart")
addToCart.addEventListener("click",(event)=>{
event.preventDefault();

fetch(URL+id)
.then(response => response.json())
.then(data => {
//condition quantité
if(quantity.value<=0){
  alert("Veuillez indiquer la quantité souhaité")
}
//condition couleur
else if (colors.value==0){
  alert("Veuillez indiquer la couleur souhaité")
}
else{
//Création variable du tableau contenant les informations du produit pour le panier
let productToCart={
  productName:`${data.name}`,
  productId:`${data._id}`,
  colorValue:colors.value,
  quantityProduct:quantity.value,
} 

//création de la variable des produits du panier qui sera stockée dans le local storage
let productLocalStorage=JSON.parse(localStorage.getItem("product"));

//s'il a deja des produits enregistrés dans le local storage
if(productLocalStorage){
productLocalStorage.push(productToCart);
localStorage.setItem("product",JSON.stringify(productLocalStorage));
}
// si il n y a pas de produit d'enregistré dans le local storage
else{
  productLocalStorage=[];
  productLocalStorage.push(productToCart);
  localStorage.setItem("product",JSON.stringify(productLocalStorage));
}
// fenêtre d'affichage de confirmation
let popUpConfirm=function(){
  if (window.confirm(`${data.name} de la couleur ${colors.value} a bien été ajouter au panier
Pour continuer vos achats cliquer sur OK ou ANNULER pour aller au panier`)){
  window.location.href= "index.html"
  }else{
  window.location.href= "cart.html"
  }
}
console.log(productLocalStorage)
popUpConfirm()
}})})
