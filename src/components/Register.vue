<template>
  <div class="register">
    <b-row>
      <b-col>
        <h2>Birthday Tracker</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="form-container">
        <h3>Login</h3>
        <b-form @submit="submitLogin">
          <b-form-group
            label="Email address:"
            label-for="loginEmail"
          >
            <b-form-input id="loginEmail"
              type="email"
              v-model="login.email"
              required
              placeholder="Enter email">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Password:"
            label-for="loginPassword"
          >
            <b-form-input id="loginPassword"
              type="password"
              v-model="login.password"
              required
              placeholder="Enter password">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
          </b-form-group>
          <b-form-group>
            <p class="error">{{ login.error }}</p>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="form-container form-container--signup">
        <h3>Create an account</h3>
        <b-form @submit="submitSignup">
          <b-form-group
            label="Email address:"
            label-for="signupEmail"
          >
            <b-form-input id="signupEmail"
              type="email"
              v-model="signup.email"
              required
              placeholder="Enter email">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Password:"
            label-for="signupPassword"
          >
            <b-form-input id="signupPassword"
              type="password"
              v-model="signup.password"
              required
              placeholder="Enter password">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-button type="submit" variant="primary">Signup</b-button>
          </b-form-group>
          <b-form-group>
            <p class="error">{{ signup.error }}</p>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import * as api from '../api/auth';

  export default {
    name: 'register',
    data() {
      return {
        login: {
          email: '',
          password: '',
          error: ''
        },
        signup: {
          email: '',
          password: '',
          error: ''
        }
      };
    },
    methods: {
      submitLogin(e) {
        e.preventDefault();

        (async () => {
          try {
            const token = await api.login({
              email: this.login.email,
              password: this.login.password
            });

            this.handleLogin(token);
          } catch (err) {
            this.login.error = err.message;
          }
        })();
      },
      submitSignup(e) {
        e.preventDefault();

        (async () => {
          try {
            const token = await api.signup({
              email: this.signup.email,
              password: this.signup.password
            });

            this.handleLogin(token);
          } catch (err) {
            this.signup.error = err.message;
          }
        })();
      },
      handleLogin(token) {
        (async () => {
          try {
            await this.$store.dispatch('loginUser', token);
            await this.$store.dispatch('loadContacts', token);
          } catch(err) {
            console.error(err);
          } finally {
            this.$router.push('/');
          }
        })();
      }
    }
  };
</script>

<style scoped>
  .error {
    color: #DF382C;
  }

  h2 {
    text-align: center;
  }

  .register {
    margin-top: 50px;
  }

  .form-container {
    max-width: 500px;
    margin: auto;
    padding-top: 20px;
  }

  .form-container--signup {
    background-color: #772953;
    color: #fff;
  }
</style>
