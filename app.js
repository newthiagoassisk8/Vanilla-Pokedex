const form = document.getElementById('search-form');
const queryInput = document.getElementById('pokemon-query');
const modal = document.getElementById('pokemon-modal');
const closeModalBtn = document.getElementById('close-modal');

const pokemonNameEl = document.getElementById('pokemon-name');
const pokemonImageEl = document.getElementById('pokemon-image');
const pokemonTypeEl = document.getElementById('pokemon-type');
const pokemonHeightEl = document.getElementById('pokemon-height');
const pokemonWeightEl = document.getElementById('pokemon-weight');

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

async function fetchPokemonInfo(pokemon) {
  try {
    if (!pokemon) {
      throw new Error('pokemon não informado')
    }
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('pokemon não encontrado')
    }
    const data = await res.json()
    return {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default || '',
      height: data.height,
      types: data.types?.map(item => item.type?.name).join(', ') || 'Sem tipos'
    }
  } catch (e) {
    console.error(e)
    return null
  }
}



function renderPokemonModal(data) {
  console.log('data')
  console.log(data)
  pokemonNameEl.textContent = data.name || 'Pokemon';
  pokemonImageEl.src = data.image || 'carregando';
  pokemonTypeEl.textContent = data.types || '-';
  pokemonHeightEl.textContent = data.height || '-';
  pokemonWeightEl.textContent = data.weight || '-';
  openModal();
}

async function handleSearch(query) {
  // TODO: implemente aqui sua chamada de endpoint.
  let pokemon = await fetchPokemonInfo(query);
  if (!pokemon) {
    return;
  }

  renderPokemonModal(pokemon);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = queryInput.value.trim();
  if (!query) return;

  await handleSearch(query);
});

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
