import React from 'react';
import './PlanDetailRegistration.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../../service/ClientService';
import moment from 'moment';
import  {useState, useEffect} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

export function PlanDetailRegistration(){

    const [food, setFood] = useState('')
    const [lodging, setLodging] = useState('')
    const [transport, setTransport] = useState('')
    const [transfers, setTransfers] = useState('')
    const [cost, setCost] = useState( )
    const [destinationId, setDestinationId] = useState('')
    const [modifyDate, setModifyDate] = useState( )
    const [daysNum, setDaysNum] = useState( )
    const [nightsNum, setNightsNum] = useState( )

    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(food,lodging, transport, transfers, cost, destinationId, modifyDate,  daysNum, nightsNum) 
        
    };

    return (
        <div className='PlanDetailDiv'>
            <h2>Registro de Detalles</h2>
            <form onSubmit={handleSubmit}>

                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Destino"
                    onChange={e => setDestinationId(e.target.value)}
                    value={destinationId}
                    fullWidth
                    required
                />

                <FormLabel component="legend">Servicios</FormLabel>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                
                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Equipaje"  
                        onChange={e => setLodging(e.target.value)}
                    />

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Tranporte hacia el destino"  
                        onChange={e => setTransport(e.target.value)}
                    />
                </Stack>
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Transporte en el destino"  
                        onChange={e => setTransfers(e.target.value)}
                    />

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Alimentación"  
                        onChange={e => setFood(e.target.value)}
                    />
                    
                </Stack>

                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Número de noches"
                        onChange={e => setNightsNum(e.target.value)}
                        value={nightsNum}
                        fullWidth
                        required
                    />

                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Número de días"
                        onChange={e => setDaysNum(e.target.value)}
                        value={daysNum}
                        fullWidth
                        required
                    />
                    
                </Stack>

            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>  
    );
    
  }

export default PlanDetailRegistration;