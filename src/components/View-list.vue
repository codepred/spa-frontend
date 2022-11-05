<template>
    <div class = "containerDisplay">
      <router-link to="">
      <button id=addRecord class="btn btn-primary float-right">Dodaj nowy</button>
      <button id=editRecord class="btn btn-primary float-right">Edytuj</button>
      <button id=removeRecord class="btn btn-primary float-right">Usuń</button>
      <button id=exportToPDF class="btn btn-primary float-left">Eksportuj do PDF</button>
      <button id=exportToXML class="btn btn-primary float-left">Eksportuj do Excel</button>
      </router-link>

        <h1 class = "text-center">Lista firm</h1>
        <br>
        <br>
        <table class="table table=striped">
            <thead>
                <th>ID</th>
                <th>URL</th>
                <th>Logo</th>
                <th>Nr tel.</th>
                <th>Status</th>
                <th>Akcje</th>
            </thead>
            <tbody>
                <tr v-for="client in clients" v-bind:key="client.id">
                    <td>{{client.id}}</td>
                    <td>{{client.url}}</td>
                    <td>{{client.logo}}</td>
                    <td>{{client.nr}}</td>
                    <td>{{client.status}}</td>
                    <td>{{client.akcje}}</td>
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
  
  </style> 