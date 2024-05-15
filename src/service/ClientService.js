import { request} from '../axios_helper';

class ClientService{

    getClients(){
        return request("GET","api/v1/clients/all",{}).then((response => response.data));
    }

    registerClient(firstName, lastName, id, dateOfBirth, phone, sex,idType){
        return request("POST","api/v1/clients/create",{id: Date.now() ,nationalID: id, firstName: firstName,lastName: lastName, name: firstName.concat(" ", lastName), tel1: phone, sex: sex, status: 'Active',typeNID: idType, birthDate: dateOfBirth, image: null}).then((response => response.data));
    }
}

export default new ClientService();