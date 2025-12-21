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
        let force = p5.Vector.sub(this.pos, particle.pos);
        let distance = constrain(force.mag(), 12, this.influenceRadius);

        force.normalize();

        let strength = (this.G * this.mass * particle.mass) / (distance * distance);
        strength *= 1.4;
        
        force.mult(strength);
        return force;
    }

    show() {
        noStroke();
        fill(0, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);
    }
}
