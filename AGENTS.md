# AGENTS.md

Estas regras devem ser seguidas por qualquer agente de IA que trabalhe neste projeto.

## Antes de alterar

1. Ler `docs/project-status.md`.
2. Ler `docs/canon.md` quando a mudança envolver história ou personagens.
3. Ler `docs/decisions.md` quando a mudança envolver uma preferência já aprovada.
4. Ler `docs/assets.md` quando a mudança envolver arte.
5. Confirmar o menor escopo que resolve o problema.

## Regras obrigatórias

- Não alterar a história sem autorização.
- Preservar personagens e informações canônicas.
- Não transformar placeholders ou diálogos provisórios em cânone.
- Explicar mudanças importantes antes de grandes refatorações.
- Preferir alterações pequenas e fáceis de revisar.
- Trabalhar em branch `agent/*` e usar PR.
- Manter documentação e status atualizados.
- Executar testes automáticos quando possível.
- Executar o checklist visual relevante antes de considerar uma correção concluída.
- Não manter dois ativos concorrentes sem identificá-los no manifesto.

## Antes de publicar

- Executar `npm test`.
- Conferir `docs/release-checklist.md`.
- Atualizar `docs/project-status.md`.
- Registrar decisões novas em `docs/decisions.md`.
- Confirmar que o GitHub Pages terminou com sucesso.
