import React from 'react';
import './PlanRegistration.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import { TextField , Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';
import moment from 'moment';
import  {useState, useEffect} from 'react';
import PlanDetailRegistration from '../planDetailRegistrationComponent/PlanDetailRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';


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

    const [inputFields, setInputFields] = useState([
        {food:false,lodging:false, transport:false, transfers:false, cost:'', destinationId:'', modifyDate: new Date().toDateString(),  daysNum:'', nightsNum:''}
    ]);


    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [idTypes,setIdTypes] = useState([])
    const regex = /[^a-zA-Z\s]/


    useEffect(() => {

        setInputFields([{food:false,lodging:false, transport:false, transfers:false, cost:'', destinationId:'', modifyDate: new Date().toDateString(),  daysNum:'', nightsNum:''}])

        ClientService.getIdTypes().then((response) => {
            setIdTypes(response);
            console.log(idTypes)
        });  
    }, []);

    
    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
        console.log(inputFields)
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, {food:false,lodging:false, transport:false, transfers:false, cost:'', destinationId:'', modifyDate: new Date().toDateString(),  daysNum:'', nightsNum:''}]);
      };
    
    const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    };

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
        
            <div className='formDiv' style={{height:'auto', display: 'flex', flexDirection:'column'}}>
            <form onSubmit={handleSubmit} className='form' style={{width:'70%', height:'100%', display:'flex'}}>
            <h2>Registro de cliente</h2>
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

                        <TextField sx={{marginBottom: 4}}
                        name="destinationId"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Destino"
                        onChange={(event) => handleChangeInput(index, event)}
                        value={inputField.destinationId}
                        fullWidth
                        required
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