import React from 'react';
import './Home.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import UserCard from '../Components/UserCard';
import MediaCover from '../Components/MediaCover';
import ClientService from '../service/ClientService';
import Statistics from './Statistics';
import Chart from './Chart';
import Cards from './Cards';


export default class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        logout: props.logout,
        clients: props.clients,
      };

    this.clientsClick = this.clientsClick.bind(this);
  };

  onLogout = () => {
    this.state.logout();
  };

  clientsClick = () => {
    this.state.clients();
  };

  render(){
    
    return (
        <div className='container-home '>
          <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
          <TopBar></TopBar>
          <SideBar clientsClick={this.clientsClick}/> 
          <div className='content'> 

            <div className='firstRowDiv'> 

              
              <div className='topRowItemDiv'> 
                <h2 className='title'>Estadísticas</h2>
                <Statistics/>
              </div>

              <div className='topRowItemDiv'> 
                <h2 className='title'>Tipos de destino populares</h2>
                <Chart/>
              </div>

            </div>

            <div className='bottomRowItemDiv'> 
              <h2 className='title'>Destinos populares</h2>
              <Cards/>
            </div>
            

          </div>

            <div className='circle-home'> </div>
        </div>
        
    );
  }
}

