class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);

        let angle = random(TWO_PI);
        this.vel = p5.Vector.fromAngle(angle).mult(random(0.5, 2));

        this.acc = createVector(0, 0);

        this.mass = random(0.6, 2);
        this.maxSpeed = random(3, 7);

        this.size = random(2.5, 5.5);

        this.hue = random(215, 265);
        this.sat = random(30, 60);

        this.baseBrightness = random(55, 85);
        this.currentBrightness = this.baseBrightness;

        this.alpha = random(100, 180);

        this.life = 255;
        this.decay = random(0.6, 1.2);

    }

    
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    updateColorByPosition(blackHole, whiteHole) {
        let dWhite = dist(
            this.pos.x,
            this.pos.y,
            whiteHole.pos.x,
            whiteHole.pos.y
        );

        let ratio = map(dWhite, 0, 320, 1, 0);
        ratio = constrain(ratio, 0, 1);

        let targetBrightness = lerp(25, 100, ratio);
        this.currentBrightness = lerp(
            this.currentBrightness,
            targetBrightness,
            0.04
        );
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.life -= this.decay;
    }

    show() {
        noStroke();
        fill(
        this.hue,
        this.sat,
        this.currentBrightness,
        this.alpha * (this.life / 255)
        );
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    isDead() {
        return this.life <= 0;
    }
}
