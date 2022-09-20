//récupère id dans URL
const queryString_URL_Id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_URL_Id);
const id = urlSearchParams.get("id");

let URL = "http://localhost:3000/api/products/";

let cardsFetch = function () {
  fetch(URL + id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementsByClassName("item__img")[0].innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      document.getElementById("title").innerHTML = `${data.name}`;
      document.getElementById("description").innerHTML = `${data.description}`;
      document.getElementById("price").innerHTML = `${data.price}`;

      // création option couleur
      for (let i = 0; i < data.colors.length; i++) {
        let select = document.getElementById("colors");
        let option = document.createElement("option");

        option.innerHTML = `${data.colors[i]}`;
        option.value = `${data.colors[i]}`;

        select.appendChild(option);
      }
    });
};

cardsFetch();

// bouton ajout panier, condition couleur & quantitée
let addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(URL + id)
    .then((response) => response.json())
    .then((data) => {
      if (quantity.value <= 0 || quantity.value > 100) {
        alert("Veuillez indiquer la quantité souhaité comprise entre 1 et 100");
      } else if (colors.value == 0) {
        alert("Veuillez indiquer la couleur souhaité");
      } else {
        let productToCart = {
          productId: `${data._id}`,
          colorValue: colors.value,
          quantityProduct: Number(quantity.value),
        };

        // localStorage + condition addition ou non
        let productLocalStorage = JSON.parse(localStorage.getItem("product"));

        if (productLocalStorage) {
          const alreadyIn = productLocalStorage.find(
            (obj) =>
              obj.productId === productToCart.productId &&
              obj.colorValue === productToCart.colorValue
          );
          if (alreadyIn) {
            let fixQuantity =
              parseInt(productToCart.quantityProduct) +
              parseInt(alreadyIn.quantityProduct);
            alreadyIn.quantityProduct = fixQuantity;
            localStorage.setItem(
              "product",
              JSON.stringify(productLocalStorage)
            );
          } else {
            productLocalStorage.push(productToCart);
            localStorage.setItem(
              "product",
              JSON.stringify(productLocalStorage)
            );
          }
        } else {
          productLocalStorage = [];
          productLocalStorage.push(productToCart);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
        }

        // fenêtre d'affichage de confirmation
        let popUpConfirm = function () {
          if (
            window.confirm(`${data.name} de la couleur ${colors.value} a bien été ajouter au panier
            Pour continuer vos achats cliquer sur OK ou ANNULER pour aller au panier`)
          ) {
            window.location.href = "index.html";
          } else {
            window.location.href = "cart.html";
          }
        };
        popUpConfirm();
      }
    });
});
