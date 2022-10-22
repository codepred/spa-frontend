<template>
    <div class = "containerDisplay">
      <button @click="tableToExcel('table', 'Lorem Table')" id="exportToPDF" class="btn btn-primary float-left">Eksportuj do Excel</button>
      <button @click="ExportPdf('pdf')" id="exportToXML" class="btn btn-primary float-left">Eksportuj do PDF</button>
        <h1 class = "text-center">Karta niezgody</h1>
        <br>
        <br>
        <table ref="table" columns class="table table=striped">
            <thead>
                <th>ID</th>
                <th>Data</th>
                <th>Typ PR</th>
                <th>Typ WS</th>
                <th>Numer seryjny</th>
                <th>Srednica nominalna</th>
                <th>Edytuj</th>
                <th>Zastosuj</th>
                <th>Usuń</th>
            </thead>
            <tbody>
                <tr v-for="client in clients" v-bind:key="client.id">
                   <td>{{client.id}}</td>
                   <td>{{client.data}}</td>
                   <th>
                    <td v-if="!editable[client.id]">{{client.typPr}}</td>
                    <input list="listOfTypesTRP" v-if="editable[client.id]" class="form-control form-control-lg" v-model="client.typPr" v-on:keydown="blockWritting($event)" required/>
                        <datalist id="listOfTypesTRP">
                            <option value="TRP 1.6" />
                            <option value="TRP 2.5" />
                            <option value="TRP 4" />
                            <option value="TRP 6.3" />
                            <option value="R100" />
                        </datalist>
                    </th>
                    <th>
                    <td v-if="!editable[client.id]">{{client.typWs}}</td>
                    <input list="listOfTypesWS" v-if="editable[client.id]" class="form-control form-control-lg" v-model="client.typWs" v-on:keydown="blockWritting($event)" required/>
                    <datalist id="listOfTypesWS">
                        <option value="WS 4" />
                        <option value="WS 6.3" />
                        <option value="WS 10" />
                        <option value="WS 16" />
                    </datalist>
                    </th>
                    <th>
                    <td v-if="!editable[client.id]">{{client.numerSeryjny}}</td>
                    <input type="text" v-if="editable[client.id]" class="form-control form-control-lg" v-model="client.numerSeryjny" required /> 
                    </th>
                    <th>
                    <td v-if="!editable[client.id]">{{client.srednicaNominalnaDN}}</td>
                    <input list="srednicaNominalna" v-if="editable[client.id]" class="form-control form-control-lg" v-model="client.srednicaNominalnaDN" v-on:keydown="blockWritting($event)" required />
                    <datalist id="srednicaNominalna">
                        <option value="DN 15" />
                        <option value="DN 20" />
                        <option value="DN 25" />
                        <option value="DN 32" />
                        <option value="DN 40" />
                        <option value="DN 50" />
                    </datalist>
                    </th>
                    <th>
                    <button id="editRecord" class="btn btn-primary float-right" @click="setEditable(client.id)"> Edytuj</button>
                    </th>
                    <th>
                    <button id="setRecord" class="btn btn-primary float-right" @click="editRecordFunction([client.id, client.typPr, client.typWs, client.numerSeryjny, client.srednicaNominalnaDN])"> Zastosuj</button>
                    </th>
                     <th>
                    <button id="removeRecord" class="btn btn-primary float-right" @click="removeRecordFunction(client.id)">Usuń</button>
                    </th>
                </tr>
            </tbody>
        </table>
        </div>

  </template>

  <script>
  
  import ClientService from '../services/ClientService'
  // eslint-disable-next-line
  import VueExcelXlsx from "vue-excel-xlsx";
  
   export default {
        /* eslint-disable */
        name: 'clients',
        data(){
            return{
                 clients : [],
                 editable: new Array(10000).fill(false),
                 isEditted: false,
                  uri :'data:application/vnd.ms-excel;base64,',
      template:'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64: function(s){ return window.btoa(unescape(encodeURIComponent(s))) },
      format: function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            }
        },
        methods: {
            blockWritting(e) {
                if (e.key !== "Backspace") {
                    e.preventDefault()
                }
            },
            setEditable(recordId) {
                if (this.isEditted === true) {
                    this.editable = new Array(10000).fill(false)
                    this.isEditted = false
                }
                else if (this.isEditted === false) {
                    console.log(recordId)
                    this.editable[recordId] = true
                    this.isEditted = true
                }
            },
            getClients(){
                ClientService.getClients().then((response) =>{
                    this.clients = response.data;
                })
            },
            async removeRecordFunction (buttonID) {
                console.log(buttonID)
                var usernamne = localStorage.getItem('username')

                try {
                var response = await fetch(`http://77.55.212.201:9099/card/${buttonID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify({
                        username: this.username

                })
            }).then(response => response.json())
                }
                catch (error){
                    console.log(error)
                }
            location.reload();
            //this.$router.go();
            },
            async editRecordFunction (changeData) {
                console.log(changeData)
                var usernamne = localStorage.getItem('username')

                try {
                var response = await fetch(`http://77.55.212.201:9099/card/${changeData[0]}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify({
                        typPr: changeData[1],
                        typWs: changeData[2],
                        numerSeryjny: changeData[3],
                        srednicaNominalnaDN: changeData[4]
                })
            }).then(response => response.json())
                }
                catch (error){
                    console.log(error)
                }
                location.reload();
            },
            tableToExcel(table, name){
                    if (!table.nodeType) table = this.$refs.table
                    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
                    window.location.href = this.uri + this.base64(this.format(this.template, ctx))
            }
        },
        created(){
                console.log('TY')
                this.getClients()
        }
    }
  
  
  </script>

  <style>
  div {
    margin-left : 10px;
  }
  input {
 display: inline-block;
  }
  h1 {
    text-align: center;
    margin-left: +70px;
  }
 button {
    margin-left: 10px;
    margin-right: 10px;
}

thead {
    text-align: center;
}
td {
    text-align: left;
}
  </style> 