import React, { useState } from 'react';
import './Login.css';
import logo from './assets/logo_icesi.png';
import { request, setAuthHeader} from '../axios_helper';

export default class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            onLogin: props.onLogin,
            error: false,
        };
    };


    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value});
    };

    onSubmitLogin = (e) => {

        if (this.state.userName === "" || this.state.password === ""){
            this.setState({error: "true"});
        }else{
            this.setState({error: "false"});
            this.state.onLogin(e, this.state.userName, this.state.password);
        }
        
    };

    render(){

        return (
            <html className='login-html-body'>
                <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
                <body className='login-html-body'>


                    <div className='circle-login-1'></div>
                    <div className='circle-login-2'></div>
                    <div className='rectangle-login'></div>

                    <div className='container-login'>

                        <div className='welcome'>

                            <img src={logo} className='logoApplication'/>
                            
                            <div className='textWelcomeContainer'>
                                <h1 className='whiteText' id='welcomeText'>
                                Bienvenido!
                                </h1>
                                <p className='whiteText'>
                                    Por favor ingresa tus credenciales para continuar
                                </p>
                            </div>
        
                        </div>
                        <div className="userLogin">
                            <h2>Inicio de Sesión</h2>
                            <form id= "login" onSubmit={this.onSubmitLogin}>
                        
                                <input className='loginInput' type="text" placeholder='Usuario' name="userName" onChange={this.onChangeHandler} />
                                
                            
                                <input className='loginInput' type="password" placeholder='Contraseña' name="password" onChange={this.onChangeHandler}/>
                            
                                <button type="submit">Iniciar Sesión</button>   
                            </form>
                            {this.state.error && <h4 className='error-text'> ¡Usuario no registrado!</h4>}
                        </div>
                    </div>
                    
                </body>
                
            </html>
            

            
        );
    }
}

