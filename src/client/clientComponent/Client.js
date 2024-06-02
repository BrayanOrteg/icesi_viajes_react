import React from 'react';
import './Client.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '@mui/material';
import ClientService from '../../service/ClientService';
import { useNavigate } from 'react-router-dom';
import userPhoto from '../../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import zIndex from '@mui/material/styles/zIndex';

export default function Client(){
    
    const navigate = useNavigate();

    const location = useLocation();

    let clientObj = location.state.clientObj;

    const handleClick = async (e) => {
        e.preventDefault();
        
        ClientService.deleteClient(clientObj.id).then(
            (response) => {
    
                navigate('/clients');
    
            }).catch(
            (error) => {
                console.log(error)
            });
    };

    const handleEditClick = async (e) => {
        e.preventDefault();

        navigate('/client/edit',{
            state: {
              clientObj: clientObj,
            }})
    };

    const handleGoBackClick = async(e) => {
        navigate('/clients')
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
            
            <div className='container-client'>
                
                <div className='personalInfo-client'>

                    <h2 className='tittleClientInfo-client'>Información del cliente</h2>

                    <div className='clientInformation-client'>

                   
                        
                 
                        <h3 className="textClientInformation-client">Número de identificación</h3>
                        <span className="textClientInformation-client">{clientObj.nationalID}</span>
                   
                        <h3 className="textClientInformation-client">Teléfono</h3>
                        <span className="textClientInformation-client">{clientObj.tel1}</span>

                        <h3 className="textClientInformation-client">Sexo</h3>
                        <span className="textClientInformation-client">{clientObj.sex}</span>

                    </div>

                </div>

                <div className='photo-client'>
                    
                    <Avatar src={userPhoto} style={{
                        width: '160px',
                        height: '160px',
                        minWidth: '160px', 
                        minHeight: '160px', 
                    }}></Avatar>
                    <span className="name-client">{clientObj.name}</span>  

                    <div className='container-buttons'>

                        <button className= 'button-deleteClient' style={{width: '10%', marginRight:'10%'}} onClick= {handleClick}>
                        <DeleteIcon sx={{color:'white'}}/>
                        </button>

                        <button className= 'button-editClient' style={{width: '10%',  marginRight:'10%'}} onClick= {handleEditClick}>
                        <EditIcon sx={{color:'white'}}/>
                        </button>

                    </div> 

                 </div>


                <div className='preferenceInfo-client'>

                    <h2 className='tittleClientInfo-client'>Preferencias</h2>
                    <div className='clientPreferences-client'>
                        
                        <p>EMPTY</p>
                    </div>

                </div>

            </div>


            <div className='circle-clients'> </div>

        </body>
        </html>
        
    );
    
  }

  