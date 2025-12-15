let systems = [];
let blackHole;
let whiteHole;
let G = 1; // Gravitational constant

function setup() {
    createCanvas(800, 600);

    // Create the central Black Hole
    blackHole = new BlackHole(width / 3, height / 2, 50);
    whiteHole = new WhiteHole(width * 2 / 3, height / 2);
}

function draw() {
    background(10, 10, 20, 200); // Slight trail effect with alpha

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
    let ps = new ParticleSystem(mouseX, mouseY);

    for (let i = 0; i <30; i++) {
        ps.addParticle();
    }

    systems.push(ps);
}

