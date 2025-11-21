// Colori ufficiali dei mattoncini LEGO
const brickColors = [
    '#D01012', // Bright Red (Rosso brillante)
    '#0055BF', // Bright Blue (Blu brillante)
    '#F2CD37', // Bright Yellow (Giallo brillante)
    '#237841', // Dark Green (Verde scuro)
    '#FE8A18', // Bright Orange (Arancione brillante)
    '#A83E96', // Bright Purple (Viola brillante)
    '#008F9B', // Dark Turquoise (Turchese scuro)
    '#D01012', // Bright Red (duplicato)
    '#0055BF', // Bright Blue (duplicato)
    '#95B90B', // Lime (Verde lime)
];

// Tipi di mattoncini LEGO con proporzioni realistiche
const brickTypes = [
    { width: 120, height: 40, studs: 4, name: '2x4' },
    { width: 80, height: 40, studs: 3, name: '2x3' },
    { width: 60, height: 40, studs: 2, name: '2x2' },
    { width: 40, height: 40, studs: 1, name: '1x2' },
];

// Creazione del muro di mattoncini LEGO
function createBrickWall() {
    const brickWall = document.getElementById('brickWall');
    brickWall.innerHTML = ''; // Pulisci il muro esistente
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let currentY = 0;
    let rowOffset = 0;
    
    // Crea righe di mattoncini fino a riempire lo schermo
    while (currentY < windowHeight) {
        let currentX = rowOffset;
        
        // Crea mattoncini in una riga
        while (currentX < windowWidth + 100) {
            const brick = document.createElement('div');
            brick.className = 'brick';
            
            // Scegli tipo e colore casuale
            const type = brickTypes[Math.floor(Math.random() * brickTypes.length)];
            const color = brickColors[Math.floor(Math.random() * brickColors.length)];
            
            brick.style.setProperty('--brick-color', color);
            brick.style.width = `${type.width}px`;
            brick.style.height = `${type.height}px`;
            brick.style.position = 'absolute';
            brick.style.left = `${currentX}px`;
            brick.style.top = `${currentY}px`;
            
            // Nessuno stud da aggiungere
            
            // Calcola direzioni casuali per l'esplosione
            const angle = Math.random() * Math.PI * 2;
            const distance = 1000 + Math.random() * 800;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rotation = (Math.random() - 0.5) * 1080;
            
            brick.style.setProperty('--tx', `${tx}px`);
            brick.style.setProperty('--ty', `${ty}px`);
            brick.style.setProperty('--rotation', `${rotation}deg`);
            
            brickWall.appendChild(brick);
            currentX += type.width;
        }
        
        currentY += 40; // Altezza standard di una riga
        
        // Alterna l'offset per creare l'effetto di incastro
        rowOffset = rowOffset === 0 ? -60 : 0;
    }
}

// Gestione dello scroll
function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3; // Inizia l'animazione al 30% dello scroll
    
    const bricks = document.querySelectorAll('.brick');
    const logoContainer = document.getElementById('logoContainer');
    const subtitleImage = document.getElementById('subtitleImage');
    const heroSection = document.getElementById('hero');
    const contentSection = document.getElementById('content');
    
    // Calcola il progresso dello scroll (0 a 1)
    const scrollProgress = Math.min(scrollPosition / threshold, 1);
    
    // Animazione dei mattoncini
    if (scrollProgress > 0) {
        // Nascondi gradualmente il logo
        logoContainer.style.opacity = 1 - scrollProgress;
        logoContainer.style.transform = `scale(${1 - scrollProgress * 0.2})`;
        
        if (scrollProgress >= 1) {
            logoContainer.classList.add('hidden');
        } else {
            logoContainer.classList.remove('hidden');
        }
        
        // Esplodi i mattoncini in modo graduale
        bricks.forEach((brick, index) => {
            const delay = (index / bricks.length) * 0.3; // Ritardo progressivo
            const brickProgress = Math.max(0, Math.min((scrollProgress - delay) * 2, 1));
            
            if (brickProgress > 0.1) {
                brick.classList.add('exploded');
                brick.style.transitionDelay = `${delay}s`;
            } else {
                brick.classList.remove('exploded');
            }
        });
    } else {
        // Reset quando si torna all'inizio
        logoContainer.style.opacity = 1;
        logoContainer.style.transform = 'scale(1)';
        logoContainer.classList.remove('hidden');
        
        bricks.forEach(brick => {
            brick.classList.remove('exploded');
        });
    }
    
    // Mostra l'immagine quando i mattoncini sono esplosi
    if (scrollProgress >= 0.8) {
        subtitleImage.classList.add('visible');
    } else {
        subtitleImage.classList.remove('visible');
    }
    
    // Nascondi la sezione hero quando lo scroll è completo
    if (scrollProgress >= 1) {
        heroSection.style.opacity = Math.max(0, 1 - (scrollProgress - 1) * 2);
    } else {
        heroSection.style.opacity = 1;
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    createBrickWall();
    handleScroll(); // Chiama una volta per inizializzare lo stato
});

// Listener per lo scroll
window.addEventListener('scroll', handleScroll);

// Listener per il ridimensionamento della finestra
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Ricrea il muro con il numero appropriato di mattoncini
        const brickWall = document.getElementById('brickWall');
        brickWall.innerHTML = '';
        createBrickWall();
        handleScroll();
    }, 250);
});

