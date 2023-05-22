import axios from 'axios'


class BookService{

    getList(){
        var sessionId = localStorage.getItem('token')
        var response = axios.get("http://localhost:8081/books/" + sessionId);      
        console.log(response)
        return response;
    }

    getHistoryList(){
        var sessionId = localStorage.getItem('token')
        var response = axios.get('http://localhost:8081/users/' + sessionId  + '/rentals');      
        console.log(response)
        return response;
    }
}
export default new BookService()