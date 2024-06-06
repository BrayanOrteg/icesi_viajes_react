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
import {getUserRole} from '../../axios_helper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Plan() {
  const navigate = useNavigate();
  const location = useLocation();
  let clientObj = location.state.clientObj;
  let clientInfo = location.state.clientInfo;
  const [role, setRole] = useState(getUserRole());

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

  const startDate = new Date(clientObj.tripStartDate).toISOString().split('T')[0];
  const endDate = new Date(clientObj.tripEndDate).toISOString().split('T')[0];

  return (
    <div className='container'>
      <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
      <TopBar>
        <button style={{ alignSelf: 'flex-start', justifySelf: 'start' }} onClick={handleGoBackClick}>
        < ArrowBackIcon/>
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
            <br/>
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Nombre del destino:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientObj.destinationName}
            </Typography>
            
            <br/>
            
            <Typography className='textCard-Attendants' style={{ fontSize: '19px', fontWeight: 'bold', fontFamily: 'Rubik' }}>
              Código del destino:
            </Typography>
            <Typography className='textCard-Attendants' style={{ fontSize: '18px', fontFamily: 'Rubik' }}>
              {clientObj.destinationCode}
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
              {clientObj.description}
            </Typography>
          </CardContent>
        </Card>
        {['ADMIN', 'AGENT'].includes(role) && (
        <button className= 'button-deleteClient' style={{width: '10%'}} onClick= {handleDelete}>
            <DeleteIcon sx={{color:'white'}}/>
        </button>
        )}
      </div>
      <div className='circle-clients'> </div>
    </div>
  );
}
