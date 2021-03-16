import {Entity} from "./Entity.js";

export class Player extends Entity{
    constructor() {
        super();
        this.hp = 100;
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 6;
        this.cooldown = 1000;
        this.isReady = true;
        this.direction = '';

    }

    onTouchEntity(obj) { // обработка встречи с объектом
        if (obj.type === 'enemy1' || obj.type === 'enemy2' || obj.type === 'enemy3')
            return 'player touch enemy';
        if (obj.type === 'bonus')
            return 'bonus';
    }

    onTouchMap(obj) {
        if (obj === 32 || obj === 144)
            return 'next level';
        if (obj === 97)
            return 'highFire';
        if (obj === 57)
            return 'lowFire';
        if (obj === 384)
            return 'cactus';
    }

}
