const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
    //get values from inputs
   const email = email.value.trim(); 
   const password = password.value.trim();

   if(emailValue === '') {
       //show error
       //add error class
       setErrorFor(email, 'Email cannot be blank');
   } else if(!isEmail(emailValue)) {
       setErrorFor(email, 'Email is not valid');
   } else {
       // add success class
       setSuccessFor(email)
   }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; //.email-box
    const small = formControl.querySelector('small');

    //add error message inside small
    small.innerText = message;

    //add error class
    formControl.className = 'error'
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'valid'
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}