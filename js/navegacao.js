// Estado compartilhado e troca de telas da aplicação.

export const estado = {
  conteudo: null,   // dados de data/conteudo.json
  respostas: [],    // índice da opção escolhida em cada pergunta
  perfil: null      // perfil calculado ao final do quiz
};

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
  const app = document.getElementById("app");
  app.innerHTML = "";
  renderizar(app);
  window.scrollTo(0, 0);
}

export function reiniciar() {
  estado.respostas = [];
  estado.perfil = null;
  irPara("inicio");
}
