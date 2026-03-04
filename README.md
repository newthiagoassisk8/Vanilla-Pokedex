# Vanilla Pokedex

Documentação rápida para rodar a aplicação e os testes automatizados.

## Pré-requisitos

- Node.js 18+ (ou versão LTS mais recente)
- npm
- Python 3 instalado na máquina (usado para servir os arquivos estáticos)

## Instalação

No diretório do projeto, execute:

```bash
npm install
```

Se for a primeira execução com Playwright no ambiente, instale os navegadores:

```bash
npx playwright install
```

## Como rodar a aplicação

A aplicação é estática (`index.html`, `app.js`, `styles.css`).

Para subir localmente em `http://127.0.0.1:4173`:

```bash
npm run dev
```

Depois, abra no navegador:

- `http://127.0.0.1:4173`

Para parar o servidor, use `Ctrl + C` no terminal.

## Como rodar os testes

Os testes E2E usam Playwright e estão em `tests/e2e`.

### Rodar todos os testes

```bash
npm test
```

ou

```bash
npm run test:e2e
```

### Rodar em modo UI (Playwright App)

```bash
npm run test:e2e:ui
```

### Rodar com navegador visível (headed)

```bash
npm run test:e2e:headed
```

### Abrir relatório HTML após a execução

```bash
npm run test:e2e:report
```

## Observações

- A configuração dos testes está em `playwright.config.js`.
- Durante os testes, o Playwright sobe automaticamente um servidor local em `http://127.0.0.1:4173` usando Python.
