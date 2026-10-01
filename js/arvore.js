// Árvore de habilidades: disciplinas por semestre, com o caminho do perfil em destaque.

import { estado, registrarTela, reiniciar } from "./navegacao.js";

const SVG_NS = "http://www.w3.org/2000/svg";

registrarTela("arvore", (container) => {
  const { disciplinas } = estado.conteudo;
  const perfil = estado.perfil;
  const doPerfil = (d) => d.perfis.includes(perfil.id);
  const total = disciplinas.filter(doPerfil).length;

  // Agrupa as disciplinas por semestre
  const semestres = [...new Set(disciplinas.map((d) => d.semestre))].sort((a, b) => a - b);

  container.innerHTML = `
    <section class="tela tela-arvore">
      <header class="arvore-topo">
        <p class="contador">${perfil.icone} ${perfil.nome}</p>
        <h2>Sua árvore de habilidades</h2>
        <p class="subtitulo">${total} disciplinas do curso levam ao seu perfil. Toque em uma para ver o que você aprende nela.</p>
      </header>
      <div class="arvore">
        <svg class="arvore-linhas" aria-hidden="true"></svg>
        ${semestres
          .map(
            (s) => `
          <div class="semestre">
            <p class="semestre-nome">${s}º semestre</p>
            <div class="semestre-nos">
              ${disciplinas
                .filter((d) => d.semestre === s)
                .sort((a, b) => doPerfil(b) - doPerfil(a))
                .map(
                  (d) => `
                <button class="no ${doPerfil(d) ? "ativo" : ""}" data-id="${d.id}">
                  ${d.nome}
                </button>`
                )
                .join("")}
            </div>
          </div>`
          )
          .join("")}
      </div>
      <button class="botao-principal" id="recomecar">Recomeçar</button>
    </section>
  `;

  container.querySelectorAll(".no").forEach((botao) => {
    botao.addEventListener("click", () => abrirCartao(botao.dataset.id));
  });
  container.querySelector("#recomecar").addEventListener("click", reiniciar);

  desenharLinhas(container, disciplinas, doPerfil);
});

// Liga cada disciplina do perfil às disciplinas que servem de base para ela.
function desenharLinhas(container, disciplinas, doPerfil) {
  const arvore = container.querySelector(".arvore");
  const svg = container.querySelector(".arvore-linhas");

  const desenhar = () => {
    if (!arvore.isConnected) {
      window.removeEventListener("resize", desenhar);
      return;
    }
    const caixa = arvore.getBoundingClientRect();
    svg.setAttribute("width", caixa.width);
    svg.setAttribute("height", caixa.height);
    svg.innerHTML = "";

    const centro = (id, lado) => {
      const no = arvore.querySelector(`.no[data-id="${id}"]`).getBoundingClientRect();
      return {
        x: no.left + no.width / 2 - caixa.left,
        y: (lado === "topo" ? no.top : no.bottom) - caixa.top
      };
    };

    disciplinas.filter(doPerfil).forEach((d) => {
      d.base
        .filter((id) => doPerfil(disciplinas.find((x) => x.id === id)))
        .forEach((id) => {
          const a = centro(id, "base");
          const b = centro(d.id, "topo");
          const meio = (a.y + b.y) / 2;
          const linha = document.createElementNS(SVG_NS, "path");
          linha.setAttribute("d", `M${a.x} ${a.y} C${a.x} ${meio} ${b.x} ${meio} ${b.x} ${b.y}`);
          svg.appendChild(linha);
        });
    });
  };

  requestAnimationFrame(desenhar);
  window.addEventListener("resize", desenhar);
}

function abrirCartao(id) {
  const { disciplinas, perfis } = estado.conteudo;
  const d = disciplinas.find((x) => x.id === id);
  const nomes = d.perfis.map((p) => perfis.find((x) => x.id === p));
  const bases = d.base.map((b) => disciplinas.find((x) => x.id === b).nome);

  const fundo = document.createElement("div");
  fundo.className = "cartao-fundo";
  fundo.innerHTML = `
    <article class="cartao" role="dialog" aria-modal="true" aria-label="${d.nome}">
      <p class="contador">${d.id} · ${d.semestre}º semestre</p>
      <h2>${d.nome}</h2>
      <p class="cartao-texto">${d.texto}</p>
      ${bases.length ? `<p class="rodape">Construída a partir de: ${bases.join(", ")}</p>` : ""}
      <ul class="cartao-perfis">${nomes.map((p) => `<li>${p.icone} ${p.nome}</li>`).join("")}</ul>
      <button class="botao-principal" id="fechar">Fechar</button>
    </article>
  `;

  const fechar = () => fundo.remove();
  fundo.addEventListener("click", (e) => {
    if (e.target === fundo) fechar();
  });
  fundo.querySelector("#fechar").addEventListener("click", fechar);
  document.body.appendChild(fundo);
}
