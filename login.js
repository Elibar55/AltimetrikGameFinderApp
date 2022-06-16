const emailBox = document.querySelector('#email')
const passBox = document.querySelector('#password')
const passIconSucc = document.querySelector('.icon-success')
const passIconErr = document.querySelector('.icon-error')
var userData = ''

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
                
                
                localStorage.setItem("accessToken", JSON.stringify(data.accessToken))
                localStorage.setItem("userData", JSON.stringify(data.user))
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
