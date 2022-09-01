    let items= document.getElementById("items");//récuperez items dans HTML

    function getDataApi(){
        fetch ("http://localhost:3000/api/products")
        .then(response=>response.json())
        .then(function(produits){
            for (let produit of produits){
                insertProduitsHtml(produit)
            }
        })
    }

    getDataApi()

    function insertProduitsHtml(produit){
        let ancre=document.createElement("a")
        ancre.href="./produit.html?id=" + produit.__id

        let article=document.createElement('article')
        let image=document.createElement('img')
        image.src=produit.imageUrl
        image.alt=produit.altTxt

        let title=document.createElement("h3")
        title.classList.add("productName")
        title.innerText=produit.name

        let paragraph= document.createElement('p')
        paragraph.classList.add("productDescription")
        paragraph.innerText=produit.description

        let price=document.createElement("p")
        price.classList.add("price")
        price.innerText="Prix = "+ produit.price + "€"

        article.appendChild(image)
        article.appendChild(title)
        article.appendChild(paragraph)
        article.appendChild(price)
        ancre.appendChild(article)
        
        items.appendChild(ancre)

    }