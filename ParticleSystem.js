class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emitFromWhiteHole(whiteHole) {
        if (!whiteHole || !whiteHole.pos) return;

        let emitcount = 4;

        for (let i = 0; i < emitcount; i++) {
            let jitter = p5.Vector
                .random2D()
                .mult(random(0, 3));
            
            let p = new Particle(
                whiteHole.pos.x + jitter.x, 
                whiteHole.pos.y + jitter.y
            );  

            p.baseSize = random(4, 8);
            p.size = p.baseSize;

            this.particles.push(p);
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
            
                let boostedMaxSpeed = map(
                    d, 
                    blackHole.influenceRadius, 
                    0, 
                    p.maxSpeed, 
                    p.maxSpeed * 2.2
                );

                p.vel.limit(boostedMaxSpeed);
            }

            let shrinkRatio = map(
                d,
                blackHole.influenceRadius,
                blackHole.visualRadius * 0.2,
                1,
                0
            );
            p.size = max(0.5, p.baseSize * shrinkRatio);

            if (d < blackHole.visualRadius * 0.6) {
                p.life = 0;
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
            let p = this.particles[i];
            p.update();

            if (p.isDead()) {
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