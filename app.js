//App name space: 
const quiz = {};


//Set initial question, score and timer for quiz game: 
quiz.currentQuestion = -1; 
quiz.score = 0; 
quiz.timer = 30;


//Event listener for arrow button
quiz.scrollingArrow = () => {
    $('.arrow').click(function () {
        const opening = $('audio')[0]
        opening.play();
        $('html, body').animate({
            scrollTop: $('main').offset().top
        }, 4000);
    });
}

//list of questions in quiz.
quiz.friendQuestions = [
    {   
        question: `What is the name of the coffee shop in Friends ?`,
        answers: {
            a: `Daily Grind`,
            b: `Central Perk`,
            c: `Cafe Daily`,
            d: `Central Coffee`
        },
        correctAnswer: `b`
    },

    {   
        question: `Who is Monica's mystery kisser ?`,
        answers: {
            a: `Rachel Green`,
            b: `Ross Geller`,
            c: `Richard Burke`,
            d: `Chandler Bing`
        },
        correctAnswer: 'b'
    },

    {   
        question: `What is Joey Tribbiani's fake name ?`,
        answers: {
            a: `William Spencer`,
            b: `Joshua Burgin`,
            c: `Ken Adams`,
            d: `Paul Stevens`
        },
        correctAnswer: `c`
    },

    {   
        question: `What does Phoebe not believe in ?`,
        answers: {
            a: `Dinosaur`,
            b: `Space`,
            c: `Trains`,
            d: `Evolution`
        },
        correctAnswer: `d`
    },

    {   
        question: `Before switching to work in advertising, What is Chandler Bing's job ?`,
        answers: {
            a: `Investment Banking`,
            b: `Statistical Analysis`,
            c: `Transponster`,
            d: `Nobody knows really`
        },
        correctAnswer: `b`
    },

    {   
        question: `What is the name of the magic sex story in Friends ?`,
        answers: {
            a: `Backpacking in Laos`,
            b: `Lost in Brooklyn`,
            c: `Backpacking in Western Europe`,
            d: `Vacation in Maldives`
        },
        correctAnswer: `c`
    },

    {
        question: `How many times did Ross get divorced ?`,
        answers: {
            a: `Three`,
            b: `Two`,
            c: `Four`,
            d: `Five`
        },
        correctAnswer: `a`
    },

    {
        question: `Who was the maid of honor at Monica’s wedding ?`,
        answers: {
            a: `Phoebe Buffay`,
            b: `Rachel Green`,
            c: `Judy Geller`,
            d: `Chandler's mother`
        },
        correctAnswer: `b`
    },

    {
        question: `Phoebe’s scientist boyfriend David worked in what city ?`,
        answers: {
            a: `Minsk`,
            b: `Moscow`,
            c: `Madrid`,
            d: `Meerut`
        },
        correctAnswer: `a`
    },

    {   
        question: `What is Phoebe Buffay's fake name ?`,
        answers: {
            a: `Regina George`,
            b: `Regina Phalange`,
            c: `Regina Smith`,
            d: `Regina Garcia`
        },
        correctAnswer: `b`
    },

    {   
        question: `What is Chandler Bing’s middle name?`,
        answers: {
            a: `Marcel`,
            b: `Matteo`,
            c: `Miguel`,
            d: `Muriel`
        },
        correctAnswer: `d`
    },
    
    {   
        question: `Who is Joey’s agent?`,
        answers: {
            a: `Estelle`,
            b: `Esther`,
            c: `Emma`,
            d: `Erin`
        },
        correctAnswer: `a`
    },

    {   
        question: `According to Monica, a woman has how many erogenous zones ?`,
        answers: {
            a: `Six`,
            b: `Eight`,
            c: `Seven`,
            d: `Nine`
        },
        correctAnswer: `c`
    },

    {   
        question: `What song makes Ross and Rachel’s daughter Emma laugh for the first time ?`,
        answers: {
            a: `Baby Got Back`,
            b: `Baby One More Time`,
            c: `Drop it Like It's Hot`,
            d: `I Like That`
        },
        correctAnswer: `a`
    },

    {   
        question: `What form of self-defense does Ross try to teach Rachel and Phoebe?`,
        answers: {
            a: `Salmon-skin Roll`,
            b: `Burrito`,
            c: `Caesar Fight`,
            d: `Unagi`
        },
        correctAnswer: `d`
    },
]

//Event listener for start button
quiz.startQuiz = () => {
    $('.quiz-start').click(function() {
        $('.quiz-rule').hide();
        const audio = $('audio')[1]
        audio.play();
        quiz.timer = 30;
        $('.quiz-menu').show();
    });
}


//To load new questions in the quiz
quiz.showQuestion = () => {
    quiz.currentQuestion++;
    quiz.displayNumberOfQuestion();
    if(quiz.currentQuestion <= quiz.friendQuestions.length - 1) {
        $('.question').html(quiz.friendQuestions[quiz.currentQuestion].question);
        $('.answer-btn#a').html(quiz.friendQuestions[quiz.currentQuestion].answers.a);
        $('.answer-btn#b').html(quiz.friendQuestions[quiz.currentQuestion].answers.b);
        $('.answer-btn#c').html(quiz.friendQuestions[quiz.currentQuestion].answers.c);
        $('.answer-btn#d').html(quiz.friendQuestions[quiz.currentQuestion].answers.d);
        return true;
    } 
    quiz.currentQuestion = quiz.friendQuestions.length;
    return false; 
}


//Event listener for next question button
quiz.nextQuestion = () => {
    $('.next-btn').click(function () {
        $('.question').show();
        if (quiz.showQuestion()) {
            quiz.enabledButton();
            quiz.timer = 30;
            quiz.displayNumberOfQuestion();
            $('.answer-btn').css('background-color','white');
        } else {
            quiz.storeHideValue();
            quiz.showScore();
        }
    });
}



//Event listener for checking answer and keeping score for the quiz

quiz.checkAnswer = () => {
    $('.answer-btn').click(function(){
        let selectAnswer = $(this).attr('id');
        let checkAnswer = quiz.friendQuestions[quiz.currentQuestion].correctAnswer
        if (selectAnswer === checkAnswer) {
            $(this).append(`  ✅`);
            quiz.correctAnswer();
            quiz.score++;
            quiz.displayNumberOfQuestion();
        } else {
            $(this).append(`  ❌`);
            $('.answer-btn#' + checkAnswer).append(`  ✅`);
            quiz.wrongAnswer();
            quiz.displayNumberOfQuestion();
        }
    });
}
    
//Event listener for restarting the quiz

quiz.restartQuiz =() => {
    $('.restart-btn').click(function() {
        quiz.currentQuestion = -1;
        quiz.enabledButton();
        quiz.storeHideValue();
        quiz.showQuestion();
        quiz.displayNumberOfQuestion();
        quiz.score = 0;
    });
}


//Event listener for set timer for quiz: 
quiz.setTimer = () => {
    let counter = setInterval(function () {
        $('.timer-count').html(quiz.timer);
        quiz.timer--;
        if (quiz.timer < 0) {
            clearInterval(counter);
            quiz.disabledButton();
            if(quiz.showQuestion) {
                quiz.timer = 30;
                quiz.setTimer();
            }
        }
    }, 1000);
};
    
//Disable other answer buttons if one is clicked
quiz.disabledButton = () => {
    $('.answer-btn').attr('disabled', true);
}

quiz.enabledButton = () => {
    $('.answer-btn').attr('disabled', false);
}

//Display what questions user are on
quiz.displayNumberOfQuestion = () => {
    $('.question-no').html(quiz.currentQuestion + 1);
};

//Display score after quiz is over
quiz.showScore = () => {
    $('.show-score').show();
    $('.restart-btn').show();
    $('.quiz-rule').hide();
    $('.score-number').html(quiz.score);
    if(quiz.score < 7) {
        $('h4').html(`Opps! You've been Bamboozled!`);
        const lowScoreaudio = $('audio')[4];
        lowScoreaudio.play();
    } else {
        $('h4').html(`✨ Congrats! You are in the "Friends Zone" ! ✨`);
        const highScoreaudio = $('audio')[5];
        highScoreaudio.play();
    }
    $('.answer-btn').css('background-color','white');
}

//Audio to notify if the answer is correct
quiz.correctAnswer = () => {
    quiz.disabledButton();
    const correctSound  = $('audio')[2];
    correctSound.play();
}

//Audio to notify if the answer is wrong
quiz.wrongAnswer = () => {
    quiz.disabledButton();
    const wrongSound  = $('audio')[3];
    wrongSound.play();
};

//store hide value when the user is in the beginning of the quiz
quiz.storeHideValue = () => {
    $('.quiz-rule').show();
    $('.quiz-menu').hide();
    $('.restart-btn').hide();
    $('.show-score').hide();
}

quiz.init = () => {
    quiz.scrollingArrow();
    quiz.storeHideValue();
    quiz.startQuiz();
    quiz.showQuestion();
    quiz.nextQuestion();
    quiz.checkAnswer();
    quiz.restartQuiz();
    quiz.setTimer();
    quiz.displayNumberOfQuestion();
}

// Document Ready
$(document).ready(function() {
    quiz.init();
});
