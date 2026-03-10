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
        this.page = null;
    }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
    browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
});

Before(async function() {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function() {
    await this.context.close();
});

AfterAll(async () => {
    await browser.close();
});
