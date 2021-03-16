import {Entity} from "./Entity.js";

export class Bonus extends Entity{
    constructor() {
        super();
        this.addHealth = 25;
    }

    getHealth(){
        return this.addHealth;
    }

}