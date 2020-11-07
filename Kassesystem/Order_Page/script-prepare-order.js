import {
  checkLoginOrRedirectKasseSystem,
  addDrinkToCart,
  addDessertToCart,
  getDrink,
  getDessert,
} from "../../Domene/common.js";
checkLoginOrRedirectKasseSystem();

import { refreshShoppingCart } from './script-pay-order.js'

let orderQuantity = 1;

const displayMenuCard = document.getElementById("menuCard");
const closeButton = document.getElementsByClassName("close")[0];

const menuPhoto = document.getElementsByClassName("btnPhoto");
const itemPhoto = document.getElementById("photoContainer");
const itemName = document.getElementById("itemTitle");
const foodPriceDiv = document.getElementById("foodPrice");
const foodPriceTxt = document.getElementById("pricetxt");
const drinkSize = document.getElementById("changeSizeContainer");
const smalltext = document.getElementById("smalltxt");
const mediumtext = document.getElementById("mediumtxt");
const largetext = document.getElementById("largetxt");
const addBtn = document.getElementById("add_btn");
const displayQuantity = document.getElementById("quantityCounter");
const subtractBtn = document.getElementById("subtract_btn");
const otherInput = document.getElementById('other_input');
const drinkButtons = document.querySelectorAll(".drink-button");
const foodButtons = document.querySelectorAll(".food-button");

// Event listeners
addBtn.onclick = addQuantity;
subtractBtn.onclick = subtractQuantity;

// Add event listener onclick. Get the drink from the data structure and open modal.
drinkButtons.forEach((drinkbutton) =>
  drinkbutton.addEventListener("click", (click) =>
    openDrinkModal(drinkbutton.name)
  )
);

// Add event listener onclick. Get the dessert from the data structure and open modal.
foodButtons.forEach((foodButton) =>
  foodButton.addEventListener("click", (click) =>
    openDessertModal(foodButton.name)
  )
);

/**
 * Opens the drinks modal.
 * @param {string} name name of the drink as it is in the drinks.js
 */
function openDrinkModal(name) {
  const drink = getDrink(name);

  orderQuantity = 1;
  displayQuantity.innerHTML = `${orderQuantity}`;
  itemName.innerHTML = drink.name;
  drinkSize.style.display = "block";
  foodPrice = 0;
  foodPriceDiv.style.display = "none";
  itemPhoto.innerHTML = `<img src="Images/${drink.image.src}" alt="${drink.image.alt}" id = "menuPhoto" />`;

  smalltext.innerHTML = `${drink.size.small.name}<br><b>${drink.size.small.price},-</b>`;
  mediumtext.innerHTML = `${drink.size.medium.name}<br><b>${drink.size.medium.price},-</b>`;
  largetext.innerHTML = `${drink.size.large.name}<br><b>${drink.size.large.price},-</b>`;

  displayMenuCard.style.display = "block";

  // Select size of drink when click on image
  let selectedSize;
  document.querySelectorAll(".size-btn").forEach(
    (element) =>
      (element.onclick = (event) => {
        selectedSize = element.name;
        setActive(element, "size-btn");
      })
  );

  // onclick "add to order"
  document.querySelector("#menuItemFooter").onclick = (event) => {
    if (selectedSize) {
      addDrinkToCart(name, selectedSize, orderQuantity, otherInput.value);
      refreshShoppingCart();
      closeModal();
    } else {
      error.innerHTML = "Du må velge en størrelse!";
    }
  };
}

/**
 * Opens the desserts modal.
 * @param {string} name name of the dessert as it is in the desserts.js
 */
function openDessertModal(name) {
  const dessert = getDessert(name);

  orderQuantity = 1;
  displayQuantity.innerHTML = `${orderQuantity}`;
  itemName.innerHTML = dessert.name;
  itemPhoto.innerHTML = `<img src="Images/${dessert.image.src}" alt="${dessert.image.src}" id = "menuPhoto" />`;
  drinkSize.style.display = "none";
  foodPriceDiv.style.display = "block";
  foodPriceTxt.innerHTML = `<b>${dessert.price},-</b>`;

  //after the user has clicked the button and the info has been generated, the cardview becomes visible
  displayMenuCard.style.display = "block";

  // onclick "add to order"
  document.querySelector("#menuItemFooter").onclick = (event) => {
    addDessertToCart(name, orderQuantity, otherInput.value);
    refreshShoppingCart()
    closeModal();
  };
}

/**
 * Set active class to element and remove to all other classes specified
 * @param {HTMLElement} selectedItem element to add active class to
 * @param {string} clearActiveClass class of elements to remove active class element to
 */
function setActive(selectedItem, clearActiveClass) {
  document
    .querySelectorAll(`.${clearActiveClass}`)
    .forEach((element) => element.classList.remove("active"));
  selectedItem.classList.add("active");
}

/**
 * Close the modal. Clears errors and selected drink sizes.
 */
function closeModal() {
  displayMenuCard.style.display = "none";
  error.innerHTML = "";
  otherInput.value = "";
  document
    .querySelectorAll(`.size-btn`)
    .forEach((element) => element.classList.remove("active"));
}

//Close card view when exit button is clicked
closeButton.onclick = function () {
  closeModal();
};

//Close card view when you click outside of the card
window.onclick = function (event) {
  if (event.target == displayMenuCard) {
    closeModal();
  }
};

/**
 * subtract the amount of items you want to order
 * */
function subtractQuantity() {
  if (orderQuantity === 1) {
    error.innerHTML = "Antall kan ikke være lavere enn 1!";
  } else {
    orderQuantity--;
    displayQuantity.innerHTML = `${orderQuantity}`;
    error.innerHTML = "";
  }
}

/**
 * add the amount of items you want to order
 * */
function addQuantity() {
  orderQuantity++;
  displayQuantity.innerHTML = `${orderQuantity}`;
  error.innerHTML = "";
}
