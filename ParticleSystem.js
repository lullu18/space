class ParticleSystem {
    constructor(x, y) {
        this.particles = [];

        for(let i = 0; i < 300; i++) {
            this.particles.push(new Particle(random(width), random(height)));
        }
    }

    applyBlackHole(blackHole) {
        for (let p of this.particles) {
            let d = dist(
                p.pos.x, p.pos.y,
                blackHole.pos.x, blackHole.pos.y
            );

            if (d < blackHole.influenceRadius) {
                let force = blackHole.attract(p);
                p.applyForce(force);
                p.maxSpeed = 8;
            } else {
                p.maxSpeed = 4;
            }
        }
    }

    applyWhiteHole(whiteHole) {
        for (let p of this.particles) {
            let force = whiteHole.repel(p);
            p.applyForce(force);
        }
    }

    update() {
        for (let p of this.particles) {
            p.update();
        }
    }
    
    draw() {
        for (let p of this.particles) {
            p.draw();
        }
    }
}