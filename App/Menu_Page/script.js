import { setUserId, addDrinkToCart } from "../../Domene/common.js";


var menuitemname = "";
var smallPrice = 0;
var mediumPrice = 0;
var largePrice = 0;
var foodPrice = 0;
var orderQuantity = 1;

var drinkButtons = document.getElementsByClassName("drink-button");
var foodButtons = document.getElementsByClassName("food-button");
var displayMenuCard = document.getElementById("menuCard");
var span = document.getElementsByClassName("close")[0];

var itemPhoto = document.getElementById("photoContainer");
var itemName = document.getElementById("itemTitle");
var foodPriceDiv = document.getElementById("foodPrice");
var foodPriceTxt = document.getElementById("pricetxt");
var drinkSize = document.getElementById("changeSizeContainer");
var smalltext = document.getElementById("smalltxt");
var mediumtext = document.getElementById("mediumtxt");
var largetext = document.getElementById("largetxt");
var addBtn = document.getElementById("add_btn");
var displayQuantity = document.getElementById("quantityCounter");
var subtractBtn = document.getElementById("subtract_btn");
var quantityError = document.getElementById("error");


//Run functions to generate menu cardview on page load
window.onload = function() {
foodInfo();
drinkInfo();
}

//Generate cardview for food items
function foodInfo (){

  //Iterate through items and retrieve id/name
  for(var i = 0; i < foodButtons.length; i++) {
    var fbtn = foodButtons[i];
    menuitemname = this.id;

    fbtn.addEventListener('click', displayFoodInfo, false);

    //generate info about each item through it's unique id/name
    function displayFoodInfo(){
      orderQuantity = 1;
      displayQuantity.innerHTML = `${orderQuantity}`;
      menuitemname = this.id;
      itemName.innerHTML = `${menuitemname}`;
      itemPhoto.innerHTML = `<img src="Images/${menuitemname}.jpeg" alt="${menuitemname}" id = "menuPhoto"></img>`;
      drinkSize.style.display = "none";
      foodPriceDiv.style.display = "block";

      //prices
      
      if (menuitemname === "brownies"){
        foodPrice = 44;
      }else if (menuitemname === "oreokake"){
        foodPrice = 54;
      }else if (menuitemname === "kanelbolle"){
        foodPrice = 46;
      }else if (menuitemname === "croissant"){
        foodPrice = 38;
      }else if (menuitemname === "chiapudding"){
        foodPrice = 42;
      }else if (menuitemname === "brioche"){
        foodPrice = 44;
      }else if (menuitemname === "scones"){
        foodPrice = 37;
      }

      foodPriceTxt.innerHTML = `<b>${foodPrice},-</b>`;
      
      //after the user has clicked the button and the info has been generated, the cardview becomes visible
      displayMenuCard.style.display = "block";
    }
  }
}

 /*Same function for drink items. When the button is click the app iterates through a list of all buttons
  in the class, retrieves each id, and uses that to generate and display relevant info.*/
  function drinkInfo() {

    for(var i = 0; i < drinkButtons.length; i++) {
        var btn = drinkButtons[i];
        menuitemname = this.id;

        btn.addEventListener('click', displayDrinkInfo, false);

        function displayDrinkInfo(e){
          orderQuantity = 1;
          displayQuantity.innerHTML = `${orderQuantity}`;
          menuitemname = this.id;
          itemName.innerHTML = `${menuitemname}`;
          drinkSize.style.display = "block";
          foodPrice = 0;
          foodPriceDiv.style.display = "none";
          itemPhoto.innerHTML = `<img src="Images/${menuitemname}.jpeg" alt="${menuitemname}" id = "menuPhoto"></img>`;

          if(menuitemname === "filterkaffe"){
            smallPrice = 28;
            mediumPrice = 32;
            largePrice = 36;
          }else if (menuitemname === "cappuccino"){
            smallPrice = 38;
            mediumPrice = 42;
            largePrice = 46;
          }else if (menuitemname === "americano"){
            smallPrice = 32;
            mediumPrice = 36;
            largePrice = 40;
          }else if (menuitemname === "iskaffe"){
            smallPrice = 36;
            mediumPrice = 42;
            largePrice = 50;
          }else if (menuitemname === "caffe mocha"){
            smallPrice = 38;
            mediumPrice = 42;
            largePrice = 46;
          }else if (menuitemname === "caffe latte"){
            smallPrice = 38;
            mediumPrice = 44;
            largePrice = 48;
          }else if (menuitemname === "caramel macchiato"){
            smallPrice = 45;
            mediumPrice = 48;
            largePrice = 51;
          }else if (menuitemname === "espresso"){
            smallPrice = 34;
            mediumPrice = 38;
            largePrice = 42;
          }else if (menuitemname === "cortado"){
            smallPrice = 36;
            mediumPrice = 40;
            largePrice = 44;
          }else if (menuitemname === "iste"){
            smallPrice = 38;
            mediumPrice = 47;
            largePrice = 55;
          }

          smalltext.innerHTML = `Liten<br><b>${smallPrice},-</b>`;
          mediumtext.innerHTML = `Medium<br><b>${mediumPrice},-</b>`;
          largetext.innerHTML = `Stor<br><b>${largePrice},-</b>`;


          displayMenuCard.style.display = "block";
      }
  }
}

//Close card view when exit button is clicked
span.onclick = function() {
  displayMenuCard.style.display = "none";
}

//Close card view when you click outside of the card
window.onclick = function(event) {
  if (event.target == displayMenuCard) {
    displayMenuCard.style.display = "none";
  }
}

//Functions for adding or subtracting the amount of items you want to order
function subtractQuantity(){
  if (orderQuantity === 1) {
    error.innerHTML = "Antall kan ikke være lavere enn 1!";
  } else {
    orderQuantity--;
    displayQuantity.innerHTML = `${orderQuantity}`;
    error.innerHTML = "";
  }
}

function addQuantity(){
    orderQuantity++;
    displayQuantity.innerHTML = `${orderQuantity}`;
    error.innerHTML = "";
}

addBtn.onclick = addQuantity;
subtractBtn.onclick = subtractQuantity;


//setUserId("test");

// Add a drink to order.

// First get all drink buttons (with data-type=drink)
const drinkButtons = document.querySelectorAll('[data-type=drink]'); 

// Add event listener onclick. Send name and size to local storage.
drinkButtons
  .forEach((drinkbutton) => 
    drinkbutton.addEventListener("click", (click) => 
       addDrinkToCart(click.target.name, "medium") // TODO: use in modal
    )
);