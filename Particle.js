class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);

        this.mass = random(0.5, 2);
        this.maxSpeed = 4;

        this.hue = random(220, 280);
        this.baseSaturation = random(60, 90);
        this.baseBrightness = random(40, 70);
        this.currentBrightness = this.baseBrightness;
        this.alpha = random(120, 180);
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    updateColorByPosition(blackHole, whiteHole) {
        let dBlack = dist(
          this.pos.x, this.pos.y,
          blackHole.pos.x, blackHole.pos.y
        );

        let dWhite = dist(
            this.pos.x, this.pos.y,
            whiteHole.pos.x, whiteHole.pos.y
        );

        dBlack = constrain(dBlack, 0, blackHole.influenceRadius);
        dWhite = constrain(dWhite, 0, 300);

        let whiteRatio = map(dWhite, 0, 300, 1, 0);

        let targetBrightness = lerp(30, 100, whiteRatio);

        this.currentBrightness = lerp(this.currentBrightness, targetBrightness, 0.03);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        noStroke();
        fill(this.hue, 40, this.currentBrightness, this.alpha);
        ellipse(this.pos.x, this.pos.y, 3);
    }
}
