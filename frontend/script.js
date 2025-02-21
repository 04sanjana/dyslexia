const questions = [
    { 
        question: "Which one the words is most accurate?", 
        image: "images/qn1.jpg", 
        options: ["Dog", "Bog"]
    },
    { 
        question: "Which fruit is this?", 
        image: "images/qn2.jpg", 
        options: ["1", "2", "3", "4"]
    },
    { 
        question: "Jumbled Letters: B - R - I - D - G - E", 
        image: "images/qn3.jpeg", 
        options: ["BRIGDE", "BIRDGE", "BRIDGE"]
    },
    { 
        question: "Do you often have trouble spelling words correctly even after repeated practise", 
        image: "images/qn4.jpeg", 
        options: ["YES", "NO"]
    },
    { 
        question: "Six slippery snails slid slowly south, searching for sunshine.", 
        image: "images/qn5.jpeg", 
        options: ["YES", "NO"]
    },
    { 
        question: "Are you uncomfortable reading out loud?", 
        image: "images/qn6.jpeg", 
        options: ["YES", "NO"]
    },
    { 
        question: "Do you sometimes confuse or reverse letters, such as reading b as d or p as q?", 
        image: "images/qn7.jpeg", 
        options: ["YES", "NO"]
    },
    { 
        question: "Do you occasionally read words in reverse order, such as was as saw or top as pot?", 
        image: "images/qn8.jpeg", 
        options: ["YES", "NO"]
    },
    { 
        question: "Do you struggle to follow written instructions, even when they are clear and simple?", 
        image: "images/qn9.jpeg", 
        options: ["YES", "NO"]
    },
    { 
        question: "Do you often lose your place while reading, requiring you to reread sections repeatedly?", 
        image: "images/qn10.jpeg", 
        options: ["YES", "NO"]
    },





];

let currentQuestionIndex = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const imageElement = document.getElementById("question-image");
    const optionsContainer = document.getElementById("options");

    const currentQuestion = questions[currentQuestionIndex];

    // Update question text
    questionElement.textContent = currentQuestion.question;
    
    // Update image source
    imageElement.src = currentQuestion.image;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Load new options
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Initialize first question
document.addEventListener("DOMContentLoaded", loadQuestion);
