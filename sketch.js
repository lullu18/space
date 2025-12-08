let systems = [];
let blackHole;
let G = 1; // Gravitational constant

function setup() {
    createCanvas(800, 600);

    // Create the central Black Hole
    blackHole = new BlackHole(width / 2, height / 2, 200);

    // Initialize with a few particle systems around the canvas
    systems.push(new ParticleSystem(100, 100));
    systems.push(new ParticleSystem(width - 100, height - 100));
    systems.push(new ParticleSystem(width - 100, 100));
    systems.push(new ParticleSystem(100, height - 100));
}

function draw() {
    background(10, 10, 20, 200); // Slight trail effect with alpha

    // Draw stars background (static for performance, could be an image but generated here)
    if (frameCount === 1) {
        background(0);
    }

    // Display Black Hole
    blackHole.show();

    // Run all particle systems
    for (let i = systems.length - 1; i >= 0; i--) {
        let ps = systems[i];

        // Add new particles every frame
        ps.addParticle();

        // Apply forces
        ps.applyAttractor(blackHole);

        // Apply noise wind (Cosmic dust turbulence)
        ps.applyNoise();

        ps.run();

        // Optional: remove empty systems if needed, but prompt says "continue spawning"
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
