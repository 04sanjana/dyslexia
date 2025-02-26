const questions = [
    { question: "1. Which one of the words is most accurate?", image: "images/qn1.jpg", options: ["Dog", "Bog"], answer: "Dog" },
    { question: "2. Observe the images", image: "images/qn2.jpg", options: ["1", "2", "3", "4"], answer: "2" },
    { question: "3. Jumbled Letters: B - R - I - D - G - E", image: "images/qn3.jpeg", options: ["BRIGDE", "BIRDGE", "BRIDGE"], answer: "BRIDGE" },
    { question: "4. Do you often have trouble spelling words correctly even after repeated practice?", image: "images/qn4.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "5. Read the following Six slippery snails slid slowly south, searching for sunshine.", image: "images/qn5.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "6. Are you uncomfortable reading out loud?", image: "images/qn6.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "7. Do you sometimes confuse or reverse letters, such as reading 'b' as 'd' or 'p' as 'q'?", image: "images/qn7.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "8. Do you occasionally read words in reverse order, such as reading 'was' as 'saw'?", image: "images/qn8.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "9. Do you struggle to follow written instructions, even when they are clear and simple?", image: "images/qn9.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "10. Do you often lose your place while reading, requiring you to reread sections?", image: "images/qn10.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "11. Do you struggle to break words into individual sounds.eg.  Splash ,/s/ - /p/ - /l/ - /æ/ - /ʃ/", image: "images/qn11.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "12. Do letters or words seem to move, blur, or jumble when you read?", image: "images/qn12.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "13. Do you often confuse numbers with letters (such as writing 6 instead of G)?", image: "images/qn13.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "14. Do you have a family member (parent, sibling) who has struggled with reading?", image: "images/qn14.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "15. Which sentence has the correct word order?", image: "images/qn15.jpeg", options: ["The dog ran quickly", "Quickly the ran dog", "Dog quickly the ran", "Ran quickly dog the"], answer: "The dog ran quickly" },
    { question: "16. Do you struggle to remember a phone number after hearing it once?", image: "images/qn16.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "17. Do you find it easier to understand something when spoken rather than written?", image: "images/qn17.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "18. Do you find it hard to remember the days of the week in order?", image: "images/qn18.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "19. Do you feel like reading takes longer for you than others?", image: "images/qn19.jpeg", options: ["YES", "NO"], answer: "YES" },
    { question: "20. Do you learn better through hands-on activities rather than reading?", image: "images/qn20.jpeg", options: ["YES", "NO"], answer: "YES" }
];

let currentQuestionIndex = 0;
let selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || {};

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const imageElement = document.getElementById("question-image");
    const optionsContainer = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const submitBtn = document.getElementById("submit-btn");

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    imageElement.src = currentQuestion.image;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");

        // Keep previously selected answers highlighted
        if (selectedAnswers[currentQuestionIndex] === option) {
            button.classList.add(option === currentQuestion.answer ? "correct" : "incorrect");
        }

        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });

    prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function selectAnswer(option) {
    selectedAnswers[currentQuestionIndex] = option;
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));

    // Reload question to update button styles
    loadQuestion();
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

function showResult() {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    window.location.href = "results.html";  // Redirect to results page
}

document.addEventListener("DOMContentLoaded", loadQuestion);