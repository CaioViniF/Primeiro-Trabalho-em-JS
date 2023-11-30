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

let score = 0; // Inicializa o contador

function createAircraft() {
    return {
        // variação de posições iniciais, sendo X fixa no início da tela, e Y aleatória
        x: 50,
        y: Math.floor(Math.random() * (canvas.height - aviao_size)),
        start: 1,
        direction: 1,
        visible: true,
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

        if (aviao.visible) {
            canvasContext.drawImage(image, aviao.start, aviao.y, aviao_size, aviao_size)
            aviao.start = aviao.start + (aviao.direction * gameRun.speed);

            if (aviao.start >= canvas.width) {
                // Desaparece quando atinge o final da tela
                aviao.visible = false;
                score++; // Incrementa o contador quando um avião chega ao final
                console.log("Score: " + score);
                cont.innerHTML = `${score} aviões pousados`;
            }
        }
    }
}

// Inicia o loop do jogo
setTimeout(gameLoop, gameRun.fps);

// Adiciona um novo avião ao array
function addAircraft() {
    avioes.push(createAircraft());
}

// Adiciona um novo avião a cada 3 segundos
setInterval(addAircraft, 1000);

document.addEventListener('keydown', function (event) {
    console.log(event.key);

    if (event.key == 'p') {
        gameRun.pause = !gameRun.pause;
    }
});
