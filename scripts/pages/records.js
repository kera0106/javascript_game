import {SoundManager} from "../managers/SoundManager.js";
let isStartSound = false;
let sound = document.getElementById('sound');
let soundManager;

window.addEventListener('load', () => {
    soundManager = new SoundManager();
    soundManager.init();
    soundManager.loadArray(['./public/sound/record.mp3']);
    console.log(localStorage["isSoundPlay"])
    if (localStorage["isSoundPlay"] === "no"){
        sound.src = "./public/images/soundOff.png";
    }
    else{
        sound.src = "./public/images/soundOn.png";
        isStartSound = !isStartSound;
        soundManager.play("./public/sound/record.mp3", {looping: true, volume: 0.1});
    }
});

sound.addEventListener('click', () => {
    if (!isStartSound){
        isStartSound = !isStartSound;
        localStorage["isSoundPlay"] = "yes";
        soundManager.play("./public/sound/record.mp3", {looping: true, volume: 0.1});
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("LastName").innerHTML = localStorage["gamerName"];
    document.getElementById("LastScore").innerHTML = localStorage["score"];
    document.getElementById("Gamer1").innerHTML = localStorage["gamer1"];
    document.getElementById("Score1").innerHTML = localStorage["result1"];
    document.getElementById("Gamer2").innerHTML = localStorage["gamer2"];
    document.getElementById("Score2").innerHTML = localStorage["result2"];
    document.getElementById("Gamer3").innerHTML = localStorage["gamer3"];
    document.getElementById("Score3").innerHTML = localStorage["result3"];
    document.getElementById("Gamer4").innerHTML = localStorage["gamer4"];
    document.getElementById("Score4").innerHTML = localStorage["result4"];
    document.getElementById("Gamer5").innerHTML = localStorage["gamer5"];
    document.getElementById("Score5").innerHTML = localStorage["result5"];
});
