import React from 'react';
import './Analytics.css'
import PlanService from '../service/PlanService';
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
import EmployeeTable from './EmployeeTable';
import TopTypeDestinationsTable from './TopTypeDestinationsTable';




export default function Analytics() {
  const navigate = useNavigate();

  const [planInfo, setPlanInfo] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await PlanService.getPlans();
        setPlanInfo(plans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    const fetchTypes = async () => {
      try {
          const destinationsData = await PlanService.getTopDestinations();
          setDestinations(destinationsData);
          console.log(destinationsData);

      } catch (error) {
          console.log(error);
      }
  };

  fetchTypes();

    fetchPlans();
  }, []); 


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

        <div style={{ width: '60%',zIndex: '2', paddingLeft: '2px', alignItems: 'start', justifyContent: 'flex-start', display: 'flex' }}>
          <h2 className='tittle-plan'>Reportes</h2>
        </div>

        <div style={{width: '60%'}}> 
        <EmployeeTable data={planInfo} />
        </div>


        
        <div style={{ width: '60%',zIndex: '2', paddingLeft: '2px', alignItems: 'start', justifyContent: 'flex-start', display: 'flex' }}>
          <h2 className='tittle-plan'>Tipos de destino populares</h2>
        </div>


        <div style={{width: '60%'}}> 
        <TopTypeDestinationsTable data={destinations} />
        </div>

        
        

      </div>
      <div className='circle-clients'> </div>
    </div>
  );
}
