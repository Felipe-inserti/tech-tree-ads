// Ponto de entrada da aplicação: carrega o conteúdo e abre a tela inicial.

import { estado, registrarTela, irPara } from "./navegacao.js";
import { iniciarQuiosque } from "./quiosque.js";
import { VERSAO, verificarVersao } from "./versao.js";
import "./quiz.js";
import "./arvore.js";

// Tela inicial
registrarTela("inicio", (container) => {
  const { perfis } = estado.conteudo;

  container.innerHTML = `
    <section class="tela tela-inicio">
      <p class="selo">Unicamp de Portas Abertas · FT Limeira</p>
      <h1>Tech-Tree ADS</h1>
      <p class="subtitulo">Responda 8 perguntas, descubra seu perfil em tecnologia e veja quais disciplinas do curso levam até ele.</p>
      <div class="perfis-icones">${perfis.map((p) => `<span title="${p.nome}">${p.icone}</span>`).join("")}</div>
      <button class="botao-principal botao-grande" id="comecar">Começar</button>
      <p class="rodape">Análise e Desenvolvimento de Sistemas · cerca de 3 minutos</p>
    </section>
  `;

  container.querySelector("#comecar").addEventListener("click", () => irPara("quiz"));
});

async function iniciar() {
  verificarVersao();
  try {
    const resposta = await fetch(`data/conteudo.json?v=${VERSAO}`);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    estado.conteudo = await resposta.json();
    irPara("inicio");
    iniciarQuiosque();
  } catch (erro) {
    document.getElementById("app").innerHTML =
      `<p class="erro">Não foi possível carregar o conteúdo (${erro.message}).</p>`;
  }
}

iniciar();
