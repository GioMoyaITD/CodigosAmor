document.addEventListener('click', function(e) {
    if(e.target.className !== 'back-btn') {
        createHearts(e.clientX, e.clientY);
    }
});

function createHearts(x, y) {
    const particleCount = 15; 

    for (let i = 0; i < particleCount; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart-particle');
        
        const emojis = ['❤️', '💖', '🌸', '✨', '🥰', '🦋'];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = (x - 14) + 'px'; 
        heart.style.top = (y - 14) + 'px';

        const destinationX = (Math.random() - 0.5) * 250; 
        const destinationY = (Math.random() - 0.5) * 250; 
        const randomRotation = (Math.random() - 0.5) * 200; 
        
        heart.style.setProperty('--tx', `${destinationX}px`);
        heart.style.setProperty('--ty', `${destinationY}px`);
        heart.style.setProperty('--rot', `${randomRotation}deg`);

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}