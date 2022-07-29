const autoCompleteBox = document.getElementById('auto-complete')
const searchFieldElement = document.getElementById('search')
const overlaySearch = document.getElementById('overlay')

if (searchFieldElement.value != ""){
  overlaySearch.classList.add('overlay-search')
} else {
  overlaySearch.classList.remove('overlay-search')
}

const searchGame = async (query) => {
  const url = `https://api.rawg.io/api/games?key=ca592f1000fa42228f6320fb85b99587&search=${query}&page_size=4`
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
    autoCompleteBox.innerHTML += `<div id="${data[e].id}" class="search-results" >${data[e].name}</div>`
  }

  var resultsRendered = document.querySelectorAll('.search-results')
  resultsRendered.forEach((resultsRendered) => {
    resultsRendered.addEventListener('click', () => {
      autoCompleteBox.classList.add('hidden')
      overlaySearch.classList.remove('overlay-search')
      closeSearch()
      searchFieldElement.value = ''
      fetch(
        `https://api.rawg.io/api/games/${resultsRendered.id}?key=ca592f1000fa42228f6320fb85b99587`,
      )
        .then((res) => res.json())
        .then((res) => {
          let releasedApi = res.released
          let released = new Date(releasedApi.split('-').join('/'))
          let releasedDate =
            released.toLocaleString('default', { month: 'short' }) +
            ' ' +
            released.toLocaleString('default', { day: 'numeric' }) +
            ', ' +
            released.toLocaleString('default', { year: 'numeric' })

          const container = document.getElementById('container')
          container.innerHTML = ''
          container.innerHTML += `  <div id="${
            res.id
          }" class="card small-card" onclick="modal(this)">
        <img class="small-bkg-img" src=${res.background_image} alt="" />
        <div class="card-data">
          <div class="card-title">
            <div class="name card-name-small">${res.name}</div>
            <div class="card-number">#1</div>
          </div>
          <div class="card-info">
          <div class="specs card-specs-small">
            <div class="release">
              Release date:
              <strong class="data-realeased">${releasedDate}</strong>
            </div>
            <div class="genres">
              Genres:
              <strong class="data-genres">${res.genres.map(
                (g) => `${g.name}`,
              )}</strong>
            </div>
          </div>
          <div id="consoles${res.id}" class="consoles"></div>
        </div>
          <div id="desc${res.id}" class="card-description hidden">
          </div>
        </div>
      </div>`

          function platformsAndDescription() {
            fetch(
              `https://api.rawg.io/api/games/${res.id}?key=ca592f1000fa42228f6320fb85b99587`,
            )
              .then((res) => res.json())
              .then((res) => {
                let description = document.getElementById(`desc${res.id}`)
                let consolesF = document.getElementById(`consoles${res.id}`)
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
                  }
                  if (
                    darkModeBtn.getAttribute('src') ===
                    '/assets/dark-mode/On.svg'
                  ) {
                    consolesF.innerHTML += `<img class="platforms" src="/assets/platforms/${filteredPlatforms[f]}.svg"/>`
                  }
                }
              })
          }
          platformsAndDescription()

          let recoveredData = localStorage.getItem('lastSearches')
          if (recoveredData == null) {
            localStorage.setItem(
              'lastSearches',
              JSON.stringify([{ id: `${res.id}`, name: `${res.name}` }]),
            )
          } else {
            let dataSearches = JSON.parse(recoveredData)
            if (dataSearches.length > 1) {
              dataSearches.reverse()
              dataSearches.pop()
            }
            let newSearch = { id: `${res.id}`, name: `${res.name}` }
            dataSearches.push(newSearch)
            localStorage.setItem('lastSearches', JSON.stringify(dataSearches))
          }
        })
    })
  })
}

let searchTimeoutToken = 0

window.onload = () => {
  searchFieldElement.onkeyup = (event) => {
    clearTimeout(searchTimeoutToken)

    if (searchFieldElement.value.trim().length === 0) {
      autoCompleteBox.innerHTML = ""
      autoCompleteBox.classList.add('hidden')
      overlaySearch.classList.remove('overlay-search')
      return
    } else {
      autoCompleteBox.classList.remove('hidden')
      overlaySearch.classList.add('overlay-search')
    }

    searchTimeoutToken = setTimeout(() => {
      searchGame(searchFieldElement.value)
    }, 100)
  }
}
