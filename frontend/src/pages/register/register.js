/**
 * Function for data recovery from the register.
 * all the information from the ussers will
 * be picked up from here and inserted into the clever cloud DB
 */
document.getElementById("register_form").addEventListener("submit",(event)=>{
    event.preventDefault()
    const usserName = document.getElementById("name").value;
    const addres = document.getElementById("address").value;
    const passWord = document.getElementById("password").value;
    const confirmation = document.getElementById("conf_pass").value;

    return {usserName, addres, passWord, confirmation}
});

export {usserName, addres, passWord, confirmation}

// document.getElementById("miCheckbox").addEventListener("click", (event) => {
//     const passwordInput = document.getElementById("password");
//     if (event.target.checked) {
//         passwordInput.type = 'text';
//     } else {
//         passwordInput.type = 'password';
//     }
// });