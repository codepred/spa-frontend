<script setup>
import { ref } from 'vue'

const storeNumberOfItemsCart = ref(localStorage.getItem('checkoutItems') || 0)

const updateLocalStorage = () => {
  storeNumberOfItemsCart.value = localStorage.getItem('checkoutItems') || 0
}

</script>

<template>
  <div class="vue-template" @mouseover="updateLocalStorage" @click="updateLocalStorage">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container display-desktop">
        <a class="navbar-brand float-left" target="_blank">
          <router-link to="/main">
            <img src="./assets/img/spa_logo.jpg" width="100" heigh="100" />
          </router-link>
        </a>
        <ul class="nav-leftside">
          <li class="nav-items">
            <router-link to="/treatments-list">Usługi</router-link>
          </li>
        </ul>
        <ul class="nav-rightside">
          <li v-if="showLogoutButton" class="nav-items">
            <div style="display: flex; justify-content: space-between;">
              <router-link to="/check-out">Koszyk</router-link>
              <span class="btn-circle"> {{ storeNumberOfItemsCart }} </span>
            </div>
          </li>
          <li class="nav-items display-medium">
            <router-link v-if="showLogoutButton" to="/log-in" @click="clearSessionStorage">Wyloguj</router-link>
          </li>
          <li class="nav-items">
            <router-link v-if="!showLogoutButton" to="/log-in">Zaloguj</router-link>
          </li>
        </ul>
      </div>
      <div class="container display-mobile">
        <ul class="">
          <li class="nav-items">
            <router-link to="/treatments-list">Usługi</router-link>
          </li>
        </ul>
        <ul class="">
          <li v-if="showLogoutButton" class="nav-items">
            <div style="display: flex; justify-content: space-between;">
              <router-link to="/check-out">Koszyk</router-link>
              <span class="btn-circle"> {{ storeNumberOfItemsCart }} </span>
            </div>
          </li>
          <li class="nav-items">
            <router-link v-if="showLogoutButton" to="/log-in" @click="clearSessionStorage">Wyloguj</router-link>
          </li>
          <li class="nav-items">
            <router-link v-if="!showLogoutButton" to="/log-in">Zaloguj</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App">
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
      numberOfItemsCart: window.numberOfItemsCart,
      displayNumberOfItems: false,
    }
  },
  methods: {
    checkIfUserLoggedIn() {
      if (!localStorage.getItem('token')) {
        this.showLogoutButton = false
        this.showSignUpButton = true
        this.$router.push('/log-in')
      }
      else {
        this.showLogoutButton = true
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
    clearSessionStorage() {
      localStorage.removeItem('token');
      this.showLogoutButton = false
    },
  },
  mounted: function () {
    this.checkIfUserLoggedIn()
  },
  watch: {
    $route: function () {
      this.checkIfUserLoggedIn()
    }
  }
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
  background-color: orange;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  border: 1px;
  padding: 12px;
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
  width: 100%;
  min-width: 300px;
  max-width: 800px;
  margin-bottom: 30px;
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

@media (max-width: 400px) {
  .display-desktop {
    display: none !important;
  }
}

@media (min-width: 401px) {
  .display-mobile {
    display: none !important;
  }
}

@media (max-width: 625px) {
  .display-medium {
    display: none !important;
  }
}
</style>