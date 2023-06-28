<template>
  <div>
    <form class="form__form" @submit.prevent="createPokemon">
      <div class="form__form-group">
        <label for="name">Name</label>
        <input id="name" v-model="pokemon.name" type="text" />
      </div>
      <div class="form__form-group">
        <label for="species">Species</label>
        <input id="species" v-model="pokemon.species" type="text" />
      </div>
      <div class="form__form-group">
        <label for="types">Types</label>
        <input id="types" v-model="pokemon.types" type="text" />
      </div>
      <div class="form__form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="pokemon.description"></textarea>
      </div>
      <div class="form__form-group">
        <label for="abilities">Abilities</label>
        <input id="abilities" v-model="pokemon.abilities" type="text" />
      </div>
      <div class="form__form-group">
        <label for="height">Height</label>
        <input id="height" v-model="pokemon.height" type="text" />
      </div>
      <div class="form__form-group">
        <label for="weight">Weight</label>
        <input id="weight" v-model="pokemon.weight" type="text" />
      </div>
      <div class="form__form-group">
        <label for="sprite">Sprite</label>
        <input id="sprite" v-model="pokemon.sprite" type="text" />
      </div>
      <div class="form__form-group">
        <label for="captured">Captured</label>
        <input id="captured" v-model="pokemon.captured" type="checkbox" />
      </div>

      <div class="form__form-group">
        <button type="submit" class="form__submit">Add pokemon</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { uuid } from 'vue-uuid';

const emit = defineEmits(['close-modal', 'add-pokemon']);

const pokemon = reactive({
  name: '',
  species: '',
  types: '',
  description: '',
  abilities: '',
  height: '',
  weight: '',
  sprite: '',
  captured: false,
});

function resetPokemon() {
  pokemon.name = '';
  pokemon.species = '';
  pokemon.types = '';
  pokemon.description = '';
  pokemon.abilities = '';
  pokemon.height = '';
  pokemon.weight = '';
  pokemon.sprite = '';
  pokemon.captured = false;
}

function createPokemon() {
  if ((pokemon.name === '' || pokemon.species === '', pokemon.types === '')) {
    alert('Please fill in the name, species and types fields');
    return;
  }
  pokemon.id = uuid.v4();
  pokemon.types = pokemon.types.split(',');
  pokemon.abilities = pokemon.abilities.split(',');
  const pokemonToBeAdded = { ...pokemon };
  emit('add-pokemon', pokemonToBeAdded);
  resetPokemon();
}
</script>

<style scoped>
.form__form {
  display: flex;
  flex-wrap: wrap;
}
.form__form-group {
  margin-bottom: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.form__form-group label {
  display: block;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
}
.form__form-group input,
.form__form-group select,
.form__form-group textarea {
  width: 80%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  text-align: left;
}
.form__form-group input:focus,
.form__form-group textarea:focus {
  border-color: #000;
}
.form__form-group textarea {
  height: 100px;
}
.form__submit {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  min-width: 100px;
  background-color: #4caf50;
  color: #fff;
}
.form__submit:hover {
  background-color: #43a047;
}
</style>
