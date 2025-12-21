class WhiteHole {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.visualRadius = 40;
    this.power = 20;
  }

  updateByBalance(balance) {
    this.visualRadius = map(balance, 0, 1, 40, 120);
    this.power = map(balance, 0, 1, 20, 120);
  }

  repel(particle) {
    let force = p5.Vector.sub(particle.pos, this.pos);
    let distance = constrain(force.mag(), 20, 300);

    force.normalize();
    let strength = this.power / distance;

    force.mult(strength);
    return force;
  }

  show() {
    noFill();
    stroke(255, 120);
    ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);
  }
}