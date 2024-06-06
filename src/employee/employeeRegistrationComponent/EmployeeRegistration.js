import React from 'react';
import './EmployeeRegistration.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import  {useState} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../../service/EmployeeService';
import moment from 'moment';
import axios from "axios"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function EmployeeRegistration(){

    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;

    const [url,setUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png')

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(userName, password, name, id,role,url) 

        if(regex.test(name)){
            setErrorMessage('El nombre no puede contener números o caracteres especiales.');

        }else{
            EmployeeService.registerEmployee(userName, password, name, id,role,url).then(
                (response) => {
    
                    navigate('/employees');
    
                }).catch(
                (error) => {        
                });
        }

    };

    const handleGoBackClick = async(e) => {
        navigate('/employees')
    };

    const changeUploadImage = async (e) => {

        const config = {
            headers: { "Content-Type": "multipart/form-data","X-Requested-With": "XMLHttpRequest" }
        };

        const file=e.target.files[0];


        console.log(e);
        console.log(file);
        const data =new FormData();

        data.append("file",file)
        data.append("upload_preset","Presets_react")    

        const response = await axios.post("https://api.cloudinary.com/v1_1/dcgdgnbj0/image/upload",data,config);

        setUrl(response.data.secure_url)

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

        
        <div className='formDiv'>
            <h2>Registro de cliente</h2>
            <form onSubmit={handleSubmit}>

            <Stack spacing={2} direction="row" sx={{marginBottom: 4, alignItems:"center"}}>

                <div >
                    <img  className='circleImage' src={url}  alt="Avatar" />
                </div> 


                <button  style={{
                fontFamily: 'Rubik',
                display: 'flex',
                backgroundColor: '#38AC91',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
                color: '#FFFFFF',
                width: '15%',
                height: '8%',
                textAlign: 'center',
                textDecoration: 'none',
                marginTop:'0%',
                padding:'0%'
                }}type="button" className='buttonFile'>

                    <label for="upload-photo" className='upload-label'>Subir Imagen</label>
                    <input
                    onChange={changeUploadImage}
                    accept="image/*"
                    type="file"
                    id="upload-photo"
                    hidden
                    />
                </button>

                </Stack>
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
                        onChange={e => setId(e.target.value)}
                        value={id}
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


                <button className= 'saveBttn' type="submit">Guardar</button>
                
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>
            
            <div className='circle-clients'> </div>
        </div>
        </div>
        
    );
    
  }

export default EmployeeRegistration;