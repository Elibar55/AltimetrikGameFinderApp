let page = 1
let games = ''
let lastGame
let gamesCollection = []
let darkModeBtn = document.querySelector('.dark-mode-switch')

//Scroll watcher
let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        page++
        loadGames()
      }
    })
  },
  {
    rootMargin: '0px 0px 300px 0px',
    threshold: 1.0,
  },
)

// Games Loader
const loadGames = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=ca592f1000fa42228f6320fb85b99587&page=${page}&page_size=20`,
    )

    // If response is OK
    if (response.status === 200) {
      const data = await response.json()
      data.results.forEach((item) => {
        gamesCollection.push(item)
      })

      gamesCollection.forEach((game) => {
        if (document.getElementById(`${game.id}`)) {
        } else {
          let releasedApi = game.released
          let released = new Date(releasedApi.split('-').join('/'))
          let releasedDate =
            released.toLocaleString('default', { month: 'short' }) +
            ' ' +
            released.toLocaleString('default', { day: 'numeric' }) +
            ', ' +
            released.toLocaleString('default', { year: 'numeric' })
    
          games += `
        <div id="${game.id}" class="card small-card" onclick="modal(this)">
          <img class="small-bkg-img" src=${game.background_image} alt="" />
          <div class="card-data">
            <div class="card-title">
              <div class="name card-name-small">${game.name}</div>
              <div class="card-number">#${
                gamesCollection.indexOf(game) + 1
              }</div>
            </div>
            <div class="card-info">
            <div class="specs card-specs-small">
              <div class="release">
                Release date:
                <strong class="data-realeased">${releasedDate}</strong>
              </div>
              <div class="genres">
                Genres:
                <strong class="data-genres">${game.genres.map(
                  (g) => `${g.name}`,
                )}</strong>
              </div>
            </div>
            <div id="consoles${game.id}" class="consoles">    
            </div>
          </div>
            <div id="desc${game.id}" class="card-description hidden">
            </div>
            <div id="consolesM${game.id}" class="consolesM">    
            </div>
          </div>
        </div>
           `;
          (function platformsAndDescription() {
            fetch(
              `https://api.rawg.io/api/games/${game.id}?key=ca592f1000fa42228f6320fb85b99587`,
            )
              .then((res) => res.json())
              .then((res) => {
                let description = document.getElementById(`desc${game.id}`)
                let consolesF = document.getElementById(`consoles${game.id}`)
                let consolesM = document.getElementById(`consolesM${game.id}`)
                description.innerHTML = `${res.description}`

                let platformsItems = res.parent_platforms.map(
                  (p) => p.platform.name,
                )

                const filteredPC = platformsItems.filter((item) => {
                  return item == 'PC'
                })
                const filteredXbox = platformsItems.filter((item) => {
                  return item == 'Xbox'
                })
                const filteredNintendo = platformsItems.filter((item) => {
                  return item == 'Nintendo'
                })
                const filteredPlaystation = platformsItems.filter((item) => {
                  return item == 'PlayStation'
                })

                let filteredPlatforms = [
                  ...filteredPC,
                  ...filteredXbox,
                  ...filteredNintendo,
                  ...filteredPlaystation,
                ]

                for (let f = 0; f < filteredPlatforms.length; f++) {
                  if (
                    darkModeBtn.getAttribute('src') ===
                    '/assets/dark-mode/Off.svg'
                  ) {
                    consolesF.innerHTML += `<img class="platforms" src="/assets/platforms/${filteredPlatforms[f]}-light.svg"/>`
                    consolesM.innerHTML += `<img class="platformsM" src="/assets/platforms/${filteredPlatforms[f]}-light.svg"/>`
                  }
                  if (
                    darkModeBtn.getAttribute('src') ===
                    '/assets/dark-mode/On.svg'
                  ) {
                    consolesF.innerHTML += `<img class="platforms" src="/assets/platforms/${filteredPlatforms[f]}.svg"/>`
                    consolesM.innerHTML += `<img class="platformsM" src="/assets/platforms/${filteredPlatforms[f]}.svg"/>`
                  }
                }
              })
          })();
        }
      })
      document.getElementById('container').innerHTML = games
      if (lastGame) {
        observer.unobserve(lastGame)
      }
      const gamesOnScreen = document.querySelectorAll('#container .card')
      lastGame = gamesOnScreen[gamesOnScreen.length - 1]
      observer.observe(lastGame)
    } else if (respuesta.status === 401) {
      console.log('Wrong API key')
    } else if (respuesta.status === 404) {
      console.log('The id does not match any game')
    } else {
      console.log('Some error')
    }
  } catch (error) {
    console.log(error)
  }
}

loadGames()
