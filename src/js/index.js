// VARIABLES

const JUEGO = {
  COLORLIST: ['red', 'blue', 'green', 'brown', 'purple', 'pink'],
  randomColors: [],
  ColorUser: [],
  cell: 0,
  line: 1
}

let { COLORLIST, randomColors, ColorUser, line, cell } = JUEGO

const DOM = {
  check: function () { return document.querySelector('#check')},
  resetRound: function () { return document.querySelector('#restart') },
  exitButton: function () { return document.querySelector('#exit-button') },
  checkbox: function () { return document.querySelectorAll('.result div ') },
  androidSlot: function () { return document.querySelectorAll('.androidSelector  img') },
  compareSlot: function () { return document.querySelectorAll(`section.checkbox${line} > div`) },
  slots: function () { return document.querySelectorAll(`section.row${line}  img`) },
  player: function () { return document.querySelectorAll('.mainSelector img') }
}
const { check, resetRound, exitButton, checkbox, androidSlot, compareSlot, slots, player } = DOM

// Function

const paint = function (event) {
  console.log(event)
  if (line <= 12) {
    colorCell(event)
    if ((slots().length) === cell) {
      nextTry()
    }
  } else {
    resetGame()
    window.alert('You have lost mate, maybe another round?')
  }
}

const colorCell = function (event) {
  ColorUser.push(event.target.classList[0])

  slots()[cell].src = `./assets/${event.target.classList[0]}.png`
  cell++
}

const nextTry = function () {
  check().disabled = false
  player().forEach(function (button) {
    button.removeEventListener('click', paint)
  })
}

const compare = function () {
  const test2 = validateColors()
  compareSlot().forEach(function (element, index) {
    element.classList.replace('white', test2[index])
  })
  line++
  cell = 0

  const hasWon = conditionVictory(test2)

  if (hasWon) resetGame()
  ColorUser = []

  check().disabled = true
  player().forEach(function (button) {
    button.addEventListener('click', paint)
  })

  if (hasWon === true) {
    const appear = document.querySelector('.modal')
    appear.classList.add('appear')
  } else if (line > 12 && cell === 0) {
    alert('perdiste')
  }
}

const validateColors = function () {
  const test1 = ColorUser.map(function (e) {
    return randomColors.indexOf(e)
  })
  const test2 = test1.map(function (e, i) {
    if (e < 0) {
      return 'white'
    } else if (randomColors[i] === ColorUser[i]) {
      return 'black'
    } return 'grey'
  })
  return test2
}

const conditionVictory = function (test2) {
  const hasWon = test2.every(function (item) {
    return item === 'black'
  })

  return hasWon
}

function resetGame () {
  setTimeout(function () {
    line = 1
    ColorUser = []
    cell = 0
  }, 1000)
  for (let i = 0; i < slots().length; i++) {
    slots()[i].classList.replace(slots()[i].classList[1], 'white')
    checkbox()[i].classList.replace(checkbox()[i].classList[0], 'white')
  }
}

const androidSelector = function () {
  while (randomColors.length < 5) {
    const randomChoice = Math.floor(Math.random() * (COLORLIST.length))
    if (!randomColors.includes(COLORLIST[randomChoice])) {
      randomColors.push(COLORLIST[randomChoice])
    }
  }
  androidSlot().forEach(function (element, i) {
    element.src = `./assets/${randomColors[i]}.png`
  })
}

const mainSelect = function () {
  player().forEach(function (element, index) {
    element.classList.add(COLORLIST[index])
    element.src = `./assets/${COLORLIST[index]}.png`
  })
}
// Evento

exitButton().addEventListener('click', function () {
  const appear = document.getElementById('modal1')
  appear.classList.remove('appear')
})

player().forEach(function (element) {
  element.addEventListener('click', paint)
})
resetRound().addEventListener('click', resetGame)
check().addEventListener('click', compare)

androidSelector()
mainSelect()
