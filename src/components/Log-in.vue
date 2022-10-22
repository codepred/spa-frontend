<template>
  <div class="vue-template">
    <form @submit.prevent="login">
        <h3>Zaloguj się</h3>
        <div class="form-group">
          <div class="display-error" v-if="displayIncorrectPassword"> Niepoprawna nazwa użytkownika lub hasło </div>
          <div class="display-error" v-if="displayServerError"> Wystąpił problem z serwerem</div>
          <br>
            <label>Login</label>
            <input type="text" v-model="username" class="form-control form-control-lg" required />        
        </div>
        <div class="form-group">
            <label>Hasło</label>
            <input v-if="showPassword" type="text" class="form-control form-control-lg" v-model="password" required/>
            <input v-else type="password" class="form-control form-control-lg" v-model="password" required />
            <br>
        <div class="control"> 
            <input type="checkbox" class="button" id="checkboxButton" @click="toggleShow"/>
            <label id="showPasswordLabel" @click="markCheckbox"> Pokaż hasło </label>
        </div> 
        </div>
        <button v-if="!loginStatus" type="submit" class="btn btn-dark btn-lg btn-block">Zaloguj się</button>
        <button v-if="loginStatus" type="submit" class="btn btn-dark btn-lg btn-block">Logowanie...</button>
    </form>
  </div>

</template>

<script>
import { mapMutations } from "vuex";
export default {
  data () {
    return {
    password: "",
    showPassword: false,
    displayIncorrectPassword: false,
    loginStatus: false,
    displayServerError: false
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

    toggleShow () {
        this.showPassword = !this.showPassword;
    },
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      this.loginStatus = true
      e.preventDefault();

      try {
      var response = await fetch("http://77.55.212.201:9099/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,

          })
     }).then(response => response.json())
      }
      catch (error) {
      this.errorMessage = error;
      console.error('There was an error!', error)
      const stringError = String(error)

      if (stringError.includes("Failed to fetch")) {
        this.displayServerError = true
        this.loginStatus = false
        }
      else {
      this.displayIncorrectPassword = true
      this.loginStatus = false
        }
      }
      // szef
      if(response === 'AB' || response === 'AC'){
        console.log('OK')
          localStorage.setItem('username', this.username);
        this.$router.push('/Card-host-view')
      }
      // pracownik
      else if(response ==='AD' ){
          localStorage.setItem('username', this.username);
        this.$router.push('/Card-employee-view')
      }
    } 
  }
}
  

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #62478a;
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
#toggle-password + label {
  text-indent: -9999px;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: -32px;
  cursor: pointer;
}
label {
    margin-left: +10px;
}
.display-error {
  background-color: #ff0000!important;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  color: black;
  text-align: center;
}
div #showPasswordLabel:hover,
button #checkboxButton:hover{
  cursor: pointer;
}

</style>