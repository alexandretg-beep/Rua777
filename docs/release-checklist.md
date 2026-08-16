# Checklist de publicação

Use este checklist antes de integrar uma alteração em `main`.

## Código

- [ ] A mudança está em uma branch `agent/*`.
- [ ] O PR descreve causa, impacto e validação.
- [ ] `npm test` passou.
- [ ] Nenhum erro aparece no console do navegador.
- [ ] Arquivos alterados usam nomes ou versões que evitam cache antigo.

## Movimento e sprites

- [ ] Frente, direita, esquerda e costas usam a linha correta.
- [ ] Nenhum quadro corta cabelo, pés, mãos ou mochila.
- [ ] Os pés permanecem alinhados durante a animação.
- [ ] A diagonal não fica mais rápida.
- [ ] A aceleração começa e termina suavemente.
- [ ] A sprite oficial corresponde a `docs/assets.md`.
- [ ] O pulo usa preparação, subida, ápice e aterrissagem nas quatro direções.
- [ ] O salto termina no mesmo plano de colisão e não atravessa obstáculos.

## Computador e celular

- [ ] Teclado funciona.
- [ ] Toque funciona.
- [ ] Espaço e botão Pulo executam apenas um salto por pressão.
- [ ] Nila para ao soltar, trocar de aba ou trocar de aplicativo.
- [ ] O canvas não fica cortado em retrato ou paisagem.
- [ ] Áreas seguras do aparelho são respeitadas.
- [ ] A versão publicada foi aberta depois do GitHub Pages concluir.

## Cânone e documentação

- [ ] Nenhum fato narrativo foi criado sem autorização.
- [ ] `docs/canon.md` continua correto.
- [ ] Novas decisões foram registradas em `docs/decisions.md`.
- [ ] `docs/project-status.md` foi atualizado.
- [ ] Ativos novos ou substituídos foram registrados em `docs/assets.md`.
