const heartBtn = document.getElementById('heart-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text'); // Capturamos el nuevo texto
const gameScreen = document.getElementById('game-screen');
const messageScreen = document.getElementById('message-screen');

let progress = 0;
let holdInterval;
let isHolding = false;

// Función para ir llenando la barra
function startCharging(e) {
    if (e.type === 'touchstart') e.preventDefault(); 
    isHolding = true;
    
    // Le quitamos el pulso normal y le ponemos el brillo intenso de carga
    heartBtn.classList.remove('animate-pulse');
    heartBtn.classList.add('charging-glow');

    // Cada 50 milisegundos sube un 2%
    holdInterval = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            progressText.innerText = `${progress}%`; // Actualiza el número en pantalla
        }
        
        // Si llega a 100%, ganamos
        if (progress >= 100) {
            completeCharge();
        }
    }, 50);
}

// Función si suelta el dedo antes de tiempo
function stopCharging() {
    isHolding = false;
    clearInterval(holdInterval);
    
    // Quitamos el brillo y devolvemos el latido normal
    heartBtn.classList.remove('charging-glow');
    heartBtn.classList.add('animate-pulse');
    
    // Si no llegó a 100, se vacía rápidamente
    if (progress < 100) {
        progress = 0;
        progressBar.style.width = '0%';
        progressText.innerText = '0%'; // Reseteamos el texto
    }
}

// Función cuando llega al 100%
function completeCharge() {
    clearInterval(holdInterval);
    heartBtn.style.pointerEvents = 'none'; 
    heartBtn.classList.remove('charging-glow');
    
    // Desvanece el juego y muestra el mensaje
    gameScreen.classList.add('opacity-0');
    
    setTimeout(() => {
        gameScreen.classList.add('hidden');
        messageScreen.classList.remove('hidden');
        
        setTimeout(() => {
            messageScreen.classList.remove('opacity-0');
        }, 50);
    }, 500); 
}

// Escuchamos eventos de celular
heartBtn.addEventListener('touchstart', startCharging, { passive: false });
heartBtn.addEventListener('touchend', stopCharging);
heartBtn.addEventListener('touchcancel', stopCharging);

// Escuchamos eventos de PC por si acaso
heartBtn.addEventListener('mousedown', startCharging);
window.addEventListener('mouseup', stopCharging);