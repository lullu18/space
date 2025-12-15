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

    whiteHole.update(systems[0]); // Update white hole to emit particles


    for (let ps of systems) {
        ps.applyAttractor(blackHole);
        ps.applyNoise();
        ps.run();
    }

    // Display Black Hole
    blackHole.show();
    whiteHole.show();
}

function mousePressed() {
    whiteHole.pos.set(mouseX, mouseY);
}

