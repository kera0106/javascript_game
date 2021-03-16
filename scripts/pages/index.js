import {SoundManager} from "../managers/SoundManager.js";

let sound = document.getElementById('sound');
let isSoundStart = false;
let soundManager;
localStorage["isSoundPlay"] = "no";

window.addEventListener('load', () => {
    soundManager = new SoundManager();
    soundManager.init();
    soundManager.loadArray(['./public/sound/start.mp3']);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("gamerName").value = localStorage["gamerName"];
    checkName();
});

document.getElementById("gamerName").addEventListener('change', () => {
    localStorage["gamerName"] = document.getElementById("gamerName").value;
    checkName();
});

document.getElementById("Button").addEventListener('click', () => {
    let difficulty = document.getElementsByName("difficulty");
    for (let i=0; i<difficulty.length; i++){
        if (difficulty[i].checked){
            localStorage["difficulty"] = difficulty[i].value;
            break;
        }
    }

});

sound.addEventListener('click', () => {
    if (!isSoundStart){
        isSoundStart = !isSoundStart;
        localStorage["isSoundPlay"] = "yes";
        soundManager.play("./public/sound/start.mp3", {looping: true, volume: 0.1});
        sound.src = "./public/images/soundOn.png";
        return;
    }
    if (localStorage["isSoundPlay"] === "yes") {
        sound.src = "./public/images/soundOff.png";
        localStorage["isSoundPlay"] = "no";
    }
    else {
        sound.src = "./public/images/soundOn.png";
        localStorage["isSoundPlay"] = "yes";
    }

    soundManager.toggleMute();
});


//проверка на пустое имя
function checkName() {
    document.getElementById("Button").disabled = (localStorage["gamerName"] === "");
}

