<template>
  <div id="app">
    <div class="check-out-main"></div>
    <br><br>
    <div class="clear-cart" @click="clearCart()">Wyczyść koszyk</div> 
    <table class="table table=striped" id="scrollHere"> 
      <h2> Koszyk </h2>
      <div v-if="!displayEmptyTreatmentsError" class="display-error"></div>
      <div v-if="displayEmptyTreatmentsError" class="display-error"> Lista zabiegów jest pusta </div>
      <div v-if="!displayWrongInputError" class="display-error-fake"> Niepoprawna data</div>
      <div v-if="displayWrongInputError" class="display-error"> Niepoprawna data </div>
      <tbody v-if="treatmentAdded.length !== 0">
        <tr v-for="treatment in treatmentAdded" v-bind:key="treatment.id" >
          <td>{{treatment.name}}</td>
          <td>
            <img class="number-add" @click="numberChange(treatment.id, 'minus')" src="../assets/img/minus-icon.svg" width="10" />
            {{treatment.amount}} szt.
            <img  class="number-add" @click="numberChange(treatment.id, 'plus')" src="../assets/img/plus-icon.svg" width="10" />
          </td>
          <td v-if="!dataSubmitted[treatment.id]">
            <input 
              v-if="!displayWrongInputFirst[treatment.id]"
              type="date"
              v-model="treatment.dateArrival"
              max="2023-12-31"
            />
            <input 
              v-if="displayWrongInputFirst[treatment.id]"
              class="wrong-input"
              type="date"
              v-model="treatment.dateArrival"
              max="2023-12-31"
            />
           </td> 
            <td v-if="dataSubmitted[treatment.id]">
              {{this.dateStored[treatment.id]}}
            </td>
          <td>
            <div v-if="!dataSubmitted[treatment.id]" class="accept-button" @click="setDate(treatment.id, treatment.dateArrival)"> Zatwierdź </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="treatmentAdded.length === 0">
      Koszyk jest pusty
    </div>
  </div>

</template>

<script>
/* eslint-disable */

import ClientService from '../services/ClientService.js'

export default {
  data () {
    return {
      treatmentAdded: new Array(),
      displayWrongInputError: false,
      displayEmptyTreatmentsError: false,
      todayVariable: 0,
      displayWrongInput: new Array(8).fill(false),
      displayWrongInputFirst: new Array(8).fill(false),
      displayWrongInputSecond: new Array(8).fill(false),
      dataSubmitted: new Array(8).fill(false),
      displayWrongInputErrorRoom: false,
      numberOfRooms: 0,
      numberOfTreatments: 0,
      dateStored: new Array(6)
    }
  },
  methods: {
    async receiveData() {

      try {
        var response = await fetch("http://54.37.138.92:8082/basket/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        }).then(response => response.json())
        this.treatmentAdded = response[0].productEntityList
      }
      catch (error) {
        this.errorMessage = error;
        console.error('There was an error!', error)
        const stringError = String(error)
      }
    },
    async updateAmount(itemId, action) {

      try {
        var response = await fetch("http://54.37.138.92:8082/basket/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
          token: localStorage.getItem('token', this.token),
          id: itemId,
          action: action
        }),
        }).then(response => response.json())
      }
      catch (error) {
        this.errorMessage = error;
        console.error('There was an error!', error)
        const stringError = String(error)
      }
    },
    numberChange(itemId, action) {

          if (action === 'plus') {
            this.updateAmount(itemId, 'plus')
          }
          else if (action === 'minus' && (this.treatmentAdded[itemId].amount-1) >= 0) {
            this.updateAmount(itemId, 'minus')
          }
    },
    todaysDate() {
      const today = new Date()

      const year = today.getFullYear()

      const month = `${today.getMonth() + 1}`.padStart(2, "0")

      const day = `${today.getDate()}`.padStart(2, "0")

      const stringDate = [year, month, day].join("-") 

      return stringDate
    },
    setDate(itemId, arrivalDate ) {

      console.log(arrivalDate)
      console.log(this.todaysDate())
        if (arrivalDate < this.todaysDate()) {
          this.displayWrongInputFirst[itemId] = true
          this.displayWrongInputError = true
          return
        }
        //console.log("rosik")
        this.displayWrongInputError = false
        this.displayWrongInputFirst[itemId] = false
        this.displayWrongInputSecond[itemId] = false

        this.dataSubmitted[itemId] = true
        this.dateStored[itemId] = arrivalDate



    },
    async clearCart() {
      try {
      var response = await fetch("http://54.37.138.92:8082/basket/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },})
      }
      catch (error) {
        console.error('There was an error!', error)
        const stringError = String(error)
        this.displayServerError = true
      }

      this.receiveData()
    },
    created: {
      getNow () {
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
        this.todayVariable = date;
      }
    }
  },
  mounted:function() { 
    //this.treatmentAdded = [{"id": 1, "name": "Sauna", "price": "39", "amount": 1 }]
    //this.treatmentAdded = ClientService.getClients()
    //this.receiveData()
    //console.log(this.treatmentAdded.data)

    if (!this.treatmentAdded) {
      this.displayEmptyTreatmentsError = true
    }
  }
}
  

</script>

<style>
.second-date-class {
  margin-left: 1%;
}
.number-add:hover {
  cursor: pointer;

}
.accept-button {
  font-size: 15px;
}
.accept-button:hover {
  cursor: pointer;
  text-decoration: underline;
}
.check-out-main {
  min-width: 300px;
}
div#app {
  min-width: 670px;
}
.wrong-input {
  box-shadow: 0 0 5px red;
}
  .clear-cart{
    font-size: 15px;
    float: right;
    color: black;
  }
  .clear-cart:hover {
    text-decoration: underline;
    cursor: pointer;

  }
  .display-error {
        color: #ff0000;
        margin: auto;
        border-radius: 2%;
        display: inline-block;
        text-align: center;
        padding-bottom: 2%;
        list-style-type: none;
        background-color: white;
    }
    .display-error-fake {
      color: white;
    }
  .choose-date {
    padding-right: 1%;
    padding-top: 1%;
  }
  .wrong-input {
  box-shadow: 0 0 5px red;
}
.display-error {
        color: #ff0000;
        margin: auto;
        border-radius: 2%;
        display: inline-block;
        text-align: center;
        padding-bottom: 2%;
        list-style-type: none;
        background-color: white;
    }
</style>