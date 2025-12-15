// ---------------------------------------------------------
// CLASS: Particle
// ---------------------------------------------------------
class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        // Initial velocity: explosion or drift outward before being sucked in
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(0.5, 2));
        this.acc = createVector(0, 0);
        this.lifespan = 255.0;
        this.mass = random(0.5, 2);
        this.fromWhiteHole = false;
        this.immunity = 0;

        // Color: Purple to Blue spectrum
        this.hue = random(180, 280); // Blue to Purple/Pink range if using HSB logic roughly
        this.r = random(100, 200);
        this.g = random(50, 150);
        this.b = random(200, 255);
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acc.add(f);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan -= 0.5; // Slow decay

        if (this.immunity > 0) {
            this.immunity--;
        }  
    }

    show() {
        noStroke();
        // Map alpha to lifespan and proximity to death
        fill(this.r, this.g, this.b, this.lifespan);
        let size = this.mass * 3;
        ellipse(this.pos.x, this.pos.y, size);
    }

    isDead() {
        return (this.lifespan < 0);
    }
}
