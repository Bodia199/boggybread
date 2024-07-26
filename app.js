const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let breadArray = [];
let score = 0;

class Bread {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = 50;
        this.speed = 2;
    }

    draw() {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.y += this.speed;
    }
}

function spawnBread() {
    breadArray.push(new Bread());
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    breadArray.forEach((bread, index) => {
        bread.update();
        bread.draw();

        if (bread.y + bread.size > canvas.height) {
            breadArray.splice(index, 1);
        }
    });
}

function detectCollision(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    breadArray.forEach((bread, index) => {
        if (mouseX > bread.x && mouseX < bread.x + bread.size &&
            mouseY > bread.y && mouseY < bread.y + bread.size) {
            breadArray.splice(index, 1);
            score++;
            console.log(`Score: ${score}`);
        }
    });
}

setInterval(spawnBread, 1000);
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', detectCollision);
gameLoop();
