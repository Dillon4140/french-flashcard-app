// French Vocabulary Data
const vocabularyData = {
    animals: {
        beginner: [
            { french: 'Chat', english: 'Cat' },
            { french: 'Chien', english: 'Dog' },
            { french: 'Oiseau', english: 'Bird' },
            { french: 'Souris', english: 'Mouse' },
            { french: 'Poisson', english: 'Fish' },
            { french: 'Lion', english: 'Lion' },
            { french: '\u00c9l\u00e9phant', english: 'Elephant' },
            { french: 'Papillon', english: 'Butterfly' },
        ],
        intermediate: [
            { french: '\u00d6cerf', english: 'Deer' },
            { french: 'Girafe', english: 'Giraffe' },
            { french: 'Hippopotame', english: 'Hippopotamus' },
            { french: 'Crocodile', english: 'Crocodile' },
        ],
        advanced: [
            { french: 'Mandrill', english: 'Mandrill' },
            { french: 'Antilope', english: 'Antelope' },
        ]
    },
    food: {
        beginner: [
            { french: 'Pain', english: 'Bread' },
            { french: 'Fromage', english: 'Cheese' },
            { french: 'Pomme', english: 'Apple' },
            { french: 'Lait', english: 'Milk' },
            { french: 'Eau', english: 'Water' },
            { french: 'Salade', english: 'Salad' },
            { french: 'Soupe', english: 'Soup' },
            { french: 'Riz', english: 'Rice' },
        ],
        intermediate: [
            { french: 'Farine', english: 'Flour' },
            { french: 'Sucre', english: 'Sugar' },
            { french: 'Sel', english: 'Salt' },
            { french: 'Poivre', english: 'Pepper' },
        ],
        advanced: [
            { french: 'Sauce Bearnaise', english: 'Béarnaise Sauce' },
            { french: 'Croissant', english: 'Croissant' },
        ]
    },
    verbs: {
        beginner: [
            { french: '\u00catre', english: 'To be' },
            { french: 'Avoir', english: 'To have' },
            { french: 'Aller', english: 'To go' },
            { french: 'Faire', english: 'To do/make' },
            { french: 'Venir', english: 'To come' },
            { french: 'Pouvoir', english: 'To be able to' },
            { french: 'Devoir', english: 'Must/Have to' },
            { french: 'Vouloir', english: 'To want' },
        ],
        intermediate: [
            { french: 'Lire', english: 'To read' },
            { french: '\u00c9crire', english: 'To write' },
            { french: 'Parler', english: 'To speak' },
            { french: '\u00c9couter', english: 'To listen' },
        ],
        advanced: [
            { french: 'Persister', english: 'To persist' },
            { french: 'Abandonner', english: 'To abandon' },
        ]
    },
    numbers: {
        beginner: [
            { french: 'Un', english: 'One' },
            { french: 'Deux', english: 'Two' },
            { french: 'Trois', english: 'Three' },
            { french: 'Quatre', english: 'Four' },
            { french: 'Cinq', english: 'Five' },
            { french: 'Six', english: 'Six' },
            { french: 'Sept', english: 'Seven' },
            { french: 'Huit', english: 'Eight' },
        ],
        intermediate: [
            { french: 'Neuf', english: 'Nine' },
            { french: 'Dix', english: 'Ten' },
            { french: 'Vingt', english: 'Twenty' },
            { french: 'Cent', english: 'Hundred' },
        ],
        advanced: [
            { french: 'Mille', english: 'Thousand' },
            { french: 'Million', english: 'Million' },
        ]
    },
    phrases: {
        beginner: [
            { french: 'Bonjour', english: 'Hello' },
            { french: 'Au revoir', english: 'Goodbye' },
            { french: 'Merci', english: 'Thank you' },
            { french: 'S\'il vous pla\u00eet', english: 'Please (formal)' },
            { french: 'De rien', english: 'You\'re welcome' },
            { french: 'Excusez-moi', english: 'Excuse me' },
            { french: 'Oui', english: 'Yes' },
            { french: 'Non', english: 'No' },
        ],
        intermediate: [
            { french: 'Comment \u00e7a va?', english: 'How are you?' },
            { french: '\u00c7a va bien', english: 'I\'m fine' },
            { french: 'Enchanté', english: 'Pleased to meet you' },
            { french: 'Je ne comprends pas', english: 'I don\'t understand' },
        ],
        advanced: [
            { french: 'Puis-je vous aider?', english: 'Can I help you?' },
            { french: 'Je suis d\'accord', english: 'I agree' },
        ]
    }
};

// Global State
let currentCards = [];
let currentIndex = 0;
let sessionStats = { correct: 0, incorrect: 0 };
let isFlipped = false;

// DOM Elements
const menuSection = document.getElementById('menu');
const flashcardSection = document.getElementById('flashcardSection');
const statsSection = document.getElementById('statsSection');
const categorySelect = document.getElementById('categorySelect');
const difficultySelect = document.getElementById('difficultySelect');
const startBtn = document.getElementById('startBtn');
const flashcard = document.getElementById('flashcard');
const frenchText = document.getElementById('frenchText');
const englishText = document.getElementById('englishText');
const gotItBtn = document.getElementById('gotItBtn');
const needHelpBtn = document.getElementById('needHelpBtn');
const skipBtn = document.getElementById('skipBtn');
const backBtn = document.getElementById('backBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const categoryTitle = document.getElementById('categoryTitle');
const sessionCorrect = document.getElementById('sessionCorrect');
const sessionIncorrect = document.getElementById('sessionIncorrect');
const sessionAccuracy = document.getElementById('sessionAccuracy');
const cardsLearned = document.getElementById('cardsLearned');
const accuracy = document.getElementById('accuracy');

// Event Listeners
startBtn.addEventListener('click', startLearning);
gotItBtn.addEventListener('click', markCorrect);
needHelpBtn.addEventListener('click', markIncorrect);
skipBtn.addEventListener('click', nextCard);
backBtn.addEventListener('click', goBackToMenu);
flashcard.addEventListener('click', flipCard);

// Functions
function startLearning() {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;
    
    if (!category || !difficulty) {
        alert('Please select both category and difficulty');
        return;
    }
    
    currentCards = [...vocabularyData[category][difficulty]];
    currentIndex = 0;
    sessionStats = { correct: 0, incorrect: 0 };
    isFlipped = false;
    
    categoryTitle.textContent = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    menuSection.classList.add('hidden');
    flashcardSection.classList.remove('hidden');
    
    displayCard();
}

function displayCard() {
    if (currentIndex >= currentCards.length) {
        endSession();
        return;
    }
    
    const card = currentCards[currentIndex];
    frenchText.textContent = card.french;
    englishText.textContent = card.english;
    flashcard.classList.remove('flipped');
    isFlipped = false;
    
    updateProgress();
}

function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function markCorrect() {
    sessionStats.correct++;
    nextCard();
}

function markIncorrect() {
    sessionStats.incorrect++;
    nextCard();
}

function nextCard() {
    currentIndex++;
    displayCard();
}

function updateProgress() {
    const progress = ((currentIndex) / currentCards.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Card ${currentIndex + 1} of ${currentCards.length}`;
    sessionCorrect.textContent = sessionStats.correct;
    sessionIncorrect.textContent = sessionStats.incorrect;
    
    const total = sessionStats.correct + sessionStats.incorrect;
    const acc = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;
    sessionAccuracy.textContent = acc + '%';
}

function endSession() {
    flashcardSection.classList.add('hidden');
    statsSection.classList.remove('hidden');
    
    // Save stats
    const totalLearned = sessionStats.correct;
    const total = sessionStats.correct + sessionStats.incorrect;
    const overallAccuracy = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;
    
    document.getElementById('totalLearned').textContent = totalLearned;
    document.getElementById('overallAccuracy').textContent = overallAccuracy + '%';
    document.getElementById('sessionCount').textContent = '1';
    document.getElementById('timeSpent').textContent = 'Session completed';
    
    cardsLearned.textContent = totalLearned;
    accuracy.textContent = overallAccuracy + '%';
}

function goBackToMenu() {
    flashcardSection.classList.add('hidden');
    statsSection.classList.add('hidden');
    menuSection.classList.remove('hidden');
    categorySelect.value = '';
    difficultySelect.value = '';
}

// Initialize
window.addEventListener('load', () => {
    console.log('French Flashcard App Loaded!');
});
