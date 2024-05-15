import React from 'react';
import './ClientRegistration.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import  {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';


export function ClientRegistration(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, dateOfBirth, password) 
    }


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
                        type="id"
                        variant='outlined'
                        color='secondary'
                        label="Número de identificación"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="idType"
                        variant='outlined'
                        color='secondary'
                        label="Tipo de identificación"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                </Stack>
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Teléfono"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
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
                <TextField
                        type="sex"
                        variant='outlined'
                        color='secondary'
                        label="Sexo"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                <Button variant="outlined" color="secondary" type="submit">Guardar</Button>
            </form>
            </div>
     

            <div className='circle-clients'> </div>
        </body>
        </html>
        
    );
    
  }

export default ClientRegistration;