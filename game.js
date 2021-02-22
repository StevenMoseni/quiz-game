const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What’s the diameter of a basketball hoop in inches?',
        choice1: '10 inches',
        choice2: '30 inches',
        choice3: '18 inches',
        choice4: '20 inches',
        answer: 3,
    },
    {
        question: 'How big is an Olympic sized swimming pool in meters?',
        choice1: '50 meters long and 25 meters wide',
        choice2: '20 meters long and 50 meters wide',
        choice3: '60 meters long and 20 meters wide',
        choice4: '100 meters long and 50 meters wide',
        answer: 1,
    }, {
        question: 'In professional basketball, how high is the basketball hoop from the ground?',
        choice1: '12 feet',
        choice2: '10 feet',
        choice3: '4 feet',
        choice4: '15 feet',
        answer: 2,
    }, {
        question: 'What do you call it when a player makes three back to back strikes in bowling?',
        choice1: 'Eagle',
        choice2: 'Turkey',
        choice3: 'Donkey',
        choice4: 'Birdie',
        answer: 2,
    },
    {
        question: 'How many players are on a baseball team?',
        choice1: '12',
        choice2: '13',
        choice3: '9',
        choice4: '10',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion ()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.getElementsByClassName.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choice.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choice.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
      
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()