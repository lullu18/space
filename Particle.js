class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);

        this.mass = random(0.5, 2);
        this.maxSpeed = 4;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

    checkBlackHole(blackHole) {
        let d = dist(this.pos.x, this.pos.y,
        blackHole.pos.x, blackHole.pos.y);

        if (d < blackHole.influenceRadius) {
            this.maxSpeed = 8; // 👈 근처에서 가속
        } 
        else {
            this.maxSpeed = 4;
        }
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
