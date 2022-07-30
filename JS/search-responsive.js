let searchBar = document.querySelector('.nav-bar-search')


function openSearch() {
    searchBar.style.display = "block"
    overlay.classList.add('overlay-modal')
}
function closeSearch(){
    searchBar.style.display = "none"
    overlay.classList.remove('overlay-modal')
} 

