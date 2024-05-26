import {request} from '../axios_helper';

class DestinatioService{

    getDestinations(){
        return request("GET","api/v1/destinations/all",{}).then((response => response.data));
    }

    deleteDestination(id){
        return request("POST","api/v1/destinations/delete", id).then((response => response.data));
    }

    registerDestination(code, name, description, price, byLandLabel, bySeaLabel, byAirLabel, selectedTypes){
        return request("POST","api/v1/destinations/create",{id: Date.now(), code:code, name:name, description:description, price:price, byLand:byLandLabel, bySea:bySeaLabel, byAir:byAirLabel, status: 'Active', image: null, selectedTypes: selectedTypes}).then((response => response.data));
    }

    updateDestination(userName, password, name, id, role,nationalID){
        return request("POST", "api/v1/destinations/update",{id: id ,login: userName, password: password,name: name, nationalID:nationalID, status: 'Active', image: null, toke:null, role:role}).then((response => response.data));
    }

    getDestinationTypes(){
        return request("GET", "api/v1/destinations/types",{}).then((response => response.data));
    }
}

export default new DestinatioService();