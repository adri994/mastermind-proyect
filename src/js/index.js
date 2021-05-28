// VARIABLES

const JUEGO = {
  COLORLIST: ['red', 'blue', 'green', 'brown', 'purple', 'pink','greys', 'cyan'],
  randomColors: [],
  ColorUser: [],
  cell: 0,
  line: 1
}

let { COLORLIST, randomColors, ColorUser, line, cell } = JUEGO

const DOM = {
  check: function () { return document.querySelector('#check') },
  resetRound: function () { return document.querySelector('#restart') },
  checkbox: function () { return document.querySelectorAll('.result div ') },
  androidSlot: function () { return document.querySelectorAll('.androidSelector  img') },
  compareSlot: function () { return document.querySelectorAll(`section.checkbox${line} > div`) },
  slots: function () { return document.querySelectorAll(`section.row${line}  img`) },
  allSlot: function () { return document.querySelectorAll('[class^="row"]  img') },
  allCheck: function () { return document.querySelectorAll('[class^="checkbox"]  div') },
  player: function () { return document.querySelectorAll('.mainSelector img') },
  exitButtonLose: function () { return document.querySelector('#exit-button-lose') },
  exitButtonWin: function () { return document.querySelector('#exit-button-win') },
  audioSlot: function () { return document.querySelector('#audio-slot') },
  audioWrong: function () { return document.querySelector('#wrong-selection-audio') },
  winnerSelection: function () { return document.querySelector('#winner-selection') },
  loserAudio: function () { return document.querySelector('#loser-sound') }

}
const { check, resetRound, androidSlot, compareSlot, slots, player, exitButtonWin, exitButtonLose, allSlot, allCheck, audioSlot, audioWrong, winnerSelection, loserAudio } = DOM

// Function

const paint = function (event) {
  if (line <= 12) {
    colorCell(event)
    if ((slots().length) === cell) {
      nextTry()
    }
  } else {
    resetGame()
  }
}

const colorCell = function (event) {
  ColorUser.push(event.target.classList[0])

  slots()[cell].src = `./assets/${event.target.classList[0]}.png`
  audioSlot().play()
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

  if (hasWon) showResult()
  ColorUser = []

  check().disabled = true
  player().forEach(function (button) {
    button.addEventListener('click', paint)
  })

  if (hasWon) {
    winnerSelection().play()
    const appear = document.querySelector('#modal1')
    appear.classList.add('appear')
  } else if (line > 5 && cell === 0) {
    loserAudio().play()
    const appearLose = document.querySelector('#modal2')
    appearLose.classList.add('appear')
    player().forEach(function (button) {
      button.removeEventListener('click', paint)
    })
  } else if (!hasWon) {
    audioWrong().play()
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
  for (let i = 0; i < allSlot().length; i++) {
    allSlot()[i].src = './assets/white.png'
    allCheck()[i].classList.replace(allCheck()[i].classList[0], 'white')
  }
  player().forEach(function (element) {
    element.addEventListener('click', paint)
  })
  androidSelector()
}

const androidSelector = function () {
  randomColors = ['red', 'blue', 'green', 'brown', 'purple']
  // while (randomColors.length < 5) {
  //   const randomChoice = Math.floor(Math.random() * (COLORLIST.length))
  //   if (!randomColors.includes(COLORLIST[randomChoice])) {
  //     randomColors.push(COLORLIST[randomChoice])
  //   }
  // }
  androidSlot().forEach(function (element, i) {
    element.src = './assets/random.png'
  })
}

const mainSelect = function () {
  player().forEach(function (element, index) {
    element.classList.add(COLORLIST[index])
    element.src = `./assets/${COLORLIST[index]}.png`
  })
}

const showResult = function () {
  androidSlot().forEach(function (element, i) {
    element.src = `./assets/${randomColors[i]}.png`
  })
}
// Evento

player().forEach(function (element) {
  element.addEventListener('click', paint)
})

exitButtonWin().addEventListener('click', function () {
  const appear = document.getElementById('modal1')
  appear.classList.remove('appear')
})

exitButtonLose().addEventListener('click', function () {
  const appear = document.getElementById('modal2')
  appear.classList.remove('appear')
  showResult()
})

resetRound().addEventListener('click', resetGame)
check().addEventListener('click', compare)

androidSelector()
mainSelect()
