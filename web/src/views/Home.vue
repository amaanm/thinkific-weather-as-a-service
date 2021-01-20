<template>
  <div>
    <div>
      <span v-if="user">Hello, {{ user.username }}</span>
      <span v-if="!user">
        <router-link :to="'/login'">Login</router-link>
        <span> / </span>
        <router-link :to="'/register'">register</router-link>
      </span>
    </div>

    <div class="home container mt-5">
      <div class="row" v-if="activeCity">
        <div class="col-8 offset-2" v-if="weather">
          <weather :weather="weather" />
          <city-list :cities="cities" @changeCity="getActiveCityWeather($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CityList from '@/components/CityList.vue'; // @ is an alias to /src
import Weather from '@/components/Weather.vue'; // @ is an alias to /src
import { City } from '../types';

@Component({
  components: {
    CityList,
    Weather,
  },
})
export default class Home extends Vue {
  private activeCity: City | null = null;

  async mounted() {
    await this.getAllCities();
    // eslint-disable-next-line
    this.activeCity = this.cities[0];

    if (this.user && this.user.favouriteCity) {
      await this.getActiveCityWeather(this.user.favouriteCity);
    } else if (this.activeCity && this.activeCity.name) {
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

  get user() {
    return this.$store.state.user;
  }
}
</script>

<style lang="scss" scoped>

</style>
