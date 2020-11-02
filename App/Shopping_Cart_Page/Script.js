var foodList [];

function addToFood () {
    alert("Hello");
    var addFood = document.getElementById('addFood').nodeValue;
    foodList.push(addFood);

    for (i = 0; i < foodList.length; i++) {
        var newFood = "<a href='#' onClick='removeRecord(" + i + ");'>X</a> " + foodList[i] + " <br>";
    };
    document.getElementById('foods').innerHTML += newFood;
}

function removeRecord (i) {
    foodList.splice(i, 1); //Fjerner elementer fra posisjon 1
    var newFood="";
    for (var i = 0; i < foodList.length; i++) {
        newFood += "<a href='#' onClick='removeRecord(" + i + ");'>X</a> "
        + foodList[i] + " <br>";

    }

}