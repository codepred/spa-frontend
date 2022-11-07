<template>
    <div class = "containerDisplay">
        <h1 class = "text-center">Lista firm</h1>
        <div v-if="!displayServerError" class="display-error"></div>
        <div v-if="displayServerError" class="display-error"> Problem z serwerem </div>
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
                    <td><img width="200" height="100"  v-bind:src=client.logoPath /></td>
                    <td>{{client.phoneNumber}}</td>
                    <td>{{client.status}}</td>
                    <th>
                        <button class="btn acceptButton" @click="setAction(0, client.id)">Ma ®</button>
                    </th>
                    <th>
                        <button class="btn declineButton" @click="setAction(1, client.id)">Nie ma ®</button>
                    </th>
                     <th>
                        <button class="btn bugButton" @click="setAction(2, client.id)">Błędna grafika</button>
                    </th>
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
                 clients : [],
                 displayServerError: false
            }
        },
        methods: {
            getClients() {
                
                    ClientService.getClients().then((response) =>{
                        try {
                            this.clients = response.data;
                            this.displayServerError = false
                        }
                        catch {
                            this.displayServerError = true
                        }

                    })
        },
            setAction(type, id) {
                if (type === 0) {
                    //accept
                }
                else if (type === 1) {
                    //not accept
                }
                else if (type === 2) {
                    // bug
                }
            },
            async sendStatusInfo(type, id) {

                try {
                    var response = await fetch("http://54.37.234.76:8081/company/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify({
                        type: type,
                        id: this.id
                    }),
                    }).then(response => response.json())
                    }
                    catch (error) {
                    //this.errorMessage = error;
                    console.error('There was an error!', error)
                    const stringError = String(error)
                    //this.addingStatus = false

                    if (stringError.includes("Failed to fetch")) {
                        this.displayServerError = true
                        }
                    }
                    {
                    if (response) {
                    console.log('OK')
                    this.$router.push('/View-list')
                        }
                    }
            }
        },
        created(){
            this.getClients()
        }
    }
  
  
  </script>

  <style>
  
    button {
        text-align: center;
        display: inline-block;
        padding-right: 1%;
    }
    .acceptButton {
        background-color: green;
        color: white;
        width: 100px;
    }
    .declineButton {
        background-color: red;
        color: white;
        width: 100px;
    }
    .bugButton {
        background-color: orange;
        color: white;
        width: 140px;
    }
    h1 {
        padding-bottom: 2%;
    }
    .display-error {
        color: #ff0000!important;
        margin: auto;
        border-radius: 2%;
        display: inline-block;
        text-align: center;
        padding-bottom: 2%;
}

  </style> 