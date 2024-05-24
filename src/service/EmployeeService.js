import {request} from '../axios_helper';

class EmployeeService{

    getEmployees(){
        return request("GET","api/v1/users/all",{}).then((response => response.data));
    }

    deleteEmployee(id){
        console.log(id)
        return request("POST","api/v1/users/delete", id).then((response => response.data));
    }

    registerEmployee(userName, password, name, id,role){
        return request("POST","api/v1/users/create",{id: Date.now() ,login: userName, password: password,name: name, nationalID:id, status: 'Active', image: null, toke:null, role:role}).then((response => response.data));
    }

    updateEmployee(userName, password, name, id, role,nationalID){
        return request("POST", "api/v1/users/update",{id: id ,login: userName, password: password,name: name, nationalID:nationalID, status: 'Active', image: null, toke:null, role:role}).then((response => response.data));
    }
}

export default new EmployeeService();