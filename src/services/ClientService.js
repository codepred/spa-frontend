
//const CLIENT_API_BASE_URL = 'http://54.37.234.76:8081/company/list'


class ClientService {
    async getClients(){
        try {
            var response = await fetch('http://54.37.234.76:8081/company/list', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                status: "WSZYSTKIE",
            }),
            }).then(response => response.json())

            return response;
        }
        catch (error) {
            //pass
        }
    }
}



export default new ClientService()
