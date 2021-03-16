import {DamageManager} from "./DamageManager.js";

export class PhysicManager{
    constructor(gameManager, soundManager) {
        this.gameManager = gameManager;
        this.soundManager = soundManager;
        this.damageManager = new DamageManager(localStorage["difficulty"]);
        this.isLevelUp = false;
    }

    update(obj) {
        if (obj.move_x === 0 && obj.move_y === 0)
            return 'stop';

        let newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        let newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);
        let ts = this.mapManager.getTilesetIndex(newX + obj.size_x/2, newY + obj.size_y/2);

        if (obj.type !== 'bullet') {
            if (ts === 240)
                obj.speed = 2.5;
            else if (ts === 93)
                obj.speed = 1;
            else
                obj.speed = 6;
        }


        let e = this.entityAtXY(obj, newX, newY);

        let objectType = obj.type.split('_');

        if (e !== null && obj.onTouchEntity) {
            let answer = obj.onTouchEntity(e);

            if (answer === 'player touch enemy') {
                this.gameManager.createEffect(e.pos_x, e.pos_y);
                this.gameManager.changeHP(this.damageManager.touchEnemy());
            }

            if (answer === 'bullet to enemy'){
                console.log("THIS")
                this.gameManager.createEffect(e.pos_x, e.pos_y);
                e.hp += this.damageManager.bulletPlayer();
                if (e.hp <= 0) {
                    this.gameManager.kill(e);
                    this.gameManager.changeScore(100);
                }
                this.gameManager.kill(obj);
            }

            if (answer ===  'bonus'){
                this.gameManager.changeHP(e.getHealth());
                this.soundManager.play("./public/sound/bonus.mp3", {looping: false, volume: 0.1});
                this.gameManager.kill(e);
            }

            if (answer === 'another bullet') {
                this.gameManager.kill(e);
                this.gameManager.kill(obj);
            }

            if (answer === 'bullet to player'){
                this.gameManager.createEffect(e.pos_x, e.pos_y);
                this.gameManager.kill(obj);
                this.gameManager.changeHP(this.damageManager.bulletEnemy())
            }

            if (answer === 'remove bullet'){
                this.gameManager.kill(obj);
                this.gameManager.createEffect(obj.pos_x, obj.pos_y);
            }
        }

        if (!(ts === 1 || ts === 240 || ts === 93 || ((obj.type === 'bullet') && (ts === 97)) | ((obj.type === 'bullet') && (ts === 57))) && obj.onTouchMap) {
            let answer = obj.onTouchMap(ts);
            if (answer === 'next level' && !this.isLevelUp) {
                this.soundManager.play("./public/sound/nextLevel.mp3", {looping: false, volume: 0.1});
                this.isLevelUp = true;
                this.gameManager.currentLevel++;
                setTimeout(() => {
                    this.gameManager.nextLevel();
                    this.isLevelUp = false;
                    }, 500);
            }
            if (answer === 'highFire') {
                this.gameManager.changeHP(this.damageManager.touchHighFire());
                this.gameManager.createEffect(obj.pos_x, obj.pos_y);
                this.soundManager.play("./public/sound/failTailset.mp3", {looping: false, volume: 0.1});
            }
            if (answer === 'lowFire') {
                this.gameManager.changeHP(this.damageManager.touchLowFire());
                this.gameManager.createEffect(obj.pos_x, obj.pos_y);
                this.soundManager.play("./public/sound/failTailset.mp3", {looping: false, volume: 0.1});
            }
            if (answer === 'cactus') {
                this.gameManager.changeHP(this.damageManager.touchCactus());
                this.gameManager.createEffect(obj.pos_x, obj.pos_y);
                this.soundManager.play("./public/sound/failTailset.mp3", {looping: false, volume: 0.1});
            }
            if (answer === 'remove bullet') {
                this.gameManager.createEffect(obj.pos_x, obj.pos_y);
                this.gameManager.kill(obj);
                this.soundManager.play("./public/sound/failTailset.mp3", {looping: false, volume: 0.1});
            }
            return;
        }

        if (objectType[0] === 'enemy1' || objectType[0] === 'enemy2' || objectType[0] === 'enemy3') {
            for (let i = 0; i < this.mapManager.view.w/this.mapManager.blockWidth/2 - 1; i++) {
                let tempX = obj.pos_x  + i*this.mapManager.blockWidth*obj.move_x;
                let tempY = obj.pos_y  + i*this.mapManager.blockHeight*obj.move_y;

                let curTileset = this.mapManager.getTilesetIndex(tempX, tempY);
                if (curTileset === 2 || curTileset === 384 || curTileset === 24 || curTileset === 58 || curTileset === 446) {
                    break;
                }
                let entity = this.entityAtXY(obj, tempX, tempY);
                if (entity) {
                    if (entity.type === 'player') {
                        this.gameManager.fire(obj);
                        e = entity;
                        break;
                    }
                }
            }
        }

        if ((ts === 1 || ts === 240 || ts === 93 || ts === 97 || ts === 57) && e === null) {
            obj.pos_x = newX;
            obj.pos_y = newY;
        } else {
            return 'break';
        }
        return 'move';
    }

    entityAtXY(obj, x, y) {
        for (let i = 0; i < this.gameManager.objects.length; i++) {
            let e = this.gameManager.objects[i];
            if (e.name !== obj.name) {
                if (x + obj.size_x < e.pos_x || y + obj.size_y < e.pos_y || x > e.pos_x + e.size_x || y > e.pos_y + e.size_y)
                    continue;
                return e;
            }
        }
        return null;
    }

    setMapManager(mapManager){
        this.mapManager = mapManager;
    }


}