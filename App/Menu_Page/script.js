var orderQuantity = 1;
var menuitemname = "";
var smallPrice = 0;
var mediumPrice = 0;
var largePrice = 0;
var foodPrice = 0;
var displayQuantity = document.getElementById("quantityCounter");
var quantityError = document.getElementById("error");
var addBtn = document.getElementById("add_btn");
var subtractBtn = document.getElementById("subtract_btn");
var itemName = document.getElementById("menuitem");
var itemPhoto = document.getElementById("photoContainer");
var drinkSize = document.getElementById("changeSizeContainer");
var foodPriceTxt = document.getElementById("pricetxt");
var foodPriceDiv = document.getElementById("foodPrice");
var smalltext = document.getElementById("smalltxt");
var mediumtext = document.getElementById("mediumtxt");
var largetext = document.getElementById("largetxt");
var drinkButtons = document.getElementsByClassName("drink-button");
var foodButtons = document.getElementsByClassName("food-button");



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
/**/

window.onload = function() {
foodInfo();
drinkInfo();
}
  function foodInfo (){
  for(var i = 0; i < foodButtons.length; i++) {
    var fbtn = foodButtons[i];
    menuitemname = this.id;

    fbtn.addEventListener('click', displayFoodInfo, false);

    function displayFoodInfo(e){
      orderQuantity = 1;
      displayQuantity.innerHTML = `${orderQuantity}`;
      menuitemname = this.id;
      itemName.innerHTML = `${menuitemname}`;
      itemPhoto.innerHTML = `<img src="Images/${menuitemname}.jpeg" alt="${menuitemname}" id = "menuPhoto"></img>`;
      drinkSize.style.display = "none";
      foodPriceDiv.style.display = "block";

      if (menuitemname === "brownies"){
        foodPrice = 44;
      } else if (menuitemname === "oreokake"){
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
      
      modal.style.display = "block";
    }
}
}

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

        if (menuitemname === "filterkaffe"){
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
        } else if (menuitemname === "espresso"){
          smallPrice = 34;
          mediumPrice = 38;
          largePrice = 42;
        } else if (menuitemname === "cortado"){
          smallPrice = 36;
          mediumPrice = 40;
          largePrice = 44;
        } else if (menuitemname === "iste"){
          smallPrice = 38;
          mediumPrice = 47;
          largePrice = 55;
        }

        smalltext.innerHTML = `Liten<br><b>${smallPrice},-</b>`;
        mediumtext.innerHTML = `Medium<br><b>${mediumPrice},-</b>`;
        largetext.innerHTML = `Stor<br><b>${largePrice},-</b>`;


        modal.style.display = "block";
      }
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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