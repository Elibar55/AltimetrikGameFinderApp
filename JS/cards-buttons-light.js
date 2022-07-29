const smallCards = document.querySelector('.small-cards-light')
const largeCards = document.querySelector('.large-cards-light')

smallCards.addEventListener('click', () => {
  document.querySelector('.svg-small').src =
    '/assets/icons/small-cards-active-light.svg'
  document.querySelector('.svg-large').src =
    '/assets/icons/large-cards-inactive-light.svg'
  smallCards.classList.add('active')
  smallCards.classList.remove('inactive')
  largeCards.classList.add('inactive')
  largeCards.classList.remove('active')

  container.classList.add('container-small')
  container.classList.remove('container-large')

  const cards = document.querySelectorAll('.card')
  cards.forEach((cards) => {
    cards.classList.add('small-card')
    cards.classList.remove('large-card')
  })

  const cardName = document.querySelectorAll('.name')
  cardName.forEach((cardName) => {
    cardName.classList.add('card-name-small')
    cardName.classList.remove('card-name-large')
  })

  const cardSpecs = document.querySelectorAll('.specs')
  cardSpecs.forEach((cardSpecs) => {
    cardSpecs.classList.add('card-specs-small')
    cardSpecs.classList.remove('card-specs-large')
  })

  const description = document.querySelectorAll('.card-description')
  description.forEach((description) => {
    description.classList.add('hidden')
  })
})

largeCards.addEventListener('click', () => {
  document.querySelector('.svg-small').src =
    '/assets/icons/small-cards-inactive-light.svg'
  document.querySelector('.svg-large').src =
    '/assets/icons/large-cards-active-light.svg'
  smallCards.classList.add('inactive')
  smallCards.classList.remove('active')
  largeCards.classList.add('active')
  largeCards.classList.remove('inactive')

  container.classList.add('container-large')
  container.classList.remove('container-small')

  const cards = document.querySelectorAll('.card')
  cards.forEach((cards) => {
    cards.classList.add('large-card')
    cards.classList.remove('small-card')
  })

  const cardName = document.querySelectorAll('.name')
  cardName.forEach((cardName) => {
    cardName.classList.add('card-name-large')
    cardName.classList.remove('card-name-small')
  })

  const cardSpecs = document.querySelectorAll('.specs')
  cardSpecs.forEach((cardSpecs) => {
    cardSpecs.classList.add('card-specs-large')
    cardSpecs.classList.remove('card-specs-small')
  })

  const description = document.querySelectorAll('.card-description')
  description.forEach((description) => {
    description.classList.remove('hidden')
  })
})
