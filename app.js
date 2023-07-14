// const axios = require("axios");
const puzzleBoard = document.getElementById('puzzle')
const btnSolve = document.getElementById('btn-solve')
const solutionDisplay = document.getElementById('solution')
const puzzleFields = 81 // 9 x 9

const submission = []
for(let i = 0; i < puzzleFields; i++) {
  const input = document.createElement('input')
  input.setAttribute('type', 'number')
  input.setAttribute('min', 1)
  input.setAttribute('max', 9)
  if (
    (((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
    ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
    ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && (i > 27 && i < 53)) ||
    ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
    ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53))
  ) {
    input.classList.add('gray-fields')
  }
  puzzleBoard.appendChild(input)
}

const inputList = document.querySelectorAll('input')

const joinValues = () => {
  inputList.forEach(input => {
    if (!input.value) {
      submission.push('.')
    }
    if (input.value) {
      submission.push(input.value)
    }
  })
  console.log(submission)
}

const inputFillOut = (isSolvable, solution) => {
  const inputList = document.querySelectorAll('input')
  if (isSolvable && solution) {
    inputList.forEach((input, index) => {
       input.value = solution[index]
    })
    solutionDisplay.innerHTML = 'This is a solution.'
  } else {
    solutionDisplay.innerHTML = 'This is not solvable.'
  }
}

const solve = async () => {
  joinValues()
  const data = {data: submission.join('')}
  console.log(data)

  fetch('http://localhost:8000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      inputFillOut(data.solvable, data.solution)
    })
    .catch(error => console.error(`Error: ${error}`))
}




// Event Listeners
btnSolve.addEventListener('click', solve)


