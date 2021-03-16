import {Entity} from "./Entity.js";

export class Enemy extends Entity{
    constructor() {
        super();
        this.hp = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 6;
        this.direction = '';
        this.cooldown = 1000;
        this.isReady = true;
    }

    onTouchMap(obj) {
        if (this.direction === '_left' || this.direction === '_right') {
            this.direction = (this.direction === '_left') ? '_right' : '_left';
            this.move_x = (this.move_x === -1) ? 1 : -1;
        }
        if (this.direction === '_up' || this.direction === '_down') {
            this.direction = (this.direction === '_up') ? '_down' : '_up';
            this.move_y = (this.move_y === -1) ? 1 : -1;
        }
    }
}
