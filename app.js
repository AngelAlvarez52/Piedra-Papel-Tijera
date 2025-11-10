const jugadorScoreEl = document.getElementById('jugador-score');
const cpuScoreEl = document.getElementById('cpu-score');
const resultadoTextoEl = document.getElementById('resultado-texto');
const [btnPiedra, btnPapel, btnTijera, btnReiniciar] = 
    ['piedra','papel','tijera','btn-reiniciar'].map(id => document.getElementById(id));
const [playerImg, cpuImg] = 
    ['player-choice-img','cpu-choice-img'].map(id => document.getElementById(id));
const sonidos = {
    win: document.getElementById('sonido-win'),
    lose: document.getElementById('sonido-lose'),
    tie: document.getElementById('sonido-tie')
};

let jugador = 0, cpu = 0;
const OPCIONES = ['piedra', 'papel', 'tijera'], PUNTOS_GANAR = 2;

[btnPiedra, btnPapel, btnTijera].forEach(boton => 
    boton.onclick = () => jugar(boton.id)
);
btnReiniciar.onclick = reiniciar;

function jugar(eleccion) {
    const cpuEleccion = OPCIONES[Math.floor(Math.random()*3)];
    [playerImg, cpuImg].forEach(img => img.className = 'choice-display');
    playerImg.src = cpuImg.src = `imagenes/${eleccion}.png`;
    cpuImg.src = `imagenes/${cpuEleccion}.png`;

const ganador = 
    eleccion === cpuEleccion ? 'empate' :
    (eleccion==='piedra'&&cpuEleccion==='tijera')||
    (eleccion==='papel'&&cpuEleccion==='piedra')||
    (eleccion==='tijera'&&cpuEleccion==='papel') ? 'jugador' : 'cpu';

    if (ganador==='jugador') jugador++;
    if (ganador==='cpu') cpu++;

const mensajes = {
    jugador: `¡Ganas la ronda! ${eleccion} vence a ${cpuEleccion}.`,
    cpu: `Pierdes la ronda. ${cpuEleccion} vence a ${eleccion}.`,
    empate: `Empate. Ambos eligieron ${eleccion}.`
    };
    resultadoTextoEl.textContent = mensajes[ganador];
    reproducirSonido(sonidos[ganador==='jugador'?'win':ganador==='cpu'?'lose':'tie']);
    playerImg.classList.add(ganador==='jugador'?'winner':ganador==='cpu'?'loser':'tie');
    cpuImg.classList.add(ganador==='cpu'?'winner':ganador==='jugador'?'loser':'tie');
    jugadorScoreEl.textContent = jugador;
    cpuScoreEl.textContent = cpu;

if (jugador===PUNTOS_GANAR || cpu===PUNTOS_GANAR) {
    resultadoTextoEl.textContent = jugador>cpu ? '¡GANASTE LA PARTIDA!' : '¡PERDISTE LA PARTIDA!';
    toggleBotones(true);
}
}

function reiniciar() {
    jugador = cpu = 0;
    jugadorScoreEl.textContent = cpuScoreEl.textContent = 0;
    resultadoTextoEl.textContent = '¡Elige tu movimiento!';
    playerImg.src = cpuImg.src = 'imagenes/papel.png';
    [playerImg, cpuImg].forEach(img => img.className = 'choice-display');
    toggleBotones(false);
}

function toggleBotones(deshabilitar) {
    [btnPiedra, btnPapel, btnTijera].forEach(b => b.disabled = deshabilitar);
    btnReiniciar.style.display = deshabilitar ? 'inline-block' : 'none';
}

function reproducirSonido(s) { s.currentTime = 0; s.play(); }
