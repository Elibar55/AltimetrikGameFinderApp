const overlay = document.getElementById('overlay')
const overlaySearchBar = document.getElementById('overlay-modal')

function closeModal() {
  let modalSection = document.querySelector('.modal')
  modalSection.classList.add('hidden')
  const modalElements = document.querySelector('.modal-container')
  modalElements.innerHTML = ''
  overlay.classList.remove('overlay-modal')
  overlaySearchBar.classList.remove('overlay-modal-search-bar')
}

function modal(element) {
  overlay.classList.add('overlay-modal')
  overlaySearchBar.classList.add('overlay-modal-search-bar')
  let modalSection = document.querySelector('.modal')
  modalSection.classList.remove('hidden')
  fetch(
    `https://api.rawg.io/api/games/${element.id}?key=ca592f1000fa42228f6320fb85b99587`,
  )
    .then((res) => res.json())
    .then((res) => {
      
      const modalElements = document.querySelector('.modal-container')
      if (darkModeBtn.getAttribute('src') === '/assets/dark-mode/Off.svg') {
        modalElements.style.backgroundImage = ` linear-gradient(
          180deg, 
          rgba(255, 255, 255, 0.1) 0%,
           #F0F0F0 60%),
           url(${res.background_image})`
      }
      if (darkModeBtn.getAttribute('src') === '/assets/dark-mode/On.svg') {
        modalElements.style.backgroundImage = ` linear-gradient(
          180deg,
          rgba(48, 48, 48, 0.1) 0%,
          #303030 60%
        ), url(${res.background_image})`
      }
      let releasedApi = res.released
      let released = new Date(releasedApi.split('-').join('/'))
      let releasedDate =
        released.toLocaleString('default', { month: 'short' }) +
        ' ' +
        released.toLocaleString('default', { day: 'numeric' }) +
        ', ' +
        released.toLocaleString('default', { year: 'numeric' })
        let developer = ""
        let publisher = ""
        let esrb_ratingC = ""
        if(res.publishers.length === 0){
          publisher = "none"
        } else {
          publisher = res.publishers[0].name
        }
        if(res.developers.length === 0){
          developer = "none"
        } else {
          developer = res.developers[0].name
        }
        if(res.esrb_rating === null){
          esrb_ratingC = "Not rated"
        } else {
          esrb_ratingC = res.esrb_rating.name
        }

      modalElements.innerHTML = `
      <div onclick="closeModal()" class="modal-close"><img src="/assets/icons/X.svg" alt="" /></div>
      <div class="modal-spliter">
      <div class="modal-title-container">
        <div class="modal-platforms">
        </div>
        <div class="modal-title">${res.name}</div>
        <div class="modal-markers">
          <div class="modal-date">${releasedDate}</div>
          <div class="modal-ranking">
            <span>#${res.rating_top}</span>
            TOP 2021
          </div>
          <div class="modal-genre">
            <span>#${res.genres.length}</span>
            ${res.genres[0].name}
          </div>
        </div>
        <div class="modal-description">
          ${res.description}
        </div>
        <div class="modal-buttons">
          <button class="modal-whishlist">
            Add to wishlist
            <span>
              <img
                class="modal-heart-icon"
                src="/assets/icons/Heart.svg"
                alt=""
              />
            </span>
          </button>
          <button class="modal-purchase">Purchase</button>
        </div>
        <div class="modal-info-container">
          <div class="modal-info-l">
            <div class="modal-platforms-details">
              <p class="title">Platforms</p>
              <p class="text sub">
              ${res.parent_platforms.map((p) => `${p.platform.name} `)}
              </p>
            </div>
            <div class="modal-release">
              <p class="title">Release Date</p>
              <p class="text">${releasedDate}</p>
            </div>
            <div class="modal-publisher">
              <p class="title">Publisher</p>
              <p class="text sub">${publisher}</p>
            </div>
            <div class="modal-website">
              <p class="title">Website</p>
              <a href=${res.website} class="text sub">${res.website}</a>
            </div>
          </div>
          <div class="modal-info-r">
            <div class="modal-genre-details">
              <p class="title">Genre</p>
              <p class="text sub">${res.genres.map((g) => `${g.name}`)}</p>
            </div>
            <div class="modal-developer">
              <p class="title">Developer</p>
              <p class="text sub">${developer}</p>
            </div>
            <div class="modal-agerating">
              <p class="title">Age rating</p>
              <p class="text">${esrb_ratingC}</p>
            </div>
            <div class="modal-icons">
              <img src="/assets/icons/chat-bubbles.svg" alt="" />
              <img src="/assets/icons/thumbs-up.svg" alt="" />
              <img src="/assets/icons/action.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-preview-container">
        <div class="modal-video">      
          </div>
        <div class="modal-screenshots">          
        </div>
      </div>`

      function platforms() {
        let consolesF = document.querySelector('.modal-platforms')

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

        console.log(filteredPlatforms)
        for (let f = 0; f < filteredPlatforms.length; f++)
          consolesF.innerHTML += `<img class="platform" src="/assets/platforms/${filteredPlatforms[f]}.svg"/>`
      }

      platforms()

      if (res.movies_count > 0) {
        function video() {
          fetch(
            `https://api.rawg.io/api/games/${element.id}/movies?key=ca592f1000fa42228f6320fb85b99587`,
          )
            .then((response) => response.json())
            .then(({ results }) => {
              const modalVideo = document.querySelector('.modal-video')
              modalVideo.innerHTML = `<video src=${results[0].data.max} poster=${results[0].preview} controls></video>`
            })
        }
        video()
      }
      function screenshots() {
        fetch(
          `https://api.rawg.io/api/games/${element.id}/screenshots?key=ca592f1000fa42228f6320fb85b99587&page_size=4`,
        )
          .then((response) => response.json())
          .then(({ results }) => {
            const modalScreenshots = document.querySelector(
              '.modal-screenshots',
            )
            for (let e = 0; e < results.length; e++) {
              modalScreenshots.innerHTML += `<img src=${results[e].image} alt="" />`
            }
          })
      }
      screenshots()
    })
}
