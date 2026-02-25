// Escuchamos cada clic en la pantalla
document.addEventListener('click', function(e) {
    // Evitamos que salgan corazones si hace clic justo en el botón de volver
    if(e.target.className !== 'back-btn') {
        createHearts(e.clientX, e.clientY);
    }
});

function createHearts(x, y) {
    const particleCount = 15; // Cuántos emojis salen por clic

    for (let i = 0; i < particleCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart-particle');
        
        // Mezclamos emojis tiernos
        const emojis = ['❤️', '💖', '🌸', '✨', '🥰', '🦋'];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        // Posicionar el emoji exactamente donde se hizo clic
        heart.style.left = (x - 14) + 'px'; // Centramos un poco el emoji
        heart.style.top = (y - 14) + 'px';

        // Calcular dirección aleatoria para la explosión (arriba, abajo, lados)
        const destinationX = (Math.random() - 0.5) * 250; 
        const destinationY = (Math.random() - 0.5) * 250; 
        const randomRotation = (Math.random() - 0.5) * 200; // Rotación al caer
        
        // Pasamos estos valores aleatorios al CSS
        heart.style.setProperty('--tx', `${destinationX}px`);
        heart.style.setProperty('--ty', `${destinationY}px`);
        heart.style.setProperty('--rot', `${randomRotation}deg`);

        document.body.appendChild(heart);

        // Limpiar el DOM eliminando el emoji cuando termine su animación (1 segundo)
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}