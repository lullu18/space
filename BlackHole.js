class BlackHole {
    constructor(x, y) {
        this.pos = createVector(x, y);

        this.visualRadius = 80;
        this.coreRadius = 20;
        this.influenceRadius = 250;

        this.mass = 80;
        this.G = 1;
    }

    attract(particle) {
        let force = p5.Vector.sub(this.pos, particle.pos);
        let distance = force.mag();

        distance = constrain(distance, 5, this.influenceRadius);
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
        // // Accretion Halo (Glow)
        // noFill();
        // for (let i = 0; i < 10; i++) {
        //     let alpha = map(i, 0, 10, 50, 0);
        //     stroke(100, 150, 255, alpha);
        //     strokeWeight(i * 2);
        //     ellipse(this.pos.x, this.pos.y, this.rs * 2 + i * 5);
        // }

        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);

        noFill();
        stroke(255, 50);
        ellipse(this.pos.x, this.pos.y, this.influenceRadius * 2);
    }
}
