import React from 'react';
import './Clients.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import UserCard from '../Components/UserCard';
import MediaCover from '../Components/MediaCover';
import ClientService from '../service/ClientService';
import ClientsTable from '../Components/ClientsTable';
import UserList from '../Components/UserList';
import { useLoadingContext } from "react-router-loading";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';


import { useState, useEffect } from 'react';

export default function Clients() {

  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);
  const loadingContext = useLoadingContext();

  useEffect(() => {
    ClientService.getClients().then((response) => {
      setClientList(response);
    });
  }, []);
  

  console.log('hola')
  console.log(clientList)

  return (
    <html className='home-html-body'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar></TopBar>
      <SideBar/>
      <body className='clients-html-body'>
        <UserList clients={clientList}></UserList> 
        <div className='circle-clients'> </div>
      </body>
    </html>
  );
}