import { test } from '@playwright/test';
import { shouldFillModalWithMockedPokemonData, shouldShowErrorModalForInvalidPokemon } from './home.test-cases';

test.describe.configure({ mode: 'serial' });

test('should fill the modal with mocked data when searching for pokemon 25', shouldFillModalWithMockedPokemonData);

test(
    'should open the error modal without the hidden class when the search argument is invalid',
    shouldShowErrorModalForInvalidPokemon
);
