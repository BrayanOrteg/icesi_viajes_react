import * as React from 'react';
import './App.css';
import Login from './loginComponent/Login';
import Home from './homeComponent/Home';
import { request, setAuthHeader} from './axios_helper';

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "loginPage"
        }
    };

    login = () => {
        this.setState({componentToShow: "home"})
    };

    logout = () => {
        this.setState({componentToShow: "loginPage"})
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
                this.setState({componentToShow: "home"});
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
            {this.state.componentToShow === "home" && <Home logout={this.logout}  />}
          </>
        );
    };
  
  
}
