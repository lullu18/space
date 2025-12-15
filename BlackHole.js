// ---------------------------------------------------------
// CLASS: BlackHole (Attractor)
// ---------------------------------------------------------
class BlackHole {
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.mass = m;
        this.G = 5; // Stronger gravity constant for the effect
        this.rs = (2 * this.G * this.mass) / (30); // Schwarzschild radius visual proxy
        this.absorbRadius = 15;
    }

    attract(particle) {
        let force = p5.Vector.sub(this.pos, particle.pos);
        let distance = force.mag();

        // Constrain distance so particles don't shoot off at light speed when too close
        distance = constrain(distance, 5, 800);

        force.normalize();

        // F = (G * m1 * m2) / r^2
        let strength = (this.G * this.mass * particle.mass) / (distance * distance);
        force.mult(strength);
        return force;
    }

    absorb(particle, system, whiteHole) {
        let d = p5.Vector.dist(this.pos, particle.pos);

        if (d < this.absorbRadius) {
            system.removeParticle(particle);
            whiteHole.emit(system);
            }
        }

    // Check if particle hit the event horizon
    checkInside(particle) {
        let d = p5.Vector.dist(this.pos, particle.pos);
        return d < this.rs; // Consumed if closer than visual radius
    }

    show() {
        // Accretion Halo (Glow)
        noFill();
        for (let i = 0; i < 10; i++) {
            let alpha = map(i, 0, 10, 50, 0);
            stroke(100, 150, 255, alpha);
            strokeWeight(i * 2);
            ellipse(this.pos.x, this.pos.y, this.rs * 2 + i * 5);
        }

        // Event Horizon (The Black Hole)
        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, this.rs * 2);

        // Tiny white stroke for contrast
        stroke(255, 50);
        strokeWeight(1);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.rs * 2);
    }
}
