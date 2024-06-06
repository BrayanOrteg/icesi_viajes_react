import React from 'react';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import  {useState, useEffect} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EmployeeService from '../service/EmployeeService';
import { useLocation } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PlanService from '../service/PlanService';
import { PieChart } from '@mui/x-charts/PieChart';



export function Chart(){


    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesData = await PlanService.getTopTypes();
                
                 const sortedTypes = typesData.sort((a, b) => b.number - a.number);
                
                 const topThreeTypes = sortedTypes.slice(0, 3);
                 
                 setTypes(topThreeTypes);

                 console.log(typesData);

            } catch (error) {
                console.log(error);
            }
        };

        fetchTypes();
    }, []);
  
    
    return (
        <div className='chartDiv'>

        <PieChart sx={{backgroundColor:"white", borderRadius:"2%"}}
                series={[
                    {
                    data:types.map((type) => (
                            {label: type.name, value: type.number}
                        ))
                    ,
                    },
                ]}
                width={400}
                height={200}
                
            />

        </div>
        
    );
    
  }

export default Chart;