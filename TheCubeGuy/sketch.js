// Clase base para todos los objetos del juego
class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Clase para bloques en el juego
class Block extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 100;
    this.height = 50;
  }
}

// Clase para el jugador
class Player extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 50;
    this.height = 50;
    this.speed = 15; // velocidad del jugador
    this.isJumping = false;
    this.jumpHeight = 100;
    this.jumpCount = 0;
    this.jumpSpeed = 10;
  }

  // Métodos para mover al jugador
  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpCount = 0;
    }
  }

  update() {
    // Actualizar posición en el eje Y si está saltando
    if (this.isJumping) {
      this.y -= this.jumpSpeed;
      this.jumpCount += this.jumpSpeed;
      if (this.jumpCount >= this.jumpHeight) {
        this.isJumping = false;
      }
    }
    // Detectar si hay un bloque debajo del jugador
    const blocks = gameObjects.filter((obj) => obj instanceof Block);
    const blockUnderPlayer = blocks.find(
      (block) =>
        this.x + this.width > block.x &&
        this.x < block.x + block.width &&
        this.y + this.height === block.y
    );
    if (!blockUnderPlayer) {
      this.y += this.jumpSpeed;
    }
  }
}

// Clase para la línea de llegada del juego
class FinishLine extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 150;
    this.height = 150;
  }
}

// Arreglo para almacenar todos los objetos del juego
const gameObjects = [
  new Block(0, 200),
  new Block(100, 200),
  new Block(200, 200),
  new Block(300, 200),
  new Player(100, 150),
  new FinishLine(400, 200),
];

// Escuchar el evento de teclado para mover al jugador
document.addEventListener('keydown', (event) => {
  const player = gameObjects.find((obj) => obj instanceof Player);

  switch (event.code) {
    case 'ArrowLeft':
    case 'KeyA':
      player.moveLeft();
      break;
    case 'ArrowRight':
    case 'KeyD':
      player.moveRight();
      break;
    case 'Space':
      player.jump();
      break;
    default:
      break;
  }
});

// Crear el canvas y agregarlo al DOM
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// Función para dibujar el juego
function draw() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar bloques
  const blocks = gameObjects.filter((obj) => obj instanceof Block);
  blocks.forEach((block) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(block.x, block.y, block.width, block.height);
  });

  // Dibujar jugador
  const player = gameObjects.find((obj) => obj instanceof Player);
  ctx.fillStyle = 'rgb(165,155,155)';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Dibujar línea de llegada
  const finishLine = gameObjects.find((obj) => obj instanceof FinishLine);
  ctx.fillStyle = 'green';
  ctx.fillRect(finishLine.x, finishLine.y, finishLine.width, finishLine.height);
}

// Llamar a la función draw cada 1/60 segundos para actualizar la pantalla
setInterval(draw, 1000 / 60);