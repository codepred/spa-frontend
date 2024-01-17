<template>
  <div class="vue-template" @mouseover="updateLoginButton">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" target="_blank">
          <router-link to="/main">
            <img src="./assets/img/spa_logo.jpg" width="100" heigh="100" />
          </router-link>
        </a>
        <ul class="nav-leftside">
          <li class="nav-items">
            <router-link to="/treatments-list" @click="clearSessionStorage">Produkty</router-link>
          </li>
        </ul>
        <ul class="nav-rightside">
          <li v-if="showLogoutButton" class="nav-items">
              <span class="btn-circle" v-if="displayNumberOfItems"> {{ numberOfItemsCart }} </span>
              <router-link to="/check-out" @click="clearSessionStorage">Koszyk</router-link>
          </li>
          <li class="nav-items">
            <router-link v-if="showLogoutButton" to="/log-in" @click="clearSessionStorage">Wyloguj</router-link>
          </li>
          <li class="nav-items">
            <router-link v-if="!showLogoutButton" to="/log-in" @click="clearSessionStorage">Zaloguj</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App" @mouseover="updateCartItemsNumber()" @click="updateCartItemsNumber()">
      <div class="vertical-center">
        <img src="./assets//img/spa_background.jpeg" />
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 

 export default {

  data() {
    return {
      showLogoutButton: true,
      showSignUpButton: false,
      numberOfItemsCart: 0,
      displayNumberOfItems: false,
      }
  },
    methods: {
      async updateCartItemsNumber() {
        /*
        try {
            var response = await fetch("https://localhost:8081/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify({
                  token: localStorage.getItem('token')
                })
            }).then(response => response.json())

          }
          catch {

          }*/

      },
      checkIfUserLoggedIn() {
        console.log(localStorage.getItem('token'))
        if (!localStorage.getItem('token')) {
          this.showLogoutButton = false
          this.showSignUpButton = true
          this.$router.push('/log-in')
        }
      },
      updateLoginButton() {
            const checkURL = String(window.location.href)

            if (checkURL.includes("log-in") || checkURL.includes("sign-up")) {
              this.showLogoutButton = false
            }
            else {
              this.showLogoutButton = true
            }
          },
      clearSessionStorage () {
             //localStorage.removeItem('token');
          }
      },
    mounted:function() {
        //this.updateLoginButton()
        this.checkIfUserLoggedIn()
        
      },
 }
  


</script>


<style>
.btn-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    position: absolute;
    right: 327px;
    background-color: orange;
    color: white;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 15px;
    border: 1px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

.vertical-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: scroll;
}

.inner-block {
  position: absolute;
  text-align: center;
  top: 35%;
  left: 50%;
  width: fit-content;
  min-width: 300px;
  margin-bottom: 30px;
  margin-left: 80px;
  transform: translate(-50%, -50%);
}

.nav-leftside {
  display: flex;
  float: left;
}
.nav-rightside {
  display: flex;
  float: right;
}

.nav-items {
  font-size: 20px;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
}

</style>