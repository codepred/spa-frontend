<template>
    <div class = "containerDisplay">
        <h1 class = "text-center">Lista firm</h1>
        <div class="filtersTab" @click="test">
            <multiselect 
                v-model="selectedFilter" 
                :options="options"
                placeholder="Wybierz filtr"
                :select-label="selectName"
                :selected-label="selectedName"
                :deselect-label="deselectName"
                :allow-empty="false"
                :searchable="false"
            >
            </multiselect>
        </div>
        <div class="setPagination">
            <input class="form-control-lg"
                type="number"
                min="1"
                max="100"
                v-model="pageNumber"
                placeholder="Wybierz stronę"
            />
        </div>
        <div v-if="!displayServerError" class="display-error"></div>
        <div v-if="displayServerError" class="display-error"> Problem z serwerem </div>
        <table class="table table=striped">
            <thead>
                <th>ID</th>
                <th>URL</th>
                <th>Logo</th>
                <th>Nr tel.</th>
                <th>Email</th>
                <th>Status</th>
                <th>Akcje</th>
            </thead>
            <tbody>
                <tr v-for="client in clients" v-bind:key="client.id">
                    <td>{{client.id}}</td>
                    <td>{{client.url}}</td>
                    <td>
                        <img class="logoImg" @mouseover="disableInfoIcon('disable')" @mouseleave="disableInfoIcon('enable')" v-bind:src=client.logoPath />
                        <img class="redirectToLogo" v-if="displayInfoIcon" @click="redirectToLogoPage(client.logoPath)" width="17" height="17" src='../img/info_icon.svg' />
                    </td>
                    <td>{{client.phoneNumber}}</td>
                    <td>{{client.email}}</td>
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
  import Multiselect from 'vue-multiselect'

  var selectedFilter = "WSZYSTKIE"

  export { selectedFilter }
  
 

   export default {
        /* eslint-disable */
        components: {
            Multiselect
        },
        name: 'clients',
        data(){
            return{
                 clients : [],
                 selectedFilter: "WSZYSTKIE",
                 displayServerError: false,
                 options: ["WSZYSTKIE", "OCZEKUJE", "MA_R", "NIE_MA_R", "BLEDNA_GRAFIKA"],
                 selectName: "Wybierz",
                 deselectName: "Wybrane",
                 selectedName: "Wybrane",
                 displayInfoIcon: true,
                 pageNumber: 1,
           }
        },
        watch: {
            selectedFilter(newOption, oldOption) {
                localStorage.setItem('filter', this.selectedFilter)
                this.getClients()
            }
        },
        methods: {
            disableInfoIcon(argument) {
                if (argument === "disable") {
                    this.displayInfoIcon = false
                }
                if (argument === "enable") {
                    this.displayInfoIcon = true
                }
            },
            redirectToLogoPage(page) {
                window.open(page)
            },
            getClients(selectedFilter) {
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
                    this.sendStatusInfo("MA_R", id)
                }
                else if (type === 1) {
                    //not accept
                    this.sendStatusInfo("NIE_MA_R", id)
                }
                else if (type === 2) {
                    // bug
                    this.sendStatusInfo("BLEDNA_GRAFIKA", id)
                }
            },
            async sendStatusInfo(status, id) {

                try {
                    var response = await fetch("http://54.37.234.76:8081/company/status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify({
                        status: status,
                        id: id
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
                    this.getClients(this.selectedFilter)
            }
        },
        created(){
            this.getClients(this.selectedFilter)
        }
    }
  
  
  </script>

<style src="../assets/css/vue-multiselect.min.css"></style>

  <style>
  
    .filtersTab {
        width: 15%;
        list-style-type: none;
    }
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
    .logoImg {
        width: 200px; 
        height: 100px;
        padding: 10%;
        margin: auto;
    }
    .logoImg:hover {
        width: 100%;
        height: 100%;
    }
    .redirectToLogo {
        display: inline-block;
        margin: auto;
    }
    .redirectToLogo:hover {
        cursor: pointer;
        display: inline-block;
    }
    .setPagination {
        width: 25%;
        float: right;
    }

  </style> 