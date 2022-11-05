import axios from 'axios'

const CLIENT_API_BASE_URL = 'http://54.37.234.76:8081/company/list'


class ClientService{
    getClients(){
        return axios.get(CLIENT_API_BASE_URL);
    }
}


export default new ClientService()
