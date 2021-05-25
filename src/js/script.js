const COLORLIST = ['red', 'blue', 'green', 'yellow', 'orange', 'pink']
const randomColors = []
let ColorUser = []

const check = document.querySelector('#check')
const select = document.querySelectorAll('.select')

// We define 2 variable
// Cell indicates the value of the first position, within the first try.
let cell = 0
// Line indicates the try the user is situated.
let line = 1

// function that "paints" each cell, inside within its line.
const paint = function (event) {
// if (true), we select each class slot (that equals to each cell of the table). With each slot being a child of each row(with line position). This will return an array.
  // Then slot[cell position] adds a class to the event.target (returns HTML tag that was clicked), and adds the second class form tag. Then we increase cell by 1.

  if (line <= 12) {
    const slots = document.querySelectorAll(`.row${line}>.slot`)

    ColorUser.push(event.target.classList[1])

    slots[cell].classList.add(event.target.classList[1])
    cell++

    // if every cell is completed, we jump to the next line

    if ((slots.length) === cell) {
      cell = 0
      line++
      check.disabled = false
      select.forEach(function (button) {
        button.removeEventListener('click', paint)
      })
    }
  } else {
    // we asign value 1 to line. we select each element with class slot, and for each one of them, we remove the class applied, in the second position
    line = 1
    document.querySelectorAll('.slot').forEach(function (choice) {
      choice.classList.remove(choice.classList[1])
    })
  }
}

// Function that generates CPU's color selection //
const androidSelector = function () {
  while (randomColors.length < 5) {
    const randomChoice = Math.floor(Math.random() * (COLORLIST.length))
    // this if avoids repetition of colors
    if (!randomColors.includes(COLORLIST[randomChoice])) {
      randomColors.push(COLORLIST[randomChoice])
    }
  }
  // selects each cell/slot of random combination inside the document
  const androidSlot = document.querySelectorAll('.androidSelector>.select')
  // adds random class to each cell
  androidSlot.forEach(function (element, i) {
    element.classList.add(randomColors[i])
  })
}
// We create a function that comapres //checkbox area
const compare = function () {
  // selección celdas que muestran resultado (checkbox>select)
  const compareSlot = document.querySelectorAll(`.checkbox${line - 1} > div`)
  // comparación colorUser(colores elegidos por el jugador) con randomColors (combinación elegida aleatoriamente)
  const test1 = ColorUser.map(function (e) {
    return randomColors.indexOf(e)
  })
  // recorremos anterior let con dos variables (elemento, index). Si elemento < 0 el color no está (blanco); si i es igual en randomColors y en ColorUser el elemento y la posición es la misma (negro). Si no se cumple nada de esto, el color está pero no en la posición (gris)
  const test2 = test1.map(function (e, i) {
    if (e < 0) {
      return 'white'
    } else if (randomColors[i] === ColorUser[i]) {
      return 'black'
    } return 'grey'
  })

  compareSlot.forEach(function (element, index) {
    element.classList.add(test2[index])
  })

  ColorUser = []

  check.disabled = true
  select.forEach(function (button) {
    button.addEventListener('click', paint)
  })
}

// for each time we click an element with class select, we apply the function paint

select.forEach(function (element) {
  element.addEventListener('click', paint)
})

check.addEventListener('click', compare)

androidSelector()
