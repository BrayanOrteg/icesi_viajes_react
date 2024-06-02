import React from 'react';
import './Plan.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlanService from '../../service/PlanService';
import { useNavigate } from 'react-router-dom';
import userPhoto from '../../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function Plan() {
  const navigate = useNavigate();
  const location = useLocation();
  let clientObj = location.state.clientObj;
  let clientInfo = location.state.clientInfo;

  const handleDelete = async (e) => {
    e.preventDefault();
    PlanService.deletePlan(clientObj.id)
      .then((response) => {
        navigate('/plans');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoBackClick = async (e) => {
    navigate('/plans');
  };

  const startDate = new Date(clientObj.tripStartDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const endDate = new Date(clientObj.tripEndDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className='container'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar>
        <button style={{ alignSelf: 'flex-start', justifySelf: 'start' }} onClick={handleGoBackClick}>
          Regresar
        </button>
      </TopBar>
      <SideBar />

      <div className='content'>

        <div style={{ width: '60%', paddingLeft: '2px', alignItems: 'start', justifyContent: 'flex-start', display: 'flex' }}>
          <h2 className='tittle-plan'>Información del plan</h2>
        </div>
        <Card className='cardPlan'>
          <CardContent>
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Nombre:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientObj.name}
            </Typography>
            <br />
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Costo:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientObj.totalCost}
            </Typography>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
                  Fecha de inicio:
                </Typography>
                <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
                  {startDate}
                </Typography>
              </div>
              <div>
                <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
                  Fecha de fin:
                </Typography>
                <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
                  {endDate}
                </Typography>
              </div>
            </div>
            <br />
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Número de personas:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientObj.numberOfPeople}
            </Typography>
          </CardContent>
        </Card>

        <div style={{ width: '60%', paddingLeft: '2px', alignItems: 'start', justifyContent: 'flex-start', display: 'flex' }}>
          <h2 className='tittle-plan'>Información del cliente</h2>
        </div>
        <Card className='cardPlan'>
          <CardContent>
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Cliente:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientInfo.name}
            </Typography>
            <br />
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Teléfono:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientInfo.tel1}
            </Typography>
          </CardContent>
        </Card>

        <div style={{ width: '60%', paddingLeft: '2px', alignItems: 'start', justifyContent: 'flex-start', display: 'flex' }}>
          <h2 className='tittle-plan'>Descripción</h2>
        </div>
        <Card className='cardPlan'>
          <CardContent>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </CardContent>
        </Card>

        <button className= 'button-deleteClient' style={{width: '10%'}} onClick= {handleDelete}>
            <DeleteIcon sx={{color:'white'}}/>
        </button>
      </div>
      <div className='circle-clients'> </div>
    </div>
  );
}
