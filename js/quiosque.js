// Modo quiosque: o tablet do estande é compartilhado entre visitantes.
// Depois de um tempo sem nenhum toque, a aplicação volta sozinha para a tela inicial.

import { estado, reiniciar } from "./navegacao.js";
import { verificarVersao } from "./versao.js";

const SEGUNDOS_SEM_TOQUE = 60;

let temporizador = null;

function voltarAoInicio() {
  if (estado.tela !== "inicio") reiniciar();
  // Aproveita o momento parado para buscar uma versão nova do site, se houver
  verificarVersao();
}

function reiniciarContagem() {
  clearTimeout(temporizador);
  temporizador = setTimeout(voltarAoInicio, SEGUNDOS_SEM_TOQUE * 1000);
}

export function iniciarQuiosque() {
  ["pointerdown", "keydown", "scroll"].forEach((evento) =>
    window.addEventListener(evento, reiniciarContagem, { passive: true })
  );
  reiniciarContagem();
}
