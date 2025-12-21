class WhiteHole {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.visualRadius = 50;
    this.power = 30;
  }

  updateByBalance(balance) {
    this.visualRadius = map(balance, 0, 1, 40, 120);
    this.power = map(balance, 0, 1, 20, 80);
  }

  repel(particle) {
    let force = p5.Vector.sub(particle.pos, this.pos);
    let distance = constrain(force.mag(), 20, 300);

    force.normalize();

    let strength = this.power / (distance * 1.5);
    strength = constrain(strength, 0, 0.4);

    force.mult(strength);
    return force;
  }

  show() {
    noFill();
    stroke(0, 0, 100, 150);
    ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);
  }
}