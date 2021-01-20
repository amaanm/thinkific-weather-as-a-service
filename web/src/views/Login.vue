<template>
  <div class="login container mt-5">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <i class="fas fa-user-lock fa-5x"></i>
            <p v-if="!register">
              Please enter your credentials,
              or <router-link :to="'/register'">register</router-link>
            </p>
            <p v-if="register">
              If you already have an account, <router-link :to="'/login'">login</router-link>
            </p>
            <hr>
            <form @submit.prevent="submit()">
              <input
                type="text"
                class="form-control mb-2"
                id="username"
                placeholder="username"
                v-model="username"
                required />
              <input
                type="password"
                class="form-control mb-2"
                id="password"
                placeholder="password"
                v-model="password"
                required />
              <button class="btn btn-block btn-info" type="submit">
                {{ register ? 'Register' : 'Login' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { City } from '../types';
import API from '../api';

@Component({
  components: {
  },
})
export default class Home extends Vue {
  @Prop({ default: false }) private register!: boolean;

  private activeCity: City | null = null;

  private username = '';

  private password = '';

  async mounted() {
    if (this.isLoggedIn) {
      this.$router.replace('/');
    }
  }

  async submit() {
    try {
      if (this.register) {
        // register the user
        await API.users.create(this.username, this.password);
      }
      await this.$store.dispatch('authenticate', {
        username: this.username,
        password: this.password,
      });
      this.$router.push('/');
    } catch (e) {
      alert(e.response.data.error);
    }
  }

  get isLoggedIn() {
    return !!this.$store.state.token;
  }
}
</script>

<style lang="scss" scoped>

</style>
