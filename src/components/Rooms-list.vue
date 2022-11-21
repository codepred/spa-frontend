<template>
    <div id="rooms-container">
        <div class="rooms-page">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <label class="title-text">
                Pokoje
            </label>
            <ul class="listOfProducts">
                <li class="product">
                    <img class="itemImage" src="../img/rooms/single_room.jpeg" /> <br>
                    <a> Pokój jednoosobowy</a>
                    <div class="price">119 zł/doba</div>
                    <button class="btn btn-success" @click="addToCart(0)">Dodaj
                        <img src="../img/cart_icon.png" />
                    </button>
                </li>
                <li class="product">
                    <img class="itemImage" src="../img/rooms/double_room.jpg" /> <br>
                    <a>Pokój dwuosobowy</a>
                    <div class="price">139 zł/doba</div>
                    <button class="btn btn-success" @click="addToCart(1)">Dodaj
                        <img src="../img/cart_icon.png" />
                    </button>
                </li>
                <li class="product">
                    <img class="itemImage" src="../img/rooms/view_room.jpeg" /> <br>
                    <a>Pokój z widokiem</a>
                    <div>159 zł/doba</div>
                    <button class="btn btn-success" @click="addToCart(2)">Dodaj
                        <img src="../img/cart_icon.png" />
                    </button>
                </li>
                <li class="product">
                    <img class="itemImage" src="../img/rooms/terrace_room.jpeg" /> <br>
                    <a>Pokój z tarasem</a>
                    <div>169 zł/doba</div>
                    <button class="btn btn-success" @click="addToCart(3)">Dodaj
                        <img src="../img/cart_icon.png" />
                    </button>
                </li>
                <li class="product">
                    <img class="itemImage" src="../img/rooms/balcony_room.jpg" /> <br>
                    <a>Pokój z balkonem</a>
                    <div>169 zł/doba</div>
                    <button class="btn btn-success" @click="addToCart(4)">Dodaj
                        <img src="../img/cart_icon.png" />
                    </button>
                </li>
                <li class="product">
                    <img class="itemImage" src="../img/rooms/premium_room.jpeg" /> <br>
                    <a>Pokój premium</a>
                    <div>299 zł/doba</div>
                    <button class="btn btn-success" @click="addToCart(5)">Dodaj
                        <img src="../img/cart_icon.png" />
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
  
  <script>


  export default {
    data () {
      return {
        addedItems: new Array(),
        numberOfElementsAdded: 0,
        roomNames: [
            "Pokój jednoosobowy",
            "Pokój dwuosobowy",
            "Pokój z widokiem",
            "Pokój z tarasem",
            "Pokój z balkonem",
            "Pokój premium"
        ],
        roomImages: [
            "src/img/rooms/single_room.jpeg",
            "src/img/rooms/double_room.jpg",
            "../img/rooms/view_room.jpeg",
            "../img/rooms/terrace_room.jpeg",
            "../img/rooms/balcony_room.jpeg",
            "../img/rooms/premium_room.jpeg" 
        ]
      }
    },
    mounted: function() {
      try {
        if (JSON.parse(localStorage.getItem('addedRoomsCart'))) {
            this.addedItems = JSON.parse(localStorage.getItem('addedRoomsCart'))
            console.log(this.addedItems)
        }
        if (parseInt(localStorage.getItem('numberOfRoomsAdded'), 10)) {
            this.numberOfElementsAdded = parseInt(localStorage.getItem('numberOfRoomsAdded'), 10)
        }
      }
      catch {
        // pass
      }
    },
    methods: {
        todaysDate(dayToAdd) {
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()+dayToAdd}`
        return date
      },
        addToCart(itemId) {
        if (localStorage.getItem('numberOfRoomsAdded')) {
            let duplicateDetected = false
            let numberOfElements = JSON.parse(localStorage.getItem('addedRoomsCart')).length
            this.addedItems =  JSON.parse(localStorage.getItem('addedRoomsCart'))

            for (let i=0; i< numberOfElements; i++) {
              if (this.addedItems[i].id === itemId) {
                this.addedItems[i].number += 1
                duplicateDetected = true
                this.numberOfElementsAdded += 1
                break
              }
            }
            if (duplicateDetected === false) {
              this.addedItems.push({"id": itemId, "number": 1, "image": this.roomImages[itemId], "name": this.roomNames[itemId], "dateArrival": this.todaysDate(0), "dateLeaving": this.todaysDate(1), "submitted": false})
              this.numberOfElementsAdded += 1
            }
        }
        else {
          this.addedItems.push({"id": itemId, "number": 1, "image": this.roomImages[itemId], "name": this.roomNames[itemId], "dateArrival": this.todaysDate(0), "dateLeaving": this.todaysDate(1), "submitted": false})
          this.numberOfElementsAdded += 1
        }

        console.log(this.addedItems)
        localStorage.setItem('numberOfRoomsAdded',this.numberOfElementsAdded)
        localStorage.setItem('addedRoomsCart',JSON.stringify(this.addedItems))
        }
    }
  }
    
  
  </script>
  
  <style>
  img {
    border-radius: 0.25rem;
  }
  .rooms-page {
    padding-top: 25%;
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