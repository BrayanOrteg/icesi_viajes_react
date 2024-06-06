import React from 'react';
import './Destination.css';
import SideBar from '../../Components/SideBar';
import TopBar from '../../Components/TopBar';
import { useLocation } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DestinationService from '../../service/DestinationService';
import { useNavigate } from 'react-router-dom';
import userPhoto from '../../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';
import {getUserRole} from '../../axios_helper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Client(){

    const [seaCheck, setSeaCheck] = useState(false);
    const [airCheck, setAirCheck] = useState(false);
    const [landCheck, setLandCheck] = useState(false);
    const [role, setRole] = useState(getUserRole());
    
    const navigate = useNavigate();

    const location = useLocation();

    let clientObj = location.state.clientObj;

    useEffect(() => {

        if (clientObj.bySea === "True") {

            setSeaCheck(true)
        } 
        if (clientObj.byAir === "True") {

            setAirCheck(true)
        } 
        if (clientObj.byLand === "True") {

            setLandCheck(true)
        } 
       
    }, []);

    console.log(clientObj.by_sea)
    console.log(seaCheck)


    
    const handleClick = async (e) => {
        e.preventDefault();
        
        DestinationService.deleteDestination(clientObj.id).then(
            (response) => {
                navigate('/destinations');
    
            }).catch(
            (error) => {
                console.log(error)
            });
    };

    const handleEditClick = async (e) => {
        e.preventDefault();

        navigate('/destination/edit',{
            state: {
              clientObj: clientObj,
            }})
    };

    const handleGoBackClick = async(e) => {
        navigate('/destinations')
    };

    return (
        <html className='client-html-body'>
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
        <TopBar>
            <button style={{alignSelf: 'flex-start', justifySelf: 'start'}} onClick={handleGoBackClick}>
            < ArrowBackIcon/>
            </button>
        </TopBar>
        <SideBar/>
        <body className='client-html-body'>
            
            <div className='container-destination'>
                
                <div className='personalInfo-client'>

                    <h2 className='tittleClientInfo-client'>Información del destino</h2>

                    <div className='clientInformation-client'>
                        
                        <h3 className="textClientInformation-client">Código</h3>
                        <span className="textClientInformation-client">{clientObj.code}</span>
                   
                        <h3 className="textClientInformation-client">Descripción</h3>
                        <span className="textClientInformation-client">{clientObj.description}</span>

                        <h3 className="textClientInformation-client">Precio</h3>
                        <span className="textClientInformation-client">{clientObj.price}</span>

                        <h3 className="textClientInformation-client">Acceso</h3>
                        <div style={{justifyContent:'space-between'}} >
                            
                            {airCheck && <>
                            <input name="chkBox_1" type="checkbox" 
                                disabled checked value="1" style={{ marginLeft:'5%'}}/>
                            <label for="chkBox_1" style={{marginRight:'5%'}}>
                                Aire
                            </label> </>
                            }

                            {!airCheck && <>
                            <input name="chkBox_1" type="checkbox" 
                                disabled value="1" style={{ marginLeft:'5%'}}/>
                            <label for="chkBox_1" style={{marginRight:'5%'}}>
                                Aire
                            </label> </>
                            }
                            
                            {seaCheck && <>
                            <input name="chkBox_1" type="checkbox"
                                disabled checked value="1" style={{ marginLeft:'5%'}}/>
                            <label for="chkBox_1" style={{marginRight:'5%'}}>
                                Mar
                            </label> </>
                            }

                            {!seaCheck && <>
                            <input name="chkBox_1" type="checkbox"
                                disabled value="1" style={{ marginLeft:'5%'}}/>
                            <label for="chkBox_1" style={{marginRight:'5%'}}>
                                Mar
                            </label> </>
                            }

                            {landCheck && <>
                            <input name="chkBox_1" type="checkbox"
                                disabled checked value="1" style={{ marginLeft:'5%'}}/>
                            <label for="chkBox_1" style={{marginRight:'5%'}}>
                                Tierra
                            </label></>
                            }

                            {!landCheck && <>
                            <input name="chkBox_1" type="checkbox"
                                disabled value="1" style={{ marginLeft:'5%'}}/>
                            <label for="chkBox_1" style={{marginRight:'5%'}}>
                                Tierra
                            </label></>
                            }

                        </div>

                    </div>

                </div>

                <div className='photo-client'>
                    
                    <Avatar src={clientObj.image} style={{
                        width: '160px',
                        height: '160px',
                        minWidth: '160px', 
                        minHeight: '160px', 
                    }}></Avatar>
                    <span className="name-client">{clientObj.name}</span>  

                    {['ADMIN', 'AGENT'].includes(role) && (
                        <div className='container-buttons'>
                        <button 
                            className='button-deleteClient' 
                            style={{ width: '10%', marginRight: '10%' }} 
                            onClick={handleClick}
                        >
                            <DeleteIcon sx={{ color: 'white' }} />
                        </button>
                        <button 
                            className='button-editClient' 
                            style={{ width: '10%', marginRight: '10%' }} 
                            onClick={handleEditClick}
                        >
                            <EditIcon sx={{ color: 'white' }} />
                        </button>
                        </div>
                    )}

                 </div>


                <div className='preferenceInfo-client'>

                    <h2 className='tittleClientInfo-client'>Tipos</h2>
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

  