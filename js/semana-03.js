const heartBtn = document.getElementById('heart-btn');
const progressBar = document.getElementById('progress-bar');
const gameScreen = document.getElementById('game-screen');
const messageScreen = document.getElementById('message-screen');

let progress = 0;
let holdInterval;
let isHolding = false;

// Función para ir llenando la barra
function startCharging(e) {
    if (e.type === 'touchstart') e.preventDefault(); // Evita comportamientos raros en celular
    isHolding = true;
    
    // Añadimos una pequeña animación visual al corazón
    heartBtn.classList.add('scale-110');

    // Cada 50 milisegundos sube un 2%
    holdInterval = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            progressBar.style.width = `${progress}%`;
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
    heartBtn.classList.remove('scale-110');
    
    // Si no llegó a 100, se vacía rápidamente
    if (progress < 100) {
        progress = 0;
        progressBar.style.width = '0%';
    }
}

// Función cuando llega al 100%
function completeCharge() {
    clearInterval(holdInterval);
    heartBtn.style.pointerEvents = 'none'; // Desactiva el botón
    
    // Desvanece el juego y muestra el mensaje
    gameScreen.classList.add('opacity-0');
    
    setTimeout(() => {
        gameScreen.classList.add('hidden');
        messageScreen.classList.remove('hidden');
        
        // Un pequeño retraso para que la transición de opacidad se note
        setTimeout(() => {
            messageScreen.classList.remove('opacity-0');
        }, 50);
    }, 500); // Espera medio segundo
}

// Escuchamos eventos de celular
heartBtn.addEventListener('touchstart', startCharging);
heartBtn.addEventListener('touchend', stopCharging);
heartBtn.addEventListener('touchcancel', stopCharging);

// Escuchamos eventos de PC por si acaso
heartBtn.addEventListener('mousedown', startCharging);
window.addEventListener('mouseup', stopCharging);