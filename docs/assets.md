# Manifesto de ativos

Este arquivo identifica quais artes o jogo deve carregar. Um ativo só é oficial quando aparece aqui.

## Personagens

| Identificador | Arquivo oficial | Formato | Uso |
|---|---|---|---|
| `nila-walk` | `assets/characters/nila/nila-walk-teen-v2.png` | PNG RGBA, 768 × 512, grade 6 × 4 | Caminhada adolescente de Nila em frente, direita, esquerda e costas |
| `nila-jump` | `assets/characters/nila/nila-jump-teen-v2.png` | PNG RGBA, 512 × 512, grade 4 × 4 | Pulo adolescente de Nila em frente, direita, esquerda e costas |

### Ordem da grade de Nila

- Linha 1: frente/baixo.
- Linha 2: direita.
- Linha 3: esquerda.
- Linha 4: costas/cima.
- Cada célula: 128 × 128.
- Cada linha: seis quadros.
- Pés alinhados na base da célula.
- Cabelo e mochila inteiros dentro da célula.
- Silhueta alta e esguia, com margem transparente em todos os lados.

### Ordem da grade de pulo

- Linhas: frente/baixo, direita, esquerda e costas/cima.
- Colunas: preparação, subida, ápice e aterrissagem.
- Cada célula: 128 × 128.
- Cabelo até os ombros, pés e mochila inteiros dentro da célula.
- Proporções, rosto e atitude consistentes com `nila-walk`.

## Regras

- O código não deve carregar arquivos que não estejam neste manifesto.
- Arquivos substituídos devem ser removidos na mesma alteração que ativa o sucessor.
- Toda sprite deve ter fundo realmente transparente.
- Dimensões da folha devem ser divisíveis pela quantidade de colunas e linhas.
- Mudanças visuais de personagem devem ser registradas em `docs/decisions.md`.
