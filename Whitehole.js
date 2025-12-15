class WhiteHole {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.emitRadius = 10;
  }

  emit(system) {
    for (let i = 0; i < 5; i++) {
        let p = new Particle(this.pos.x, this.pos.y);

        p.vel = p5.Vector.random2D().mult(random(2, 5));
        p.lifespan = 255;
        p.r =200;
        p.g =200;
        p.b =255;

        system.particles.push(p);
    }
  }

  show() {
    noFill();
    stroke(200, 200, 255);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, 40);
  }
}