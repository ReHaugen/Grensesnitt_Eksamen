import { setUserId } from '../../Domene/common.js'
// Use this function when successfully logged in
setUserId("Juni"); // <-- Username

//GETTING INPUTS
var username = document.forms["vform"]["username"];
var password = document.forms["vform"]["password"];


//GETTING ERROR DISPLAY
var name_error = document.getElementById("name_error");
var password_error = document.getElementById("password_error");

//SETTING EVENT LISTENERS
username.addEventListener("blur", nameVerify, true);
password.addEventListener("blur", passwordVerify, true);

//Validate function
function Validate() {
    //Username validation
    if (username.value == "") {
        username.style.border = "1px solid red";
        name_error.textContent = "Username is required";
        username.focus();
        return false

    }
    //Password validation
    if (password.value == "") {
        password.style.border = "1px solid red";
        password_error.textContent = "Password is required";
        password.focus();
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
function passwordVerify() {
    if (password.value != "") {
        password.style.border = "1px solid #5E6E66;";
        password_error.innerHTML = "";
        return true;

    }
}


