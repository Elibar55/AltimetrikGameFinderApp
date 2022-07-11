function lastSearches() {
  container.innerHTML = ''
  let storagedSearches = JSON.parse(localStorage.getItem('lastSearches'))
  
  for (let i = 0; i < storagedSearches.length; i++) {
    fetch(
      `https://api.rawg.io/api/games/${storagedSearches[i].id}?key=d16525c19948468798732d35e4657b48`,
    )
      .then((res) => res.json())
      .then((res) => {
        
        const container = document.getElementById('container')

        container.innerHTML += `  <div class="card small-card">
                <img src=${res.background_image} alt="" />
                <div class="card-data">
                  <div class="card-title">
                    <div class="name card-name-small">${res.name}</div>
                    <div class="card-number">#${i+1}</div>
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
      })
  }
}
