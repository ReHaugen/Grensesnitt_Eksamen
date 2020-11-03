//GETTING INPUTS
var username = document.forms["vform"]["username"];

//GETTING ERROR DISPLAY
var name_error = document.getElementById("name_error");


//SETTING EVENT LISTENERS
username.addEventListener("blur", nameVerify, true);

//Validate function
function Validate() {
    //Username validation
    if (username.value == "") {
        username.style.border = "1px solid red";
        name_error.textContent = "Username is required";
        username.focus();
        return false

    }
}
//EVENT HANDLER
function nameVerify() {
    if (username.value != "") {
        username.style.border = "1px solid #5E6E66;";
        name_error.innerHTML = "";
        return true;

    }
}

