<template>
  <div class="containerDisplay">
    <form @submit.prevent="login">
      <!-- <router-link to="/sign-up">
        <div class="redirectToCreateUser">Nie mam konta</div>
      </router-link> -->
      <br>
      <br>
      <h3>Zaloguj się</h3>
      <div class="form-group">
        <div class="display-error-login" v-if="displayIncorrectPassword"> Niepoprawna nazwa użytkownika lub hasło </div>
        <div class="display-error-login" v-if="displayServerError"> Wystąpił problem z serwerem</div>
      <div>
        <input type="text" v-model="username" class="form-control-lg" placeholder="Nazwa użytkownika" autocomplete="username" required />
      </div>
      </div>
      <div class="form-group">
        <input :type="showPassword ? 'text' : 'password'" class="form-control-lg" v-model="password" placeholder="Hasło" autocomplete="password"
          required />
        <br>
        <div class="showPasswordClass">
          <input type="checkbox" class="checkboxClass" id="checkboxButton" @click="toggleShow" />
          <label id="showPasswordLabel" @click="markCheckbox" class="showPasswordLabel"> Pokaż hasło </label>
        </div>
      </div>
      <button v-if="!loginStatus" type="submit" class="add-button">Zaloguj się</button>
      <button v-if="loginStatus" type="submit" class="add-button">Logowanie...</button>
    </form>
  </div>
</template>
  
<script>


export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      displayIncorrectPassword: false,
      loginStatus: false,
      displayServerError: false,
      token: "",
    }
  },
  computed: {
    buttonLabel() {
      return (this.password) ? "Hide" : "Show";
    }
  },
  methods: {
    markCheckbox() {
      document.getElementById("checkboxButton").click()
    },

    toggleShow() {
      this.showPassword = !this.showPassword;
    },

    async login(e) {
      e.preventDefault();

      this.loginStatus = true
      this.displayServerError = false
      this.displayIncorrectPassword = false

      if (this.username === 'admin' && this.password === 'Test123#') {
        this.$router.push('/Main')
        localStorage.setItem('token', 'TEST_TOKEN')
      }
      else {
        this.displayIncorrectPassword = true
      }

      this.loginStatus = false
    }
  }
}


</script>
  
<style>
.add-button {
  width: 30%;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
  border: 1px solid transparent;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}


.checkboxClass {
  width: 5%;
  height: 5%;
}

.showPasswordClass {
  padding-top: 1%;
}

.containerDisplay {
  text-align: center;
  align-items: center;
  justify-content: center;
  display: inline-block;
  float: none;
  width: 750px !important;
}

.form-control-lg {
  display: block;
  width: 30%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: inline-block;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#toggle-password {
  display: none;
}

#toggle-password+label {
  text-indent: -9999px;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: -32px;
  cursor: pointer;
}

.display-error-login {
  color: #ff0000;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  text-align: center;
}

div #showPasswordLabel:hover,
button #checkboxButton:hover {
  cursor: pointer;
}

.redirectToCreateUser {
  float: right;
  padding-right: 5%;
}

.redirectToCreateUser:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>