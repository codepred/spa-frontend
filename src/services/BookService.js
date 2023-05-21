import axios from 'axios'


class BookService{

    getList(){
        console.log('HEREEE')
        var response = axios.get("http://localhost:8081/books");      
        console.log(response)
        return response;
    }

    getHistoryList(){
        console.log('HEREEE')
        var sessionId = localStorage.getItem('token')
        var response = axios.get('http://localhost:8081/users/' + sessionId  + '/rentals');      
        console.log(response)
        return response;
    }
}
export default new BookService()