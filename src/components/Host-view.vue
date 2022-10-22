<template>
    <div class = "containerDisplay">
      <router-link to="/employee-view-add">
      <button id=addRecord class="btn btn-primary float-right">Dodaj nowy</button>
      <button id=editRecord class="btn btn-primary float-right">Edytuj</button>
      <button id=removeRecord class="btn btn-primary float-right">Usuń</button>
      <button id=exportToPDF class="btn btn-primary float-left">Eksportuj do PDF</button>
      <button id=exportToXML class="btn btn-primary float-left">Eksportuj do Excel</button>
      </router-link>

        <h1 class = "text-center">Rejestr</h1>
        <br>
        <br>
        <table class="table table=striped">
            <thead>
                <th>ID</th>
                <th>Data</th>
                <th>Nazwa</th>
                <th>Opis niezgodności</th>
                <th>Ilość</th>
                <th>Przyczyna niezgodności</th>
                <th>Działania korygujące</th>
                <th>Ocena działania</th>
            </thead>
            <tbody>
                <tr v-for="client in clients" v-bind:key="client.id">
                    <td>{{client.id}}</td>
                    <td>{{client.typPr}}</td>
                    <td>{{client.typWs}}</td>
                    <td>{{client.numerSeryjny}}</td>
                    <td>{{client.srednicaNominalnaDN}}</td>
                </tr>
            </tbody>
        </table>
        </div>

  </template>

  <script>
  import ClientService from '../services/ClientService'
  
   export default {
        /* eslint-disable */
        name: 'clients',
        data(){
            return{
                 clients : []
            }
        },
        methods: {
            getClients(){
                ClientService.getClients().then((response) =>{
                    this.clients = response.data;
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
button {
    margin-left: 10px;
}
  </style> 