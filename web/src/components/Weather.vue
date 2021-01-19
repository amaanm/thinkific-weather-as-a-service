<template>
  <div class="card">
    <img
      class="card-img-top city"
      :src="'https://source.unsplash.com/featured/?' + weather.current.desc_short"
      alt="Photo provided by unsplash" />
    <div class="card-body">
      <div class="row">
        <div class="col d-flex flex-row align-items-center">
          <img
            class="icon"
            v-if="weather.current.owm_icon"
            :src="weather.current.owm_icon"
            alt="Weather icon">
          <div class="text-left">
            <h2 class="text-left city-name">{{ weather.city }}</h2>
            <h3 class="temp">9.5ºC</h3>
          </div>
          <div class="ml-auto text-right desc">
            <h4>{{ weather.current.desc_short }}</h4>
            <h5 class="muted"><i>{{ weather.current.desc_long }}</i></h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Weather } from '../../../api/src/types';

@Component
export default class WeatherComponent extends Vue {
  @Prop() private weather!: Weather;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img.city {
  height: 10rem;
  object-fit: cover;
}
</style>
