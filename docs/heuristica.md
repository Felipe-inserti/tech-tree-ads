# Inspeção heurística

Avaliação da aplicação com base nas 10 heurísticas de usabilidade de Nielsen, feita sobre a versão
funcional (quiz, resultado, árvore e cartão da disciplina) em notebook, tablet e celular.

Severidade: 0 = não é problema · 1 = cosmético · 2 = pequeno · 3 = grande · 4 = catastrófico.

| # | Heurística | Situação | Severidade | Ação |
| --- | --- | --- | --- | --- |
| 1 | Visibilidade do status do sistema | Barra de progresso e contador "Pergunta X de 8" no quiz; a árvore informa quantas disciplinas levam ao perfil | 0 | Nenhuma |
| 2 | Correspondência com o mundo real | Perguntas usam situações do dia a dia do adolescente; os nomes oficiais das disciplinas são técnicos | 1 | Cartão da disciplina explica cada uma em linguagem prática |
| 3 | Controle e liberdade do usuário | Um toque acidental numa opção avançava o quiz sem permitir voltar | 2 | **Corrigido:** botão "Voltar" no quiz; "Recomeçar" em todas as telas |
| 4 | Consistência e padrões | Ação principal sempre em botão verde; ações secundárias com contorno | 0 | Nenhuma |
| 5 | Prevenção de erros | Opções grandes e espaçadas para toque; zoom por toque duplo desativado | 0 | Nenhuma |
| 6 | Reconhecer em vez de lembrar | Todas as opções ficam visíveis; o cartão mostra as disciplinas de base | 0 | Nenhuma |
| 7 | Flexibilidade e eficiência | Fluxo único e curto (cerca de 3 minutos); acesso alternativo pelo celular via QR code | 0 | Nenhuma |
| 8 | Estética e design minimalista | Uma pergunta por tela; disciplinas fora do perfil ficam apagadas na árvore | 1 | Apagadas têm baixo contraste de propósito, para destacar o caminho do perfil |
| 9 | Ajudar a reconhecer e corrigir erros | Mensagem clara se o conteúdo não carregar | 0 | Nenhuma |
| 10 | Ajuda e documentação | A árvore orienta "Toque em uma disciplina para ver o que você aprende nela" | 0 | Nenhuma |

## Problemas específicos do contexto do estande

| Problema | Severidade | Ação |
| --- | --- | --- |
| Visitante sai no meio do quiz e o próximo encontra a tela de outra pessoa | 3 | **Corrigido:** modo quiosque volta ao início após 60 s sem toque |
| No celular, as linhas da árvore se embaralham porque as disciplinas quebram em várias linhas | 2 | **Corrigido:** linhas ocultas em telas pequenas; disciplinas do perfil aparecem primeiro em cada semestre |
| Tablet pode exibir versão antiga do site após uma atualização | 2 | **Corrigido:** verificação de versão recarrega o site automaticamente |
