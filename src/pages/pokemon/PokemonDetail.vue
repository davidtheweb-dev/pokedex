<template>
  <div class="view__pokemon">
    <div class="pokemon">
      <div class="pokemon__image">
        <img :src="pokemonInfo.sprite" :alt="pokemonInfo.name" />
      </div>
      <div class="pokemon__info">
        <h2 class="pokemon__name">{{ pokemonInfo.name }}</h2>

        <p v-if="pokemonInfo.description" class="pokemon__description">
          {{ pokemonInfo.description }}
        </p>

        <div class="pokemon__types">
          <span
            v-for="type in pokemonInfo.types"
            :key="type"
            class="pokemon__type"
            :class="type.toLowerCase()"
            >{{ type + ' ' }}</span
          >
        </div>

        <div class="pokemon__abilities">
          <span v-for="ability in pokemonInfo.abilities" :key="ability" class="pokemon__ability">{{
            ability + ' '
          }}</span>
        </div>

        <div class="pokemon__stats">
          <div class="pokemon__stat">
            <div class="pokemon__stat-name">Height</div>
            <div class="pokemon__stat-value">{{ pokemonInfo.height }}</div>
          </div>
          <div class="pokemon__stat">
            <div class="pokemon__stat-name">Weight</div>
            <div class="pokemon__stat-value">{{ pokemonInfo.weight }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue';
import { useUserStore } from '../../stores/user/UserStore';
import { useRoute } from 'vue-router';
import axios from 'axios';

const userStore = useUserStore();
const route = useRoute();

const pokemonInfo = reactive({
  name: '',
  description: '',
  species: '',
  types: [],
  abilities: [],
  height: '',
  weight: '',
  sprite: '',
  captured: '',
});

const token = computed(() => {
  return userStore.getToken;
});

watch(token, () => {
  fetchPokemonInfo();
});

onMounted(() => {
  fetchPokemonInfo();
});

async function fetchPokemonInfo() {
  const req = await axios({
    method: 'GET',
    url: `http://localhost:3000/pokemon`,
    params: {
      id: route.params.id,
    },
    headers: {
      authorization: token.value,
    },
  });
  const fetchedPokemonData = req.data.data;
  pokemonInfo.name = fetchedPokemonData.name;
  pokemonInfo.description = fetchedPokemonData.description;
  pokemonInfo.species = fetchedPokemonData.species;
  pokemonInfo.types = fetchedPokemonData.types;
  pokemonInfo.abilities = fetchedPokemonData.abilities;
  pokemonInfo.height = fetchedPokemonData.height;
  pokemonInfo.weight = fetchedPokemonData.weight;
  pokemonInfo.sprite = fetchedPokemonData.sprite;
  pokemonInfo.captured = fetchedPokemonData.captured;
}
</script>

<style scoped>
.view__pokemon .pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  max-width: 400px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  max-width: 50%;
  margin: 30px auto;
}
.pokemon__image {
  width: 100%;
  max-width: 200px;
  height: 100%;
  max-height: 200px;
  margin-bottom: 1rem;
}
.pokemon__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.pokemon__info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pokemon__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
  text-decoration: none;
}
.pokemon__description {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.pokemon__types {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.pokemon__type {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}
.pokemon__type.fire {
  background-color: #f08030;
  color: #fff;
}
.pokemon__type.water {
  background-color: #6890f0;
  color: #fff;
}
.pokemon__type.grass {
  background-color: #78c850;
  color: #fff;
}
.pokemon__type.electric {
  background-color: #f8d030;
  color: #fff;
}
.pokemon__type.ice {
  background-color: #98d8d8;
  color: #fff;
}
.pokemon__type.fighting {
  background-color: #c03028;
  color: #fff;
}
.pokemon__type.poison {
  background-color: #a040a0;
  color: #fff;
}
.pokemon__type.ground {
  background-color: #e0c068;
  color: #fff;
}
.pokemon__type.flying {
  background-color: #a890f0;
  color: #fff;
}
.pokemon__type.psychic {
  background-color: #f85888;
  color: #fff;
}
.pokemon__type.bug {
  background-color: #a8b820;
  color: #fff;
}
.pokemon__type.rock {
  background-color: #b8a038;
  color: #fff;
}
.pokemon__type.ghost {
  background-color: #705898;
  color: #fff;
}
.pokemon__type.dragon {
  background-color: #7038f8;
  color: #fff;
}
.pokemon__type.dark {
  background-color: #705848;
  color: #fff;
}
.pokemon__type.steel {
  background-color: #b8b8d0;
  color: #fff;
}
.pokemon__type.fairy {
  background-color: #ee99ac;
  color: #fff;
}
.pokemon__abilities {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.pokemon__ability {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  background-color: #f8f8f8;
  color: #000;
}
.pokemon__stats {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pokemon__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pokemon__stat-name {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}
.pokemon__stat-value {
  font-size: 1rem;
  font-weight: 700;
}
</style>
