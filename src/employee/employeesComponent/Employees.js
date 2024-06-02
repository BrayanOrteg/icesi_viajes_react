import React from 'react';
import './Employees.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import EmployeeService from '../../service/EmployeeService';
import UserList from '../../Components/UserList';
import { useState, useEffect } from 'react';

export default function Employees() {

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    console.log('entra2')
    EmployeeService.getEmployees().then((response) => {
      setEmployeeList(response);
    });
    console.log('entra3')
  }, []);

  console.log('hola')
  console.log(employeeList)

  return (
    <html className='home-html-body'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar></TopBar>
      <SideBar/>
      <body className='employees-html-body'>
        <UserList clients={employeeList} card = 'employeeCard'></UserList>
        <div className='circle-clients'> </div>
      </body>
    </html>
  );
}