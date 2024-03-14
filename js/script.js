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
  "Ciente: Compra o meu CPAP de novo?",
  "Alerta: Olha o cartão clonado",
  "Cuidado: Olha o Hacker querendo validar o cartão"
];

const cpapItens = [
  ["S10 AirSense", 3941.01],
  ["Máscara Facial AirFit F30i - ResMed", 308.00],
  ["kir CPAP Automático Airsense S10 - ResMed + Máscara YF-01 - Yuwell", 4167.00],
  ["Máscara Nasal Therapy 3100 SP - Philips", 400.00],
  ["Filtro Bacteriológico Airlife Trilogy - Vyaire", 80.00],
  ["Traqueia Branca para CPAP - Nacional", 200.12],
  ["Água Destilada - 5L", 45.00],
  ["Tubo de Conexão para Concentrador - Salter Labs", 120.00],
  ["Fixador Quattro FX - Nacional", 340.00],
  ["Concentrador de Oxigênio 5LPM 110V - Yuwell", 6000.00],
  ["Circuito de Ventilação Passivo Adulto - Phillips", 300.00],
  ["Filtro Eletrostático Adulto - GVS", 67.00],
  ["Máscara Nasal iVolve N5A - BMC", 560.00]
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
    nuvem.style.animationPlayState = 'paused';
    msg_div.style.animation = "none";
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = "animacaoObjeto 2s ease-in-out forwards";
    mario.style.bottom = `${marioPosition}px` 
    mario.src = "./img/game-over.png"
    mario.style.width = "90px"
    mario.style.marginLeft = "50px"
    score_label.style.color = "red";
    score_label.innerHTML = `${(valor * -1).toFixed(2)}`;
    msg_label.innerHTML = "O Criente desistiu da compra."
    perdeu.style.color = "red";
    perdeu.innerHTML = "Que Pena, Você não bateu a meta!";
    clearInterval(loop);
    clearInterval(cuidado);
    gameRunning = false; // Define o jogo como não em execução
    jump = () => {};
    setTimeout(() =>{
      perdeu.innerHTML = "";
      document.getElementById("restartButton").style.display = "block";
    }, 2000);

  }
}, 10);

// Adiciona event listener para o botão de iniciar jogo
document.getElementById("startButton").addEventListener("click", () => {
  gameRunning = true; // Define o jogo como em execução ao clicar no botão
  jump(); // Chama a função de pulo para começar o jogo
});

document.addEventListener("keydown", () =>{
  gameRunning = true;
});

// Adiciona event listener para o pulo quando a tecla for pressionada
document.addEventListener("keydown", () => {
  if (gameRunning) jump(); // Somente pula se o jogo estiver em execução
});
