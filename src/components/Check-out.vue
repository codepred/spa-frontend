<template>
  <div id="app">
    <div class="check-out-main"></div>
    <br><br>
    <div class="clear-cart" v-if="treatmentAdded.length !== 0" @click="clearCart()">Wyczyść koszyk</div>
    <div style="margin-top: 30px; width: 100%; text-align: center;"> <h2> Koszyk</h2> </div>
    <table class="table table=striped" id="scrollHere">
      <div v-if="!displayEmptyTreatmentsError" class="display-error"></div>
      <div v-if="displayEmptyTreatmentsError" class="display-error"> Lista zabiegów jest pusta </div>
      <div v-if="!displayWrongInputError" class="display-error-fake"> Niepoprawna data</div>
      <div v-if="displayWrongInputError" class="display-error"> Niepoprawna data </div>
      <tbody v-if="treatmentAdded.length !== 0">
        <tr v-for="treatment in treatmentAdded" v-bind:key="treatment.id">
          <td>{{ treatment.name }}</td>
          <td>
            <img class="number-add" @click="numberChange(treatment.id, 'minus')" src="../assets/img/minus-icon.svg"
              width="10" />
            {{ treatment.amount }} szt.
            <img class="number-add" @click="numberChange(treatment.id, 'plus')" src="../assets/img/plus-icon.svg"
              width="10" />
          </td>
          <td v-if="!treatment.isConfirmed">
            <input v-bind:class="{ 'wrong-input': displayWrongInputFirst[treatment.id] }" type="date"
              v-model="treatment.dateArrival" min="2024-01-17" max="2024-12-31" />
          </td>
          <td v-if="treatment.isConfirmed">
            {{ treatment.dateArrival }}
          </td>
          <td>
            <div v-if="!treatment.isConfirmed" class="accept-button"
              @click="confirmTreatment(treatment.id, treatment.dateArrival)"> Zatwierdź </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div @click="this.$router.push('/profile')" class="redirect-href">
      Nagraj wiadomość dla pracowników spa
    </div>
    <div v-if="treatmentAdded.length === 0">
      Koszyk jest pusty
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
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
    confirmTreatment(itemId, arrivalDate) {
      this.setDate(itemId, arrivalDate);

      const treatment = this.treatmentAdded[itemId];

      if (treatment && !treatment.isConfirmed) {
        treatment.isConfirmed = true;
        
        localStorage.setItem('listOfTreatments', JSON.stringify(this.treatmentAdded));
      }
    },
    numberChange(itemId, action) {
      // Find the treatment in the treatmentAdded array
      const treatment = this.treatmentAdded.find(item => item.id === itemId);

      if (treatment) {
        // Increment or decrement the amount based on the action
        if (action === 'plus') {
          treatment.amount++;
        } else if (action === 'minus' && treatment.amount > 0) {
          treatment.amount--;
        }
      }
      localStorage.setItem('listOfTreatments', JSON.stringify(this.treatmentAdded));
      const totalItems = this.treatmentAdded.reduce((total, item) => total + item.amount, 0);
      localStorage.setItem('checkoutItems', totalItems);

    },
    todaysDate() {
      const today = new Date()
      const year = today.getFullYear()
      const month = `${today.getMonth() + 1}`.padStart(2, "0")
      const day = `${today.getDate()}`.padStart(2, "0")
      const stringDate = [year, month, day].join("-")

      return stringDate
    },
    setDate(itemId, arrivalDate) {
      if (arrivalDate < this.todaysDate()) {
        this.displayWrongInputFirst[itemId] = true
        this.displayWrongInputError = true
        return
      }
      this.displayWrongInputError = false
      this.displayWrongInputFirst[itemId] = false
      this.displayWrongInputSecond[itemId] = false

      this.dataSubmitted[itemId] = true
      this.dateStored[itemId] = arrivalDate
    },
    clearCart() {
      this.treatmentAdded = []
      localStorage.removeItem('checkoutItems')
      localStorage.removeItem('listOfTreatments')
    }
  },
  mounted: function () {
    this.treatmentAdded = JSON.parse(localStorage.getItem('listOfTreatments')) || [];
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
  /* min-width: 670px; */
}

.wrong-input {
  box-shadow: 0 0 5px red;
}

.clear-cart {
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