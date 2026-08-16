# Rua 777

Projeto do jogo **Rua 777**, desenvolvido como uma experiência narrativa 2D em pixel art HD.

## Objetivo

Desenvolver o jogo mantendo a história, os personagens e as decisões canônicas consistentes ao longo do projeto.

## Jogar online

[Abrir Rua 777 no navegador](https://alexandretg-beep.github.io/Rua777/)

## Status

A Sprint 01 está implementada tecnicamente. A validação visual no iPhone continua registrada em [docs/project-status.md](docs/project-status.md).

O protótipo jogável já permite:

- Abrir o jogo diretamente pelo `index.html`.
- Movimentar Nila com WASD, setas ou controles de toque, com aceleração leve e seis quadros de caminhada por direção.
- Pular com espaço ou com o botão Pulo, usando quatro quadros por direção, poeira discreta na aterrissagem e mantendo as colisões do chão.
- Encontrar colisões no cenário.
- Aproximar-se do portão da casa.
- Interagir com uma fala provisória.

As formas atuais são placeholders e não substituem as artes oficiais.

## Como jogar

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Clique duas vezes em `index.html`.

Não é necessário instalar dependências para jogar.

## Controles

| Ação | Teclas |
|---|---|
| Caminhar | WASD, setas ou direcional de toque |
| Pular | Espaço ou botão Pulo na tela |
| Interagir | E ou botão E na tela |
| Fechar diálogo | E, Enter, espaço ou botão E na tela |

## Testes

Com Node.js instalado, execute:

```bash
npm test
```

A verificação automatizada cobre carregamento dos scripts, sprites de caminhada e pulo, entrada compartilhada por teclado e toque, movimento, salto, diagonal, colisões, proximidade do portão e diálogo. A apresentação visual deve ser conferida manualmente no navegador usando `tests/manual-checklist.md`.

## Estrutura

- `src/`: programação do jogo.
- `assets/`: artes, interface e sons.
- `tests/`: testes automatizados e checklist manual.
- `AGENTS.md`: regras obrigatórias para agentes de IA.

## Controle do projeto

| Documento | Função |
|---|---|
| [Status](docs/project-status.md) | Estado atual, pendências e próxima entrega |
| [Cânone](docs/canon.md) | História e personagens aprovados |
| [Decisões](docs/decisions.md) | Preferências e aprovações registradas |
| [Ativos](docs/assets.md) | Arquivos oficiais usados pelo jogo |
| [Roadmap](docs/roadmap.md) | Marcos técnicos e limites de escopo |
| [Checklist de publicação](docs/release-checklist.md) | Verificação obrigatória antes de publicar |
| [Sprint 01](docs/sprint-01.md) | Escopo e resultado do primeiro marco |

## Cânone

Consulte `docs/canon.md`. Mudanças narrativas não devem ser feitas sem autorização.
