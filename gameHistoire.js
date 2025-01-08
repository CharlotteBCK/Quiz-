// Import des questions
import { quizTableau2 } from './questionsHistoire.js';

// Récupération des éléments HTML
const quizQuestionHTML = document.getElementById('questions');
const quizReponseHTML = document.getElementById('reponses');
const boutonSuivantHTML = document.getElementById('suivant');
const boutonRejouerHTML = document.getElementById('rejouer');
const boutonValiderHTML = document.getElementById('valider');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const texteFinaleDuQuiz = document.getElementById('messageResultat');
const sparkleContainer = document.querySelector('.sparkle-container');

// Variables globales
let currentQuestionIndex = 0;
let score = 0;
let reponseSelectionnee = null;
let reponseCorrecte = null;
const totalQuestions = quizTableau2.questions.length;
const numberOfSparkles = 500;
const sparkleTypes = ['circle', 'diamond', 'star']; // Différentes formes de paillettes

// Variables pour le timer
let timer;                 
let timeRemaining = 15;    
const totalTime = 15;      
const timerElement = document.getElementById('timer');  
const aiguilleSeconde = document.querySelector('.aiguille-seconde'); 

// Fonction de démarrage du timer
function startTimer() {
    timerElement.innerText = `Temps restant : ${timeRemaining} secondes`;

    timer = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Temps restant : ${timeRemaining} secondes`;

        // Rotation de l'aiguille
        let angleRotation = ((totalTime - timeRemaining) / totalTime) * 360;
        aiguilleSeconde.style.transform = `rotate(${angleRotation}deg)`;

        // Si le temps est écoulé
        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleTimeout(); // Gestion de la fin du timer
        }
    }, 1000);
}

// Fonction pour réinitialiser le timer
function resetTimer() {
    clearInterval(timer);
    timeRemaining = totalTime;
    timerElement.innerText = `Temps restant : ${timeRemaining} secondes`;
    aiguilleSeconde.style.transform = 'rotate(0deg)';
}

// Fonction appelée lorsque le timer atteint 0
function handleTimeout() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion();
        resetTimer();
        startTimer();
    } else {
        afficherResultats(); // Afficher les résultats si c'était la dernière question
    }
}

// Initialisation du quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    reponseSelectionnee = null;
    reponseCorrecte = null;
    boutonSuivantHTML.style.display = 'none';
    boutonRejouerHTML.style.display = 'none';
    boutonValiderHTML.style.display = 'inline-block';
    texteFinaleDuQuiz.innerText = '';
    loadQuestion();
    updateProgressBar();
    resetTimer();
    startTimer();
}

// Affichage des paillettes
function showSparkles() {
    for (let i = 0; i < numberOfSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        const randomType = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        sparkle.classList.add(randomType);
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDuration = `${2 + Math.random() * 3}s`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkleContainer.appendChild(sparkle);
    }
    setTimeout(() => {
        sparkleContainer.innerHTML = '';
    }, 1500);
}

// Mise à jour de la barre de progression
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} sur ${totalQuestions}`;
}

// Chargement de la question actuelle
function loadQuestion() {
    quizReponseHTML.innerHTML = '';
    const questionActuelle = quizTableau2.questions[currentQuestionIndex];
    quizQuestionHTML.innerText = questionActuelle.text;

    questionActuelle.options.forEach(option => {
        const reponseBouton = document.createElement('button');
        reponseBouton.innerText = option;
        reponseBouton.classList.add('boutonReponse');
        quizReponseHTML.appendChild(reponseBouton);
        reponseBouton.addEventListener('click', (event) => {
            document.querySelectorAll('.boutonReponse').forEach(btn => btn.classList.remove('actif'));
            event.currentTarget.classList.add('actif');
            reponseSelectionnee = option;
            reponseCorrecte = questionActuelle.correct_answer;
        });
    });
    resetTimer();
    startTimer();
}

// Vérification de la réponse
function checkReponse() {
    if (reponseSelectionnee === reponseCorrecte) {
        showSparkles();
        score++;
    }
    boutonSuivantHTML.style.display = 'inline-block';
    boutonValiderHTML.style.display = 'none';
    clearInterval(timer); // Arrêter le timer après validation
}

// Affichage des résultats
function afficherResultats() {
    quizQuestionHTML.innerText = `Tu as obtenu ${score} sur ${totalQuestions}`;
    texteFinaleDuQuiz.innerText = `Félicitations ! Ton score est de ${score} sur ${totalQuestions}.`;
    quizReponseHTML.style.display = 'none'; // Masquer les réponses
    boutonSuivantHTML.style.display = 'none'; // Masquer le bouton suivant
    boutonRejouerHTML.style.display = 'inline-block';
    boutonValiderHTML.style.display = 'none';
}

// Gestion du bouton suivant
boutonSuivantHTML.addEventListener('click', () => {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateProgressBar();
        boutonSuivantHTML.style.display = 'none';
        boutonValiderHTML.style.display = 'inline-block';
    } else {
        afficherResultats();
    }
});

// Gestion du bouton valider
boutonValiderHTML.addEventListener('click', checkReponse);

// Gestion du bouton rejouer
boutonRejouerHTML.addEventListener('click', () => {
    quizReponseHTML.style.display = 'block'; // Réafficher les réponses
    initQuiz();
});

// Initialisation du quiz
initQuiz();
