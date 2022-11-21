<template>
  <div id="app">
    <div class="check-out-main"></div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <div v-if="!addingStatus" class="clear-cart" @click="clearCart()">Wyczyść koszyk</div> <br> <br> <br>
    <table class="table table=striped" id="scrollHere"> 
      <h2> Zabiegi </h2>
      <div v-if="!displayEmptyTreatmentsError" class="display-error"></div>
      <div v-if="displayEmptyTreatmentsError" class="display-error"> Lista zabiegów jest pusta </div>
      <div v-if="!displayWrongInputError" class="display-error-fake"> Niepoprawna data</div>
      <div v-if="displayWrongInputError" class="display-error"> Niepoprawna data </div>
      <tbody >
        <tr v-for="treatment in treatmentsAdded" v-bind:key="treatment.id">
          <td>{{treatment.name}}</td>
          <td>
            <img v-if="!treatment.submitted" class="number-add" @click="numberChange('treatment','minus', treatment.id)" src="../img/minus-icon.svg" width="10" />
            {{treatment.number}} szt.
            <img  v-if="!treatment.submitted" class="number-add" @click="numberChange('treatment','plus', treatment.id)" src="../img/plus-icon.svg" width="10" />
          </td>
          <td v-if="!treatment.submitted">
            <input 
              v-if="!displayWrongInput[treatment.id]"
              type="date"
              v-model="treatment.date"
              max="2023-12-31"
            />
            <input 
              v-if="displayWrongInput[treatment.id]"
              class="wrong-input"
              type="date"
              v-model="treatment.date"
              max="2023-12-31"
            />
           </td> 
            <td v-if="treatment.submitted">
              {{treatment.date}}
            </td>
          <td v-if="treatment.number!==0">
            <div v-if="!treatment.submitted" class="accept-button" @click="setDate('treatment', treatment.id)"> Zatwierdź </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table=striped" id="scrollHere"> 
      <h2> Pokoje </h2>
      <tbody >
        <div v-if="!displayEmptyRoomsError" class="display-error"></div>
        <div v-if="displayEmptyRoomsError" class="display-error"> Lista pokoi jest pusta </div>
        <div v-if="!displayWrongInputErrorRoom" class="display-error-fake"> Niepoprawna data</div>
        <div v-if="displayWrongInputErrorRoom" class="display-error"> Niepoprawna data </div>
        <tr v-for="room in roomsAdded" v-bind:key="room.id">
          <td>{{room.name}}</td>
          <td>
            <img v-if="!room.submitted" class="number-add" @click="numberChange('room','minus', room.id)" src="../img/minus-icon.svg" width="10" />
            {{room.number}} szt.
            <img  v-if="!room.submitted" class="number-add" @click="numberChange('room','plus', room.id)" src="../img/plus-icon.svg" width="10" />
          </td>
          <td v-if="!room.submitted">
            <input 
              v-if="!displayWrongInputFirst[room.id]"
              type="date"
              v-model="room.dateArrival"
              max="2023-12-31"
            />
            <input 
              v-if="displayWrongInputFirst[room.id]"
              class="wrong-input"
              type="date"
              v-model="room.dateArrival"
              max="2023-12-31"
            />
            <input 
              v-if="!displayWrongInputSecond[room.id]"
              type="date"
              v-model="room.dateLeaving"
              max="2023-12-31"
            />
            <input 
              v-if="displayWrongInputSecond[room.id]"
              class="wrong-input"
              type="date"
              v-model="room.dateLeaving"
              max="2023-12-31"
            />
           </td> 
            <td v-if="room.submitted">
              {{room.dateArrival}}
            </td>
            <td v-if="room.submitted">
              {{room.dateLeaving}}
            </td>
          <td v-if="room.number!==0">
            <div v-if="!room.submitted" class="accept-button" @click="setDate('room', room.id)"> Zatwierdź </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
/* eslint-disable */

export default {
  data () {
    return {
      treatmentsAdded: new Array(),
      roomsAdded: new Array(),
      displayEmptyTreatmentsError: false,
      displayEmptyRoomsError: false,
      todayVariable: 0,
      displayWrongInput: new Array(8).fill(false),
      displayWrongInputFirst: new Array(8).fill(false),
      displayWrongInputSecond: new Array(8).fill(false),
      displayWrongInputErrorRoom: false 
    }
  },
  mounted:function() { 
      try {
        this.treatmentsAdded = JSON.parse(localStorage.getItem('addedTreatmentsCart'))
        this.roomsAdded = JSON.parse(localStorage.getItem('addedRoomsCart'))
      }
      catch {
        // pass
      }
      if (!this.treatmentsAdded) {
        this.displayEmptyTreatmentsError = true
      }
      if (!this.roomsAdded) {
        this.displayEmptyRoomsError = true
      }
  },
  methods: {
    numberChange(itemType, change, id) {
      if (itemType === 'room') {
        if (change === 'plus') {
          this.roomsAdded[id].number += 1
        }
        else if (change === 'minus' && (this.roomsAdded[id].number-1) >= 0) {
          this.roomsAdded[id].number -= 1
        }
      }
      else if (itemType === 'treatment') {
        if (change === 'plus') {
          this.treatmentsAdded[id].number += 1
          return
        }
        else if (change === 'minus' && (this.treatmentsAdded[id].number-1) >=0) {
          this.treatmentsAdded[id].number -= 1
        }
      }
    },
    todaysDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`
      return date
    },
    setDate(type, id) {
      if (type === "treatment") {
        if (this.treatmentsAdded[id].date < this.todaysDate()) {
          this.displayWrongInput[id] = true
          this.displayWrongInputError = true
          return
        }
        this.treatmentsAdded[id].submitted = true
        this.displayWrongInputError = false
      }
      else if (type === "room") {
        if (this.roomsAdded[id].dateArrival < this.todaysDate() || this.roomsAdded[id].dateLeaving < this.todaysDate()) {
          this.displayWrongInputFirst[id] = true
          this.displayWrongInputSecond[id] = true
          this.displayWrongInputErrorRoom = true
          return
        }
        if (this.roomsAdded[id].dateArrival > this.roomsAdded[id].dateLeaving) {
          this.displayWrongInputFirst[id] = true
          this.displayWrongInputSecond[id] = true
          this.displayWrongInputErrorRoom = true
          return
        }
        this.roomsAdded[id].submitted = true
        this.displayWrongInputErrorRoom = false
      }


    },
    clearCart() {
      localStorage.removeItem('numberOfTreatmentsAdded')
      localStorage.removeItem('addedTreatmentsCart')
      localStorage.removeItem('numberOfRoomsAdded')
      localStorage.removeItem('addedRoomsCart')
      location.reload()
    },
    created: {
      getNow () {
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
        this.todayVariable = date;
        console.log(this.todayVariable)
      }
    }
  }
}
  

</script>

<style>
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

</style>