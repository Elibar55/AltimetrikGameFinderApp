const searchGame = async (query) => {
  const url = `https://api.rawg.io/api/games?key=d16525c19948468798732d35e4657b48&search=${query}`
  fetch(url)
    .then((response) => response.json())
    .then(({ results }) => {
      console.log(results)
      renderResults(results)
      body = ''
      document.getElementById('error-message').innerHTML = ''
    })
    .catch((error) => {
      document.getElementById('error-message').innerHTML = error
      renderResults([])
    })
}

const renderResults = (data) => {
  for (let e = 0; e < data.length; e++) {
    body += `
         <div class="card">
         <div class="game-image">
           <img class="card-img" src=${data[e].background_image} alt="" />
         </div>
         <div class="game-info">
         
           <div class="game-title">${data[e].name}</div>
           <div class="game-number">#${e + 1}</div>
           
           </div>
           <div class="game-stats">
           <div class="game-release">
             <div>Release date:</div>
             <div class="game-data">${data[e].released}</div>
             <div class="platforms">
             ${data[e].parent_platforms.map(
               (p) => `<img src="/assets/platforms/${p.platform.name}.svg"/>`,
             )}
              
            </div>
           </div>
           <div class="game-genres">
             <div>Genres:</div>
            <div class="game-data">${data[e].genres.map(
              (g) => `<div class="genres-data">${g.name}</div> `,
            )}</div>
           </div>
            
         </div>
       </div>`
  }
  document.getElementById('container').innerHTML = body
}

let searchTimeoutToken = 0

window.onload = () => {
  const searchFieldElement = document.getElementById('search')
  searchFieldElement.onkeyup = (event) => {
    clearTimeout(searchTimeoutToken)

    if (searchFieldElement.value.trim().length === 0) {
      return
    }
    searchTimeoutToken = setTimeout(() => {
      searchGame(searchFieldElement.value)
    }, 250)
  }
}
