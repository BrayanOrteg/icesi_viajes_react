import React from 'react';
import './PlanRegistration.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import { TextField , Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlanService from '../../service/PlanService';
import DestinationService from '../../service/DestinationService';
import ClientService from '../../service/ClientService';
import moment from 'moment';
import  {useState, useEffect} from 'react';
import PlanDetailRegistration from '../planDetailRegistrationComponent/PlanDetailRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { request, getUserId} from '../../axios_helper';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export function PlanRegistration(){

    const userId = getUserId();

    const [planId, setPlanId] = useState( )
    const [detailId, setDetailId] = useState( )
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [numPeople, setNumPeople] = useState('')
    const [requestDate, setRequestDate] = useState( )
    const [startDate, setStartDate] = useState('2024/05/12' )
    const [endDate, setEndDate] = useState('2024/05/12' )
    const [cost, setCost] = useState(0)
    const [clientId, setClientId] = useState( )
    const [clients, setClients] = useState([])
    const [destinations, setDestinations] = useState([])

    const [inputFields, setInputFields] = useState([
        {food:'off',loadging:'off', transport:'off', transfers:'off', cost:0, destinationId:null, modifyDate: new Date(Date.now()).toISOString(),  daysNum:'', nightsNum:''}
    ]);

    const defaultPropsClients = {
        options: clients,
        getOptionLabel: (option) => option.name,
    };

    const defaultPropsDestinations = {
        options: destinations,
        getOptionLabel: (option) => option.name,
    };


    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;
    const today = new Date();


    useEffect(() => {

        setInputFields([{food:'off',loadging:'off', transport:'off', transfers:'off', cost:0, destinationId:null, modifyDate: new Date(Date.now()).toISOString(),  daysNum:'', nightsNum:''}])

        ClientService.getClients().then((response) => {
            setClients(response);
            console.log(clients)
        });

        DestinationService.getDestinations().then((response) => {
            setDestinations(response);
            console.log(destinations)
        });

        setRequestDate(new Date(Date.now()).toISOString())
    }, []);

    
    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
        console.log(inputFields)
    };

    const handleChangeInputDestination = (index, event,newValue) => {
        const values = [...inputFields];
        values[index]['destinationId'] = newValue;
        setInputFields(values);
        console.log(inputFields)
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, {food:'off',loadging:'off', transport:'off', transfers:'off',cost:0, destinationId:null, modifyDate:new Date(Date.now()).toISOString(),  daysNum:'', nightsNum:''}]);
    };
    
    const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    };

    const addOneDay = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date;
    };

    const updateCost = () => {
        let finalCost = cost;
        let detailCost = 0;
        const additionalPrice= 100;
        for (let i = 0; i < inputFields.length; i++) {
            detailCost = 0;

            detailCost = detailCost +  inputFields[i].destinationId.price

            if (inputFields[i].loadging == "on" ){
                detailCost = detailCost + additionalPrice;
            }
    
            if (inputFields[i].transport == "on" ){
                detailCost = detailCost + additionalPrice;
            }
            if (inputFields[i].food == "on" ){
                detailCost = detailCost + additionalPrice;
            }
            if (inputFields[i].transfers == "on" ){
                detailCost = detailCost + additionalPrice;
            }

            inputFields[i].cost = detailCost;

            finalCost = finalCost + detailCost;

            console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            console.log(finalCost)

            return finalCost
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const typesData =  await updateCost();

        console.log("ADIOSSSSSSSSSSSSSSSS")
        console.log(typesData)
        console.log(today)
        console.log(new Date(startDate))


        console.log(code, description, name, numPeople, requestDate, startDate,  endDate, typesData, clientId, userId)

        if(regex.test(name)){
            setErrorMessage('El nombre no puede contener números o caracteres especiales.');

        } else if(addOneDay(startDate) < today){
            setErrorMessage('La fecha inicial no puede ser menor a la fecha de hoy.');

        } else if(addOneDay(endDate) <= addOneDay(startDate)){
            setErrorMessage('La fecha final no puede ser menor o igual a la fecha inicial.');

        }
        else{

            let plan = 0;
            let detail=0;

            const adjustedStartDate = addOneDay(startDate).toISOString().split('T')[0];
            const adjustedEndDate = addOneDay(endDate).toISOString().split('T')[0];

            PlanService.registerPlan(code, description, name, numPeople, requestDate, adjustedStartDate,  adjustedEndDate, typesData, clientId.id, userId).then(
                (response) => {
                    plan= response.id;
                    console.log(plan)

                    for (let i = 0; i < inputFields.length; i++) {

                        PlanService.registerDetails(inputFields[i].food,inputFields[i].loadging, inputFields[i].transport, 
                            inputFields[i].transfers, inputFields[i].cost, inputFields[i].destinationId.id, inputFields[i].modifyDate,  
                            inputFields[i].daysNum, inputFields[i].nightsNum).then(
                            (response) => {
                                detail=response.id;
                                console.log(detail)

                                PlanService.registerPlanDetails(plan,detail).then(
                                    (response) => {
                                    }).catch(
                                    (error) => {   
                                });


                            }).catch(
                            (error) => {   

                        });
        
                        
                    }
                    navigate("/plans")
                }).catch(
                (error) => {   
            });

            console.log("espero");


        }  
    };

    const handleGoBackClick = async(e) => {
        navigate("/plans")
    };


    return (

        <div className='container'>

        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar>
            <button style={{alignSelf: 'flex-start', justifySelf: 'start'}} onClick={handleGoBackClick}>
            < ArrowBackIcon/>
            </button>
        </TopBar>
        <SideBar/>

        <div className='content'>
        
            <div className='formDivPlan'>
            <form onSubmit={handleSubmit} className='form'>
            <h2>Registro del plan</h2>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField className='textForm'
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nombre"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        fullWidth
                        required
                    />
                    <TextField className='textForm'
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Código"
                        onChange={e => setCode(e.target.value)}
                        value={code}
                        fullWidth
                        required
                    />
                </Stack>

                <TextField className='textForm' sx={{marginBottom: 4}}
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Descripción"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        fullWidth
                        required
                    />

                <TextField className='textForm' sx={{marginBottom: 4}}
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Número de personas"
                        onChange={e => setNumPeople(e.target.value)}
                        value={numPeople}
                        fullWidth
                        required
                    />

                <Autocomplete  sx={{marginBottom: 4}}
                        {...defaultPropsClients}
                        id="controlled-demo"
                        value={clientId}
                        onChange={(event, newValue) => {
                        setClientId(newValue);
                        }}
                        renderInput={(params) => (
                        <TextField {...params} label="Cliente" />
                        )}
                    />
                
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                    <TextField className='textForm'
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

                    <TextField className='textForm' 
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


                {inputFields.map((inputField, index) => (

                    <div key={index}>

                        <h2>Registro de Detalles</h2>

                        <Autocomplete  sx={{marginBottom: 4}}
                            {...defaultPropsDestinations}
                            name="destinationId"
                            value={inputField.destinationId}
                            onChange={(event, newValue) => handleChangeInputDestination(index, event,newValue)}
                            renderInput={(params) => (
                            <TextField {...params} label="Destino" />
                            )}
                        />

                        <FormLabel component="legend">Servicios</FormLabel>
                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                        
                            <FormControlLabel
                                control={<Checkbox />} 
                                name="loadging"
                                label="Equipaje"  
                                onChange={(event) => handleChangeInput(index, event)}
                            />

                            <FormControlLabel
                                control={<Checkbox />} 
                                name="transport"
                                label="Tranporte hacia el destino"  
                                onChange={(event) => handleChangeInput(index, event)}
                            />
                        </Stack>
                        
                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                            <FormControlLabel
                                control={<Checkbox />} 
                                name="transfers"
                                label="Transporte en el destino"  
                                onChange={(event) => handleChangeInput(index, event)}
                            />

                            <FormControlLabel
                                control={<Checkbox />} 
                                name="food"
                                label="Alimentación"  
                                onChange={(event) => handleChangeInput(index, event)}
                            />
                            
                        </Stack>

                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                            <TextField
                                type="number"
                                name="nightsNum"
                                variant='outlined'
                                color='secondary'
                                label="Número de noches"
                                onChange={(event) => handleChangeInput(index, event)}
                                value={inputField.nightsNum}
                                fullWidth
                                required
                            />

                            <TextField
                                type="number"
                                name="daysNum"
                                variant='outlined'
                                color='secondary'
                                label="Número de días"
                                onChange={(event) => handleChangeInput(index, event)}
                                value={inputField.daysNum}
                                fullWidth
                                required
                            />
                            
                        </Stack>

                        <div style={{height:'auto', display: 'flex', flexDirection:'row', marginBottom:'5%'}}>
                            <button onClick={() => handleRemoveFields(index)} style={{marginRight:'5%'}}>
                            <DeleteIcon />
                            </button>

                            <button onClick={() => handleAddFields()}>
                            <AddIcon />
                            </button>
                        </div>

                    </div>
                ))}
                
                
                <button className= 'saveBttn' type="submit" style={{marginBottom:'15px'}}>Guardar</button>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>
            <div className='circle-clients'> </div>
        
            </div>
        </div>
    );


    
  }

export default PlanRegistration;