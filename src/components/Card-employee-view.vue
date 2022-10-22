<template>
    <div class = "containerDisplay">
      <router-link to="/card-add">
      <button id=exportToPDF class="btn btn-primary float-right">Dodaj nowy</button>
      </router-link>

        <h1 class = "text-center">List uzytkowników</h1>
        <br>
        <br>
        <table class="table">
            <thead>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone number</th>
            </thead>
            <tbody>
                <tr v-for="client in data" v-bind:key="client.id">
                    <td style="text-align: center;">{{client.id}}</td>
                    <td style="text-align: center;">{{client.firstName}}</td>
                    <td style="text-align: center;">{{client.lastName}}</td>
                    <td style="text-align: center;">{{client.email}}</td>
                    <td style="text-align: center;">{{client.phoneNumber}}</td>
                </tr>
            </tbody>
        </table>
        </div>

  </template>

  <script>
  
  import ClientService from '../services/ClientService'
  
   export default {
        /* eslint-disable */
        name: 'data',
        data(){
            return{
                 data : []
            }
        },
        methods: {
            getClients(){
                ClientService.getClients().then((response) =>{
                    this.data = response.data.data;
                    console.log(response.data)
                })
            }
        },
        created(){
            this.getClients()
        }
    }
  
  
  </script>

  <style>
  
  .divContainer {
    text-align: center;
  }
  h1 {
    text-align: center;
    margin-left: +70px;
  }

  td.td-style{
       text-align: center;
  }
  </style> 