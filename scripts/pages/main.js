import {GameManager} from "../managers/GameManager.js";

let game = null;
let mapWidth = 954;
let mapHeight = 564;
let HPpanelWidth = 300;
let HPpanelHeight = 30;


document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById("canvasGame");
    let context = canvas.getContext("2d");
    canvas.width = mapWidth;
    canvas.height = mapHeight;

    let HPpanelCanvas = document.getElementById("HPpanel");
    let HPpanelContext = HPpanelCanvas.getContext("2d");
    HPpanelCanvas.width = HPpanelWidth;
    HPpanelCanvas.height = HPpanelHeight;
    HPpanelContext.fillStyle = "green";
    HPpanelContext.rect(0,0,300,30);
    HPpanelContext.fill();

    if (game === null)
        game = new GameManager(canvas, context, HPpanelContext, mapWidth, mapHeight);

});