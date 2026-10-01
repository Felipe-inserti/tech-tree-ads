// Ponto de entrada da aplicação: carrega o conteúdo e abre a tela inicial.

import { estado, registrarTela, irPara, reiniciar } from "./navegacao.js";
import "./quiz.js";

// Tela inicial
registrarTela("inicio", (container) => {
  const { perfis } = estado.conteudo;

  container.innerHTML = `
    <section class="tela tela-inicio">
      <h1>Tech-Tree ADS</h1>
      <p class="subtitulo">Descubra seu perfil em tecnologia e veja o caminho no curso de ADS.</p>
      <button class="botao-principal" id="comecar">Começar</button>
      <p class="rodape">${perfis.length} perfis possíveis · 3 minutos</p>
    </section>
  `;

  container.querySelector("#comecar").addEventListener("click", () => irPara("quiz"));
});

// Árvore de habilidades: implementada na Sprint 4
registrarTela("arvore", (container) => {
  container.innerHTML = `
    <section class="tela">
      <h2>Árvore em construção</h2>
      <button class="botao-secundario" id="voltar">Recomeçar</button>
    </section>
  `;
  container.querySelector("#voltar").addEventListener("click", reiniciar);
});

async function iniciar() {
  try {
    const resposta = await fetch("data/conteudo.json");
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    estado.conteudo = await resposta.json();
    irPara("inicio");
  } catch (erro) {
    document.getElementById("app").innerHTML =
      `<p class="erro">Não foi possível carregar o conteúdo (${erro.message}).</p>`;
  }
}

iniciar();
