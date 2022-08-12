const queryString_URL_Id= window.location.search;//récupérer chaine de l'url apres ?
console.log(queryString_URL_Id);

const urlSearchParams= new URLSearchParams(queryString_URL_Id);//recherche parametre
console.log(urlSearchParams);

const id= urlSearchParams.get("id");//(recupère "l'id")
console.log(id)

