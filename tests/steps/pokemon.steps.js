import { Given, Then, When } from '@cucumber/cucumber';
import {
    expectErrorModal,
    expectPokemonImageVisible,
    expectPokemonNameVisible,
    expectPokemonTypeVisible,
    mockPokemonLookup,
    mockPokemonNotFound,
    openPokedex,
    PIKACHU_MOCK,
} from '../shared/pokemon-test-helpers.js';

Given('the user is on the Pokedex page', async function () {
    await openPokedex(this.page, this.appUrl);
});

When('they type {string} in the search field', async function (query) {
    if (query === 'pikachu') {
        await mockPokemonLookup(this.page, 'pikachu', PIKACHU_MOCK);
    }

    if (query === 'missing-pokemon-xyz') {
        await mockPokemonNotFound(this.page, 'missing-pokemon-xyz');
    }

    await this.page.getByTestId('search-input').fill(query);
});

When('they click the search button', async function () {
    await this.page.getByTestId('search-button').click();
});

Then('the Pokemon name should be displayed', async function () {
    await expectPokemonNameVisible(this.page);
});

Then('the Pokemon image should be visible', async function () {
    await expectPokemonImageVisible(this.page);
});

Then('at least one type should be displayed', async function () {
    await expectPokemonTypeVisible(this.page);
});

Then('a user-friendly error message should be displayed', async function () {
    await expectErrorModal(this.page);
});
