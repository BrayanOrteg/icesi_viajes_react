import React from 'react';
import './Client.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import { useLocation } from "react-router-dom";

export function Client(){


    const location = useLocation();

    let clientObj = location.state.clientObj;

    return (
        <html className='client-html-body'>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar></TopBar>
        <SideBar/>
        <body className='client-html-body'>

            {clientObj.name}
            <div className='circle-clients'> </div>
        </body>
        </html>
        
    );
    
  }

export default Client;

  