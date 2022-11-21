<template>
    <div id="treatment-container">
      <div class="treatment-page">
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <label class="title-text">
        Zabiegi
      </label>
      <ul class="listOfProducts">
        <li class="product">
            <img class="itemImage" src="../img/treatments/dry_sauna.jpeg" /> <br>
            <a> Sauna sucha</a>
            <div class="price">39 zł/h</div>
            <button class="btn btn-success" @click="addToCart(0)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage" src="../img/treatments/wet_sauna.jpeg" /> <br>
            <a>Sauna parowa</a>
            <div class="price">49 zł/h</div>
            <button class="btn btn-success" @click="addToCart(1)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage" src="../img/treatments/panorama_sauna.jpeg" /> <br>
            <a>Sauna panorama</a>
            <div>55 zł/h</div>
            <button class="btn btn-success" @click="addToCart(2)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage"  src="../img/treatments/aroma_bath.jpeg" /> <br>
            <a>Kąpiel aromatyczna</a>
            <div>59 zł/h</div>
            <button class="btn btn-success" @click="addToCart(3)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage" src="../img/treatments/beer_bath.jpeg" /> <br>
            <a>Kąpiel w piwie</a>
            <div>79 zł/h</div>
            <button class="btn btn-success" @click="addToCart(4)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage" src="../img/treatments/thai_massage.jpeg" /> <br>
            <a>Masaż tajski</a>
            <div>85 zł/h</div>
            <button class="btn btn-success" @click="addToCart(5)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage" src="../img/treatments/relax-massage.jpeg" /> <br>
            <a>Masaż relaksacyjny</a>
            <div>89 zł/h</div>
            <button class="btn btn-success" @click="addToCart(6)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>
        <li class="product">
            <img class="itemImage" src="../img/treatments/jacuzzi.jpeg" /> <br>
            <a>Jacuzzi</a>
            <div>29 zł/h</div>
            <button class="btn btn-success" @click="addToCart(7)">Dodaj
                <img src="../img/cart_icon.png" />
            </button>
        </li>


      </ul>
      <br>
  
  
    </div>
    </div>
  
  </template>
  
  <script>
  


  
  export default {
    data () {
      return {
        addedItems: new Array(),
        numberOfElementsAdded: 0,
        treatmentImages: [
          "../img/treatments/dry_sauna.jpeg",
          "../img/treatments/wet_sauna.jpeg",
          "../img/treatments/panorama_sauna.jpeg",
          "../img/treatments/aroma_bath.jpeg",
          "../img/treatments/beer_bath.jpeg",
          "../img/treatments/thai_massage.jpeg",
          "../img/treatments/relax-massage.jpeg",
          "../img/treatments/jacuzzi.jpeg"
        ],
        treatmentNames: [
          "Sauna sucha",
          "Sauna parowa",
          "Sauna panorama",
          "Kapiel aromatyczna",
          "Kapiel w piwie",
          "Masaż tajski",
          "Masaż relaksacyjny",
          "Jacuzzi"
        ]
      }
    },
    mounted: function() {
      try {
        if (JSON.parse(localStorage.getItem('addedTreatmentsCart'))) {
            this.addedItems = JSON.parse(localStorage.getItem('addedTreatmentsCart'))
            console.log(this.addedItems)
        }
        if (parseInt(localStorage.getItem('numberOfTreatmentsAdded'), 10)) {
            this.numberOfElementsAdded = parseInt(localStorage.getItem('numberOfTreatmentsAdded'), 10)
        }
      }
      catch {
        // pass
      }
    },
    methods: {
      todaysDate() {
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`
        return date
      },
      addToCart(itemId) {
        if (localStorage.getItem('numberOfTreatmentsAdded')) {
          let duplicateDetected = false
          let numberOfElements = JSON.parse(localStorage.getItem('addedTreatmentsCart')).length
            this.addedItems =  JSON.parse(localStorage.getItem('addedTreatmentsCart'))
            
            for (let i=0; i< numberOfElements; i++) {
              if (this.addedItems[i].id === itemId) {
                this.addedItems[i].number += 1
                duplicateDetected = true
                this.numberOfElementsAdded += 1
                break
              }
            }
            if (duplicateDetected === false) {
              this.addedItems.push({"id": itemId, "number": 1, "image": this.treatmentImages[itemId], "name": this.treatmentNames[itemId], "date": this.todaysDate(), "submitted": false})
              this.numberOfElementsAdded += 1
            }
        }
        else {
          this.addedItems.push({"id": itemId, "number": 1, "image": this.treatmentImages[itemId], "name": this.treatmentNames[itemId],"date": this.todaysDate(), "submitted": false})
          this.numberOfElementsAdded += 1
        }
        console.log(this.addedItems)
        localStorage.setItem('numberOfTreatmentsAdded',this.numberOfElementsAdded)
        localStorage.setItem('addedTreatmentsCart',JSON.stringify(this.addedItems))
        }
    }
  }
    
  
  </script>
  
  <style>
  .itemImage {
    width: 170px;
    height: 140px;
  }
  img {
    border-radius: 0.25rem;
  }
  .treatment-page {
    padding-top: 78%;
  }
  .btn {
    width: 50%;
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
  .price {
    width: 100%;
    -ms-flex-item-align: start;
    align-self: flex-start;

    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 0.5em;
}
  .listOfProducts{
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 0;
}
    .product{
    width: 300px;
    background-color: #fff;
    list-style: none;
    box-sizing: border-box;
    padding: 1em;
    margin: 1em 0;
    display: -ms-flexbox;
    display: flex;
    display: inline-block;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 7px;
}


  .title-text {
    font-size: 25px;
    padding-bottom: 3%;
  }
  h1 {
    font-size: 15px;
  }
  
  ul {  
  list-style-type: none;  
  font-weight: bold;  
  font-size: 20px;  
  }  
  
  label {
      margin-left: +10px;
  }
  
  
  </style>