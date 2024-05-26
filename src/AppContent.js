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
import EmployeeEdit from './employeeEditComponet/employeeEdit';

import Destinations from './destinationsComponent/Destinations';
import Destination from './destinationComponent/Destination';
import DestinationRegistration from './destinationRegistrationComponent/DestinationRegistration';
import DestinationEdit from './destinationEditComponent/DestinationEdit';

import PlanRegistration from './planRegistrationComponent/PlanRegistration';

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

                <Route exact path="/employee/edit" element={role === "ADMIN" ? (<EmployeeEdit/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destinations" element={role === "ADMIN" ? (<Destinations/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destination" element={role === "ADMIN" ? (<Destination/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destination/registration" element={role === "ADMIN" ? (<DestinationRegistration/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destination/edit" element={role === "ADMIN" ? (<DestinationEdit/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/plan/registration" element={role === "ADMIN" ? (<PlanRegistration/>) : (<Navigate replace to={"/"} />)}/>

            </Routes>
        </BrowserRouter>
        </>
    );

}

export default App;
