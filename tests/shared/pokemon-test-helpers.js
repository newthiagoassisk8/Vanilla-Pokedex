import { expect } from '@playwright/test';

export const PIKACHU_MOCK = {
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

export function toUiPokemon(pokemon) {
    return {
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        height: String(pokemon.height),
        weight: String(pokemon.weight),
        types: pokemon.types.map((item) => item.type.name).join(', '),
    };
}

export async function openPokedex(page, appUrl = '/') {
    await page.goto(appUrl);
}

export async function mockPokemonLookup(page, query, pokemon, status = 200) {
    await page.route(`https://pokeapi.co/api/v2/pokemon/${query}`, async (route) => {
        await route.fulfill({
            status,
            contentType: 'application/json',
            body: JSON.stringify(pokemon),
        });
    });
}

export async function mockPokemonNotFound(page, query) {
    await mockPokemonLookup(page, query, { detail: 'Not found' }, 404);
}

export async function searchPokemon(page, query) {
    await page.getByTestId('search-input').fill(query);
    await page.getByTestId('search-button').click();
}

export async function expectPokemonSummary(page, pokemon) {
    const uiPokemon = toUiPokemon(pokemon);

    await expect(page.getByTestId('pokemon-modal')).not.toHaveClass(/hidden/);
    await expect(page.getByTestId('pokemon-name')).toHaveText(uiPokemon.name);
    await expect(page.getByTestId('pokemon-image')).toHaveAttribute('src', uiPokemon.image);
    await expect(page.getByTestId('pokemon-type')).toHaveText(uiPokemon.types);
    await expect(page.getByTestId('pokemon-height')).toHaveText(uiPokemon.height);
    await expect(page.getByTestId('pokemon-weight')).toHaveText(uiPokemon.weight);
}

export async function expectPokemonNameVisible(page) {
    await expect(page.getByTestId('pokemon-name')).toBeVisible();
    await expect(page.getByTestId('pokemon-name')).not.toHaveText('Nome do Pokemon');
}

export async function expectPokemonImageVisible(page) {
    await expect(page.getByTestId('pokemon-image')).toBeVisible();
}

export async function expectPokemonTypeVisible(page) {
    await expect(page.getByTestId('pokemon-type')).toBeVisible();
    await expect(page.getByTestId('pokemon-type')).not.toHaveText('-');
}

export async function expectErrorModal(page, messageMatcher = /pokemon n.o encontrado/i) {
    await expect(page.getByTestId('error-modal')).toBeVisible();
    await expect(page.getByTestId('error-modal')).not.toHaveClass(/hidden/);
    await expect(page.getByTestId('error-message')).toContainText(messageMatcher);
}
