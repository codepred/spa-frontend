import axios from 'axios'

const CLIENT_API_BASE_URL = 'http://54.37.138.92:8082/basket/list'

// get info in checkout
class ClientService {
    async getClients(){
        try 
        {   
            return await axios({
                method: 'GET',
                url: CLIENT_API_BASE_URL,
                headers: {}, 
                data: {

                }
              })
        }
        catch (error) {
            //pass
        }
        }
    }



export default new ClientService()
