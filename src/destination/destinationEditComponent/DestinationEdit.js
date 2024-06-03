import React from 'react';
import './DestinationEdit.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import  {useState, useEffect} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../../service/ClientService';
import moment from 'moment';
import DestinationService from '../../service/DestinationService';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from "react-router-dom";

export function DestinationEdit(){


    const location = useLocation();

    let clientObj = location.state.clientObj;

    const [name,setName] = useState(clientObj.name)
    const [code,setCode] = useState(clientObj.code)
    const [description, setDescription] = useState(clientObj.description)
    const [price, setPrice] = useState(clientObj.price)
    const [url,setUrl] = useState(clientObj.image)

    const [byLandLabel, setByLandLabel] = useState(clientObj.byLand)
    const [bySeaLabel, setBySeaLabel] = useState(clientObj.bySea)
    const [byAirLabel, setByAirLabel] = useState(clientObj.byAir)

    const [byLandVar, setByLandVar] = useState(false)
    const [bySeaVar, setBySeaVar] = useState(false)
    const [byAirVar, setByAirVar] = useState(false)

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;

    useEffect(() => {

        if (bySeaLabel === 'True'){
            setBySeaVar(true)
        }
        if (byAirLabel === 'True'){
            setByAirVar(true)
        }
        if (byLandLabel === 'True'){
            setByLandVar(true)
        }
        
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(code,name, description, price, byLandLabel, bySeaLabel, byAirLabel,url) 


        if(regex.test(name)){
            setErrorMessage('El nombre no puede contener números o caracteres especiales.');

        }else{

            DestinationService.updateDestination(clientObj.id,code, name,description, price, byLandLabel, bySeaLabel, byAirLabel,url).then(
                (response) => {
    
                    navigate('/destinations');
    
                }).catch(
                (error) => {
                    
            });
          
        }

    };

    const handleGoBackClick = async(e) => {
        navigate('/destination',{
            state: {
              clientObj: clientObj,
            }})
    };


    const handleSea = async(e) => {
        if (e.target.checked === true){
            setBySeaLabel('True')
        }else{
            setBySeaLabel('False')
        }
    };

    const handleAir = async(e) => {
        if (e.target.checked === true){
            setByAirLabel('True')
        }else{
            setByAirLabel('False')
        }
    };

    const handleLand = async(e) => {
        if (e.target.checked === true){
            setByLandLabel('True')
        }else{
            setByLandLabel('False')
        }
    };


    return (
        <html className='client-html-body'>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar>
            <button style={{alignSelf: 'flex-start', justifySelf: 'start'}} onClick={handleGoBackClick}>
                Regresar
            </button>
        </TopBar>
        <SideBar/>
        <body className='client-html-body'>

        
        <div className='formDiv'>
            <h2>Registro del destino</h2>
            <form onSubmit={handleSubmit}>

            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField  sx={{marginBottom: 2}}
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nombre"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        fullWidth
                        required
                    />

                    <TextField  sx={{marginBottom: 2}}
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
                    <TextField sx={{marginBottom: 2}}
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Descripción"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        fullWidth
                        required
                    />


                <FormLabel component="legend">Formas de acceso</FormLabel>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                
                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Air"
                        checked={byAirVar}
                        onClick={(e) => setByAirVar(!byAirVar)}
                        onChange={handleAir}
                        />

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Mar"  
                        checked={bySeaVar}
                        onClick={(e) => setBySeaVar(!bySeaVar)}
                        onChange={handleSea}
                        />

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Tierra"  
                        checked={byLandVar}
                        onClick={(e) => setByLandVar(!byLandVar)}
                        onChange={handleLand}
                        />
     
                </Stack>
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Precio"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />

                <button className= 'saveBttn' type="submit">Guardar</button>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>
            
            <div className='circle-clients'> </div>
        </body>
        </html>
        
    );
    
  }

export default DestinationEdit;