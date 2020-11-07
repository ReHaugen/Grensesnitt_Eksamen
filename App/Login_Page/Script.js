import { setUserId } from '../../Domene/common.js'
// Use this function when successfully logged in
setUserId("Juni"); // <-- Username

//GETTING INPUTS
const username = document.querySelector("input[name=username]");
const password = document.querySelector("input[name=password]");
const loginBtn = document.querySelector("button[name=loginBtn]");
const loginGuestBtn = document.querySelector("button[name=loginGuestBtn]");

//GETTING ERROR DISPLAY
const name_error = document.getElementById("name_error");
const password_error = document.getElementById("password_error");


loginBtn.onclick = () => {
    if(isValid()) {
        setUserId(username.value);
        window.location.replace('../Menu_Page/MenuPage.html');
    } 
}

loginGuestBtn.onclick = () => {
    setUserId("GJEST");
    window.location.replace('../Menu_Page/MenuPage.html'); 
}

//Validate function
function isValid() {
    //Username validation
    if (username.value == "") {
        username.style.border = "1px solid red";
        name_error.textContent = "Brukernavn er påkrevd";
        username.focus();
        return false;
    } else {
        username.style.border = "1px solid #5E6E66;";
        name_error.innerHTML = "";
    }
    //Password validation
    if (password.value == "") {
        password.style.border = "1px solid red";
        password_error.textContent = "Passord er påkrevd";
        password.focus();
        return false;
    } else {
        password.style.border = "1px solid #5E6E66;";
        password_error.innerHTML = "";
    }

    return true;
}


