var foodList [];

function addToFood () {
    var addFood = document.getElementById('addFood').nodeValue;
    foodList.push(addFood);

    for (i = 0; i < foodList.length; i++) {
        var newFood = "<a href='#' onClick='removeRecord(" + i + ");'>X</a> " + foodList[i] + " <br>";
    };
    document.getElementById('foods').innerHTML += newFood;
}

function removeRecord (i) {
    var j = i;
    var tempList = [];
    var newFood = "";

    for (var i = 0; i < foodList.length; i++) {
        if(i != j) {
            tempList.push(foodList[i]);
        }
    };
    foodList = tempList;

    for (var i = 0; i < foodList.length; i++) {
        newFood += "<a href='#' onClick='removeRecord(" + i + ");'>X</a> " + foodList[i] + " <br>";
    };
    document.getElementById('foods').innerHTML = newFood;
}