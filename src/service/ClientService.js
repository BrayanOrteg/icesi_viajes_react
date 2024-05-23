import { request} from '../axios_helper';

class ClientService{

    getClients(){
        return request("GET","api/v1/clients/all",{}).then((response => response.data));
    }

    registerClient(firstName, lastName, id, dateOfBirth, phone, sex,idType){
        return request("POST","api/v1/clients/create",{id: Date.now() ,nationalID: id, firstName: firstName,lastName: lastName, name: firstName.concat(" ", lastName), tel1: phone, sex: sex, status: 'Active',typeNID: idType, birthDate: dateOfBirth, image: null}).then((response => response.data));
    }

    updateClient(id, firstName, lastName, nationalID, dateOfBirth, phone, sex,idType){
        return request("POST","api/v1/clients/update",{id: id ,nationalID: nationalID, firstName: firstName,lastName: lastName, name: firstName.concat(" ", lastName), tel1: phone, sex: sex, status: 'Active',typeNID: idType, birthDate: dateOfBirth, image: null}).then((response => response.data));
    }

    deleteClient(id){
        console.log(id)
        return request("POST","api/v1/clients/delete", id).then((response => response.data));
    }}

export default new ClientService();