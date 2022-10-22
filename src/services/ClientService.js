import axios from 'axios'

const CLIENT_API_BASE_URL = 'http://145.239.80.63:8080/users'


class ClientService{
    getClients(){
        return axios.get(CLIENT_API_BASE_URL);
    }
}


export default new ClientService()
