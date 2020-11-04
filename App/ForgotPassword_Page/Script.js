//GETTING INPUTS
var email = document.forms["vform"]["email"];

//GETTING ERROR DISPLAY
var name_error = document.getElementById("email_error");


//SETTING EVENT LISTENERS
email.addEventListener("blur", emailVerify, true);

//Validate function
function Validate() {
    //Username validation
    if (email.value == "") {
        email.style.border = "1px solid red";
        email_error.textContent = "Email is required";
        email.focus();
        return false

    }
}
//EVENT HANDLER
function emailVerify() {
    if (email.value != "") {
        email.style.border = "1px solid #5E6E66;";
        email_error.innerHTML = "";
        return true;

    }
}

