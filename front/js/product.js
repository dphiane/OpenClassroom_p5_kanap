
const queryString_URL_Id= window.location.search;//récupérer chaine de l'url apres "?" par id dans la page window

const urlSearchParams= new URLSearchParams(queryString_URL_Id);//recherche parametre

const id= urlSearchParams.get("id");//(recupère "l'id")
console.log(id);


let URL = "http://localhost:3000/api/products/"
    
let cardsFetch= function(){
  fetch(URL+=id)
  .then(response => response.json())
  .then(data => {console.log(data) 

let item_img= document.getElementsByClassName('item_img');
item_img.innerHTML=`<img src="${data.imageUrl}" alt="${data.altTxt}">;`
console.log(data.imageUrl)

let title=document.getElementById('title')
title.innerHTML=`${data.name}`

let description=document.getElementById('description');
description.innerHTML=`${data.description}`

let price=document.getElementById('price')
price.innerHTML=`${data.price}`

/* let colors_first=document.createElement('colors')
colors */
})}
  
cardsFetch()

