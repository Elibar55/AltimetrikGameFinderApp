<<<<<<< HEAD
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
=======
const emailBox = document.querySelector('#email')
const passBox = document.querySelector('#password')
const passIconSucc = document.querySelector('.icon-success')
const passIconErr = document.querySelector('.icon-error')

class Login {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
    this.validateonSubmit()
  }

  validateonSubmit() {
    let self = this

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      var error = 0
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`)
        if (self.validateFields(input) == false) {
          error++
        }
      })
      if (error == 0) {
        console.log('success')

        fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)

            if (data.error) {
              alert('Error Password or Username') /*displays error message*/
            } else {
              localStorage.setItem(
                'accessToken',
                JSON.stringify(data.accessToken),
              )
              localStorage.setItem('userData', JSON.stringify(data.user))
              this.form.submit()
            }
          })
      }
    })
  }
  validateFields(field) {
    if (field.value.trim() == '') {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText}Field cannot be blank`,
        'error',
      )
      return false
    } else {
      if (field.type == 'password') {
        if (field.value.length < 8) {
          this.setStatus(
            field,
            `${field.previousElementSibling.innerText} Password must be at least 8 characters`,
            'error',
          )
          return false
        } else {
          this.setStatus(field, null, 'success')
          return true
        }
      } else {
        this.setStatus(field, null, 'success')
        return true
      }
    }
  }
  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector('.error-message')

    if (status == 'success') {
      if (errorMessage) {
        errorMessage.innerText = ''
      }
      field.classList.remove('error')
      field.classList.add('valid')
      passIconSucc.classList.remove('hidden')
      passIconErr.classList.add('hidden')
    }

    if (status == 'error') {
      errorMessage.innerText = message
      field.classList.add('error')
      passIconSucc.classList.add('hidden')
      passIconErr.classList.remove('hidden')
    }
  }
}

const form = document.querySelector('.login-form')
if (form) {
  const fields = ['email', 'password']
  const validator = new Login(form, fields)
}
>>>>>>> c196df15b518ec7b05b0ce027c2d148e8bfc8c8d
