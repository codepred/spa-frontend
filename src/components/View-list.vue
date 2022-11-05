<template>
    <div class = "containerDisplay">
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
                    <td><img v-bind:src=client.logoPath /></td>
                    <td>{{client.phoneNumber}}</td>
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