import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import userPhoto from '../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';



const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    Width: '100%',
    height:'10vh',
    color: theme.palette.text.primary,
  }));




const  PlanCard = ({plan}) => {

    const navigate = useNavigate();

    const handleViewPlan = async (e) => {

        const client = await ClientService.getClient(plan.client);
        navigate('/plan',{state: {clientObj: plan, clientInfo: client}});
    }

    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3}}>
            <StyledPaper
                sx={{
                my: 1,
                mx: 'auto',
                p: 2,
            
                }}
            >
                <Grid container wrap="nowrap" spacing={2} alignItems="center">
                <Grid item xs zeroMinWidth>
                    <Typography noWrap sx={{ fontWeight: 'bold' }}>{plan.name}</Typography>
                    <Typography noWrap >Code. {plan.code}</Typography>
                </Grid>
                <Grid item xs zeroMinWidth textAlign={'right'}>
                    <Button className='classes.buttonStyle' sx={{
                        width:'fit-content', 
                        height:'fit-content', 
                        color:'#46ad95', 
                        borderRadius:10,
                        '&:hover': {
                            color: "white",
                            backgroundColor:'#46ad95'
                          }
                        }} onClick={handleViewPlan}>
                        <RemoveRedEyeIcon/>
                    </Button>
                </Grid>
                </Grid>
            </StyledPaper>
        </Box>
    );
}

export default PlanCard