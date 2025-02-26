document.addEventListener("DOMContentLoaded", function() {
    const score = localStorage.getItem("score");
    const total = localStorage.getItem("total");

    document.getElementById("score").textContent = `Your Score: ${score} / ${total}`;

    // Define threshold for possible dyslexia
    const threshold = total * 0.7; // 70% correct indicates possible dyslexia
    if (score >= threshold) {
        document.getElementById("dyslexia-message").textContent = "You may have dyslexia. Consider consulting a specialist.";
        document.getElementById("dyslexia-message").style.color = "red";
    } else {
        document.getElementById("dyslexia-message").textContent = "Your reading skills seem typical.";
        document.getElementById("dyslexia-message").style.color = "green";
    }
});

function restartQuiz() {
    window.location.href = "test.html";
}
