import axios from 'axios'
import { selectedFilter } from '../components/View-list.vue'

const CLIENT_API_BASE_URL = 'http://54.37.234.76:8081/company/list'


class ClientService {
    async getClients(){
        try 
        {
            console.log(selectedFilter)
            return await axios({
                method: 'post',
                url: CLIENT_API_BASE_URL,
                headers: {}, 
                data: {
                  status: selectedFilter, // This is the body part
                }
              });
        }
        catch (error) {
            //pass
        }
        }
    }



export default new ClientService()
