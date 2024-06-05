import React from 'react';
import './Analytics.css'
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import userPhoto from '../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';


export default function Analytics() {
  const navigate = useNavigate();



  const handleGoBackClick = async (e) => {
    navigate('/plans');
  };


  return (
    <div className='container'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar>

      </TopBar>
      <SideBar />

      <div className='content'>

        <div style={{ width: '60%', paddingLeft: '2px', alignItems: 'start', justifyContent: 'flex-start', display: 'flex' }}>
          <h2 className='tittle-plan'>Analíticas</h2>
        </div>

      </div>
      <div className='circle-clients'> </div>
    </div>
  );
}
