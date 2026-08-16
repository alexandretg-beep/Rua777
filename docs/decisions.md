# Registro de decisões

Este arquivo registra decisões aprovadas para evitar que preferências importantes sejam perdidas ou revertidas por engano.

## Como registrar

Cada decisão deve informar a data, o assunto, o estado e o impacto nos arquivos. Decisões narrativas exigem autorização explícita.

## Decisões aprovadas

| Data | Assunto | Decisão | Estado |
|---|---|---|---|
| 2026-08-16 | Idade de Nila | Nila tem oficialmente 16 anos e não deve parecer criança. | Canônico |
| 2026-08-16 | Proporções de Nila | Nila deve ser mais alta e esguia, com pernas mais longas e cabeça menor em relação ao corpo, aparentando claramente 16 anos. | Canônico |
| 2026-08-16 | Atitude visual de Nila | Olhar atento e postura firme devem transmitir coragem e um ar investigativo discreto, sem fantasia de detetive. | Canônico |
| 2026-08-16 | Cabelo de Nila | Cabelo castanho, ondulado, levemente bagunçado e mais longo, aproximadamente até os ombros. | Canônico |
| 2026-08-16 | Roupa de Nila | Moletom cinza, calça preta, tênis preto e branco e mochila vinho/vermelha. | Canônico |
| 2026-08-16 | Controles | O protótipo deve funcionar com teclado e toque. | Implementado |
| 2026-08-16 | Toque contínuo | Um comando deve permanecer ativo durante pequenos deslizamentos do dedo e terminar ao levantar ou cancelar o toque. | Implementado |
| 2026-08-16 | Movimento | Manter a direção provoca aceleração leve, sem corrida brusca. | Implementado |
| 2026-08-16 | Caminhada | A sprite oficial usa seis quadros por direção. | Implementado |
| 2026-08-16 | Pulo | Nila pode dar um salto curto com espaço ou botão de toque; pode se mover no ar, mas continua respeitando as colisões do chão. | Implementado |
| 2026-08-16 | Sprite de pulo | A animação usa quatro quadros por direção e mantém o cabelo até os ombros. | Implementado |
| 2026-08-16 | Aterrissagem | O pulo termina com duas partículas curtas de poeira desenhadas no canvas, sem criar um ativo adicional. | Implementado |
| 2026-08-16 | Interação móvel | O aviso do portão deve mencionar toque e o botão E deve ser destacado somente quando puder ser usado. | Implementado |
| 2026-08-16 | Desempenho da interface | Estados dos controles de toque só devem atualizar o DOM quando o valor realmente mudar. | Implementado |
| 2026-08-16 | Retorno ao jogo | O loop deve pausar quando a página estiver oculta e reiniciar seu relógio ao voltar, evitando saltos de animação. | Implementado |
| 2026-08-16 | Leitura do cenário | Detalhes provisórios devem orientar o caminho até o portão com contraste discreto, sem poluir a cena. | Implementado |
| 2026-08-16 | Ambiente | Elementos naturais podem ter animações discretas, como folhas balançando. | Implementado |
| 2026-08-16 | Diálogo do portão | “Então esta é a nossa nova casa...” continua sendo provisório. | Não canônico |
| 2026-08-16 | Ritmo de diálogo | A fala aparece progressivamente; o primeiro comando completa o texto e o seguinte fecha a caixa. | Implementado |

## Regra de precedência

Quando houver conflito, a decisão aprovada mais recente deve ser refletida em `docs/canon.md`, no manifesto de ativos e no código. Contradições devem ser corrigidas antes de novas funcionalidades.
