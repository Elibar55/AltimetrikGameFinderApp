const autoCompleteBox = document.getElementById('auto-complete')


const searchGame = async (query) => {
  const url = `https://api.rawg.io/api/games?key=d16525c19948468798732d35e4657b48&search=${query}&page_size=4`
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
           <div id="${data[e].id}" class="search-results" >${data[e].name}</div>

          `
  }
  autoCompleteBox.innerHTML = body


  var resultsRendered = document.querySelectorAll('.search-results')
  resultsRendered.forEach((resultsRendered) => {
    resultsRendered.addEventListener('click', () => {
      autoCompleteBox.classList.add('hidden')
      fetch(
        `https://api.rawg.io/api/games/${resultsRendered.id}?key=d16525c19948468798732d35e4657b48`,
      )
        .then((res) => res.json())
        .then((res) => {          
          const container = document.getElementById('container')
          container.innerHTML = ""
           container.innerHTML += `  <div class="card small-card">
        <img src=${res.background_image} alt="" />
        <div class="card-data">
          <div class="card-title">
            <div class="name card-name-small">${res.name}</div>
            <div class="card-number">#1</div>
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
          <div class="consoles">${res.parent_platforms.map(
            (p) =>
              `<img class="platforms" src="/assets/platforms/${p.platform.name}.svg"/>`,
          )}</div>
        </div>
          <div class="card-description hidden">
          ${res.description}
          </div>
        </div>
      </div>`
     
      let recoveredData = localStorage.getItem("lastSearches")
      if (recoveredData == null) {
        localStorage.setItem('lastSearches', JSON.stringify([{id: `${res.id}`, name: `${res.name}`}]))
      } else {
        let dataSearches = JSON.parse(recoveredData)
        if(dataSearches.length > 1) {
          dataSearches.reverse()
          dataSearches.pop()
        }
        let newSearch = {id:`${res.id}`, name:`${res.name}`}
        dataSearches.push(newSearch)
        localStorage.setItem('lastSearches', JSON.stringify(dataSearches))
      }
        })
    })
  })
}

let searchTimeoutToken = 0

window.onload = () => {
  const searchFieldElement = document.getElementById('search')
  searchFieldElement.onkeyup = (event) => {
    clearTimeout(searchTimeoutToken)

    if (searchFieldElement.value.trim().length === 0) {
      autoCompleteBox.classList.add('hidden')
      return
    } else {
      autoCompleteBox.classList.remove('hidden')
    }

    searchTimeoutToken = setTimeout(() => {
      searchGame(searchFieldElement.value)
    }, 50)
  }
}
