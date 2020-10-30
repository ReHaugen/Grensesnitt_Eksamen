const name = document.getElementById("uName");
const password = document.getElementById("pass");
const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener('submit', (e) => {
    let messages = [];
    if (name.value === '' || name.value == null) {
        messages.push('Name is required');
    }

    

   
});