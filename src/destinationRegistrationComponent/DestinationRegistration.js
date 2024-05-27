import React from 'react';
import './DestinationRegistration.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import  {useState, useEffect} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';
import moment from 'moment';
import DestinationService from '../service/DestinationService';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';

export function DestinationRegistration(){

    const [name,setName] = useState('')
    const [code,setCode] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [types,setTypes] = useState([])
    const [selectedTypes,setSelectedTypes] = useState([])

    const [byLandLabel, setByLandLabel] = useState('False')
    const [bySeaLabel, setBySeaLabel] = useState('False')
    const [byAirLabel, setByAirLabel] = useState('False')


    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-Z\s]/

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        
        setSelectedTypes(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            maxwidth: 250,
          },
        },
    };

    useEffect(() => {
        DestinationService.getDestinationTypes().then((response) => {
            setTypes(response);
            console.log(types)
        });  
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(code,name, description, price, byLandLabel, bySeaLabel, byAirLabel, selectedTypes) 


        if(regex.test(name)){
            setErrorMessage('El nombre y la descripción no pueden contener números o caracteres especiales.');

        }else{

            DestinationService.registerDestination(code, name,description, price, byLandLabel, bySeaLabel, byAirLabel, selectedTypes).then(
                (response) => {
    
                    navigate('/destinations');
    
                }).catch(
                (error) => {
                    
            });
          
        }

    };

    const handleGoBackClick = async(e) => {
        navigate('/destinations')
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
                        onChange={handleAir}
                        />

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Mar"  
                        onChange={handleSea}
                        />

                    <FormControlLabel
                        control={<Checkbox />} 
                        label="Tierra"  
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

<InputLabel id="demo-multiple-checkbox-label">Tipo</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTypes}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              <Checkbox checked={selectedTypes.indexOf(type.name) > -1}/>
              <ListItemText primary={type.name}/>
            </MenuItem>
          ))}
        </Select>

                <button className= 'saveBttn' type="submit">Guardar</button>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>
            
            <div className='circle-clients'> </div>
        </body>
        </html>
    );
    
  }

export default DestinationRegistration;