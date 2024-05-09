import { request} from '../axios_helper';

class ClientService{

    getClients(){
        return request("GET","api/v1/clients/all",{}).then((response => response.data));
    }
}

export default new ClientService();