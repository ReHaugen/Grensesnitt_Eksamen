import { checkLoginOrRedirect, logout } from "../../Domene/common.js";

// redirects user to login screen if not logged in.
checkLoginOrRedirect();

document.querySelectorAll('.alert').forEach(el => el.onclick = () => alertFunction());
function alertFunction(){
    alert("Denne siden er under arbeid!");
}

document.querySelector('#logout').onclick = () => { 
    logout()
    window.location.replace('../Login_Page/LoginPage.html') 
}