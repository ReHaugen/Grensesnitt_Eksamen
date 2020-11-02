const form = document.getElementById("vform");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");

form addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const nameValue = name.value.trim();
    const lastNameValue = lastname.value.trim();
    const eMailValue = email.value.trim();
    const userNameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (userNameValue == "") {
        setErrorFor(username, "Username cannot be blank");

    }else {
        setSuccesFor(username);

    }
}

function setErrorFor(input, message)



