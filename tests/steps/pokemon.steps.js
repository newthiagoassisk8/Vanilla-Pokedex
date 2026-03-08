import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

const PIKACHU_MOCK = {
    name: 'pikachu',
    sprites: {
        other: {
            'official-artwork': {
                front_default:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            },
        },
    },
    height: 4,
    weight: 60,
    types: [{ type: { name: 'electric' } }],
};

Given('the user is on the Pokedex page', async function () {
    await this.page.goto(this.appUrl);
});

When('they type {string} in the search field', async function (query) {
    this.currentQuery = query;

    if (query === 'pikachu') {
        await this.page.route('https://pokeapi.co/api/v2/pokemon/pikachu', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(PIKACHU_MOCK),
            });
        });
    }

    if (query === 'pokemon-inexistente-xyz') {
        await this.page.route('https://pokeapi.co/api/v2/pokemon/pokemon-inexistente-xyz', async (route) => {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({ detail: 'Not found' }),
            });
        });
    }

    await this.page.getByTestId('search-input').fill(query);
});

When('they click the search button', async function () {
    await this.page.getByTestId('search-button').click();
});

Then('the Pokemon name should be displayed', async function () {
    const pokemonName = this.page.getByTestId('pokemon-name');
    await expect(pokemonName).toBeVisible();
    await expect(pokemonName).not.toHaveText('Nome do Pokemon');
});

Then('the Pokemon image should be visible', async function () {
    await expect(this.page.getByTestId('pokemon-image')).toBeVisible();
});

Then('at least one type should be displayed', async function () {
    const typeElement = this.page.getByTestId('pokemon-type');
    await expect(typeElement).toBeVisible();
    await expect(typeElement).not.toHaveText('-');
});

Then('a user-friendly error message should be displayed', async function () {
    const errorModal = this.page.getByTestId('error-modal');
    await expect(errorModal).toBeVisible();
    await expect(errorModal).not.toHaveClass(/hidden/);
    await expect(this.page.getByTestId('error-message')).toContainText(/pokemon n.o encontrado/i);
});

Given('the API was intercepted with page.route', async function () {
    await this.page.route('https://pokeapi.co/api/v2/pokemon/**', async (route) => {
        if (!this.mockPokemon) {
            await route.continue();
            return;
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(this.mockPokemon),
        });
    });
    this.routeReady = true;
});

Given('the API returns a mocked Pokemon', function () {
    this.mockPokemon = {
        name: 'bulbasaur-mock',
        sprites: {
            other: {
                'official-artwork': {
                    front_default:
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
                },
            },
        },
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    };
    this.mockQuery = '1';
});

When('the user performs a search', async function () {
    if (!this.routeReady) {
        throw new Error('The mock route must be configured before searching.');
    }

    await this.page.goto(this.appUrl);
    await this.page.getByTestId('search-input').fill(this.mockQuery);
    await this.page.getByTestId('search-button').click();
});

Then('the mocked data should be displayed in the UI', async function () {
    await expect(this.page.getByTestId('pokemon-name')).toHaveText(this.mockPokemon.name);
    await expect(this.page.getByTestId('pokemon-image')).toHaveAttribute(
        'src',
        this.mockPokemon.sprites.other['official-artwork'].front_default
    );
    await expect(this.page.getByTestId('pokemon-type')).toContainText('grass');
    await expect(this.page.getByTestId('pokemon-height')).toHaveText(String(this.mockPokemon.height));
    await expect(this.page.getByTestId('pokemon-weight')).toHaveText(String(this.mockPokemon.weight));
});
