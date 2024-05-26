import React from 'react';
import './PlanRegistration.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';
import moment from 'moment';
import  {useState, useEffect} from 'react';
import PlanDetailRegistration from '../planDetailRegistrationComponent/PlanDetailRegistration';

export function PlanRegistration(){

    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [numPeople, setNumPeople] = useState('')
    const [requestDate, setRequestDate] = useState( )
    const [startDate, setStartDate] = useState( )
    const [endDate, setEndDate] = useState( )
    const [cost, setCost] = useState( )
    const [clientId, setClientId] = useState( )
    const [userId, setUserId] = useState( )


    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [idTypes,setIdTypes] = useState([])
    const regex = /[^a-zA-Z\s]/


    useEffect(() => {
        ClientService.getIdTypes().then((response) => {
            setIdTypes(response);
            console.log(idTypes)
        });  
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(code, description, name, numPeople, requestDate, startDate,  endDate, cost, clientId, userId) 

        const timeDiff = endDate.diff(startDate, 'days')


        if(regex.test(name)){
            setErrorMessage('El nombre no puede contener números o caracteres especiales.');

        }else if(timeDiff < 1){
            setErrorMessage('Fecha erronea');

        }else{
            ClientService.registerClient(code, description, name, numPeople, requestDate, startDate,  endDate, cost, clientId, userId).then(
                (response) => {
    
                    navigate('/home');
    
                }).catch(
                (error) => {
                    
            });
        }

    };

    const handleGoBackClick = async(e) => {
        navigate(-1)
    };


    return (

        <div className='container'>

        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar>
            <button style={{alignSelf: 'flex-start', justifySelf: 'start'}} onClick={handleGoBackClick}>
                Regresar
            </button>
        </TopBar>
        <SideBar/>

        <div className='content'>
        
        <div className='formDiv'>

            <div >
            <h2>Registro de cliente</h2>
            <form onSubmit={handleSubmit} className='form'>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nombre"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Código"
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        fullWidth
                        required
                    />
                </Stack>

                <TextField sx={{marginBottom: 4}}
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Descripción"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        fullWidth
                        required
                    />

                <TextField sx={{marginBottom: 4}}
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Número de personas"
                        onChange={e => setNumPeople(e.target.value)}
                        value={numPeople}
                        fullWidth
                        required
                    />
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                    <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        label="Fecha inicial"
                        onChange={e => setStartDate(e.target.value)}
                        value={startDate}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />

                    <TextField 
                        type="date"
                        variant='outlined'
                        color='secondary'
                        label="Fecha final"
                        onChange={e => setEndDate(e.target.value)}
                        value={endDate}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
    
                   
                </Stack>

                <PlanDetailRegistration />
                
                
                <button className= 'saveBttn' type="submit">Guardar</button>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>

            </div>
            
            <div className='circle-clients'> </div>
        
            </div>
        </div>
    );


    
  }

export default PlanRegistration;