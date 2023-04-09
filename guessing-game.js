const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

let secretNumber
let numAttempts

const checkGuess = (num) => {
    if(num > secretNumber) {
        console.log('Too high.')
        return false
    } else if(num < secretNumber) {
        console.log('Too low.')
        return false
    } else {
        console.log('Correct!')
        return true
    }
}

const askLimit = () => {
    rl.question('How many times do you want to attempt guessing: ', ans => {
        numAttempts = Number(ans)
        askRange()
    })
}

const askRange = () => {
    let min
    let max
    rl.question('Enter a max number: ', answer => {
        max = Number(answer)
        rl.question('Enter a min number: ', ans => {
            min = Number(ans)
            console.log(`I'm thinking of a number between ${min} and ${max}`)
            secretNumber = randomInRange(min, max)
            askGuess()
        })
    })
}

const askGuess = () => {
    if(numAttempts === 0) {
        console.log('You Lose')
        console.log(`The value was ${secretNumber}`)
        rl.close()
    } else {
        rl.question('Enter a guess: ', answer => {
            let isEqual = checkGuess(Number(answer))
            if(isEqual) {
                console.log('You win!')
                rl.close()
            } else {
                numAttempts -= 1
                console.log(`You have ${numAttempts} attempts left!`)
                askGuess()
            }
        })
    }
}

// askGuess()
// askRange()
askLimit()
