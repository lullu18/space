class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emitFromWhiteHole(whiteHole) {
        if (random() < 0.25) {
            this.particles.push(
                new Particle(
                    whiteHole.x, 
                    whiteHole.y
                )
            );
        }
    }

    applyBlackHole(blackHole) {
        for (let p of this.particles) {
            let d = dist(
                p.pos.x, p.pos.y,
                blackHole.pos.x, blackHole.pos.y
            );

            if (d < blackHole.influenceRadius) {
                p.applyForce(blackHole.attract(p));
            }
        }
    }

    applyWhiteHole(whiteHole) {
        for (let p of this.particles) {
            p.applyForce(whiteHole.repel(p));
        }
    }

    applyColor(blackHole, whiteHole) {
        for (let p of this.particles) {
            p.updateColorByPosition(blackHole, whiteHole);
        }
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    draw() {
        for (let p of this.particles) {
            p.show();
        }
    }
}