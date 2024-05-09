import React from 'react';
import './Clients.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import UserCard from '../Components/UserCard';
import MediaCover from '../Components/MediaCover';
import ClientService from '../service/ClientService';
import ClientsTable from './ClientsTable';


export default class Clients extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        logout: props.logout,
        clients: props.clients,
        clientList:[]
      };

    this.clientsClick = this.clientsClick.bind(this);
  };

  componentDidMount(){
    ClientService.getClients().then((response) => {
        this.setState({clientList:response})
    });

    console.log(this.clientList)
  }

  onLogout = () => {
    this.state.logout();
  };

  clientsClick = () => {
    this.state.clients();
  };

  render(){
    
    return (
        <html className='home-html-body'>
          <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
          <TopBar></TopBar>
          <SideBar clientsClick={this.clientsClick}/>
          <body className='clients-html-body'>

            <ClientsTable clients={this.state.clientList}/>
              
            <div className='circle-clients'> </div>
          </body>
        </html>
        
    );
  }
}

