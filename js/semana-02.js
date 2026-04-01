const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

// Configurar el tamaño del canvas al cargar la página
function initCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // 1. Creamos un degradado hermoso en lugar del gris aburrido
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff9a9e'); // Rosa suave
    gradient.addColorStop(0.5, '#fecfef'); // Rosa intermedio
    gradient.addColorStop(1, '#ffc3a0'); // Tono durazno

    ctx.fillStyle = gradient; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Agregamos un patrón de circulitos simulando destellos (brillos)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for(let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width, 
            Math.random() * canvas.height, 
            Math.random() * 4 + 1, 
            0, Math.PI * 2
        );
        ctx.fill();
    }
    
    // 3. Texto más elegante para invitarla a raspar
    ctx.font = 'bold 26px Nunito';
    ctx.fillStyle = '#ffffff'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Sombra para que el texto resalte sobre el degradado
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.fillText('¡Raspa Aquí! 👆', canvas.width / 2, canvas.height / 2);
    
    // Quitamos la sombra para que no afecte el borrado
    ctx.shadowBlur = 0; 
    
    // 4. La magia: le decimos al pincel que en lugar de pintar, "borre"
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 45; // El grosor del dedo al borrar
    ctx.lineCap = 'round'; 
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