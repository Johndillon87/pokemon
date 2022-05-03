<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <v-card border width="80%" height="100%">
            <h3 class="text-capitalize pt-2">{{ pokemon.name }}</h3>
            <div class="d-flex justify-center">
              <v-sheet
                :color="getCardColor(pokemon.types[0].type.name)"
                width="35%"
                height="20%"
                class="ma-6 mt-2 rounded-lg"
                border
              >
                <v-img small :src="pokemon.sprites.front_default"></v-img>
              </v-sheet>
            </div>
            <v-chip
              v-for="item in pokemon.types"
              :key="item.type.name"
              class="mb-5 mx-2 text-capitalize"
              :color="getCardColor(item.type.name)"
              text-color="white"
            >
              {{ item.type.name }}
            </v-chip>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6" class="pr-0">
                <v-table>
                  <tbody>
                    <tr v-for="item in pokemon.stats" :key="item.stat.name">
                      <td class="text-left text-capitalize">
                        {{ item.stat.name }}
                      </td>
                      <td class="text-left">{{ item.base_stat }}</td>
                    </tr>
                  </tbody>
                </v-table>
                <v-divider></v-divider>
              </v-col>
              <v-divider vertical class="my-3"></v-divider>
              <v-col cols="6" class="pl-0">
                <v-expansion-panels hide-actions>
                  <v-expansion-panel
                    v-for="item in pokemon.moves"
                    :key="item.move.name"
                    @click="getMoveInfo(item.move.url)"
                  >
                    <v-expansion-panel-title class="text-capitalize">
                      {{ item.move.name }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text v-if="move.name">
                      <v-row>
                        <v-col> Accuracy: {{ move.accuracy }} </v-col>
                        <v-col>PP: {{ move.pp }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div class="d-flex justify-center">
                            <span class="pt-1">Type:</span>
                            <v-chip
                              class="mx-2 text-capitalize"
                              :color="getCardColor(move.type.name)"
                              text-color="white"
                            >
                              {{ move.type.name }}
                            </v-chip>
                          </div>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                    <v-divider></v-divider>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePokedexStore } from '@/stores/pokedex';
import { ref, defineProps } from 'vue';

const props = defineProps({ pokemon: Array });

const pokedex = usePokedexStore();
const pokemon = props.pokemon;

const move = ref({});
const types = ref([
  {
    type: 'grass',
    color: '#8CD751',
  },
  {
    type: 'normal',
    color: '#BDBDAE',
  },
  {
    type: 'poison',
    color: '#A55A9D',
  },
  {
    type: 'psychic',
    color: '#F561B0',
  },
  {
    type: 'ground',
    color: '#E9C855',
  },
  {
    type: 'ice',
    color: '#96F1FF',
  },
  {
    type: 'fire',
    color: '#FA5643',
  },
  {
    type: 'rock',
    color: '#CEBD72',
  },
  {
    type: 'dragon',
    color: '#8874FF',
  },
  {
    type: 'water',
    color: '#56AEFF',
  },
  {
    type: 'bug',
    color: '#C3D21F',
  },
  {
    type: 'dark',
    color: '#8C6855',
  },
  {
    type: 'fighting',
    color: '#A85642',
  },
  {
    type: 'ghost',
    color: '#7975D7',
  },
  {
    type: 'steel',
    color: '#C4C2DB',
  },
  {
    type: 'flying',
    color: '#76A2FF',
  },
  {
    type: 'electric',
    color: '#FDE53E',
  },
  {
    type: 'fairy',
    color: '#F9ADFF',
  },
]);

function getCardColor(type) {
  return this.types.find((item) => item.type === type).color;
}

async function getMoveInfo(url) {
  pokedex.setLoading(true);
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      this.move = data;
      pokedex.setLoading(false);
    });
}
</script>
