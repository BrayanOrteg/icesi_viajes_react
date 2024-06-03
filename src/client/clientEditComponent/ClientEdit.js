import React from 'react';
import './ClientEdit.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import  {useState} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../../service/ClientService';
import { useLocation } from "react-router-dom";
import moment from 'moment';


export function ClientEdit(){

    const location = useLocation();

    let clientObj = location.state.clientObj;

    const [firstName, setFirstName] = useState(clientObj.firstName)
    const [lastName, setLastName] = useState(clientObj.lastName)
    const [id, setId] = useState(clientObj.nationalID)
    const [dateOfBirth, setDateOfBirth] = useState( new Date(clientObj.birthDate).toISOString().split('T')[0])

    console.log(new Date(clientObj.birthDate).toISOString().split('T')[0])
    const [phone, setPhone] = useState(clientObj.tel1)
    const [sex, setSex] = useState(clientObj.sex)

    console.log(clientObj.sex)
    const [idType, setIdType] = useState(clientObj.typeNID)
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;

    const [url,setUrl] = useState(clientObj.image)



    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(firstName, lastName, id, dateOfBirth, phone, sex,  idType,url) 

        const adult = moment().diff(dateOfBirth, 'years')


        if(regex.test(firstName) || regex.test(lastName)){
            setErrorMessage('El nombre y el apellido no pueden contener números o caracteres especiales.');

        }else if(adult < 18){
            setErrorMessage('Necesita tener más de 18 años.');

        }else{
            ClientService.updateClient(clientObj.id, firstName, lastName, id, dateOfBirth, phone, sex, idType,url).then(
                (response) => {
    
                    navigate('/clients');
    
                }).catch(
                (error) => {
                    
                });
        }
    };

    const handleGoBackClick = async(e) => {
        navigate('/client',{
            state: {
              clientObj: clientObj,
            }})
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
            <h2>Editar cliente</h2>
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

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            <div className='circle-clients'> </div>
        </body>
        </html>
        
    );
    
  }

export default ClientEdit;