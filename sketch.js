let systems = [];
let blackHole;
let whiteHole;
let G = 1; // Gravitational constant

function setup() {
    createCanvas(800, 600);

    // Create the central Black Hole
    blackHole = new BlackHole(width / 3, height / 2);
    whiteHole = new WhiteHole(width * 2 / 3, height / 2);

    // Initialize with a few particle systems around the canvas
    systems.push(new ParticleSystem(100, 100));
    systems.push(new ParticleSystem(width - 100, height - 100));
    systems.push(new ParticleSystem(width - 100, 100));
    systems.push(new ParticleSystem(100, height - 100));
}

function draw() {
    background(10, 10, 20, 200); // Slight trail effect with alpha

    for (let p of system.particles) {
        blackHole.attract(p);
        blackHole.absorb(p, system, whiteHole);
        p.update();
        p.show();
    }

    // Draw stars background (static for performance, could be an image but generated here)
    if (frameCount === 1) {
        background(0);
    }

    // Display Black Hole
    blackHole.show();
    whiteHole.show();

    for (let i = systems.length - 1; i >= 0; i--) {
        let ps = systems[i];
        ps.addParticle();
        ps.applyAttractor(blackHole);
        ps.applyNoise();
        ps.run();
    }
}

function mousePressed() {
    // Create a new Particle System at mouse position
    systems.push(new ParticleSystem(mouseX, mouseY));
}

// ---------------------------------------------------------
// CLASS: Particle
// ---------------------------------------------------------
// Moved to Particle.js

// ---------------------------------------------------------
// CLASS: ParticleSystem
// ---------------------------------------------------------
// Moved to ParticleSystem.js

// ---------------------------------------------------------
// CLASS: BlackHole (Attractor)
// ---------------------------------------------------------
// Moved to BlackHole.js
