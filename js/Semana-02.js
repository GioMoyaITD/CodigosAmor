const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

// Configurar el tamaño del canvas al cargar la página
function initCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // 1. Pintamos todo el canvas de un color gris plateado
    ctx.fillStyle = '#cbd5e1'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Le agregamos un texto encima para invitarla a raspar
    ctx.font = 'bold 22px Nunito';
    ctx.fillStyle = '#64748b'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Raspa aquí 💖', canvas.width / 2, canvas.height / 2);
    
    // 3. La magia: le decimos al pincel que en lugar de pintar, "borre"
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 45; // El grosor del dedo al borrar
    ctx.lineCap = 'round'; // Para que los bordes del borrado sean suaves
    ctx.lineJoin = 'round';
}

// Inicializamos
initCanvas();

let isDrawing = false;

// Función para obtener las coordenadas exactas del dedo o el mouse
function getCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    // Si es un evento táctil (Celular)
    if (event.type.includes('touch')) {
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        };
    }
    // Si es mouse (PC)
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function startScratch(e) {
    isDrawing = true;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault(); // Evita que la pantalla se mueva mientras raspa
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopScratch() {
    isDrawing = false;
}

// Escuchamos los toques en la pantalla (Celular)
canvas.addEventListener('touchstart', startScratch, { passive: false });
canvas.addEventListener('touchmove', scratch, { passive: false });
canvas.addEventListener('touchend', stopScratch);

// Escuchamos el mouse (Por si lo abre en la computadora)
canvas.addEventListener('mousedown', startScratch);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', stopScratch);
canvas.addEventListener('mouseleave', stopScratch);