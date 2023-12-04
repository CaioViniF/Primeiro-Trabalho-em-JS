let canvas = document.getElementById("my-canvas");
let canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "green";
let cont = document.getElementById("cont");
cont.innerHTML = '0 aviões pousados';

let image = new Image();
image.src = './aviao.png';

let aviao_size = 100;
let avioes = []; // Array para armazenar todos os aviões
let gameRun = {
    fps: 1000 / 60,
    speed: 4,
    pause: false,
}

let score = 0; // Inicia o contador de avoões pousados

function createAircraft() {
    return {
        // Variação de posições iniciais, sendo X fixa no início da tela, e Y aleatória
        x: 50,
        y: Math.floor(Math.random() * (canvas.height - aviao_size)),
        start: -10,
        direction: 1,
        visible: true,
        name: "Avião " + (avioes.length + 1), // Adiciona um nome único para cada avião
        gasolina: Math.floor(Math.random() * (10 - 3 + 1)) + 3, // Adiciona gasolina entre 3 e 10
    };
}

function gameLoop() {
    setTimeout(gameLoop, gameRun.fps);

    if (gameRun.pause) {
        return;
    }

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < avioes.length; i++) {
        let aviao = avioes[i];

        // Descrição do avião e gasolina na tela do canvas
        if (aviao.visible) {
            canvasContext.drawImage(image, aviao.start, aviao.y, aviao_size, aviao_size);
            canvasContext.font = "12px Arial";
            canvasContext.fillStyle = "black";
            canvasContext.fillText(aviao.name, aviao.start, aviao.y - 5);
            canvasContext.fillText("Gasolina: " + Math.floor(aviao.gasolina), aviao.start, aviao.y + aviao_size + 15);

            if (aviao.gasolina <= 0) {
                aviao.visible = false;
                alert(`Avião ${aviao.name} caiu por falta de gasolina!`);
            } else if (aviao.gasolina < 3) {
                // Aumenta a velocidade se a gasolina for menor que 3
                aviao.start += (aviao.direction * (gameRun.speed * 1.5));
            } else {
                aviao.start += (aviao.direction * gameRun.speed);
            }

            // Reduz a gasolina depois de cada gameloop
            aviao.gasolina -= 0.01;

            // Pousa o avião
            if (aviao.start >= canvas.width) {
                aviao.visible = false;
                score++;
                console.log("Score: " + score);
                cont.innerHTML = `${score} aviões pousados`;
            }
        }
    }
}

setTimeout(gameLoop, gameRun.fps);

// Adiciona um novo avião ao array
function addAircraft() {
    avioes.push(createAircraft());
}

// Adiciona um novo avião a cada 1 segundo
setInterval(addAircraft, 1000);

document.addEventListener('keydown', function (event) {
    console.log(event.key);

    // Pausa o game
    if (event.key == 'p') {
        gameRun.pause = !gameRun.pause;
    }
});
