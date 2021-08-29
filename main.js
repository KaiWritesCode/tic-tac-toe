const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.querySelector('.winning-message')
const restartBtn = document.querySelector('#restart-button')
const startBtn = document.querySelector('.start-button')
const p1NameDisplay = document.querySelector('.player-1-display')
const p2NameDisplay = document.querySelector('.player-2-display')
let player1Input = document.querySelector('#player1-input')
let player2Input = document.querySelector('#player2-input')
let startDisplay = document.querySelector('.game-start-display')

let circleTurn

startGame()

restartBtn.addEventListener('click', startGame)
startBtn.addEventListener('click', () => {
    startDisplay.classList.remove('show')
})
player1Input.addEventListener("input", input)
player2Input.addEventListener("input", input)

input()

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')

}

function getInput() {

}

function handleClick(e) {
    //placeMark
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    //Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }

    //Check for draw
    else if (isDraw()) {
        endGame(true)
    }

    //Switch Turns
    else {
        swapTurns()
        setBoardHoverClass()
    }


}



function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function input(e) {
    startDisplay.classList.add('show')
    let player1 = player1Input.value
    let player2 = player2Input.value
    if (player1) {
        p1NameDisplay.innerText = player1
    } else {
        p1NameDisplay.innerText = "Player 1"
    }
    if (player2) {
        p2NameDisplay.innerText = player2
    } else {
        p2NameDisplay.innerText = "Player 2"
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? p2NameDisplay.innerText : p1NameDisplay.innerText} Wins!`
    }
    winningMessageElement.classList.add('show')
}