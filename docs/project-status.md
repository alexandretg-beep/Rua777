# Status do projeto

Este é o painel central de Rua 777. Deve ser atualizado sempre que uma entrega mudar o estado do jogo.

## Versão atual

- Fase: protótipo jogável do primeiro trecho da rua.
- Plataforma atual: navegador, computador e celular.
- Publicação: https://alexandretg-beep.github.io/Rua777/
- Sprint 01: concluída tecnicamente.
- Testes automáticos: 49 verificações, incluindo sprites, aterrissagem e disponibilidade da interação móvel.

## O que está funcionando

- Movimento em quatro direções por teclado e toque.
- Aceleração leve ao manter uma direção.
- Animação de caminhada com seis quadros por direção.
- Pulo curto com quatro quadros por direção, por teclado e toque.
- Movimento durante o salto sem atravessar obstáculos.
- Poeira curta de aterrissagem renderizada pelo canvas.
- Colisões com muros, portão e árvore.
- Profundidade visual da copa da árvore.
- Folhas com movimento discreto.
- Interação provisória com o portão.
- Aviso de interação compatível com teclado e toque, com destaque contextual do botão E.
- Layout responsivo para telas móveis.
- Publicação automática pelo GitHub Pages.

## Validação pendente

- [ ] Confirmar em um iPhone que a cabeça de Nila não é cortada ao apertar subir.
- [ ] Confirmar em um iPhone que cabelo, pés e mochila não são cortados durante o pulo.
- [ ] Confirmar que os botões Pulo e E ficam confortáveis em retrato e paisagem.
- [ ] Executar todo o checklist de `tests/manual-checklist.md` depois da correção visual.
- [ ] Aprovar ou substituir a fala provisória do portão antes de tratá-la como cânone.

## Próxima entrega recomendada

Concluir a validação visual da caminhada e do pulo nas quatro direções. Depois disso, planejar a próxima pequena interação sem criar fatos narrativos novos sem autorização.

## Fontes de verdade

- Regras de trabalho: `AGENTS.md`.
- História e personagens aprovados: `docs/canon.md`.
- Decisões do projeto: `docs/decisions.md`.
- Artes oficiais e substituídas: `docs/assets.md`.
- Próximos marcos: `docs/roadmap.md`.
- Verificação antes de publicar: `docs/release-checklist.md`.
