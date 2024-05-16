import React from 'react';
import './Client.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '@mui/material';
import ClientService from '../service/ClientService';
import { useNavigate } from 'react-router-dom';
import userPhoto from '../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';

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

    return (
        <html className='client-html-body'>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar></TopBar>
        <SideBar/>
        <body className='client-html-body'>
            
            <div className='container-client'>
                
                <div className='personalInfo-client'>

                    <h2 className='tittleClientInfo-client'>Informacion del cliente</h2>

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
                 </div>

                
                <button className= 'button-deleteClient' onClick= {handleClick}>
                <DeleteIcon sx={{color:'red'}}/>

                </button>
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

  