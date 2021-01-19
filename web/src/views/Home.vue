<template>
  <div class="home container mt-5">
    <div class="row" v-if="activeCity">
      <div class="col-8 offset-2" v-if="weather">
        <weather :weather="weather" />
        <div class="mt-3 ml-1 text-left">
          <span>View weather for</span>
          <a
            @click="getActiveCityWeather(city.name)"
            class="badge rounded-pill bg-info text-light ml-1"
            v-for="city in cities"
            :key="city._id">{{ city.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Weather from '@/components/Weather.vue'; // @ is an alias to /src
import { City } from '../../../api/src/types';

@Component({
  components: {
    Weather,
  },
})
export default class Home extends Vue {
  private activeCity: City | null = null;

  async mounted() {
    await this.getAllCities();
    // eslint-disable-next-line
    this.activeCity = this.cities[0];
    if (this.activeCity && this.activeCity.name) {
      await this.getActiveCityWeather(this.activeCity.name);
    }
  }

  async getAllCities() {
    await this.$store.dispatch('getAllCities');
  }

  async getActiveCityWeather(name: string) {
    await this.$store.dispatch('getCityWeather', name);
  }

  get cities() {
    return this.$store.state.cities;
  }

  get weather() {
    return this.$store.state.weather;
  }
}
</script>

<style lang="scss" scoped>

</style>
