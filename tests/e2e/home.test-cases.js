import {
    PIKACHU_MOCK,
    expectErrorModal,
    expectPokemonSummary,
    mockPokemonLookup,
    mockPokemonNotFound,
    openPokedex,
    searchPokemon,
} from '../shared/pokemon-test-helpers.js';

export async function shouldFillModalWithMockedPokemonData({ page }) {
    await mockPokemonLookup(page, '25', PIKACHU_MOCK);
    await openPokedex(page);
    await searchPokemon(page, '25');
    await expectPokemonSummary(page, PIKACHU_MOCK);
}

export async function shouldShowErrorModalForInvalidPokemon({ page }) {
    await mockPokemonNotFound(page, 'missing-pokemon-xyz');
    await openPokedex(page);
    await searchPokemon(page, 'missing-pokemon-xyz');
    await expectErrorModal(page, 'pokemon não encontrado');
}
