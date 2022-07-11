let page = 1
let body = ''
let lastGame

const container = document.getElementById('container')


//SCROLL LOADER

let scrollWatcher = new IntersectionObserver(
  (entry, scrollWatcher) => {
    entry.forEach((entry) => {
      if (entry.isIntersecting) {
        page ++
        loadGames()
        
      }
    })
  },
  {
    rootMargin: '0px 0px 300px 0px',
    threshold: 0.5,
  },
)

//DATA LOADER

const loadGames = async () => {
  fetch(`https://api.rawg.io/api/games?key=d16525c19948468798732d35e4657b48&page=${page}&page_size=20`)
    .then((response) => response.json())
    .then(({ results }) => {
      gamesData(results)
    })
    .catch((error) => console.log(error))

  const gamesData = (data) => {
    console.log(data)
  
    for (let i = 0; i < data.length; i++) {
      body += `
      <div class="card small-card">
        <img src=${data[i].background_image} alt="" />
        <div class="card-data">
          <div class="card-title">
            <div class="name card-name-small">${data[i].name}</div>
            <div class="card-number">#${i + 1}</div>
          </div>
          <div class="card-info">
          <div class="specs card-specs-small">
            <div class="release">
              Release date:
              <strong class="data-realeased">${data[i].released}</strong>
            </div>
            <div class="genres">
              Genres:
              <strong class="data-genres">${data[i].genres.map(
                (g) => `${g.name}`,
              )}</strong>
            </div>
          </div>
          <div class="consoles">${data[i].parent_platforms.map((p) =>`<img class="platforms" src="/assets/platforms/${p.platform.name}.svg"/>`)}</div>
        </div>
          <div id="${data[i].id}" class="card-description hidden">
                ${ fetch(`https://api.rawg.io/api/games/${data[i].id}?key=d16525c19948468798732d35e4657b48`)
                .then((res) => res.json())
                .then((res) => { 
                  const description = document.getElementById(data[i].id)
                  description.innerHTML = `${res.description}`    
                }) }
          </div>
        </div>
      </div>
         `
    }
    document.getElementById('container').innerHTML = body
    const gamesLoaded = document.querySelectorAll('#container .card')
    lastGame = gamesLoaded[gamesLoaded.length - 1]
    scrollWatcher.observe(lastGame)
  }
}

loadGames()
