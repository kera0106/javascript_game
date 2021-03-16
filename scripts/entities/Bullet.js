import {Entity} from "./Entity.js";

export class Bullet extends Entity{
    constructor() {
        super();
        this.move_x = 0;
        this.move_y = 0;
        this.speed = 13;
        this.direction = '';
    }

    onTouchMap(obj) {
        if (!(obj === 1 || obj === 97 || obj === 57))
            return 'remove bullet';
    }

    onTouchEntity(obj) {
        if (obj.type === 'enemy1' || obj.type === 'enemy2' || obj.type === 'enemy3')
            return 'bullet to enemy';
        if (obj.type === 'player')
            return 'bullet to player';
        if (obj.type === 'bullet')
            return 'another bullet';
        if (obj.type === 'bonus')
            return 'remove bullet'
    }
}
