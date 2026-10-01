# Planejamento do desenvolvimento

Atualizado após a avaliação do Sumário Executivo I.

## Ajustes pedidos pelo professor

| Apontamento | Ajuste no projeto |
| --- | --- |
| Caio não faz parte do grupo | Tarefas redistribuídas (tabela abaixo) |
| Faltou explicar como chegaram ao diagnóstico | Métodos registrados em `docs/diagnostico.md`: observação direta no estande e análise documental do catálogo |
| Tecnologias não foram explicitadas | Stack definida abaixo e registrada no README |
| Protótipo não precisa ser 100% funcional; sem servidores complexos | Site estático, sem backend e sem banco de dados; escopo reduzido ao fluxo principal |

## Tecnologias

- **HTML, CSS e JavaScript puro**: sem framework, sem backend, sem banco de dados.
- **Conteúdo em JSON** (`data/conteudo.json`), lido pelo navegador.
- **GitHub** para versionamento e **GitHub Pages** para hospedagem gratuita.
- **Docker (nginx)** apenas para padronizar o ambiente de desenvolvimento.
- **Figma** para o protótipo das telas.

## Escopo do protótipo

**Entra:** tela inicial → quiz (8 perguntas) → perfil → árvore de disciplinas com destaque → cartão da disciplina → recomeçar.

**Fica de fora:** login, ranking, painel administrativo, salvar resultados, modo offline avançado.

## Redistribuição das tarefas (5 integrantes)

| Integrante | Papel | Tarefas |
| --- | --- | --- |
| Felipe | Arquitetura e infraestrutura | Repositório, estrutura do código, Docker, deploy |
| Kaio | Desenvolvimento front-end | Quiz e árvore de habilidades (assume a parte do Caio) |
| Catarina | UX/UI | Protótipo no Figma e identidade visual |
| Heitor | Conteúdo e gamificação | Grade de ADS, perguntas e textos gamificados |
| Guilherme | Gestão e testes | Cronograma, inspeção heurística e testes |

## Sprints

| Sprint | Entrega | Pronto quando |
| --- | --- | --- |
| 1. Base ✅ | Estrutura, leitura do JSON, tela inicial, Docker, deploy | O site abre no GitHub Pages |
| 2. Diagnóstico e conteúdo | Diagnóstico documentado; perfis, 8 perguntas e disciplinas reais de ADS | `diagnostico.md` e `conteudo.json` completos |
| 3. Quiz | Perguntas, pontuação, cálculo do perfil e tela de resultado | Quiz vai do início ao perfil |
| 4. Árvore | Disciplinas por semestre, destaque do perfil, cartão ao tocar, botão recomeçar | Fluxo completo funcionando |
| 5. Acabamento e testes | Visual final, ajuste para tablet, inspeção heurística, teste com 3 a 5 pessoas e correções | Pronto para o estande |
