# Rua 777

Projeto do jogo **Rua 777**, desenvolvido como uma experiência narrativa 2D em pixel art HD.

## Objetivo

Desenvolver o jogo mantendo a história, os personagens e as decisões canônicas consistentes ao longo do projeto.

## Status

O primeiro protótipo jogável está em desenvolvimento e já permite:

- Abrir o jogo diretamente pelo `index.html`.
- Movimentar Nila com WASD ou setas.
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
| Caminhar | WASD ou setas |
| Interagir | E |
| Fechar diálogo | E, Enter ou espaço |

## Testes

Com Node.js instalado, execute:

```bash
npm test
```

A verificação automatizada cobre carregamento dos scripts, movimento, diagonal, colisões, proximidade do portão e diálogo. A apresentação visual deve ser conferida manualmente no navegador usando `tests/manual-checklist.md`.

## Estrutura

- `src/`: programação do jogo.
- `assets/`: artes, interface e sons.
- `docs/`: cânone e documentação.
- `tests/`: testes automatizados e checklist manual.
- `AGENTS.md`: regras obrigatórias para agentes de IA.

## Cânone

Consulte `docs/canon.md`. Mudanças narrativas não devem ser feitas sem autorização.
