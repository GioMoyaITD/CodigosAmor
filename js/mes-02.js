// --- PREGUNTAS DEL QUIZ (¡Edita esto con sus datos reales!) ---
const quizData = [
    {
        question: "¿Dónde fue nuestra primera cita oficial?",
        options: ["En el cine", "En un parque", "En un café", "En la playa"],
        correct: 2 // El índice correcto (0, 1, 2 o 3). En este caso, "En un café".
    },
    {
        question: "¿Cuál es mi comida favorita en el mundo?",
        options: ["Sushi", "Pizza", "Hamburguesas", "Pastas"],
        correct: 0
    },
    {
        question: "¿Qué detalle me enamoró primero de ti?",
        options: ["Tus ojos", "Tu sonrisa", "Tu forma de ser", "Todo lo anterior"],
        correct: 3
    },
    {
        question: "¿En qué mes nos dimos el primer beso?",
        options: ["Enero", "Febrero", "Marzo", "Abril"],
        correct: 1
    },
    {
        question: "¿Cuánto te amo?",
        options: ["Mucho", "Muchísimo", "Demasiado", "Más que a nada en el universo"],
        correct: 3
    }
];

// --- VARIABLES ---
let currentQuestionIndex = 0;
let score = 0;
let isAnimating = false;

// --- ELEMENTOS DEL DOM ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQDisplay = document.getElementById('current-q');
const scoreDisplay = document.getElementById('score-display');

// --- LÓGICA ---

// Iniciar juego
startBtn.addEventListener('click', () => {
    startScreen.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        quizScreen.classList.add('fade-in');
        loadQuestion();
    }, 400);
});

// Cargar pregunta
function loadQuestion() {
    isAnimating = false;
    const currentQuiz = quizData[currentQuestionIndex];
    
    currentQDisplay.innerText = currentQuestionIndex + 1;
    questionText.innerText = currentQuiz.question;
    optionsContainer.innerHTML = '';

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        // Estilos base de los botones de opciones
        button.className = 'w-full py-4 px-6 bg-white text-gray-700 font-bold text-lg rounded-2xl shadow-md border-2 border-transparent hover:border-purple-300 active:scale-95 transition-all duration-200 text-left';
        
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

// Seleccionar respuesta
function selectAnswer(selectedIndex, buttonElement) {
    if (isAnimating) return; // Evita doble clic
    isAnimating = true;

    const currentQuiz = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuiz.correct;

    if (isCorrect) {
        // Respuesta Correcta: Verde
        buttonElement.classList.remove('bg-white', 'text-gray-700');
        buttonElement.classList.add('bg-green-500', 'text-white', 'border-green-600', 'scale-105');
        score++;
        scoreDisplay.innerText = score;
    } else {
        // Respuesta Incorrecta: Rojo y vibra
        buttonElement.classList.remove('bg-white', 'text-gray-700');
        buttonElement.classList.add('bg-red-500', 'text-white', 'border-red-600', 'shake');
        
        // Mostrar cuál era la correcta
        const allButtons = optionsContainer.children;
        allButtons[currentQuiz.correct].classList.remove('bg-white', 'text-gray-700');
        allButtons[currentQuiz.correct].classList.add('bg-green-200', 'text-green-800', 'border-green-400');
    }

    // Esperar un poco antes de pasar a la siguiente
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500); // 1.5 segundos de espera
}

// Mostrar resultados
function showResults() {
    quizScreen.classList.add('opacity-0', 'scale-95');
    
    setTimeout(() => {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        resultScreen.classList.add('fade-in');
        backBtn.classList.remove('hidden'); // Mostrar botón de volver
        backBtn.classList.add('fade-in');

        document.getElementById('final-score').innerText = score;
        
        const resultMessage = document.getElementById('result-message');
        const resultEmoji = document.getElementById('result-emoji');

        // Mensajes dinámicos según el puntaje
        if (score === 5) {
            resultEmoji.innerText = '🥰';
            resultMessage.innerHTML = '¡Puntuación Perfecta!<br><br>Conoces cada detalle de lo nuestro. Te amo muchísimo, Constanza.';
        } else if (score >= 3) {
            resultEmoji.innerText = '❤️';
            resultMessage.innerHTML = '¡Casi perfecto!<br><br>Tenemos tanto por seguir descubriendo juntos. Eres lo mejor.';
        } else {
            resultEmoji.innerText = '😅';
            resultMessage.innerHTML = '¡Uy!<br><br>Creo que tendremos que tener más citas para repasar, mi amor. Igual te amo.';
        }
    }, 400);
}