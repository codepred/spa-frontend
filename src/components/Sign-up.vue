<template>
    <div class="containerDisplay">
      <form @submit.prevent="login">
        <router-link to="/log-in">
          <div class="redirectToLogin">Mam konto</div>
        </router-link>
        <br>
        <br>
          <h3>Zarejestruj się</h3>
          <div class="form-group">
            <div class="display-error-login" v-if="displayIncorrectPassword"> Niepoprawna nazwa użytkownika lub hasło </div>
            <div class="display-error-login" v-if="displayServerError"> Wystąpił problem z serwerem</div>
            <br>
            <div class="form-group">
                <input type="text" v-model="username" class="form-control-lg" placeholder="Nazwa użytkownika" required />             
          </div> 
          <div class="form-group">
            <input type="password" class="form-control-lg" v-model="password" placeholder="Hasło" required/>
          </div> 
              <input type="text" v-model="firstName" class="form-control-lg" placeholder="Imie" required />        
          </div>
          <div class="form-group">
              <input type="text" class="form-control-lg" v-model="lastName" placeholder="Nazwisko" required/>
          </div> 
          <div class="form-group">
            Data urodzenia
            <br>
              <input type="date" class="form-control-lg" v-model="birthDate" placeholder="Data urodzenia" required/>
              <br>
          </div> 
          <div class="form-group">
              <input type="text" class="form-control-lg" v-model="address" placeholder="Adres" required/>
              <br>
          </div> 
          <button v-if="!loginStatus" type="submit" class="add-button">Zarejestruj się</button>
          <button v-if="loginStatus" type="submit" class="add-button">Rejestracja...</button>
      </form>
    </div>
  
  </template>
  
  <script>

  
  export default {
    data () {
      return {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        address: "",
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
  
      toggleShow () {
          this.showPassword = !this.showPassword;
      },

      async login(e) {
        this.loginStatus = true
        e.preventDefault();
  
        try {
            var response = await fetch("http://54.37.138.92:8082/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify({
                    email: this.username,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    birthDate: this.birthDate,
                    address: this.address
                })
            }).then(response => response.json())
            // localStorage.setItem('token', response.data)
        }
        catch (error) {
                this.errorMessage = error;
                console.error('There was an error!', error)
                const stringError = String(error)
  
            if (stringError.includes("Failed to fetch")) {
                this.displayServerError = true
                this.loginStatus = false
                this.displayIncorrectPassword = false
            }
            else {
                this.displayIncorrectPassword = true
                this.loginStatus = false
                this.displayServerError = false
            }
           return
        }
        localStorage.setItem('token', '34ljk5nbmvxc@#!^*$%a')

        if(response !== 'undefined'){
          //  this.token = response.token
            //localStorage.setItem('token', this.token);
            this.$router.push('/Main')
        }
      } 
    }
  }
    
  
  </script>
  
  <style>


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
    width: 100%;
    
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
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
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
  #toggle-password + label {
    text-indent: -9999px;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: -32px;
    cursor: pointer;
  }
  button {
    width: 30%;
    justify-content: center;
  }

  .display-error-login {
    color: #ff0000;
    padding: 10px;
    margin: auto;
    border-radius: 10px;
    text-align: center;
  }
  div #showPasswordLabel:hover,
  button #checkboxButton:hover{
    cursor: pointer;
  }
  .redirectToLogin {
    float:right;
    padding-right: 5%;
  }
  .redirectToLogin:hover {
    cursor: pointer;
    text-decoration: underline; 
  }
  
  </style>