<template>
   <form @submit.prevent="karta">
        <button type="submit" class="btn btn-dark btn-lg btn-block">Panel użytkowników</button>
    </form>
    <br>
        <br>
            <br>
                <br>
   <!-- <form @submit.prevent="rejestr">
        <button type="submit" class="btn btn-dark btn-lg btn-block">Rejestr</button>
    </form> -->

</template>

<script>
// eslint-disable-next-line
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
   methods: {

    async karta(){
    this.$router.push('/card-employee-view')
    },
    async rejestr(){
    this.$router.push('/card-employee-view')
    },

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