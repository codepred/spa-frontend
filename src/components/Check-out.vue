<template>
  <div style="margin-top: g">
    <label class="title-text">
      Historia wypożyczeń
  </label>
      <table class="table table-image">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">title</th>
            <th scope="col">author</th>
            <th scope="col">rentalDate</th>
            <th scope="col">returnDate</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in bookList" v-bind:key="book.id">
            <td>{{book.id}}</td>
             <td>{{book.book.title}}</td>
             <td>{{book.book.author}}</td>
             <td>{{book.rentalDate}}</td>
             <td>{{book.returnDate}}</td>
             <td class="w-25">
              <img src="https://ale.pl/blog/wp-content/uploads/2018/09/Ebook1.blog_.png" class="img-fluid img-thumbnail" alt="Sheep">
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
getHistoryList() {
console.log('TESTTT2222')
BookService.getHistoryList().then((response) =>{
console.log('TESTTT3333')
console.log(response)
this.bookList = response.data;
})
}
},
created: function () {
console.log('TESTTT')
this.getHistoryList()
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