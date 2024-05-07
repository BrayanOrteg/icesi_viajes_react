import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import userPhoto from '../Commons/exampleUser.jpg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

const  UserCard = ({userHeight, userWidth}) => {

    return (
        <Card sx={{ display: 'flex', alignItems: 'center' }}> {/* Añade alignItems: 'center' para centrar verticalmente */}
            <CardMedia>
                <Avatar
                    sx={{ width: userWidth, height: userHeight}}
                    src={userPhoto}
                />
            </CardMedia>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Stack direction="row" spacing={2}>
                        <Typography component="div" sx={{fontSize:20}}>
                            Live From Space
                        </Typography>
                        <button>Cerrar Sesión</button>
                    </Stack>
                </CardContent>
            </Box>
        </Card>
    );
}

export default UserCard
