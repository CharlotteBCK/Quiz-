# Quiz Géographie et Histoire

Ce projet est un quiz interactif proposant des questions sur les thèmes de la géographie et de l'histoire. Les utilisateurs peuvent choisir un thème, répondre aux questions, et tester leurs connaissances tout en s'amusant avec une interface dynamique.

## Fonctionnalités

- **Choix de thème** : Géographie ou Histoire.
- **Système de questions interactives** avec réponses multiples.
- **Gestion du temps** : un minuteur intégré pour chaque question.
- **Barre de progression** : visualisation de l'avancement du quiz.
- **Effets visuels** : animations de paillettes pour une expérience engageante.
- **Calcul du score final** et affichage des résultats.

## Structure des fichiers

### HTML
- **`accueil.html`** : Page principale pour choisir le thème du quiz.
- **`geographie.html` et `histoire.html`** : Pages spécifiques aux thèmes, chargées des questions et des interactions.

### CSS
- **`styleAccueil.css`** : Styles pour la page d'accueil.
- **`styleQuiz.css`** : Styles pour les pages de quiz, incluant les boutons, la barre de progression et les animations.

### JavaScript
- **`gameGeographie.js`** : Gestion du quiz de géographie, incluant le minuteur, les questions, les réponses et les résultats.
- **`questionsGeographie.js`** : Contient les questions et réponses du quiz de géographie.
- **`gameHistoire.js`** : Similaire à `gameGeographie.js`, mais pour le thème histoire.
- **`questionsHistoire.js`** : Contient les questions et réponses du quiz d'histoire.

## Installation et exécution

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/quiz-geographie-histoire.git
