var $ = jQuery
var questions = [{
  question: 'Pink Floyd is from which country?',
  choices: [' United States',
    ' Australia',
    ' England',
    ' Canada'],
  correctAnswer: 2
}, {
  question: 'Pink Floyd were founded in?',
  choices: [' 1965',
    ' 1967',
    ' 1969',
    ' 1970'],
  correctAnswer: 0
}, {
  question: 'Wish You Were Here is a tribute to what former band member?',
  choices: [' Roger Waters',
    ' Syd Barrett',
    ' Richard Wright',
    ' Bob Ezrin'],
  correctAnswer: 1
}, {
  question: 'I have become ______________',
  choices: [' Wonderfully Numb',
    ' Awfully Numb',
    ' Compulsively Numb',
    ' Comfortably Numb'],
  correctAnswer: 3
}, {
  question: 'The Dark Side of the Moon released date:?',
  choices: [' March 1973',
    ' December 1972',
    ' August 1976',
    ' May 1969'],
  correctAnswer: 0
}, {
  question: 'Pink Floyd was supposed to have a giant inflatable ____ to close their Animals concert?',
  choices: [' Pig',
    ' Dog',
    ' Sheep',
    ' Fish'],
  correctAnswer: 0
}, {
  question: 'The song Money is unique in rock music because:',
  choices: [' of its use of sound effects',
    ' it has no guitar',
    " Gilmour's tone changing every 24 bars",
    ' of the time signature'],
  correctAnswer: 3
}, {
  question: "What was Pink Floyd's first album?",
  choices: [' A Saucerful of Secrets',
    ' Darkside of the Moon',
    ' Wish You Were Here',
    ' Piper at the Gates of Dawn'],
  correctAnswer: 3
}, {
  question: 'When did Gilmour join Pink Floyd?',
  choices: [' 1973',
    ' 1969',
    ' 1964',
    ' 1967'],
  correctAnswer: 3
}, {
  question: "...A soul in tension that's learning to fly Condition grounded but determined to try.. in which album:?",
  choices: [' Animals',
    ' A Momentary Lapse of Reason',
    ' The Wall',
    ' The Final Cut'],
  correctAnswer: 1
}
]

var currentQuestion = 0
var totalScore = 0
$('.js-nextButton').hide()

$(document).ready(function () {
  $('.js-buttonStart').click(hideIntro)

  displayQuestion()

  $('.js-submitButton').click(function () {
    // First check choice was selected and if so coerce to number not a string
    var choice = $("input[type='radio']:checked").val()
    if (choice !== undefined) choice = Number(choice)
    if (choice === undefined) {
      $('.js-message').text('Nothing is checked! ....Please select an answer').show()
    } else if (choice === questions[currentQuestion - 1].correctAnswer) {
      totalScore++
      $('.js-message').text('CORRECT! ....' + totalScore + ' question/s correct, out of ' + questions.length).show()
      $('.js-nextButton').show()
      $('.js-submitButton').hide()
    } else {
      $('.js-message').text('WRONG! ....' + totalScore + ' question/s correct, out of ' + questions.length + ' ....Correct answer is: ' + questions[currentQuestion - 1].choices[questions[currentQuestion - 1].correctAnswer]).show()
      $('.js-nextButton').show()
      $('.js-submitButton').hide()
    }
  })
  $('.js-nextButton').click(function () {
    currentQuestion++
    $('.js-submitButton').show()
    $('.js-nextButton').hide()
    if (currentQuestion <= questions.length) {
      $('.js-message').hide()
      displayQuestion()
    } else {
      $('.js-question').hide()
      $('.js-answersList').hide()
      $('.js-submitButton').hide()
      $('.js-message').text('Your TOTAL SCORE is: ' + totalScore + ' out of ' + questions.length).show()
      $('.finalPage').show(1000)
    }
  })
  $('.js-buttonStartAgain').click(function () {
    $('.finalPage').hide()
    $('.js-message').hide()
    $('.js-startQuiz').show()
    currentQuestion = 0
    totalScore = 0
    $('.js-buttonStart').click(function () {
      $('.js-startQuiz').hide()
      $('.pageStructure').show(1000)
    })
    hideIntro()
    displayQuestion()
  })
})

function hideIntro () {
  $('.js-startQuiz').hide()
  $('.pageStructure').show(1000)
}

function displayQuestion () {
  $('.js-question, .js-answersList, .js-submitButton').show()
  if (!currentQuestion) currentQuestion = 1
  var question = currentQuestion + ' out of ' + questions.length + ': ' + 
  questions[currentQuestion - 1].question
  var questionDiv = $('.pageStructure > .js-question')
  var choiceListDiv = $('.pageStructure > .js-answersList')
  var numChoices = questions[currentQuestion - 1].choices.length
  $(questionDiv).text(question)
  $(choiceListDiv).find('li').remove()
  var choice
  for (var i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion - 1].choices[i]
    $('<li><input type="radio" value=' + i + ' name="answerRadio" />' + choice + '</li>').appendTo(choiceListDiv)
  }
}

