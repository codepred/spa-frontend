<template>
  <div class="containerDisplay">
    <h3> Dodaj link do strony </h3>
    <div class="infoTab">
      <div v-if=displayInfoTab class="displayInfo">
        <label>
            Podany URL musi zawierać: <br>
            - http lub https <br>
            - domena (.pl lub .com, itp.) <br>
            <br>
            Przykład: <br>
            https://pravna.pl/ <br>
        </label>
      </div>
      <div v-if=improperUrl class="display-error">
        <label>
          Strona nieprawidłowa
        </label>
      </div>
      <div v-if=duplicatePage class="display-error">
        <label>
          Strona jest już dodana
        </label>
      </div>
      <div v-if=displayServerError class="display-error">
        <label>
          Problem z sewerem
        </label>
      </div>
    </div>
    <form @submit.prevent="login">
      <div class="form-group">
        <input type="text" class="form-control-lg" v-model="urlAddress" placeholder="URL" required />   
      </div> 
      <div class="button-panel">
        <button type="submit" v-if="!addingStatus" class="btn btn-dark btn-lg">Dodaj</button>
        <button type="submit" v-if="addingStatus" class="btn btn-dark btn-lg">Dodawanie...</button>
      </div>
    </form>
  </div>

  </template>


  <script>

  
  export default {
  data () {
    return {
      addingStatus: false,
      displayInfoTab: true,
      improperUrl: false,
      duplicatePage: false,
      displayServerError: false
    }
  },
  methods: {

      async login(e) {
        
        this.addingStatus = true
        e.preventDefault();

        try {
          var response = await fetch("http://54.37.234.76:8081/company/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          },
          body: JSON.stringify({
            url: this.urlAddress,
          }),
          }).then(response => response.json())
        }
        catch (error) {
          this.errorMessage = error;
          console.error('There was an error!', error)
          const stringError = String(error)
          this.addingStatus = false

          if (stringError.includes("COMPANY NOT FOUND")) {
            this.improperUrl = true
            this.displayInfoTab = false
            this.duplicatePage = false
            this.displayServerError = false
          }
          if (stringError.includes("COMPANY EXISTS")) {
            this.duplicatePage = true
            this.displayInfoTab = false
            this.improperUrl = false
            this.displayServerError = false
          }
          if (stringError.includes("Failed to fetch")) {
            console.log("x")
            this.displayServerError = true
            this.displayInfoTab = false
            this.imprtoperUrl = false
            this.displayServerError = true
          }
        }
        {
        if (response) {
          console.log('OK')
          this.$router.push('/View-list')
          }
        }
      }

      }
}

  
  
</script>

<style>

#pre {
  padding-top: 0%;
  padding-bottom: 0%;
}

.infoTab {
  padding-bottom: 5%;
}

.containerDisplay {
    text-align: center;
    align-items: center;
    justify-content: center;
    display: inline-block;
    float: none;
  }
  .infoTab {
    text-align: center;
  }

input {
    display: block;
    width: 50%;
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
  button {
    width: 50%;
    justify-content: center;
  }

  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #62478a;
}

.display-error {
  color: #ff0000!important;
  margin: auto;
  border-radius: 5%;
  color: black;
  display: inline-block;
  text-align: center;
}
  
</style>




