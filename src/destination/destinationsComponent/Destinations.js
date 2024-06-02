import React from 'react';
import './Destinations.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import DestinationService from '../../service/DestinationService';
import UserList from '../../Components/UserList';
import { useState, useEffect } from 'react';

export default function Destinations() {

  const [clientList, setClientList] = useState([]);


  useEffect(() => {
    DestinationService.getDestinations().then((response) => {
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
        <UserList clients={clientList} card = 'destinationCard'></UserList> 
        <div className='circle-clients'> </div>
      </body>
    </html>
  );
}