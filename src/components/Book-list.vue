<template>
  <div style="margin-top: g">
    <label class="title-text">
      Lista książek
  </label>
      <table class="table table-image">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">title</th>
            <th scope="col">author</th>
            <th scope="col">image</th>
            <th scope="col">add to basket</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in bookList" v-bind:key="book.id">
            <td>{{book.id}}</td>
             <td>{{book.title}}</td>
             <td>{{book.author}}</td>
             <td class="w-25">
              <img src="https://ale.pl/blog/wp-content/uploads/2018/09/Ebook1.blog_.png" class="img-fluid img-thumbnail" alt="Sheep">
            </td>
            <td v-if="!book.wasRented">
              <button  id="rentBook" type="button" class="btn btn-warning" @click="rentBook(book.id)">Rent</button>
            </td>
            <td v-if="book.wasRented">
              <button  id="rentBook" type="button" class="btn btn-danger" @click="returnBook(book.id)">Return book</button>
            </td>
          </tr>
        </tbody>
      </table>   
  </div>
</template>

<script>
import BookService from '../services/BookService'


export default{
data () {
return {
bookList: []
}
},
methods: {
getBookList() {
console.log('TESTTT2222')
BookService.getList().then((response) =>{
console.log('TESTTT3333')
console.log(response)
this.bookList = response.data;
})
},
async rentBook (id) {
var sessionId = localStorage.getItem('token')
      console.log('data to rent book')
      console.log(id)
      console.log(sessionId)
 

      try {
      var response = await fetch(`http://localhost:8081/users/${sessionId}/books/${id}/rent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Access-Control-Allow-Headers": "*"
          }
      }).then(response => response.json())
      }
      catch (error){
          console.log(error)
      }
      console.log(response)
      location.reload();
  },
  
  async returnBook (id) {
var sessionId = localStorage.getItem('token')
      console.log('data to rent book')
      console.log(id)
      console.log(sessionId)
 

      try {
      var response = await fetch(`http://localhost:8081/users/${sessionId}/books/${id}/return`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Access-Control-Allow-Headers": "*"
          }
      }).then(response => response.json())
      }
      catch (error){
          console.log(error)
      }
      console.log(response)
      location.reload();
  },

},
created: function () {
console.log('TESTTT')
this.getBookList()
console.log('TESTTT111')
},
}

</script>

<style>
img {
border-radius: 0.25rem;
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

.container {
padding: 2rem 0rem;
}

h4 {
margin: 2rem 0rem 1rem;
}

.table-image {
td,th {
vertical-align: middle;
}
}


</style>