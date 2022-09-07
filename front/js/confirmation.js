const orderId =window.location.search// récupère dans l'url la partie ?orderId
const urlSearchParams= new URLSearchParams(orderId)// récupère la partie search de l'url donc orderId-->...
const numberCommand=urlSearchParams.get("orderId")//selectionne l'orderId

document.getElementById("orderId").innerHTML=numberCommand// ajout de l'orderId dans la partie votre numéro de commande