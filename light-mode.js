function darkMode() {
   let darkModeBtn = document.getElementById('dark-mode-switch')
    let styles = document.getElementById('styles')
    let cardBtns = document.getElementById('card-buttons-script')
    let modalStyle = document.getElementById('modal-style')

    if (darkModeBtn.getAttribute('src') === '/assets/dark-mode/Off.svg'){
        darkModeBtn.src = '/assets/dark-mode/On.svg'
        styles.setAttribute("href","/assets/styles/cards-list.css");
        cardBtns.setAttribute("src", "/cards-buttons.js") 
        modalStyle.setAttribute("href", "/assets/styles/modal.css")
        
    } else {
        darkModeBtn.src = '/assets/dark-mode/Off.svg'
        styles.setAttribute("href","/assets/styles/light-mode.css"); 
        cardBtns.setAttribute("src", "/cards-buttons-light.js")
        modalStyle.setAttribute("href", "/assets/styles/modal-light.css")
        
        
    }
}