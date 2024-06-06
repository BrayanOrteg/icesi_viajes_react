import * as React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './loginComponent/Login';
import Home from './homeComponent/Home';

import Client from './client/clientComponent/Client';
import Clients from './client/clientsComponent/Clients';
import ClientEdit from './client/clientEditComponent/ClientEdit';
import ClientRegistration from './client/clientRegistrationComponent/ClientRegistration';

import Employee from './employee/employeeComponent/Employee';
import Employees from './employee/employeesComponent/Employees';
import EmployeeRegistration from './employee/employeeRegistrationComponent/EmployeeRegistration';
import EmployeeEdit from './employee/employeeEditComponet/employeeEdit';

import Destinations from './destination/destinationsComponent/Destinations';
import Destination from './destination/destinationComponent/Destination';
import DestinationRegistration from './destination/destinationRegistrationComponent/DestinationRegistration';
import DestinationEdit from './destination/destinationEditComponent/DestinationEdit';

import PlanRegistration from './plan/planRegistrationComponent/PlanRegistration';
import Plans from './plan/plansComponent/Plans';
import Plan from './plan/planView/Plan';

import Analytics from './analytics/Analytics';
import {setUserRole} from './axios_helper';

export function App() {

    const [role, setRole] = useState('');

    const onRole = (inputRole) => {

        setRole(inputRole)
        setUserRole(inputRole)
        console.log(inputRole) 
    };

    return (
        <>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login role={onRole} />} />

                <Route exact path="/home" element={["ADMIN", "VIEWER", "AGENT"].includes(role) ? (<Home/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/clients" element={["ADMIN", "VIEWER", "AGENT"].includes(role) ? (<Clients/>) : (<Navigate replace to={"/"} />)} />

                <Route exact path="/client" element={["ADMIN", "VIEWER", "AGENT"].includes(role) ?  (<Client/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/client/registration" element={["ADMIN", "AGENT"].includes(role) ? (<ClientRegistration/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/client/edit"element={["ADMIN", "AGENT"].includes(role) ?  (<ClientEdit/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employee" element={role === "ADMIN" ? (<Employee/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employees" element={role === "ADMIN" ? (<Employees/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employee/registration" element={role === "ADMIN" ? (<EmployeeRegistration/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/employee/edit" element={role === "ADMIN" ? (<EmployeeEdit/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destinations" element={["ADMIN", "VIEWER", "AGENT"].includes(role) ?  (<Destinations/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destination" element={["ADMIN", "VIEWER", "AGENT"].includes(role) ?  (<Destination/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destination/registration" element={["ADMIN", "AGENT"].includes(role) ?  (<DestinationRegistration/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/destination/edit" element={["ADMIN", "AGENT"].includes(role) ?  (<DestinationEdit/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/plans" element={["ADMIN", "VIEWER", "AGENT"].includes(role) ?  (<Plans/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/plan/registration" element={["ADMIN", "AGENT"].includes(role) ?  (<PlanRegistration/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/plan"element={["ADMIN", "VIEWER", "AGENT"].includes(role) ? (<Plan/>) : (<Navigate replace to={"/"} />)}/>

                <Route exact path="/analytics"  element={["ADMIN", "VIEWER", "AGENT"].includes(role) ? (<Analytics/>) : (<Navigate replace to={"/"} />)}/>
            </Routes>
        </BrowserRouter>
        </>
    );

}

export default App;
