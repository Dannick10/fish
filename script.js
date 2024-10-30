let root = {
  lengthSnake: 20,
};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Fish {
  constructor(x, y, length, speed, quantity) {
    this.head = { x: x, y: y, dx: 1, dy: 1 };
    this.tails = [];
    this.length = length;
    this.speed = speed;
    this.quantity = quantity;

    for (let i = 0; i < quantity; i++) {
      this.tails.push({ x: x, y: y });
    }
    addEventListener("mousemove", (e) => {
      this.moveCord(e);
    });
  }

  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(100,150,255,0.5)";
    ctx.moveTo(this.head.x, this.head.y);

    this.tails.forEach((tail) => {
      ctx.lineTo(tail.x, tail.y);
    });

    ctx.stroke();
  }

  randomMove() {
    let random = Math.floor(Math.random() * 100);

    this.head.x += this.head.dx;
    this.head.y += this.head.dy;

    if (this.head.x + this.length > canvas.width || this.head.x < this.length) {
      this.head.dx *= -1;
    }

    if (
      this.head.y + this.length > canvas.height ||
      this.head.y < this.length
    ) {
      this.head.dy *= -1;
    }

    if (random < 25) {
      this.head.dx += (Math.random() - 0.5) * this.speed;
    } else if (random >= 25 && random < 50) {
      this.head.dy += (Math.random() - 0.5) * this.speed;
    } else if (random >= 50 && random < 75) {
      this.head.dx -= (Math.random() - 0.5) * this.speed;
    } else {
      this.head.dy -= (Math.random() - 0.5) * this.speed;
    }

    const maxSpeed = 3;
    this.head.dx = Math.max(Math.min(this.head.dx, maxSpeed), -maxSpeed);
    this.head.dy = Math.max(Math.min(this.head.dy, maxSpeed), -maxSpeed);

    if(this.head.dx >= maxSpeed || this.head.dy >= maxSpeed) {
      this.head.dx = (Math.random() - 0.5) * this.speed;
      this.head.dx = (Math.random() - 0.5) * this.speed;
    }
  }

  drawPoints() {
    ctx.fillStyle = "rgba(100,150,255,0.9)";
    ctx.beginPath();
    ctx.arc(this.head.x, this.head.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    this.tails.forEach((tail, i) => {
      ctx.beginPath();
      ctx.arc(tail.x, tail.y, 1 * i, 1 / i, 1 * Math.PI);
      ctx.fillStyle = "rgba(100,100,255,0.9)";
      ctx.fill();
      ctx.closePath();
    });
  }

  drawWings() {
    const angle = Math.atan2(
      this.head.y - this.tails[this.tails.length - 1].y,
      this.head.x - this.tails[this.tails.length - 1].x
    );

    ctx.beginPath();
    const firstWings = this.tails.slice(0, 5);
    const secondWings = this.tails.slice(8, 12);

    firstWings.forEach((tail, i) => {
      ctx.beginPath();
      ctx.arc(
        tail.x - Math.cos(angle),
        tail.y - Math.sin(angle),
        (this.quantity / 2) * i,
        1 / i,
        1 * Math.PI
      );

      ctx.fillStyle = "rgba(100,100,200,0.9)";
      ctx.fill();
      ctx.closePath();
    });

    secondWings.forEach((tail, i) => {
      ctx.beginPath();
      ctx.arc(
        tail.x - Math.cos(angle),
        tail.y - Math.sin(angle),
        10 * i,
        1 / i,
        1 * Math.PI
      );
      ctx.fillStyle = "rgba(100,100,200,0.9)";
      ctx.fill();
      ctx.closePath();
    });
  }

  drawHeadFish() {
    ctx.beginPath();
    ctx.arc(this.head.x, this.head.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(100,100,255,1)";
    ctx.fill();
    ctx.closePath();
  }

  drawEyeFish() {
    const angle = Math.atan2(
      this.head.y - this.tails[this.tails.length - 1].y,
      this.head.x - this.tails[this.tails.length - 1].x
    );
  }

  drawBodyFish() {
    ctx.beginPath();
    this.tails.forEach((tail, i) => {
      ctx.arc(tail.x, tail.y, this.quantity - i + 1, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(100,100,255,0.5)";
      ctx.fill();
      ctx.closePath();
    });
  }

  drawFish() {
    this.drawHeadFish();
    this.drawWings();
    this.drawBodyFish();
    this.drawEyeFish();
  }

  moveCord(mouse) {
    this.head.x = mouse.x;
    this.head.y = mouse.y;
  }

  moveTail() {
    for (let i = 0; i < this.tails.length; i++) {
      let target = i === 0 ? this.head : this.tails[i - 1];
      let tail = this.tails[i];

      const dx = target.x - tail.x;
      const dy = target.y - tail.y;
      const angle = Math.atan2(dy, dx);

      tail.x = target.x - Math.cos(angle) * this.length;
      tail.y = target.y - Math.sin(angle) * this.length;
    }
  }
  update() {
    this.clear();
    this.moveTail();
    this.draw();
    this.drawPoints();
    this.randomMove();
    this.drawFish();
    requestAnimationFrame(this.update.bind(this));
  }
}

const size = Math.floor(Math.random()*20)+8

const game = new Fish(100, 100, 11, 0.2, root.lengthSnake);
game.update();
