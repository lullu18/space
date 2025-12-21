let blackHole;
let whiteHole;
let particleSystem;

let slider;
let balance = 0.5;

function setup() {
    createCanvas(800, 600);
    colorMode(HSB, 360, 100, 100, 225);

    slider = createSlider(0, 1, 0.5, 0.01);
    slider.position(20, 20);
    slider.style('width', '160px');

    blackHole = new BlackHole(width / 3, height / 2);
    whiteHole = new WhiteHole((2 * width) / 3, height / 2);

    particleSystem = new ParticleSystem();
}

function draw() {
    background(10, 40); 

    balance = slider.value();

    blackHole.updateByBalance(balance);
    whiteHole.updateByBalance(balance);

    blackHole.show();
    whiteHole.show();

    particleSystem.emitFromWhiteHole(whiteHole);

    particleSystem.applyBlackHole(blackHole);
    particleSystem.applyWhiteHole(whiteHole);
    particleSystem.applyColor(blackHole, whiteHole);

    particleSystem.update();
    particleSystem.draw();

    drawUI();  
}

function drawUI() {
    fill(255);
    noStroke();
    textSize(12);
    text("Black Hole", 20, 70);
    text("White Hole", 160, 70);
}

