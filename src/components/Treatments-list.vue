<template>
  <div id="treatment-container">
    <div class="treatment-page">
      <label class="title-text">Produkty</label>
      <ul class="listOfProducts">
        <li class="product">
          <img class="itemImage" src="../assets/img/treatments/dry_sauna.jpeg" alt="Sauna sucha Image" /> <br>
          <a>Sauna sucha</a>
          <div class="price">50 zł/h</div>
          <button class="btn btn-success" @click="addToCart('Sauna sucha')">Dodaj
            <img src="../assets/img/cart_icon.png" alt="Add to Cart Icon" />
          </button>
        </li>

        <li class="product">
          <img class="itemImage" src="../assets/img/treatments/wet_sauna.jpeg" alt="Sauna parowa Image" /> <br>
          <a>Sauna parowa</a>
          <div class="price">55 zł/h</div>
          <button class="btn btn-success" @click="addToCart('Sauna parowa')">Dodaj
            <img src="../assets/img/cart_icon.png" alt="Add to Cart Icon" />
          </button>
        </li>

        <li class="product">
          <img class="itemImage" src="../assets/img/treatments/panorama_sauna.jpeg" alt="Sauna panorama Image" /> <br>
          <a>Sauna panorama</a>
          <div class="price">60 zł/h</div>
          <button class="btn btn-success" @click="addToCart('Sauna panorama')">Dodaj
            <img src="../assets/img/cart_icon.png" alt="Add to Cart Icon" />
          </button>
        </li>

        <li class="product">
          <img class="itemImage" src="../assets/img/treatments/aroma_bath.jpeg" alt="Kapiel aromatyczna Image" /> <br>
          <a>Kapiel aromatyczna</a>
          <div class="price">45 zł/h</div>
          <button class="btn btn-success" @click="addToCart('Kapiel aromatyczna')">Dodaj
            <img src="../assets/img/cart_icon.png" alt="Add to Cart Icon" />
          </button>
        </li>

        <li class="product">
          <img class="itemImage" src="../assets/img/treatments/beer_bath.jpeg" alt="Kapiel w piwie Image" /> <br>
          <a>Kapiel w piwie</a>
          <div class="price">65 zł/h</div>
          <button class="btn btn-success" @click="addToCart('Kapiel w piwie')">Dodaj
            <img src="../assets/img/cart_icon.png" alt="Add to Cart Icon" />
          </button>
        </li>

        <li class="product">
          <img class="itemImage" src="../assets/img/treatments/thai_massage.jpeg" alt="Masaż tajski Image" /> <br>
          <a>Masaż tajski</a>
          <div class="price">70 zł/h</div>
          <button class="btn btn-success" @click="addToCart('Masaż tajski')">Dodaj
            <img src="../assets/img/cart_icon.png" alt="Add to Cart Icon" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

  
<script>
/* eslint-disable */

export default {
  data() {
    return {
      treatmentAdded: new Array(),
      nameSearch: "",
      productType: "",
      sortType: "",
      numberOfElementsAdded: 0,
      treatmentImages: [
        "../img/treatments/dry_sauna.jpeg",
        "../img/treatments/wet_sauna.jpeg",
        "../img/treatments/panorama_sauna.jpeg",
        "../img/treatments/aroma_bath.jpeg",
        "../img/treatments/beer_bath.jpeg",
        "../img/treatments/thai_massage.jpeg",
      ],
      treatmentNames: [
        "Sauna sucha",
        "Sauna parowa",
        "Sauna panorama",
        "Kapiel aromatyczna",
        "Kapiel w piwie",
        "Masaż tajski"
      ],
      treatments: [
        {
          id: 1,
          name: "Sauna sucha",
          price: 50,
          image: "../assets/img/treatments/dry_sauna.jpeg"
        },
        {
          id: 2,
          name: "Sauna parowa",
          price: 55,
          image: "../assets/img/treatments/wet_sauna.jpeg",
        },
        {
          id: 3,
          name: "Sauna panorama",
          price: 60,
          image: "../assets/img/treatments/panorama_sauna.jpeg",
        },
        {
          id: 4,
          name: "Kapiel aromatyczna",
          price: 45,
          image: "../assets/img/treatments/aroma_bath.jpeg",
        },
        {
          id: 5,
          name: "Kapiel w piwie",
          price: 65,
          image: "../assets/img/treatments/beer_bath.jpeg",
        },
        {
          id: 6,
          name: "Masaż tajski",
          price: 70,
          image: "../assets/img/treatments/thai_massage.jpeg",
        },
      ],
    }
  },
  methods: {
    addToCart(name) {

    },
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
  padding-top: 10%;
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
  font-size: 15px;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.listOfProducts {
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

.product {
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

.price-class {
  margin-left: 5px;
  margin-right: 5px;
  width: 5%;
}

.search-bar {
  margin-bottom: 1px;
}

.submit-div {
  margin-top: 6px;
  font-size: 18px;
}

.price-bar {
  margin-bottom: 1px;
}

.submit-div:hover {
  cursor: pointer;
  text-decoration: underline;
}

.type-choice {
  margin-top: 5px;
  margin-bottom: 5px;
}

.view-btn {
  text-align: center;
  width: 10%;
  height: 2%;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
  border: 1px solid transparent;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  margin-top: 1%;
  margin-bottom: 1%;
}

.view-btn:hover {
  background-color: #405468;
}
</style>