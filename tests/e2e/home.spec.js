import { test } from '@playwright/test';
import { shouldFillModalWithMockedPokemonData, shouldShowErrorModalForInvalidPokemon } from './home.test-cases';

test.describe.configure({ mode: 'serial' });

test('deve preencher o modal com dados mockados ao buscar pokemon 25', shouldFillModalWithMockedPokemonData);

test(
    'deve abrir o modal de erro sem classe hidden quando argumento for invalido',
    shouldShowErrorModalForInvalidPokemon
);
