let systems = [];
let blackHole;
let whiteHoles = [];
let G = 1; // Gravitational constant

function setup() {
    createCanvas(800, 600);

    // Create the central Black Hole
    blackHole = new BlackHole(width / 3, height / 2, 50);

    // systems.push(new ParticleSystem(0, 0));
}

function draw() {
    background(10, 10, 20, 200); // Slight trail effect with alpha

    for (let wh of whiteHoles) {
        wh.update(systems[0]); // Update white hole to emit particles
        wh.show();
    }

    for (let ps of systems) {
        ps.applyAttractor(blackHole);
        ps.applyNoise();
        ps.run();
    }

    blackHole.show();
}

function mousePressed() {
    let wh = new WhiteHole(mouseX, mouseY);
    let ps = new ParticleSystem(mouseX, mouseY);
    wh.system = ps;
    whiteHoles.push(wh);
    systems.push(ps);
}

