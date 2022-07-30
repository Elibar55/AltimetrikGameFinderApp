function darkMode() {
  let darkModeBtn = document.querySelector('.dark-mode-switch')
  let styles = document.getElementById('styles')
  let cardBtns = document.getElementById('card-buttons-script')
  let modalStyle = document.getElementById('modal-style')
  let responsiveMenu = document.querySelector('.menu')

  if (darkModeBtn.getAttribute('src') === '/assets/dark-mode/Off.svg') {
    darkModeBtn.src = '/assets/dark-mode/On.svg'
    styles.setAttribute('href', '/styles/cards-list.css')
    cardBtns.setAttribute('src', '/JS/cards-buttons.js')
    modalStyle.setAttribute('href', '/styles/modal.css')
    responsiveMenu.style.background = "#FFFFFF"
  } else {
    darkModeBtn.src = '/assets/dark-mode/Off.svg'
    styles.setAttribute('href', '/styles/light-mode.css')
    cardBtns.setAttribute('src', '/JS/cards-buttons-light.js')
    modalStyle.setAttribute('href', '/styles/modal-light.css')
    responsiveMenu.style.background = "#2a2a2a"
  }
}
