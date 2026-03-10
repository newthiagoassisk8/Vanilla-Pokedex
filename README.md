# Vanilla Pokedex

This project was intentionally built with Vanilla JS to keep the focus on core web concepts (DOM, events, API consumption, and error handling) without framework abstractions. With that, the study prioritizes testing tools like Playwright (E2E) and BDD with Cucumber + Playwright.

Quick documentation to run the app and automated tests.

## Prerequisites

- Node.js 18+ (or the latest LTS)
- npm
- Python 3 installed on your machine (used to serve static files)

## Installation

Inside the project directory, run:

```bash
npm install
```

If this is your first Playwright run in this environment, install the browsers:

```bash
npx playwright install
```

## How to run the app

The app is static (`index.html`, `app.js`, `styles.css`).

To start it on port `4173`, listening on all network interfaces (`0.0.0.0`):

```bash
npm run dev
```

Then open it in your browser:

- `http://127.0.0.1:4173`
- `http://localhost:4173`
- `http://<YOUR-MACHINE-IP>:4173`

To stop the server, use `Ctrl + C` in the terminal.

## How to run tests

The project has two testing layers:

- E2E with Playwright in `tests/e2e`
- BDD with Cucumber + Playwright in `tests/features`, `tests/steps`, and `tests/support`

### E2E (Playwright)

Run all E2E tests:

```bash
npm test
```

or

```bash
npm run test:e2e
```

Run in UI mode (Playwright App):

```bash
npm run test:e2e:ui
```

Run with visible browser (headed):

```bash
npm run test:e2e:headed
```

Open HTML report after execution:

```bash
npm run test:e2e:report
```

### BDD (Cucumber + Playwright)

Run BDD scenarios:

```bash
npm run test:bdd
```

Generate the HTML report for the BDD suite:

```bash
npm run test:bdd:report
```

The report is generated at `reports/cucumber.html`.

Current scenarios in the `Pokemon search` feature:

- Search for a valid Pokemon
- Search for an invalid Pokemon

## Notes

- Test configuration is in `playwright.config.js`.
- During E2E tests, Playwright automatically starts a local server at `http://127.0.0.1:4173` using Python.
- In BDD tests, steps use stable selectors with `data-testid`.
- BDD scenarios use `await` + `expect` and do not use `waitForTimeout`.
