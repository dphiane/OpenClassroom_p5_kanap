let cartItem = document.getElementById("cart__items");
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

//parcours localstorage + fetch+(id) & ajout dans html
for (let product of productLocalStorage) {
  let item = {
    Id: product.productId,
    color: product.colorValue,
    quantity: product.quantityProduct,
  };

  fetch("http://localhost:3000/api/products/" + item.Id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      const PRODUCTCART = `
    <article class='cart__item' data-id='${item.Id}' data-color='${item.color}'>
    <div class='cart__item__img'>
      <img src='${product.imageUrl}' alt='${product.altTxt}'>
    </div>
    <div class='cart__item__content'>
      <div class='cart__item__content__description'>
        <h2>${product.name}</h2>
        <p>Couleur ${item.color} </p>
        <p class='product__Price'>${product.price}€</p>
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
  </article>`;
      cartItem.innerHTML += PRODUCTCART;

      /*Changement de quantité + condition entre 1 et 100*/
      let inputQuantity = document.querySelectorAll(".itemQuantity");
      for (let i = 0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener("change", (event) => {
          let newValue = event.target.value;
          if (newValue <= 0 || newValue >= 100 || isNaN(newValue)) {
            alert("Veuillez choisir une quantité entre 1 et 100");
            newValue = 1;
          }
          let items = inputQuantity[i].closest("article");

          //changement quantité dans le localStorage
          for (let k in productLocalStorage) {
            if (
              productLocalStorage[k].productId === items.dataset.id &&
              productLocalStorage[k].colorValue === items.dataset.color
            ) {
              (productLocalStorage[k].quantityProduct = parseInt(newValue)),
              localStorage.setItem("product",JSON.stringify(productLocalStorage)
              );
              updateCartTotal();
              updateQuantity();
            }
          }
        });
      }

      /*suprimer article*/
      //supprime du DOM & localStorage
      let deleteBtn = document.querySelectorAll(".deleteItem");
      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (event) => {
          event.preventDefault();
          let removeProduct = deleteBtn[i].closest("article");
          removeProduct.remove();

          const productToDeleteId = removeProduct.dataset.id;
          const productToDeleteColor = removeProduct.dataset.color;

          let productToRemove = productLocalStorage.filter(
            (el) =>
              el.productId != productToDeleteId ||
              el.colorValue != productToDeleteColor
          );
          localStorage.setItem("product", JSON.stringify(productToRemove));
          location.reload();
        });
      }

      //total quantité
      totalQuantity = document.getElementById("totalQuantity");
      let sumQuantityHtml = [];
      //fonction mise a jour quantité total = addition des produits dans localStorage
      function updateQuantity() {
        sumQuantityHtml.splice(0);

        for (i = 0; i < productLocalStorage.length; i++) {
          let quantityInLocalStorage = productLocalStorage[i].quantityProduct;
          let sumQuantityLocal = quantityInLocalStorage;
          sumQuantityHtml.push(sumQuantityLocal);
          const reducerQuantity = (accumulator, currentValue) =>accumulator + currentValue;
          const totalQuantityInCart = sumQuantityHtml.reduce(reducerQuantity,0);
          totalQuantity.innerHTML = totalQuantityInCart;
        }
      }
      updateQuantity();

      //fonction mise a jour prix total
      function updateCartTotal() {
        let cart__items = document.getElementById("cart__items");
        let cart__item = cart__items.getElementsByClassName("cart__item");
        let total = 0;
        // récupère les infos dans le DOM
        for (let i = 0; i < cart__item.length; i++) {
          let article = cart__item[i];
          let priceElement = article.getElementsByClassName("product__Price")[0];
          let quantityElement = article.getElementsByClassName("itemQuantity")[0];
          let price = parseInt(priceElement.innerText.replace("€", ""));
          let quantity = quantityElement.value;
          total = total + price * quantity;
        }
        document.getElementById("totalPrice").innerHTML = total;
      }
      updateCartTotal();
    });
}

//Formulaire
let regexForm = document.querySelector(".cart__order__form"); 

/*regex prenom nom ville*/
let regexName = /^[a-zA-Z\'\s\é\è\ê\-]{2,20}$/;
let firstName = document.getElementById("firstName");
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

regexForm.firstName.addEventListener("input", function () {
  firstNameValid();
});
//fonction pour le prenom
function firstNameValid() {
  let firstNameValidity = regexName.test(firstName.value);
  if (firstNameValidity) {
    firstNameErrorMsg.innerHTML = "";
    return true;
  } else {
    firstNameErrorMsg.innerHTML = "Votre prénom n'est pas valide";
    return false;
  }
}
//regex Nom
let lastName = document.getElementById("lastName");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

regexForm.lastName.addEventListener("input", function () {
  lastNameValid();
});
// fonction pour le nom
function lastNameValid() {
  let lastNameValidity = regexName.test(lastName.value);
  if (lastNameValidity) {
    lastNameErrorMsg.innerHTML = "";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Votre nom n'est pas valide";
    return false;
  }
}
//regex Adresse
let regexAddress = /[a-zA-Z0-9\s,'-]{5,80}$/;
let address = document.getElementById("address");
let addressErrorMsg = document.getElementById("addressErrorMsg");

regexForm.address.addEventListener("input", function () {
  addressValid();
});
//fonction addresse
function addressValid() {
  let addressValidity = regexAddress.test(address.value);
  if (addressValidity) {
    addressErrorMsg.innerHTML = "";
    return true;
  } else {
    addressErrorMsg.innerHTML = "Votre adresse n'est pas valide";
    return false;
  }
}

// regex ville
let city = document.getElementById("city");
let cityErrorMsg = document.getElementById("cityErrorMsg");

regexForm.city.addEventListener("input", function () {
  cityValid();
});
//fonction ville
function cityValid() {
  let cityValidity = regexName.test(city.value);
  if (cityValidity) {
    cityErrorMsg.innerHTML = "";
    return true;
  } else {
    cityErrorMsg.innerHTML = "Votre ville n'est pas valide";
    return false;
  }
}

//regex email
let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
let email = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");

regexForm.email.addEventListener("input", function () {
  emailValid();
});
//fonction email
function emailValid() {
  let emailValidity = regexEmail.test(email.value);
  if (emailValidity) {
    emailErrorMsg.innerHTML = "";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Votre addresse email n'est pas valide";
    return false;
  }
}

// Commander: vérifie si toutes les regex ok
let command = document.getElementById("order");

command.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    firstNameValid() &&
    lastNameValid() &&
    addressValid() &&
    cityValid() &&
    emailValid()
  ) {
    let idOfProductBuy = []; 
    for (product of productLocalStorage) {
      idOfProductBuy.push(product.productId); 
    }
    const commande = {
      
      contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
      products: idOfProductBuy,
    };
    // si form ok, POST la commande
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(commande),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((promise) => {
        let responseServeur = promise;
        localStorage.clear();
        window.location.href = "confirmation.html?orderId=" + responseServeur.orderId;
      });
  } else {
    console.log("non valide");
  }
});
