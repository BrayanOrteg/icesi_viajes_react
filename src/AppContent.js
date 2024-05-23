import * as React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './loginComponent/Login';
import Home from './homeComponent/Home';

import Client from './clientComponent/Client';
import Clients from './clientsComponent/Clients';
import ClientEdit from './clientEditComponent/ClientEdit';
import ClientRegistration from './clientRegistrationComponent/ClientRegistration';

import Employee from './employeeComponent/Employee';
import Employees from './employeesComponent/Employees';
import EmployeeRegistration from './employeeRegistrationComponent/EmployeeRegistration';

export function App() {

    const [role, setRole] = useState('');

    const onRole = (inputRole) => {

        setRole(inputRole)
        console.log(inputRole)
    };

    return (
        <>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login role={onRole} />} />

                <Route exact path="/home" element={role === "ADMIN" ? (<Home/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/clients" element={role === "ADMIN" ? (<Clients/>) : (<Navigate replace to={"/"} />)} />

                <Route exact path="/client" element={role === "ADMIN" ? (<Client/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/client/registration" element={role === "ADMIN" ? (<ClientRegistration/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/client/edit" element={role === "ADMIN" ? (<ClientEdit/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employee" element={role === "ADMIN" ? (<Employee/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employees" element={role === "ADMIN" ? (<Employees/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employee/registration" element={role === "ADMIN" ? (<EmployeeRegistration/>) : (<Navigate replace to={"/"} />)}/>

            </Routes>
        </BrowserRouter>
        </>
    );

}

export default App;
