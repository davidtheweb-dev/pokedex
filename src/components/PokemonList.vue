<template>
  <div class="pokemon-list">
    <PokemonItem
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @delete-pokemon="deletePokemon"
    />
  </div>
</template>

<script setup>
import PokemonItem from './PokemonItem.vue';

defineProps({
  pokemons: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete-pokemon']);

function deletePokemon(id) {
  emit('delete-pokemon', id);
}
</script>

<style scoped>
.pokemon-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
