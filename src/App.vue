<template @mouseover="updateLoginButton">
  <div class="vue-template">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" target="_blank">
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link v-if="showLogoutButton" class="nav-link pr-3" to="/log-in" @click="clearSessionStorage">Wyloguj</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

 export default {

  data() {
    return {
      }
  },
    methods: {
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

.vertical-center {
    align-self: center;
    width: 100%;
    block-size: fit-content;
}
.inner-block {
  display: inline-block;
}


</style>