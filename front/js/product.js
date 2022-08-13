
const queryString_URL_Id= window.location.search;//récupérer chaine de l'url apres "?" par id dans la page window

const urlSearchParams= new URLSearchParams(queryString_URL_Id);//recherche parametre

const id= urlSearchParams.get("id");//(recupère "l'id")
console.log(id);


let URL = "http://localhost:3000/api/products/"
    
let cardsFetch= function(){
  fetch(URL+=id)
  .then(response => response.json())
  .then(data => {console.log(data) 

    let item__img= document.getElementsByClassName("item__img")
    console.log(item__img)
    item__img.innerHTML="dom"
    console.log(item__img)
item__img.innerHTML=`<img src="${data.imageUrl}" alt="${data.altTxt}>`
console.log(data.imageUrl)

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

