export default class Sheep {
    constructor(x, y, size, color = 'white') {
        this.x = x;
        this.y = y;
        this.size = size;

        this.dna = {
            color: color,
            speed: 4,
            move: 1,
            energy: 5,
            reproduction: 120
        }

        if (random(0, 100) < 20) {
            this.mutate();
        }

        this.time = 0;
        this.timeToMove = 100;
    }

    die() {
        return this.dna.energy <= 0;
    }

    reproduce() {
        if ((this.dna.energy > this.dna.reproduction) && (random(0, 100) < 50)) {
            this.dna.energy -= this.dna.reproduction;
            return true;
        }
        return false;
    }

    mutate() {
        this.dna.color = getColor();
        this.dna.speed *= random(0, 2);
        this.dna.move *= random(0.5, 2);
        this.dna.energy *= random(0.5, 2);
        this.dna.reproduction *= random(0.5, 2);
    }

    move(canvas) {
        this.x += random(-this.dna.speed, this.dna.speed) * this.size;
        this.y += random(-this.dna.speed, this.dna.speed) * this.size;
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.fixPosition(canvas);
        this.dna.energy -= this.dna.move;
    }

    fixPosition(canvas) {
        if (this.x > canvas.width) {
            this.x %= canvas.width;
        } else if (this.x < 0) {
            this.x += canvas.width;
        } else if (this.y > canvas.height) {
            this.y %= canvas.height;
        } else if (this.y < 0) {
            this.y += canvas.height;
        } else {
            return;
        }
    }

    eat(food) {
        let x = Math.floor(this.x / (this.size * 2));
        let y = Math.floor(this.y / (this.size * 2));
        if (food[x] !== undefined && food[x][y] !== undefined) {
            if (!food[x][y].eaten) {
                this.dna.energy += 5;
                food[x][y].eated();
            }
        }
    }

    update(context, canvas, food, deltaTime) {
        if (this.time >= this.timeToMove) {
            this.move(canvas);
            this.eat(food);
            this.time = 0;
        }

        context.fillStyle = this.dna.color;
        context.fillRect(this.x, this.y, this.size, this.size);

        this.time += deltaTime;
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function getColor() {
    const r = Math.floor(random(10, 255)).toString(16);
    const g = Math.floor(random(10, 255)).toString(16);
    const b = Math.floor(random(10, 255)).toString(16);

    return '#' + r + g + b;
}