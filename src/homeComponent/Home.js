import React from 'react';
import './Home.css';
import destinationsImage from './assets/Book.png';
import userImage from './assets/User.png';
import analysisImage from './assets/Analyze.png';
import addBookingImage from './assets/Add.png';
import logo from './assets/logo_icesi.png';


export default class Home extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        logout: props.logout,
      };
  };

  onLogout = () => {
    this.state.logout();
  };

  render(){
    
    return (
        <html className='home-html-body'>
          <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
          <body className='home-html-body'>
              <button type="submit" className='logout' onClick={this.onLogout} >Cerrar Sesión</button>

              <div className='options-home'> 

                <img src={logo} className='logoApplication-in-home'/>

                <div id='destinations-catalogue' className='options-configuration'> 

                <img src={destinationsImage} className='images-in-options'/>
                  <h4 className='options-whiteText'>
                      Catálogo de Destinos
                  </h4>

                </div>

                <div id='clients-list' className='options-configuration'>

                <img src={userImage} className='images-in-options'/>
                  <h4 className='options-whiteText'>
                        Lista de Clientes
                  </h4>

                </div>

                <div id='analysis-page' className='options-configuration'>

                <img src={analysisImage} className='images-in-options'/>
                  <h4 className='options-whiteText'>
                      Página de análisis
                  </h4>

                </div>

                <div id='new-booking' className='options-configuration'>

                <img src={addBookingImage} className='images-in-options'/>
                  <h4 className='options-whiteText'>
                      nueva reserva
                  </h4>

                </div>
              </div>
              <div className='circle-home'> </div>
          </body>
        </html>
        
    );
  }
}

