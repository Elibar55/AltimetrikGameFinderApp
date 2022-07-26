function lastSearches() {
  container.innerHTML = ''
  let storagedSearches = JSON.parse(localStorage.getItem('lastSearches'))

  storagedSearches.forEach((game) => {
    fetch(
      `https://api.rawg.io/api/games/${game.id}?key=d16525c19948468798732d35e4657b48`,
    )
      .then((res) => res.json())
      .then((res) => {
        const container = document.getElementById('container')

        container.innerHTML += `  <div id="${
          res.id
        }" class="card small-card onclick="modal(this)"">
                <img src=${res.background_image} alt="" />
                <div class="card-data">
                  <div class="card-title">
                    <div class="name card-name-small">${res.name}</div>
                    <div class="card-number">#${1}</div>
                  </div>
                  <div class="card-info">
                  <div class="specs card-specs-small">
                    <div class="release">
                      Release date:
                      <strong class="data-realeased">${res.released}</strong>
                    </div>
                    <div class="genres">
                      Genres:
                      <strong class="data-genres">${res.genres.map(
                        (g) => `${g.name}`,
                      )}</strong>
                    </div>
                  </div>
                  <div id="consoles${res.id}" class="consoles">
                  </div>
                </div>
                  <div class="card-description hidden">
                  ${res.description}
                  </div>
                </div>
              </div>`
        function platforms() {
          let consolesF = document.getElementById(`consoles${res.id}`)

          let platformsItems = res.parent_platforms.map((p) => p.platform.name)

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
              darkModeBtn.getAttribute('src') === '/assets/dark-mode/Off.svg'
            ) {
              consolesF.innerHTML += `<img class="platforms" src="/assets/platforms/${filteredPlatforms[f]}-light.svg"/>`
            }
            if (
              darkModeBtn.getAttribute('src') === '/assets/dark-mode/On.svg'
            ) {
              consolesF.innerHTML += `<img class="platforms" src="/assets/platforms/${filteredPlatforms[f]}.svg"/>`
            }
          }
        }

        platforms()
      })
  })
}
