import React from 'react';
import './Clients.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import ClientService from '../../service/ClientService';
import UserList from '../../Components/UserList';
import { useState, useEffect } from 'react';

export default function Clients() {

  const [clientList, setClientList] = useState([]);


  useEffect(() => {
    ClientService.getClients().then((response) => {
      setClientList(response);
    });
    console.log('entra1')
  }, []);
  
  console.log('hola')
  console.log(clientList)

  return (
    <html className='home-html-body'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar></TopBar>
      <SideBar/>
      <body className='clients-html-body'>
        <UserList clients={clientList} card = 'userCard'></UserList> 
        <div className='circle-clients'> </div>
      </body>
    </html>
  );
}