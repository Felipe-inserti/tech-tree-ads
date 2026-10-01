// Garante que o navegador use sempre a versão publicada mais recente.
// No deploy, o GitHub Actions troca "dev" pelo código do commit e grava o mesmo código em versao.txt.

export const VERSAO = "dev";

export async function verificarVersao() {
  if (VERSAO === "dev") return; // rodando localmente

  try {
    const resposta = await fetch("versao.txt", { cache: "no-store" });
    if (!resposta.ok) return;
    const publicada = (await resposta.text()).trim();
    const jaTentou = new URLSearchParams(location.search).get("v") === publicada;
    if (publicada && publicada !== VERSAO && !jaTentou) {
      // Endereço novo faz o navegador ignorar os arquivos guardados em cache
      location.replace(`${location.pathname}?v=${publicada}`);
    }
  } catch {
    // Sem Internet: segue com a versão que já está carregada
  }
}
