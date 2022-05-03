import { defineStore } from 'pinia';

export const usePokedexStore = defineStore({
  id: 'pokedex',
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
  },
});
