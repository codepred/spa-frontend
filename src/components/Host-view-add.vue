<template>
  <div class="vue-template">
    <form>
        <h3>Dodaj nowy rekord</h3>
        <div class="form-group" @click="setTodaysDate">
            <label>Data</label>
            <input id="todaysDate" type="datetime-local" class="form-control form-control-lg" v-model="productDate" required />        
        </div>
        <br>
        <div class="form-group">
            <label> Nazwa </label>
            <input type="text" class="form-control form-control-lg" v-model="productName" required />   
        </div> 
        <div class="form-group">
            <label> Opis niezgodności </label>
            <input type="text" class="form-control form-control-lg" v-model="productDescription" required />   
        </div> 
        <div class="form-group">
            <label> Ilość </label>
            <input type="text" class="form-control form-control-lg" v-model="productNumber" required />   
        </div> 
        <div class="form-group">
            <label> Przyczyna niezgodności</label>
            <input type="text" class="form-control form-control-lg" v-model="productCause" required />   
        </div> 
        <div class="form-group">
            <label> Działania korygujące</label>
            <input type="text" class="form-control form-control-lg" v-model="productAction" required />   
        </div> 
        <div class="form-group">
            <label> Ocena dzialania</label>
            <input type="text" class="form-control form-control-lg" v-model="productGrade" required />   
        </div> 
        <button type="submit" class="btn btn-dark btn-lg btn-block">Dodaj</button>
    </form>
  </div>

  </template>

  <script>
  
  export default {
  data () {
    return {
    productDate: "",
    productName: "",
    productDescription: "",
    productNumber: "",
    productCause: "",
    productAction: "",
    productGrade: "",
    setDate: false
    }
  },
  methods: {
    setTodaysDate () {
          
      if (this.setDate == false) {
        const current = new Date();
        this.productDate = `${current.getFullYear()}-${(current.getMonth() < 10? '0' : '') + current.getMonth()}-${(current.getMonth() < 10? '0' : '') + current.getMonth()}T${(current.getHours() < 10? '0' : '') + current.getHours()}:${(current.getMinutes() < 10? '0' : '') + current.getMinutes()}`;
        this.setDate = true; 
        document.getElementById('todaysDate').value = this.productDate;
        console.log(document.getElementById('todaysDate').value)
     }
    }
  }
}
  
  
  </script>