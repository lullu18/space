class WhiteHole {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.timer = 0;
    this.interval = 15;
  }

  emit(system) {
    for (let i = 0; i < 5; i++) {
        let p = new Particle(this.pos.x, this.pos.y);
        p.vel = p5.Vector.random2D().mult(random(1, 3));
        p.immunity = 60; // Frames of immunity from being re-absorbed

        p.r = 220;
        p.g = 220;
        p.b = 255;

        system.particles.push(p);
    }
  }
  
  update(system) {
    this.timer++;
    if (this.timer % this.interval === 0) {
            this.emit(system);
        }
    }

  show() {
    noFill();
    stroke(200, 200, 255);
    ellipse(this.pos.x, this.pos.y, 40);
    }
}