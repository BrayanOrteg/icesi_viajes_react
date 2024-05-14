import * as React from 'react';
import './App.css';
import Login from './loginComponent/Login';
import Home from './homeComponent/Home';
import Client from './clientComponent/Client';
import Clients from './clientsComponent/Clients';
import { useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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


            </Routes>
        </BrowserRouter>
        </>
    );

}

export default App;
