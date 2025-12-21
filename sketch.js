let blackHole;
let whiteHole;
let particleSystem;

let slider;
let balance = 0.5;

function setup() {
    createCanvas(800, 600);

    slider = createSlider(0, 1, 0.5, 0.01);
    slider.position(20, 20);
    slider.style('width', '160px');

    blackHole = new BlackHole(width / 3, height / 2, 50);
    whiteHole = new WhiteHole((2 * width) / 3, height / 2);

    particleSystem = new ParticleSystem();
}

function draw() {
    background(10); 

    balance = slider.value();

    blackHole.updateByBalance(balance);
    whiteHole.updateByBalance(balance);

    blackHole.draw();
    whiteHole.draw();

    particleSystem.applyBlackHole(blackHole);
    particleSystem.applyWhiteHole(whiteHole);

    particleSystem.update();
    particleSystem.draw();

    drawUI();  
}

function drawUI() {
    fill(255);
    noStroke();
    textSize(12);
    text("Black Hole", 20, 70);
    text("White Hole", 140, 70);
}

