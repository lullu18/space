class BlackHole {
    constructor(x, y) {
        this.pos = createVector(x, y);

        this.visualRadius = 80;
        this.coreRadius = 20;
        this.influenceRadius = 250;

        this.mass = 80;
        this.G = 1;
    }

    updateByBalance(balance) {
        this.visualRadius = map(balance, 0, 1, 120, 40);
        this.mass = map(balance, 0, 1, 120, 20);
        this.influenceRadius = map(balance, 0, 1, 300, 120);
    }

    attract(particle) {
        let force = p5.Vector.sub(this.pos, particle.pos);
        let distance = constrain(force.mag(), 5, this.influenceRadius);

        force.normalize();

        let strength = (this.G * this.mass * particle.mass) / (distance * distance);

        force.mult(strength);
        return force;
    }

    checkInside(particle) {
        let d = p5.Vector.dist(this.pos, particle.pos);
        return d < this.rs; // Consumed if closer than visual radius
    }

    show() {
        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);
    }
}
