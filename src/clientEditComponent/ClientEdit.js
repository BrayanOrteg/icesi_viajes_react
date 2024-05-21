import React from 'react';
import './ClientEdit.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import  {useState} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';


export function ClientRegistration(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setId] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [idType, setIdType] = useState('')
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(firstName, lastName, id, dateOfBirth, phone, sex,  idType) 

        ClientService.registerClient(firstName, lastName, id, dateOfBirth, phone, sex, idType).then(
            (response) => {

                navigate('/clients');

            }).catch(
            (error) => {
                
            });
    };


    return (
        <html className='client-html-body'>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar></TopBar>
        <SideBar/>
        <body className='client-html-body'>

        
        <div className='formDiv'>
            <h2>Registro de cliente</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nombre"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Apellido"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Número de identificación"
                        onChange={e => setId(e.target.value)}
                        value={id}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Tipo de identificación"
                        onChange={e => setIdType(e.target.value)}
                        value={idType}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                </Stack>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Teléfono"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <TextField
                    type="date"
                    variant='outlined'
                    color='secondary'
                    label="Date of Birth"
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <FormControl >
                <InputLabel>Sexo</InputLabel>
                <Select
                    type="text"
                    value={sex}
                    variant='outlined'
                    color='secondary'
                    label="Sex"
                    onChange={e => setSex(e.target.value)}
                    fullWidth
                    required
                    x={{mb: 4}}
                >
                    <MenuItem value={'M'}>Masculino</MenuItem>
                    <MenuItem value={'F'}>Femenino</MenuItem>
                </Select>
                </FormControl>

                <button className= 'saveBttn' type="submit">Guardar</button>
                
            </form>
            </div>

            <div className='circle-clients'> </div>
        </body>
        </html>
        
    );
    
  }

export default ClientRegistration;