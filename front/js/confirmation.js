//ajout orderId dans HTML
const orderId =window.location.search
const urlSearchParams= new URLSearchParams(orderId)
const numberCommand=urlSearchParams.get("orderId")

document.getElementById("orderId").innerHTML=numberCommand