let items= document.getElementById("items");//récuperez items dans HTML

fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then((data) => {console.log(data)

        for (i=0; i < data.length; i++){//Appel des produits dans le tableau
            const PRODUCTCARD=`
                <a href="./product.html?id=${data[i]._id}">
                <article>
                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                <h3 class="productName">${data[i].name}</h3>
                <p class="productDescription">${data[i].description}</p>
                </article>
                </a>`;
            items.innerHTML +=PRODUCTCARD;//Ajout des constant HTML

        }});
