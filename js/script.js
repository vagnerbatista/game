const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const nuvem = document.querySelector(".nuvem");
const score_label = document.querySelector(".score");
const msg_label = document.querySelector(".msg");
const msg_div = document.querySelector(".corner-botton");
const perdeu = document.querySelector(".centro");
let valor = 0;
let gameRunning = false; // Flag para indicar se o jogo está em execução

const cpapCuidado = [
  "Cuidado: lá vem o chargeback de 15 MIL",
  "Concorrente: A CPAPS Cobriu o preço",
  "ML: Lá vem a devolução do Mercado Livre",
  "Cuidado: WapStore parou de aceitar Pix, abra um chamado",
  "WebMais: Ixi, parece que não tem estoque.",
  "API: Olha o correios, acho que vai extraditar",
  "Cliente: A máscara rasgou, tem garantia? ",
  "Cliente: Compra o meu CPAP de novo?",
  "Alerta: Olha o cartão clonado",
  "Cuidado: Olha o Hacker querendo validar o cartão",
];

const cpapItens = [
  ["S10 AirSense", 3941.01],
  ["Máscara Facial AirFit F30i - ResMed", 308.0],
  [
    "kir CPAP Automático Airsense S10 - ResMed + Máscara YF-01 - Yuwell",
    4167.0,
  ],
  ["Máscara Nasal Therapy 3100 SP - Philips", 400.0],
  ["Filtro Bacteriológico Airlife Trilogy - Vyaire", 80.0],
  ["Traqueia Branca para CPAP - Nacional", 200.12],
  ["Água Destilada - 5L", 45.0],
  ["Tubo de Conexão para Concentrador - Salter Labs", 120.0],
  ["Fixador Quattro FX - Nacional", 340.0],
  ["Concentrador de Oxigênio 5LPM 110V - Yuwell", 6000.0],
  ["Circuito de Ventilação Passivo Adulto - Phillips", 300.0],
  ["Filtro Eletrostático Adulto - GVS", 67.0],
  ["Máscara Nasal iVolve N5A - BMC", 560.0],
];

function itemAleatorio(lista) {
  const indiceAleatorio = Math.floor(Math.random() * lista.length);
  return lista[indiceAleatorio];
}

var jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    if (!gameRunning) return; // Se o jogo não estiver em execução, não faça nada
    var item = itemAleatorio(cpapItens);
    valor += item[1];
    mario.classList.remove("jump");
    score_label.innerHTML = `${valor.toFixed(2)}`;
    msg_label.innerHTML = "";
    msg_label.innerHTML = item[0];
    msg_div.style.animation = "subir 2s ease infinite";
  }, 500);
};

const cuidado = setInterval(() => {
  if (!gameRunning) return; // Se o jogo não estiver em execução, não faça nada
  perdeu.innerHTML = itemAleatorio(cpapCuidado);
}, 1900);

const loop = setInterval(() => {
  if (!gameRunning) return; // Se o jogo não estiver em execução, não faça nada
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  if (pipePosition < 110 && pipePosition > 0 && marioPosition < 100) {
    pipe.src = "./img/bombExp.gif";
    nuvem.style.animationPlayState = "paused";
    msg_div.style.animation = "none";
    pipe.style.width = "250px";
    pipe.style.bottom = "-26px";
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = "animacaoObjeto 2s ease-in-out forwards";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./img/game-over.png";
    mario.style.width = "90px";
    mario.style.marginLeft = "140px";
    score_label.style.color = "red";
    perdeu.style.color = "red";
    atualizarValor(score_label);
    msg_label.innerHTML = "O Cliente desistiu da compra.";
    perdeu.innerHTML = "Que Pena, Você não bateu a meta!";
    clearInterval(loop);
    clearInterval(cuidado);
    gameRunning = false; // Define o jogo como não em execução
    jump = () => {};
    setTimeout(() => {
      pipe.style.bottom = "-26px";
      pipe.src = "./img/fire.gif";
      perdeu.innerHTML = "";
      document.getElementById("restartButton").style.display = "block";
      setTimeout(() => {
        pipe.src = "";
      }, 1500);
    }, 800);
  }
}, 10);

function atualizarValor(h2) {
  let valor = parseFloat(h2.textContent);
  let desconto = 0.2; // 10%
  let intervalo = 80; // 0.25 segundos

  let contador = 0;
  let interval = setInterval(function () {
    if (contador >= 100 && valor > 0) {
      clearInterval(interval);
    } else {
      valor -= valor * desconto; // Aplica o desconto
      h2.innerText = valor.toFixed(2); // Atualiza o h2
      contador++;
    }
  }, intervalo);
}

// Adiciona event listener para o botão de iniciar jogo
document.getElementById("startButton").addEventListener("click", () => {
  gameRunning = true; // Define o jogo como em execução ao clicar no botão
  jump(); // Chama a função de pulo para começar o jogo
});

document.addEventListener("keydown", () => {
  gameRunning = true;
});

// Adiciona event listener para o pulo quando a tecla for pressionada
document.addEventListener("keydown", () => {
  if (gameRunning) jump(); // Somente pula se o jogo estiver em execução
});
