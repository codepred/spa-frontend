<template>
  <div id="app">
    <div class="main-page"></div>
    <button type="submit" v-if="!addingStatus" class="clear-cart-btn float-right" @click="clearCart()">Wyczyść koszyk</button> <br> <br>
    <label class="title-text">
      Zamōwione produkty:
    </label>
    <table class="table table=striped" id="scrollHere"> 
      <h2> Zabiegi: </h2>
      <div v-if="!displayEmptyTreatmentsError" class="display-error"></div>
      <div v-if="displayEmptyTreatmentsError" class="display-error"> Lista zabiegów jest pusta </div>
      <tbody >
        <tr v-for="treatment in treatmentsAdded" v-bind:key="treatment.id">
          <td>{{treatment.name}}</td>
          <td>{{treatment.number}} szt.</td>
          <td>
            <img class="logoImg" v-bind:src=treatment.image />
          </td>
          </tr>
      </tbody>
    </table>
    <table class="table table=striped" id="scrollHere"> 
      <h2> Pokoje: </h2>
      <tbody >
        <div v-if="!displayEmptyRoomsError" class="display-error"></div>
        <div v-if="displayEmptyRoomsError" class="display-error"> Lista pokoi jest pusta </div>
        <tr v-for="room in roomsAdded" v-bind:key="room.id">
          <td>{{room.name}}</td>
          <td>{{room.number}} szt.</td>
          <td>
            <img class="logoImg" v-bind:src=room.image />
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
      displayEmptyRoomsError: false
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
    clearCart() {
      localStorage.removeItem('numberOfTreatmentsAdded')
      localStorage.removeItem('addedTreatmentsCart')
      localStorage.removeItem('numberOfRoomsAdded')
      localStorage.removeItem('addedRoomsCart')
    }
  }
}
  

</script>

<style>

  .clear-cart-btn{
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
    border: 1px solid transparent;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    width: 20%;
    height: 10%;
    font-size: 15px
  }
  .display-error {
        color: #ff0000;
        margin: auto;
        border-radius: 2%;
        display: inline-block;
        text-align: center;
        padding-bottom: 2%;
        list-style-type: none;
        background-color: white !imporant;
    }

</style>