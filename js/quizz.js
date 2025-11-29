
const quizData = [

    {
        question: "Que signifie HTML ?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Quel mot-clé est utilisé pour déclarer une fonction en JavaScript ?",
        options: [
            "function",
            "func",
            "def",
            "method"
        ],
        correct: 0
    },
    {
        question: "Quel attribut HTML est utilisé pour définir un identifiant unique ?",
        options: [
            "class",
            "name",
            "id",
            "key"
        ],
        correct: 2
    },
    {
        question: "Quelle méthode JavaScript permet de convertir une chaîne en nombre entier ?",
        options: [
            "parseInt()",
            "toInt()",
            "Number()",
            "convertInt()"
        ],
        correct: 0
    },
    {
        question: "Quel attribut HTML spécifie une URL alternative pour une image ?",
        options: [
            "alt",
            "src",
            "href",
            "title"
        ],
        correct: 0
    },

    {
        question: "Quel langage est principalement utilisé pour styliser une page web ?",
        options: [
            "JavaScript",
            "Python",
            "CSS",
            "Java"
        ],
        correct: 2
    },
    {
        question: "Quelle propriété CSS est utilisée pour changer la couleur du texte ?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "Comment appliquer un style CSS en ligne (inline) ?",
        options: [
            "Avec l'attribut class",
            "Avec l'attribut id",
            "Avec l'attribut style",
            "Avec la balise <style>"
        ],
        correct: 2
    },
    {
        question: "Quelle propriété CSS contrôle la taille du texte ?",
        options: [
            "text-size",
            "font-size",
            "text-style",
            "font-weight"
        ],
        correct: 1
    },
    {
        question: "Comment centrer un élément horizontalement avec CSS ?",
        options: [
            "text-align: center",
            "margin: auto",
            "align: center",
            "center: true"
        ],
        correct: 1
    },


    {
        question: "Quelle méthode JavaScript permet de sélectionner un élément par son ID ?",
        options: [
            "getElementByClass()",
            "querySelector()",
            "getElementById()",
            "selectElement()"
        ],
        correct: 2
    },
    {
        question: "Quelle fonction JavaScript affiche un message dans la console ?",
        options: [
            "alert()",
            "print()",
            "console.log()",
            "display()"
        ],
        correct: 2
    },
    {
        question: "Comment déclarer une variable en JavaScript (ES6+) ?",
        options: [
            "var x = 5",
            "let x = 5",
            "const x = 5",
            "Toutes les réponses ci-dessus"
        ],
        correct: 3
    },
    {
        question: "Quelle méthode JavaScript ajoute un élément à la fin d'un tableau ?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        correct: 0
    },
    {
        question: "Comment écrire un commentaire sur une seule ligne en JavaScript ?",
        options: [
            "<!-- commentaire -->",
            "/* commentaire */",
            "// commentaire",
            "# commentaire"
        ],
        correct: 2
    },


    {
        question: "Quel framework CSS est le plus populaire pour créer des sites responsives ?",
        options: [
            "Foundation",
            "Bulma",
            "Bootstrap",
            "Materialize"
        ],
        correct: 2
    },
    {
        question: "Quel framework JavaScript est développé par Facebook ?",
        options: [
            "Vue.js",
            "Angular",
            "React",
            "Svelte"
        ],
        correct: 2
    },
    {
        question: "Que signifie DOM en développement web ?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Online Media",
            "Document Orientation Method"
        ],
        correct: 0
    },
    {
        question: "Quel sélecteur CSS cible tous les éléments d'une classe ?",
        options: [
            "#classe",
            ".classe",
            "*classe",
            "classe"
        ],
        correct: 1
    },
    {
        question: "Quelle propriété CSS permet de créer des coins arrondis ?",
        options: [
            "corner-radius",
            "border-radius",
            "round-corner",
            "edge-radius"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let userAnswers = [];
let score = 0;


function initQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    displayQuestion();
    document.getElementById('quiz-result').classList.remove('show');
    document.getElementById('quiz-form').style.display = 'block';
}
function displayQuestion() {
    const quizContainer = document.getElementById('quiz-questions');
    quizContainer.innerHTML = '';

    quizData.forEach((item, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card fade-in-up';
        questionCard.style.animationDelay = `${index * 0.1}s`;

        let optionsHTML = '';
        item.options.forEach((option, optIndex) => {
            optionsHTML += `
                <label class="quiz-option">
                    <input type="radio" name="question${index}" value="${optIndex}" required>
                    <span>${option}</span>
                </label>
            `;
        });

        questionCard.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <span class="question-number">${index + 1}</span>
                <h5 class="mb-0">${item.question}</h5>
            </div>
            <div class="options-container">
                ${optionsHTML}
            </div>
        `;

        quizContainer.appendChild(questionCard);
    });
}


function submitQuiz(event) {
    event.preventDefault();


    userAnswers = [];
    score = 0;

    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            const answer = parseInt(selectedOption.value);
            userAnswers.push(answer);
            if (answer === item.correct) {
                score++;
            }
        } else {
            userAnswers.push(-1);
        }
    });


    displayResults();
}


function displayResults() {
    const resultContainer = document.getElementById('quiz-result');
    const percentage = Math.round((score / quizData.length) * 100);

    let message = '';
    let emoji = '';
    let colorClass = '';

    if (percentage >= 90) {
        message = "Excellent ! Vous êtes un expert !";
        emoji = "🏆";
        colorClass = "text-success";
    } else if (percentage >= 70) {
        message = "Très bien ! Bonne maîtrise du sujet.";
        emoji = "🎉";
        colorClass = "text-primary";
    } else if (percentage >= 50) {
        message = "Pas mal ! Continuez à apprendre.";
        emoji = "👍";
        colorClass = "text-info";
    } else {
        message = "Continuez vos efforts !";
        emoji = "💪";
        colorClass = "text-warning";
    }

    let answersHTML = '<div class="mt-4"><h4 class="mb-3">Détail des réponses :</h4>';

    quizData.forEach((item, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === item.correct;
        const icon = isCorrect ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-x-circle-fill text-danger"></i>';

        answersHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex align-items-start">
                        <span class="me-3 fs-4">${icon}</span>
                        <div class="flex-grow-1">
                            <h6 class="mb-2">Question ${index + 1}: ${item.question}</h6>
                            <p class="mb-1">
                                <strong class="${isCorrect ? 'text-success' : 'text-danger'}">
                                    Votre réponse : 
                                </strong>
                                ${userAnswer >= 0 ? item.options[userAnswer] : 'Non répondu'}
                            </p>
                            ${!isCorrect ? `
                                <p class="mb-0">
                                    <strong class="text-success">Bonne réponse : </strong>
                                    ${item.options[item.correct]}
                                </p>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    answersHTML += '</div>';

    resultContainer.innerHTML = `
        <div class="text-center mb-4">
            <div class="display-1 mb-3">${emoji}</div>
            <h2 class="${colorClass}">${message}</h2>
            <div class="score-display">${score}/${quizData.length}</div>
            <p class="fs-4 mb-4">Score : ${percentage}%</p>
            <button onclick="initQuiz()" class="btn btn-primary btn-lg">
                <i class="bi bi-arrow-clockwise me-2"></i>Recommencer le quizz
            </button>
        </div>
        ${answersHTML}
    `;

    document.getElementById('quiz-form').style.display = 'none';
    resultContainer.classList.add('show');


    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


document.addEventListener('DOMContentLoaded', function () {
    initQuiz();


    const form = document.getElementById('quiz-form');
    if (form) {
        form.addEventListener('submit', submitQuiz);
    }
});
