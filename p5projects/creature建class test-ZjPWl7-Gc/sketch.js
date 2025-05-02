let creature;
let creatureLayer;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setuphandPose();

  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(4);

  // 创建一个单独的图层，带 WEBGL
  creatureLayer = createGraphics(windowWidth, windowHeight, WEBGL);
  creatureLayer.colorMode(HSB);
  creatureLayer.angleMode(DEGREES);
  creatureLayer.strokeWeight(4);

  creature = new Creature();
}

function draw() {
  background(100);
  drawhandPose(); // 底层主画面在主 canvas 上绘制

  // 更新 creature 逻辑
  if (indexX && indexY) {
    creature.follow(indexX, indexY, 0);
  } else {
    //creature.follow(mouseX - width / 2, mouseY - height / 2, 0);
  }

  creature.update();

  // 清空 creatureLayer，每帧重绘
  creatureLayer.clear();
  creatureLayer.push();
  creatureLayer.translate(creature.pos.x, creature.pos.y,creature.pos.z);
  creatureLayer.rotateY(creature.rotY);
  creatureLayer.rotateX(creature.rotX + 90);
  creature.drawOn(creatureLayer);  // 👈 将绘制放入图层中
  creatureLayer.pop();

  // 最后把 creatureLayer 显示在最上层
  resetMatrix();
  image(creatureLayer, -width / 2, -height / 2);
}

function lerpAngle(a, b, t) {
  let diff = b - a;
  if (abs(diff) > 180) diff -= 360 * Math.sign(diff);
  return a + diff * t;
}

class Creature {
  constructor() {
    this.pos = createVector(0, 0, 0);
    this.prevPos = this.pos.copy();
    this.target = createVector(0, 0, 0);

    this.rotY = 0;
    this.rotX = 0;
  }

  follow(x, y, z) {
    this.target.set(x, y, z);
  }

  update() {
    this.prevPos.set(this.pos);
    this.pos.lerp(this.target, 0.05); 

    let velocity = p5.Vector.sub(this.pos, this.prevPos);
    if (velocity.mag() > 0.01) velocity.normalize();

    let targetY = atan2(velocity.x, velocity.z);
    let targetX = asin(-velocity.y);

    this.rotY = lerpAngle(this.rotY, targetY, 0.06);
    this.rotX = lerpAngle(this.rotX, targetX, 0.06);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.rotY);
    rotateX(this.rotX + 90);
    this.drawCreature(); // 保留旧函数名
    pop();
  }

  drawOn(pg) {
    for (let r = 0; r <= 1; r += 0.04) {
      pg.stroke(255, 0, r * 100 + 20);
      pg.beginShape(POINTS);
      for (let theta = -360; theta <= 2700; theta += 2) {
        let phi = (180 / map(sin(frameCount * 5), -1, 1, 2, 10)) *
          Math.exp(-theta / (map(abs(sin(frameCount * 1 + PI)), 0, 1, 100, 10) * 180));
        
        let petalCut = 1 - (1 / 2) *
          pow((5 / 4) * pow(1 - ((3.6 * theta % 360) / 90), 2) - 1 / 4, 2);

        let hangDown = map(cos(frameCount * 5 + 0.5), -1, 1, -3, 5) *
          pow(r, 2) * pow(1.3 * r - 1, 2) * sin(phi);

        if (0 < petalCut * (r * sin(phi) + hangDown * cos(phi))) {
          let pX = 260 * petalCut * (r * sin(phi) + hangDown * cos(phi)) * sin(theta);
          let pY = -260 * petalCut * (r * cos(phi) - hangDown * sin(phi));
          let pZ = 260 * petalCut * (r * sin(phi) + hangDown * cos(phi)) * cos(theta);
          pg.vertex(pX, pY, pZ);
        }
      }
      pg.endShape();
    }
  }

}
