<template>
  <v-app>
    <v-main>
      <PokemonCard v-if="randomPokemon" :pokemon="randomPokemon" />
    </v-main>
  </v-app>
</template>

<script>
import PokemonCard from './components/PokemonCard.vue';

export default {
  name: 'App',

  components: {
    PokemonCard,
  },
  data: () => ({
    allPokemon: [],
    randomPokemon: '',
  }),
  computed: {},
  created() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000`)
      .then((response) => response.json())
      .then((data) => {
        this.allPokemon = data.results.map((pokemon) => pokemon.url);
      });
  },
  watch: {
    allPokemon() {
      const randomId = Math.floor(Math.random() * this.allPokemon.length);
      const randomPokemonUrl = this.allPokemon[randomId];

      const poke = fetch(randomPokemonUrl)
        .then((response) => response.json())
        .then((data) => {
          this.randomPokemon = data;
        });

      return poke;
    },
  },
};
</script>
