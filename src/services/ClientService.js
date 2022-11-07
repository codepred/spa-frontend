import axios from 'axios'

const CLIENT_API_BASE_URL = 'http://54.37.234.76:8081/company/list'


class ClientService {
    async getClients(){
        try {
        return await axios.get(CLIENT_API_BASE_URL);
        }
        catch (error) {
            //pass
        }
    }
    
}



export default new ClientService()
