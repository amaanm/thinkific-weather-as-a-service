<template>
  <div class="mt-3 ml-1 text-left">
    <span>View weather for</span>
    <a
      @click="$emit('changeCity', city.name)"
      class="badge rounded-pill bg-info text-light ml-1"
      v-for="city in cities"
      :key="city._id">{{ city.name }}</a>
    <span> or </span>
    <form
      @submit.prevent="$emit('changeCity', searchCity); searchCity = '';"
      class="d-inline-block">
      <input
        type="text"
        class="text-control border-0"
        placeholder="search for city"
        v-model="searchCity" />
      <button v-show="searchCity.length" type="submit" class="btn btn-link">></button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { City, Weather } from '../../../api/src/types';

@Component
export default class CityListComponent extends Vue {
  @Prop() private cities!: City[];

  private searchCity = '';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
