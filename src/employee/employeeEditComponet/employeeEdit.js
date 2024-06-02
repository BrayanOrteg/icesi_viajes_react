import React from 'react';
import './employeeEdit.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import  {useState} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../service/EmployeeService';
import { useLocation } from "react-router-dom";
import moment from 'moment';

export function EmployeeEdit(){

    const location = useLocation();

    let clientObj = location.state.clientObj;

    const [name, setName] = useState(clientObj.name)
    const [nationalID, setNationalID] = useState(clientObj.nationalID)
    const [userName, setUserName] = useState(clientObj.login)
    const [role, setRole] = useState(clientObj.role)
    const [password, setPassword] = useState(clientObj.password)
    const [id, setId] = useState(clientObj.id)
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-Z\s]/

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(userName, password, name, id,role) 

        if(regex.test(name) || regex.test(role)){
            setErrorMessage('El nombre y el rol no puede contener números o caracteres especiales.');

        }else{
            EmployeeService.updateEmployee(userName, password, name, id,role, nationalID).then(
                (response) => {
    
                    navigate('/employees');
    
                }).catch(
                (error) => {        
                });
        }

    };

    const handleGoBackClick = async(e) => {
        navigate('/employee',{state: {clientObj: clientObj,}})
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
            <h2>Registro de cliente</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Nombre completo"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    fullWidth
                    required
                />
                <Stack spacing={2} direction="row" sx={{marginBottom: 4, marginTop: 4}}>
                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Número de identificación"
                        onChange={e => setNationalID(e.target.value)}
                        value={nationalID}
                        required
                
                    />
                    <FormControl sx={{width:'50%'}}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            type="text"
                            value={role}
                            variant='outlined'
                            color='secondary'
                            label="Rol"
                            onChange={e => setRole(e.target.value)}
                            fullWidth
                            required
                            
                        >
                            <MenuItem value={'ADMIN'}>Administrador</MenuItem>
                            <MenuItem value={'AGENT'}>Agente</MenuItem>
                            <MenuItem value={'VIEWER'}>Observador</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Nombre de usuario"
                        onChange={e => setUserName(e.target.value)}
                        value={userName}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />

                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="contraseña"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    
                </Stack>


                <button className= 'saveBttn' type="submit" onClick={handleSubmit}>Guardar</button>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>
            
            <div className='circle-clients'> </div>
        </body>
        </html>
        
    );
    
  }

export default EmployeeEdit;