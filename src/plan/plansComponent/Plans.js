import React from 'react';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import PlanService from '../../service/PlanService';
import UserList from '../../Components/UserList';
import { useState, useEffect } from 'react';

export default function Plans() {

  const [planList, setPlanList] = useState([]);


  useEffect(() => {
    PlanService.getPlans().then((response) => {
      setPlanList(response);
    });
    console.log('entra1')
  }, []);
  

  return (
    <html className='home-html-body'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar></TopBar>
      <SideBar/>
      <body className='clients-html-body'>
        <UserList clients={planList} card = 'planCard'></UserList> 
        <div className='circle-clients'> </div>
      </body>
    </html>
  );
}