import * as React from 'react';
import './App.css';
import Login from './loginComponent/Login';
import Home from './homeComponent/Home';
import Clients from './clientsComponent/Clients';
import { request, setAuthHeader} from './axios_helper';

import { jwtDecode } from 'jwt-decode';

export default class AppContent extends React.Component {


    constructor(props) {
        super(props);
        setAuthHeader(null);
        this.state = {
            componentToShow: "loginPage"
        }
    };

    login = () => {
        this.setState({componentToShow: "home"})
    };

    logout = () => {
        this.setState({componentToShow: "loginPage"})
        setAuthHeader(null);
    };

    clients = () => {
        this.setState({componentToShow: "clientsList"})
    };

    onLogin = (event, userName, password) => {
        event.preventDefault();
        request(
            "POST",
            "api/v1/users/login",
            {
                login: userName,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({componentToShow: "home"});
                const decoded = jwtDecode(response.data.token);
                this.setState({role: decoded.role})
                console.log(decoded);
            }).catch(
            (error) => {
                setAuthHeader(null);
                this.setState({componentToShow: "homeError"});
            }
        );
    };

    render() {
        return (
          <>
            {(this.state.componentToShow === "loginPage" || this.state.componentToShow === "homeError") && <Login onLogin={this.onLogin} /> }
            {this.state.componentToShow === "home"  && this.state.role === "ADMIN" && <Home logout={this.logout} clients={this.clients}  />}
            {this.state.componentToShow === "clientsList" && <Clients/>}
          </>
        );
    };
  
  
}
