class WhiteHole {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.emitRadius = 10;
  }

  emit(system) {
    let p = new Particle(this.pos.x, this.pos.y);

    // 방사형으로 튀어나오게
    p.velocity = p5.Vector.random2D().mult(random(2, 5));

    system.addParticle(p);
  }

  show() {
    noFill();
    stroke(200, 200, 255);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, 40);
  }
}