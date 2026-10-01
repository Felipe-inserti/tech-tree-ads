# Tech-Tree ADS

Aplicação web interativa e gamificada para o estande de ADS na Unicamp de Portas Abertas (UPA).
O visitante responde a um quiz, recebe um **Perfil Tech** e explora na **árvore de habilidades**
as disciplinas do curso ligadas a esse perfil.

## Tecnologias

HTML, CSS e JavaScript puro, sem backend e sem banco de dados. O conteúdo fica em um arquivo JSON,
o site é hospedado no GitHub Pages e o Docker (nginx) serve apenas para padronizar o ambiente de
desenvolvimento. O planejamento completo está em `docs/planejamento.md`.

## Estrutura

```
index.html            página única da aplicação
css/style.css         estilos
js/app.js             carregamento do conteúdo e tela inicial
js/navegacao.js       estado compartilhado e troca de telas
js/quiz.js            quiz e cálculo do perfil
js/arvore.js          árvore de habilidades
js/quiosque.js        volta ao início após 60 s sem toque
js/versao.js          recarrega o site quando há versão nova
data/conteudo.json    perfis, perguntas e disciplinas
design/               QR code para o estande
docs/                 planejamento, diagnóstico, inspeção heurística e testes
```

Todo o conteúdo fica em `data/conteudo.json`: para mudar textos, perguntas ou disciplinas,
não é preciso mexer no código.

## Rodando localmente

Com Docker:

```bash
docker build -t tech-tree-ads .
docker run --rm -p 8080:80 tech-tree-ads
```

Sem Docker (Python instalado):

```bash
python -m http.server 8080
```

Depois, abra http://localhost:8080.

> Abrir o `index.html` direto (duplo clique) não funciona: o navegador bloqueia a leitura do JSON.
> Use sempre um dos comandos acima.

## Deploy

Cada push na branch `main` publica o site no GitHub Pages pelo workflow
`.github/workflows/deploy.yml`. Para ativar: **Settings → Pages → Source: GitHub Actions**.
