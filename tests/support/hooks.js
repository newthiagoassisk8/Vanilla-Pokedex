import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const APP_URL = pathToFileURL(path.join(process.cwd(), 'index.html')).href;

let browser;

class CustomWorld {
    constructor() {
        this.appUrl = APP_URL;
        this.context = null;
        this.currentQuery = '';
        this.mockPokemon = null;
        this.mockQuery = '25';
        this.page = null;
        this.routeReady = false;
    }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
    browser = await chromium.launch({ headless: true });
});

Before(async function() {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.currentQuery = '';
    this.mockPokemon = null;
    this.mockQuery = '25';
    this.routeReady = false;
});

After(async function() {
    await this.context.close();
});

AfterAll(async () => {
    await browser.close();
});
