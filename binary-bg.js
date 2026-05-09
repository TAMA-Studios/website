const binaryCanvas = document.getElementById("binary-bg");
const binaryContext = binaryCanvas.getContext("2d");

const displayedCharacters = ["TAMA", "1", "0", 'std::cout << "TAMA Studios" << std::endl;', 'bool openSource = true;', 'for (auto& project : projects) project.build();'];
const particleSpeed = 0.7;
const particleColor = "rgb(80, 127, 255)";
const binaryParticles = [];
const maxBinaryParticles = 90;
const emberParticles = [];
const maxEmberParticles = 35;
const emberColor = "rgb(255, 115, 45)";

function resizeBinaryCanvas() {
    binaryCanvas.width = window.innerWidth;
    binaryCanvas.height = window.innerHeight;
}

function createBinaryParticle() {
    return {
        text: displayedCharacters[Math.floor(Math.random() * displayedCharacters.length)],
        x: Math.random() * binaryCanvas.width,
        y: Math.random() * binaryCanvas.height,
        size: Math.random() * 14 + 10,
        opacity: 0,
        maxOpacity: Math.random() * 0.16 + 0.05,
        fadeSpeed: (Math.random() * 0.004 + 0.002) * particleSpeed,
        driftX: (Math.random() - 0.5) * 0.25,
        driftY: (Math.random() - 0.5) * 0.25,
        fadingOut: false
    };
}

function createEmberParticle() {
    return {
        x: Math.random() * binaryCanvas.width,
        y: Math.random() * binaryCanvas.height,
        radius: Math.random() * 2 + 1,
        opacity: 0,
        maxOpacity: Math.random() * 0.18 + 0.06,
        fadeSpeed: (Math.random() * 0.003 + 0.0015) * particleSpeed,
        driftX: (Math.random() - 0.5) * 0.25,
        driftY: (Math.random() - 0.5) * 0.25,
        fadingOut: false
    };
}

function updateBinaryParticle(particle) {
    particle.x += particle.driftX * particleSpeed;
    particle.y += particle.driftY * particleSpeed;

    if (particle.fadingOut) {
        particle.opacity -= particle.fadeSpeed;
    } else {
        particle.opacity += particle.fadeSpeed;

        if (particle.opacity >= particle.maxOpacity) {
            particle.fadingOut = true;
        }
    }
}

function updateEmberParticle(particle) {
    particle.x += particle.driftX * particleSpeed;
    particle.y += particle.driftY * particleSpeed;

    if (particle.fadingOut) {
        particle.opacity -= particle.fadeSpeed;
    } else {
        particle.opacity += particle.fadeSpeed;

        if (particle.opacity >= particle.maxOpacity) {
            particle.fadingOut = true;
        }
    }
}

function drawBinaryParticle(particle) {
    binaryContext.globalAlpha = Math.max(particle.opacity, 0);
    binaryContext.fillStyle = particleColor;
    binaryContext.font = `${particle.size}px monospace`;
    binaryContext.fillText(particle.text, particle.x, particle.y);
}

function drawEmberParticle(particle) {
    binaryContext.globalAlpha = Math.max(particle.opacity, 0);
    binaryContext.fillStyle = emberColor;
    binaryContext.beginPath();
    binaryContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    binaryContext.fill();
}

function drawBinaryBackground() {
    binaryContext.clearRect(0, 0, binaryCanvas.width, binaryCanvas.height);

    if (binaryParticles.length < maxBinaryParticles && Math.random() > 0.65) {
        binaryParticles.push(createBinaryParticle());
    }

    if (emberParticles.length < maxEmberParticles && Math.random() > 0.94) {
        emberParticles.push(createEmberParticle());
    }

    for (let index = binaryParticles.length - 1; index >= 0; index--) {
        const particle = binaryParticles[index];

        updateBinaryParticle(particle);
        drawBinaryParticle(particle);

        const isInvisible = particle.opacity <= 0 && particle.fadingOut;
        const isOffscreen =
            particle.x < -50 ||
            particle.x > binaryCanvas.width + 50 ||
            particle.y < -50 ||
            particle.y > binaryCanvas.height + 50;

        if (isInvisible || isOffscreen) {
            binaryParticles.splice(index, 1);
        }
    }

    for (let index = emberParticles.length - 1; index >= 0; index--) {
        const particle = emberParticles[index];

        updateEmberParticle(particle);
        drawEmberParticle(particle);

        const isInvisible = particle.opacity <= 0 && particle.fadingOut;
        const isOffscreen =
            particle.x < -50 ||
            particle.x > binaryCanvas.width + 50 ||
            particle.y < -50 ||
            particle.y > binaryCanvas.height + 50;

        if (isInvisible || isOffscreen) {
            emberParticles.splice(index, 1);
        }
    }

    binaryContext.globalAlpha = 1;
    requestAnimationFrame(drawBinaryBackground);
}

resizeBinaryCanvas();
window.addEventListener("resize", resizeBinaryCanvas);
drawBinaryBackground();
