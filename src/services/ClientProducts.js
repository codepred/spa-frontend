import axios from 'axios'

const CLIENT_API_BASE_URL = 'http://54.37.138.92:8082/product/list'

// get info in checkout
class ClientProducts {
    async getClients(){
        try 
        {   
            return await axios({
                method: 'post',
                url: CLIENT_API_BASE_URL,
                headers: {}, 
                data: {
                    token: localStorage.getItem('token'),
                    name: localStorage.getItem('searchName'),
                    category: localStorage.getItem('category'),
                    sortType: localStorage.getItem('sortType')
                }
              });
        }
        catch (error) {
            //pass
        }
        }
    }



export default new ClientProducts()
