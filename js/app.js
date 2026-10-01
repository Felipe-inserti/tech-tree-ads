// Ponto de entrada da aplicação: carrega o conteúdo e controla a troca de telas.

const app = document.getElementById("app");

// Estado compartilhado entre as telas
export const estado = {
  conteudo: null,   // dados de data/conteudo.json
  respostas: [],    // índice da opção escolhida em cada pergunta
  perfil: null      // perfil calculado ao final do quiz
};

// Telas registradas: cada uma é uma função que recebe o container e desenha a tela
const telas = {};

export function registrarTela(nome, renderizar) {
  telas[nome] = renderizar;
}

export function irPara(nome) {
  const renderizar = telas[nome];
  if (!renderizar) {
    console.error(`Tela "${nome}" não existe.`);
    return;
  }
  app.innerHTML = "";
  renderizar(app);
  window.scrollTo(0, 0);
}

export function reiniciar() {
  estado.respostas = [];
  estado.perfil = null;
  irPara("inicio");
}

// Tela inicial
registrarTela("inicio", (container) => {
  const { perfis } = estado.conteudo;

  container.innerHTML = `
    <section class="tela tela-inicio">
      <h1>Tech-Tree ADS</h1>
      <p class="subtitulo">Descubra seu perfil em tecnologia e veja o caminho no curso de ADS.</p>
      <button class="botao-principal" id="comecar">Começar</button>
      <p class="rodape">${perfis.length} perfis possíveis</p>
    </section>
  `;

  container.querySelector("#comecar").addEventListener("click", () => irPara("quiz"));
});

// Tela provisória para as telas que ainda serão feitas (quiz e árvore)
function telaEmConstrucao(nome) {
  registrarTela(nome, (container) => {
    container.innerHTML = `
      <section class="tela">
        <h2>Em construção</h2>
        <button class="botao-secundario" id="voltar">Voltar</button>
      </section>
    `;
    container.querySelector("#voltar").addEventListener("click", reiniciar);
  });
}
telaEmConstrucao("quiz");
telaEmConstrucao("arvore");

// Inicialização
async function iniciar() {
  try {
    const resposta = await fetch("data/conteudo.json");
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    estado.conteudo = await resposta.json();
    irPara("inicio");
  } catch (erro) {
    app.innerHTML = `<p class="erro">Não foi possível carregar o conteúdo (${erro.message}).</p>`;
  }
}

iniciar();
