import axios from 'axios';
import { request} from '../axios_helper';

class UserService{

    baseUrl = "http://localhost:3000/";

    getAll(){
        return axios.get(this.baseUrl + "").then(res => res.data)
    }

    getUserByID(id){
        return request("POST","api/v1/users/get", id).then((response => response.data));
    }

}
export default new UserService();