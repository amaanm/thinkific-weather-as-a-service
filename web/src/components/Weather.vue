<template>
  <div class="card">
    <img
      class="card-img-top city"
      :src="'https://source.unsplash.com/featured/?' + weather.city"
      alt="Photo provided by unsplash" />
    <div class="card-body">
      <div class="row">
        <div class="col d-flex flex-row align-items-center">
          <img
            class="icon"
            v-if="weather.current.owmIcon"
            :src="weather.current.owmIcon"
            alt="Weather icon">
          <div class="text-left">
            <h2 class="text-left city-name">{{ weather.city }}</h2>
            <h3 class="temp">{{ weather.current.temp.toFixed(1) }}ºC</h3>
          </div>
          <div class="ml-auto text-right desc">
            <h4>{{ weather.current.descShort }}</h4>
            <h5 class="muted"><i>{{ weather.current.descLong }}</i></h5>
          </div>
        </div>
      </div>
      <p
        class="text-left mb-0 mt-3"
        v-if="user && user.favouriteCity != weather.city">
        <button class="btn btn-link" @click="favourite()">
          <i class="far fa-star"></i>
        </button> click the star to set this city as your favourite.
        <br>
        <small class="text-muted">
          This city will load first when you are signed in to your account
        </small>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Weather } from '../types';

@Component
export default class WeatherComponent extends Vue {
  @Prop() private weather!: Weather;

  favourite() {
    this.$store.dispatch('setFavourite', this.weather.city);
  }

  get user() {
    return this.$store.state.user;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img.city {
  height: 20rem;
  object-fit: cover;
}
</style>
