// Quiz: perguntas, cálculo do perfil e tela de resultado.

import { estado, registrarTela, irPara, reiniciar } from "./navegacao.js";

// Soma 1 ponto para cada perfil ligado às opções escolhidas.
// Em caso de empate, vence o perfil que pontuou na resposta mais recente.
export function calcularPerfil(perguntas, respostas, perfis) {
  const pontos = Object.fromEntries(perfis.map((p) => [p.id, 0]));
  const ultimaVez = Object.fromEntries(perfis.map((p) => [p.id, -1]));

  respostas.forEach((indiceOpcao, indicePergunta) => {
    const opcao = perguntas[indicePergunta].opcoes[indiceOpcao];
    opcao.perfis.forEach((id) => {
      pontos[id] += 1;
      ultimaVez[id] = indicePergunta;
    });
  });

  const vencedor = [...perfis].sort(
    (a, b) => pontos[b.id] - pontos[a.id] || ultimaVez[b.id] - ultimaVez[a.id]
  )[0];

  return { perfil: vencedor, pontos };
}

registrarTela("quiz", (container) => {
  const { perguntas } = estado.conteudo;
  const atual = estado.respostas.length;
  const pergunta = perguntas[atual];

  container.innerHTML = `
    <section class="tela tela-quiz">
      <div class="progresso" aria-label="Pergunta ${atual + 1} de ${perguntas.length}">
        <div class="progresso-barra" style="width: ${(atual / perguntas.length) * 100}%"></div>
      </div>
      <p class="contador">Pergunta ${atual + 1} de ${perguntas.length}</p>
      <h2>${pergunta.texto}</h2>
      <div class="opcoes"></div>
      <div class="acoes">
        ${atual > 0 ? '<button class="botao-secundario" id="voltar">Voltar</button>' : ""}
        <button class="botao-secundario" id="recomecar">Recomeçar</button>
      </div>
    </section>
  `;

  const lista = container.querySelector(".opcoes");
  pergunta.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.textContent = opcao.texto;
    botao.addEventListener("click", () => responder(indice));
    lista.appendChild(botao);
  });

  container.querySelector("#recomecar").addEventListener("click", reiniciar);
  container.querySelector("#voltar")?.addEventListener("click", () => {
    estado.respostas.pop();
    irPara("quiz");
  });
});

function responder(indiceOpcao) {
  const { perguntas, perfis } = estado.conteudo;
  estado.respostas.push(indiceOpcao);

  if (estado.respostas.length < perguntas.length) {
    irPara("quiz");
    return;
  }

  estado.perfil = calcularPerfil(perguntas, estado.respostas, perfis).perfil;
  irPara("resultado");
}

registrarTela("resultado", (container) => {
  const perfil = estado.perfil;

  container.innerHTML = `
    <section class="tela tela-resultado">
      <p class="contador">Seu Perfil Tech é</p>
      <div class="perfil-icone">${perfil.icone}</div>
      <h1>${perfil.nome}</h1>
      <p class="subtitulo">${perfil.descricao}</p>
      <div class="carreiras">
        <p class="rodape">Carreiras possíveis</p>
        <ul>${perfil.carreiras.map((c) => `<li>${c}</li>`).join("")}</ul>
      </div>
      <button class="botao-principal" id="ver-arvore">Ver minha árvore de habilidades</button>
      <button class="botao-secundario" id="recomecar">Recomeçar</button>
    </section>
  `;

  container.querySelector("#ver-arvore").addEventListener("click", () => irPara("arvore"));
  container.querySelector("#recomecar").addEventListener("click", reiniciar);
});
