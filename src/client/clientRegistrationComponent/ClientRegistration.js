import React from 'react';
import "./ClientRegistration.css"
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientService from '../../service/ClientService';
import moment from 'moment';
import  {useState, useEffect} from 'react';
import axios from "axios"

export function ClientRegistration(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setId] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [idType, setIdType] = useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [idTypes,setIdTypes] = useState([])
    const regex = /[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/;
    

    const [url,setUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png')


    useEffect(() => {
        ClientService.getIdTypes().then((response) => {
            setIdTypes(response);
            console.log(idTypes)
        });  
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(firstName, lastName, id, dateOfBirth, phone, sex,  idType,url) 

        const adult = moment().diff(dateOfBirth, 'years')


        if(regex.test(firstName) || regex.test(lastName)){
            setErrorMessage('El nombre y el apellido no pueden contener números o caracteres especiales.');

        }else if(adult < 18){
            setErrorMessage('Necesita tener más de 18 años.');

        }else{
            ClientService.registerClient(firstName, lastName, id, dateOfBirth, phone, sex, idType,url).then(
                (response) => {
    
                    navigate('/clients');
    
                }).catch(
                (error) => {
                    
                });
        }


    };

    const handleGoBackClick = async(e) => {
        navigate('/clients')
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
        <div className='container-registerClient'>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar>
            <button style={{alignSelf: 'flex-start', justifySelf: 'start'}} onClick={handleGoBackClick}>
                Regresar
            </button>
        </TopBar>
        <SideBar/>
        <div className='content'>

        
        <div className='formDivClient'>
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
                width: '10%',
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
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Número de identificación"
                        onChange={e => setId(e.target.value)}
                        value={id}
                        required
                        sx={{mb: 4}}
                    />
                    <FormControl sx={{width:'50%'}} >
                        <InputLabel>Tipo de identificación</InputLabel>
                        <Select
                            type="text"
                            value={idType}
                            variant='outlined'
                            color='secondary'
                            label="idType"
                            onChange={e => setIdType(e.target.value)}
                            required
                            x={{mb: 4}}
                        >
                            {idTypes.map((type) => (
                                <MenuItem value={type.id}>{type.code}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <TextField
                    type="number"
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
            
            
            </div>
            <div className='circle-clients'> </div>
        </div>
        
    );
    
  }

export default ClientRegistration;