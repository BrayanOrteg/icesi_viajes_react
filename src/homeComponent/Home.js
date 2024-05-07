import React from 'react';
import './Home.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import UserCard from '../Components/UserCard';
import MediaCover from '../Components/MediaCover';


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
          <TopBar></TopBar>
          <SideBar sx></SideBar>
          <body className='home-html-body'>
            <UserCard userHeight={100} userWidth={100}></UserCard>
            <MediaCover></MediaCover>
              <button type="submit" className='logout' onClick={this.onLogout} >Cerrar Sesión</button>
              
              <div className='circle-home'> </div>
          </body>
        </html>
        
    );
  }
}

