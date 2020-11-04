//GETTING INPUTS
var name = document.forms["vform"]["name"];
var lastname = document.forms["vform"]["lastname"];
var email = document.forms["vform"]["email"];
var username = document.forms["vform"]["username"];
var password = document.forms["vform"]["password"];


//GETTING ERROR DISPLAY
var name_error = document.getElementById("name_error");
var lname_error = document.getElementById("lname_error");
var email_error = document.getElementById("email_error");
var username_error = document.getElementById("username_error");
var password_error = document.getElementById("password_error");

//SETTING EVENT LISTENERS
name.addEventListener("blur", nameVerify, true);
lastname.addEventListener("blur", lastnameVerify, true);
email.addEventListener("blur", emailVerify, true);
username.addEventListener("blur", usernameVerify, true);
password.addEventListener("blur", passwordVerify, true);

//Validate function
function Validate() {
    //Name validation
    if (name.value == "") {
        name.style.border = "1px solid red";
        name_error.textContent = "Name is required";
        name.focus();
        return false

    }
    //Lastname validation
    if (lastname.value == "") {
        lastname.style.border = "1px solid red";
        lname_error.textContent = "Lastname is required";
        lastname.focus();
        return false

    }
    //Email validation
    if (email.value == "") {
        email.style.border = "1px solid red";
        email_error.textContent = "Email is required";
        email.focus();
        return false

    }
    //Username validation
    if (username.value == "") {
        username.style.border = "1px solid red";
        username_error.textContent = "Username is required";
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
    if (name.value != "") {
        name.style.border = "1px solid #5E6E66;";
        name_error.innerHTML = "";
        return true;

    }
}
function lastnameVerify() {
    if (lastname.value != "") {
        lastname.style.border = "1px solid #5E6E66;";
        lastname_error.innerHTML = "";
        return true;

    }
}
function emailVerify() {
    if (email.value != "") {
        email.style.border = "1px solid #5E6E66;";
        email_error.innerHTML = "";
        return true;

    }
}
function usernameVerify() {
    if (username.value != "") {
        username.style.border = "1px solid #5E6E66;";
        username_error.innerHTML = "";
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




