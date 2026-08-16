# Rua 777

Projeto do jogo **Rua 777**, desenvolvido como uma experiência narrativa 2D em pixel art HD.

## Objetivo

Desenvolver o jogo mantendo a história, os personagens e as decisões canônicas consistentes ao longo do projeto.

## Jogar online

[Abrir Rua 777 no navegador](https://alexandretg-beep.github.io/Rua777/)

## Status

O primeiro protótipo jogável está em desenvolvimento e já permite:

- Abrir o jogo diretamente pelo `index.html`.
- Movimentar Nila com WASD, setas ou controles de toque, com aceleração leve e seis quadros de caminhada por direção.
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
| Interagir | E ou botão E na tela |
| Fechar diálogo | E, Enter, espaço ou botão E na tela |

## Testes

Com Node.js instalado, execute:

```bash
npm test
```

A verificação automatizada cobre carregamento dos scripts, entrada compartilhada por teclado e toque, movimento, diagonal, colisões, proximidade do portão e diálogo. A apresentação visual deve ser conferida manualmente no navegador usando `tests/manual-checklist.md`.

## Estrutura

- `src/`: programação do jogo.
- `assets/`: artes, interface e sons.
- `docs/`: cânone e documentação.
- `tests/`: testes automatizados e checklist manual.
- `AGENTS.md`: regras obrigatórias para agentes de IA.

## Cânone

Consulte `docs/canon.md`. Mudanças narrativas não devem ser feitas sem autorização.
