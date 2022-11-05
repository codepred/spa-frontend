<template>
  <div class="containerDisplay">
    <div class="infoTab">
      <div v-if=displayInfoTab class="displayInfo">
        <label>
          <pre>
            Podany URL musi zawierać:
          </pre>
          <pre>
            - http/https
          </pre>
          <pre>
            - www 
          </pre>
          <pre>
            - domena (.pl/.com/itp.)
          </pre>
            Przykład:
            https://infinite-tech.pl/
        </label>
      </div>
    </div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Dodaj link do strony</label>
        <input type="text" class="form-control form-control-lg" v-model="urlAdress" required />   
      </div> 
      <div class="button-panel">
        <button type="submit" v-if="!addingStatus" class="btn btn-dark btn-lg btn-block">Dodaj</button>
        <button type="submit" v-if="addingStatus" class="btn btn-dark btn-lg btn-block">Dodawanie...</button>
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
      urlAddress: "",
    }
  },
  methods: {
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
              urlAddress: this.urlAddress,
            }),
          }).then(response => response.json())
        }
        catch (error) {
          this.errorMessage = error;
          console.error('There was an error!', error)
          const stringError = String(error)
          //this.addingStatus = false

          if (stringError.includes("Failed to fetch")) {
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

  #input { 
    width: 50% !important;
    text-align: center;
    align-items: center;
    justify-content: center;

    display: inline-block;

  }
  #button {
    width: 50% !important;
    justify-content: center;
  }

  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #62478a;
}
  
</style>