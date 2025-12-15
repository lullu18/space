class ParticleSystem {
    constructor(x, y) {
        this.origin = createVector(x, y);
        this.particles = [];
    }

    addParticle() {
        // Spawn particles with a slight offset from origin
        let p = new Particle(this.origin.x, this.origin.y);
        this.particles.push(p);
    }

    applyAttractor(attractor) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];

            // Calculate Attraction Force
            let force = attractor.attract(p);
            p.applyForce(force);

            // Check if particle is sucked into the event horizon
            if (attractor.checkInside(p)) {
                this.particles.splice(i, 1);
            }
        }
    }

    applyNoise() {
        // Add Perlin noise for "Space Wind" effect
        for (let p of this.particles) {
            let nScale = 0.01;
            let angle = noise(p.pos.x * nScale, p.pos.y * nScale, frameCount * 0.005) * TWO_PI * 2;
            let wind = p5.Vector.fromAngle(angle);
            wind.mult(0.02); // Weak force just to add organic movement
            p.applyForce(wind);
        }
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.update();
            p.show();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    removeParticle(particle) {
        let index = this.particles.indexOf(particle);
        if (index !== -1) {
        this.particles.splice(index, 1);
        }
    }
}
