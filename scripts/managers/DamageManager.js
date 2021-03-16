export class DamageManager {
    constructor(difficulty) {
        if (difficulty === "hard"){
            this.cactusDamage = 80;
            this.highFireDamage = 100;
            this.lowFireDamage = 70;
            this.touchEnemyDamage = 100;
            this.bulletEnemyDamage = 100;
            this.playerBulletDamage = 20;
        }
        else if (difficulty === "normal"){
            this.cactusDamage = 50;
            this.highFireDamage = 70;
            this.lowFireDamage = 40;
            this.touchEnemyDamage = 80;
            this.bulletEnemyDamage = 50;
            this.playerBulletDamage = 35;
        }
        else {
            this.cactusDamage = 25;
            this.highFireDamage = 35;
            this.lowFireDamage = 20;
            this.touchEnemyDamage = 50;
            this.bulletEnemyDamage = 25;
            this.playerBulletDamage = 50;
        }

        this.touchCactus = this.touchCactus.bind(this);
        this.touchHighFire = this.touchHighFire.bind(this);
        this.touchLowFire = this.touchLowFire.bind(this);
        this.touchEnemy = this.touchEnemy.bind(this);
        this.bulletEnemy = this.bulletEnemy.bind(this);
        this.bulletPlayer = this.bulletPlayer.bind(this);
    }

    touchCactus() {
            return -this.cactusDamage;
    }

    touchHighFire() {
        return -this.highFireDamage;
    }

    touchLowFire() {
        return -this.lowFireDamage;
    }

    touchEnemy(){
        return -this.touchEnemyDamage;
    }

    bulletEnemy(){
        return -this.bulletEnemyDamage;
    }

    bulletPlayer(){
        return -this.playerBulletDamage;
    }
}