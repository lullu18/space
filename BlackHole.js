class BlackHole {
    constructor(x, y) {
        this.pos = createVector(x, y);

        this.visualRadius = 80;
        this.influenceRadius = 260;

        this.mass = 90;
        this.G = 1;
    }

    updateByBalance(balance) {
        this.visualRadius = map(balance, 0, 1, 120, 40);
        this.mass = map(balance, 0, 1, 150, 30);
        this.influenceRadius = map(balance, 0, 1, 320, 140);
    }

    attract(particle) {
        let dir = p5.Vector.sub(this.pos, particle.pos);
        let d = constrain(dir.mag(), 12, this.influenceRadius);

        dir.normalize();

        let gravityStrength =
        (this.G * this.mass * particle.mass) / (d * d);

        let gravity = dir.copy().mult(gravityStrength * 2.2);

        let swirl = createVector(-dir.y, dir.x);
        let swirlStrength = map(d, 0, this.influenceRadius, 0.15, 0);
        swirl.mult(swirlStrength);

        return p5.Vector.add(gravity, swirl);
    }

    show() {
        noStroke();
        fill(0, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);
    }
}
