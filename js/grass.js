export default class Grass{
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.eaten = false;
        this.time = 0;
        this.growTime = 100;
    }

    eated(){
        this.eaten = true;
    }

    grow(){
        if(this.time >= this.growTime){
            if(Math.random() < 0.1){
                this.eaten = false;
                this.time = 0;
            }
        }
    }

    update(context,deltaTime){
        this.time += deltaTime;
        this.grow();
        context.fillStyle = this.eaten ? 'brown' : 'green';
        context.fillRect(this.x,this.y,this.size,this.size);
    }
}