<template>
  <div class="vue-template">
    <form>
      <h3>Zapomniałem hasła</h3>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control form-control-lg" v-model="email" required/>        
      </div>
      <button type="submit" router-link to="/forgot-success" class="btn btn-dark btn-lg btn-block">Przypomnij hasło</button>

    </form>
  </div>

</template>

new Vue({
  el: "#app",
  data: {
    fullname: '',
    email: '',
    password: '',
    password2: '',
    showError: false

  },
  methods: {
    toggle: function(todo){
        todo.done = !todo.done
    },
    validate: function() {
        if (this.password !== this.password2) {
            showError = true
        }
    }
  }
})



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
</style>