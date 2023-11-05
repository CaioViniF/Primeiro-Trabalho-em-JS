/* Definições padrão do avião */
let airSize = 100;
let gameStatus = {
    speed: 1,
    fps: 1000/60,
    pause: false,
}
let aviao = document.getElementById('airplane');
let canvasContext = myCanvas.getContext('2d');
canvasContext.fillStyle = "green";

let direcao = 1;
let startPoint = (Math.random() * 600);
let flyLeft = new Image();
flyLeft.src = './img/Left.png';
let flyRight = new Image();
flyRight.src = './img/Right.png';

let airPlane1 = {
    x: 200,
    inicio: startPoint,
    direc: direcao,
}

/* ------------------------------------------------------------ */
/* Criações de funções */

let moreAirPlane = [airPlane1];
