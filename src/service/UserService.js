import axios from 'axios'

export class UserService{

    baseUrl = "http://localhost:3000/";

    getAll(){
        return axios.get(this.baseUrl + "").then(res => res.data.data)
    }

}