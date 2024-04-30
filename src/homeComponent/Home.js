import React from 'react';
import './Home.css';


export default class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        logout: props.logout,
      };
  };

  onLogout = () => {
    this.state.logout();
  };

  render(){
    
    return (
        <html className='home-html-body'>
          <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
          <body className='home-html-body'>

              <button type="submit" onClick={this.onLogout} >Cerrar Sesión</button>

              <div className='circle-home'> </div>
    
          </body>
        </html>
        
    );
  }
}

