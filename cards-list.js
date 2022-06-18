let page = 1
let body = ''
let lastGame

const container = document.getElementById('container')
const URL = `https://api.rawg.io/api/games?key=d16525c19948468798732d35e4657b48&page=${page}&page_size=20`
//SCROLL LOADER

let scrollWatcher = new IntersectionObserver(
  (entry, scrollWatcher) => {
    entry.forEach((entry) => {
      if (entry.isIntersecting) {
        page++
        loadGames()
      }
    })
  },
  {
    rootMargin: '0px 0px 600px 0px',
    threshold: 0.5,
  },
)

//DATA LOADER

const loadGames = async () => {
  fetch(
    URL,
  )
    .then((response) => response.json())
    .then(({ results }) => {
      gamesData(results)
    })
    .catch((error) => console.log(error))

  const gamesData = (data) => {
    console.log(data)
    
    for (let i = 0; i < data.length; i++) {
      body += `
         <div class="card">
         <div class="game-image">
           <img class="card-img" src=${data[i].background_image} alt="" />
         </div>
         <div class="game-info">
         
           <div class="game-title">${data[i].name}</div>
           <div class="game-number">#${i + 1}</div>
           
           </div>
           <div class="game-stats">
           <div class="game-release">
             <div>Release date:</div>
             <div class="game-data">${data[i].released}</div>
             <div class="platforms">
             ${data[i].parent_platforms.map(
               (p) => `<img src="/assets/platforms/${p.platform.name}.svg"/>`
             )}
              
            </div>
           </div>
           <div class="game-genres">
             <div>Genres:</div>
            <div class="game-data">${data[i].genres.map(
              (g) => `<div class="genres-data">${g.name}</div> `,
            )}</div>
           </div>
            
         </div>
       </div>`
    }
    document.getElementById('container').innerHTML = body
    const gamesLoaded = document.querySelectorAll('.container .card')
    lastGame = gamesLoaded[gamesLoaded.length - 3]
    scrollWatcher.observe(lastGame)
  }
}

loadGames()

