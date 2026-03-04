import { expect } from '@playwright/test';

export async function shouldFillModalWithMockedPokemonData({ page }) {
    await page.route('https://pokeapi.co/api/v2/pokemon/25', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
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
            }),
        });
    });

    await page.goto('/');
    await page.getByLabel('Nome ou ID do Pokemon').fill('25');
    await page.getByRole('button', { name: 'Buscar' }).click();

    await expect(page.locator('#pokemon-modal')).not.toHaveClass(/hidden/);
    await expect(page.locator('#pokemon-name')).toHaveText('pikachu');
    await expect(page.locator('#pokemon-image')).toHaveAttribute(
        'src',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    );
    await expect(page.locator('#pokemon-type')).toHaveText('electric');
    await expect(page.locator('#pokemon-height')).toHaveText('4');
    await expect(page.locator('#pokemon-weight')).toHaveText('60');
}

export async function shouldShowErrorModalForInvalidPokemon({ page }) {
    await page.route('https://pokeapi.co/api/v2/pokemon/**', async (route) => {
        await route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ detail: 'Not found' }),
        });
    });

    await page.goto('/');
    await page.getByLabel('Nome ou ID do Pokemon').fill('pokemon-invalido');
    await page.getByRole('button', { name: 'Buscar' }).click();

    const errorModal = page.locator('#error-modal');
    await expect(errorModal).not.toHaveClass(/hidden/);
    await expect(page.locator('#error-message')).toHaveText('pokemon não encontrado');
}
