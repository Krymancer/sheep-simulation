const FRAME_SIZE = 600;
const TILE_SIZE = 20;
const POPULATION = 1;

let deltaTime = 10;

import Grass from './grass.js'
import Sheep from './sheep.js'

const canvas = document.getElementById('canvas');
canvas.width = FRAME_SIZE;
canvas.height = FRAME_SIZE;

const context = canvas.getContext('2d');
context.fillStyle = 'blue';

let food = [];
let sheeps = [];

for(let i=0; i<FRAME_SIZE/TILE_SIZE; i++){
    food[i] = [];
    for(let j=0; j<FRAME_SIZE/TILE_SIZE; j++){
        food[i].push(new Grass(i* TILE_SIZE,j * TILE_SIZE,TILE_SIZE-1));
    }
}

for(let i=0;i<POPULATION;i++){
    let x = Math.floor(random(0,FRAME_SIZE));
    let y = Math.floor(random(0,FRAME_SIZE));
    sheeps.push(new Sheep(x,y,TILE_SIZE/2));
}

function update(){
    context.fillStyle = 'black';
    context.fillRect(0,0,FRAME_SIZE,FRAME_SIZE);

    food.forEach(row => {
        row.forEach(grass => { 
            grass.update(context,deltaTime);
        });
    });

    sheeps.forEach((sheep,index) => {
        sheep.update(context,canvas,food,deltaTime);

        if(sheep.die()){
            sheeps.splice(index,1);
        }

        if(sheep.reproduce()){
            let x = Math.floor(random(0,FRAME_SIZE));
            let y = Math.floor(random(0,FRAME_SIZE));
            sheeps.push(new Sheep(x,y,TILE_SIZE/2));
        }
    });
    requestAnimationFrame(update);
}

update();

function random(min,max){
    return Math.random() * (max  - min) + min;
}
