<template>
  <div class="containerDisplay">
     <form @submit.prevent="login">
       <router-link to="/card-employee-view">
      <button id=exportToPDF class="btn btn-primary float-right">Cofnij</button>
      </router-link>
        <h3>Add new user</h3>
        <div class="display-error" v-if="displayServerError"> Wystąpił problem z serwerem</div>
        <div class="form-group">
            <label>First name </label>
            <input type="text" class="form-control form-control-lg" v-model="firstName" required />   
        </div> 
         <div class="form-group">
            <label>Last name </label>
            <input type="text" class="form-control form-control-lg" v-model="lastName" required />   
        </div> 
         <div class="form-group">
            <label>Phone numer</label>
            <input type="text" class="form-control form-control-lg" v-model="email" required />   
        </div> 
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control form-control-lg" v-model="phoneNumber" required />   
        </div> 

        <button type="submit" v-if="!addingStatus" class="btn btn-dark btn-lg btn-block">Dodaj</button>
        <button type="submit" v-if="addingStatus" class="btn btn-dark btn-lg btn-block">Dodawanie...</button>
    </form>
  </div>

  </template>


  <script>

  
  export default {
  data () {
    return {
    setDate: false,
    cardDate: "",
    cardName: "",
    cardTRP: "",
    cardWS: "",
    cardSerial: "",
    cardDiameter: "",
    cardLastname: "",
    addingStatus: false,
    displayServerError: false
    }
  },
  methods: {

    blockWritting(e) {
      e.preventDefault()
    },

    setTodaysDate () {
          
      if (this.setDate == false) {
        const current = new Date();
        this.cardDate = `${current.getFullYear()}-${(current.getMonth() < 10? '0' : '') + current.getMonth()}-${(current.getMonth() < 10? '0' : '') + current.getMonth()}T${(current.getHours() < 10? '0' : '') + current.getHours()}:${(current.getMinutes() < 10? '0' : '') + current.getMinutes()}`;

        this.setDate = true; 
        document.getElementById('todaysDate').value = this.cardDate;
     }
  },
      async login(e) {

      this.addingStatus = true
      e.preventDefault();

      try {
      var response = await fetch("http://145.239.80.63:8080/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber
          }),
     }).then(response => response.json())
      }
      catch (error) {
      this.errorMessage = error;
      console.error('There was an error!', error)
      const stringError = String(error)
      this.addingStatus = false
      if (stringError.includes("Failed to fetch")) {
        this.displayServerError = true

        }
      }
      {
      if(response){
        console.log('OK')
        this.$router.push('/card-employee-view')
      }
    }
      }
  }
}
  
  
  </script>

  <style>
  
  .display-error {
  background-color: #ff0000!important;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  color: black;
  text-align: center;
}
  
  </style>