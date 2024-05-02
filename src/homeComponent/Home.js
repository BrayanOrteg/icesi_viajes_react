import React from 'react';
import './Home.css';
import destinationsImage from './assets/Book.png';
import userImage from './assets/User.png';
import analysisImage from './assets/Analyze.png';
import addBookingImage from './assets/Add.png';
import SideBar from '../Components/SideBar';


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
              <button type="submit" className='logout' onClick={this.onLogout} >Cerrar Sesión</button>

              <SideBar sx></SideBar>
              
              <div className='circle-home'> </div>
          </body>
        </html>
        
    );
  }
}

