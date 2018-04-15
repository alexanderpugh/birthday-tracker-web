<template>
  <div id="app">
    <div v-show="userLoggedIn" class="nav-container">
      <b-nav justified tabs>
        <b-nav-item to="/" exact>HOME</b-nav-item>
        <b-nav-item to="/create" exact>NEW</b-nav-item>
        <b-nav-item v-on:click="logout">LOGOUT</b-nav-item>
      </b-nav>
    </div>
    <b-container>
      <router-view></router-view>
    </b-container>

    <footer>
      Developed by <a href="https://github.com/alexanderpugh" target="_blank">Alexander Pugh</a>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['userLoggedIn'])
  },
  mounted() {
    const token = Cookies.get('BIRTHDAY_TRACKER_TOKEN');

    if(token) {
      (async () => {
        try {
          await this.$store.dispatch('loginUser', token);
          await this.$store.dispatch('loadContacts', token);
        } catch (err) {
          this.logout();
        }
      })();
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser', this.$router).then(() => this.$router.push('/register'));
    }
  }
};
</script>

<style scoped>
  #app {

  }

  .nav-container {
    margin-bottom: 20px;
  }

  footer {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;
    font-weight: bold;
  }
</style>
