const form = document.getElementById('login-form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const submit = document.getElementById('login-button')
const usersApi = "http://localhost:3000/signin"

const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/
const passPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

function validation() {
  if( !(emailPattern.test(email.value)) ) {
    return false;
  }
  else if ( !(passPattern.test(password.value)) ) {
    return false;
  }
  // Si el script ha llegado a este punto, todas las condiciones
  // se han cumplido, por lo que se devuelve el valor true
  return true;
}

email.addEventListener('input', () => {
  const emailBox = document.querySelector('#email')
 
  //const emailText = document.querySelector('.email-text')

  if (email.value.match(emailPattern)) {
    emailBox.classList.add('valid')
    emailBox.classList.remove('error')
    
    //emailText.innerHTML = 'Valid Email address'
  } else {
    emailBox.classList.add('error')
    emailBox.classList.remove('valid')
  
    //emailText.innerHTML = 'Must be a valid Email address'
  }
})

password.addEventListener('input', () => {
  const passBox = document.querySelector('#password')
  const passIconSucc = document.querySelector('.icon-success')
  const passIconErr = document.querySelector('.icon-error')
  

  if (password.value.match(passPattern)) {
    passBox.classList.add('valid')
    passBox.classList.remove('error')
    passIconSucc.classList.remove('hidden')
    passIconErr.classList.add('hidden')
    
  } else {
    passBox.classList.add('error')
    passBox.classList.remove('valid')
    passIconSucc.classList.add('hidden')
    passIconErr.classList.remove('hidden')
    
  }
})


//  if ((email.value == true) && (password.value == true)) {
//     submit.disabled = false;
//     console.log('podes loguear')
//   } else {
//     submit.disabled = true;
//   }

  let button = submit.addEventListener("click", (e) => {
    e.preventDefault();
  
    fetch(usersApi, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.error) {
          alert("Error Password or Username"); /*displays error message*/
        } else {
          localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

