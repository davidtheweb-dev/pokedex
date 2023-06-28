<template>
  <SearchBar @show-form="toggleForm" @search="setSearchTerm" />
  <FilterBar
    @sort-items="sortPokemons"
    @order-items="orderPokemons"
    @captured-pokemons="capturedPokemons"
  />
  <main class="main">
    <PokemonList :pokemons="filteredPokemons" @delete-pokemon="deletePokemon" />
  </main>
  <ModalLayer v-if="showModal" @close-modal="toggleForm">
    <template #header>
      <h2>Add a new Pokemon</h2>
    </template>
    <template #body>
      <PokemonForm @add-pokemon="addPokemon" />
    </template>
  </ModalLayer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useUserStore } from '../../stores/user/UserStore';
import axios from 'axios';

import SearchBar from '../../components/SearchBar.vue';
import FilterBar from '../../components/FilterBar.vue';
import PokemonList from '../../components/PokemonList.vue';
import ModalLayer from '../../components/ModalLayer.vue';
import PokemonForm from '../../components/forms/PokemonForm.vue';

const userStore = useUserStore();

const showModal = ref(false);
const sortBy = ref('title');
const orderBy = ref('asc');
const captured = ref(false);
const searchTerm = ref('');
const pokemonList = ref([]);

const token = computed(() => {
  return userStore.getToken;
});

watch(token, () => {
  fetchPokemons();
});

onMounted(() => {
  fetchPokemons();
});

async function fetchPokemons() {
  const req = await axios.get('http://localhost:3000/pokedex', {
    headers: {
      authorization: token.value,
    },
  });
  pokemonList.value = req.data.data;
}

async function addPokemon(pokemon) {
  const req = await axios.post('http://localhost:3000/pokemon', pokemon, {
    headers: {
      authorization: token.value,
    },
  });
  if (req.status === 200) {
    await fetchPokemons();
    toggleForm();
  }
}

async function deletePokemon(id) {
  const req = await axios({
    method: 'DELETE',
    url: `http://localhost:3000/pokemon`,
    data: {
      id: id,
    },
    headers: {
      authorization: token.value,
    },
  });
  if (req.status === 200) {
    fetchPokemons();
  }
}

function toggleForm() {
  showModal.value = !showModal.value;
}

function setSearchTerm(value) {
  searchTerm.value = value;
}

function sortPokemons(newSortBy) {
  sortBy.value = newSortBy;
}

function orderPokemons(newOrderBy) {
  orderBy.value = newOrderBy;
}

function capturedPokemons(newCaptured) {
  captured.value = newCaptured;
}

const filteredPokemons = computed(() => {
  let filteredPokemonsList = pokemonList.value;

  filteredPokemonsList = filteredPokemonsList.sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy.value === 'type') {
      return a.type.localeCompare(b.type);
    } else if (sortBy.value === 'abilities') {
      return a.abilities.localeCompare(b.abilities);
    }
  });
  if (orderBy.value === 'desc') {
    filteredPokemonsList = filteredPokemonsList.reverse();
  }
  if (captured.value) {
    filteredPokemonsList = filteredPokemonsList.filter((pokemon) => pokemon.captured);
  }

  if (!searchTerm.value) {
    return filteredPokemonsList;
  } else {
    filteredPokemonsList = filteredPokemonsList.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(searchTerm.value.toLocaleLowerCase()) ||
        pokemon.description.toLowerCase().includes(searchTerm.value.toLocaleLowerCase()) ||
        pokemon.type.some((item) =>
          item.toLowerCase().includes(searchTerm.value.toLocaleLowerCase())
        ) ||
        pokemon.abilities.some((item) =>
          item.toLowerCase().includes(searchTerm.value.toLocaleLowerCase())
        )
      );
    });
  }
  return filteredPokemonsList;
});
</script>
