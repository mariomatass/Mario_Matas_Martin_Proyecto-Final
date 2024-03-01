import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Typography, Box, TextField, Paper, Grid, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';

const spacingStyles = {
    margin: '8px',
    width: '95%'
};

const spacingAvatar = {
    margin: '8px',
};


function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({ user: '', pwd: '' })
    const handleSubmit = (e) => {
        e.preventDefault();
        isVerifiedUser()
        console.log('Login')
    }

    const isVerifiedUser = async () => {
        try {
            const response = await fetch(`http://localhost:3030/login?user=${data.user}&password=${data.pwd}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData && responseData.data && responseData.data.nombre !== undefined) {
                console.log(responseData.data.nombre);
                console.log(responseData.data.rol);

                console.log('entro y ahora navego');
                dispatch(loginActions.login({
                    name: responseData.data.nombre,
                    rol: responseData.data.rol
                }));
                navigate('/home');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };
    return <>
        <Grid
            container
            component="main"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid
                item
                component={Paper}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                xs={10}
                sm={8}
                md={6}
            >
                <Avatar variant="solid" style={spacingAvatar}></Avatar>
                <Typography align="center">Acceder</Typography>
                <Box
                    onSubmit={handleSubmit}
                    component="form"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    style={spacingStyles}
                    width="100%"
                >
                    <TextField
                        id="usuario"
                        label="Usuario"
                        variant="outlined"
                        style={spacingStyles}
                        value={data.user}
                        onChange={(event) => {
                            setData({ ...data, user: event.target.value });
                        }}
                    ></TextField>
                    <TextField
                        id="password"
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        style={spacingStyles}
                        value={data.pwd}
                        onChange={(event) => {
                            setData({ ...data, pwd: event.target.value });
                        }}
                    ></TextField>
                    <Tooltip title="Acceder" arrow>
                        <Button type="submit" variant="contained" style={spacingStyles}>
                            Entrar
                        </Button>
                    </Tooltip>
                </Box>
            </Grid>
        </Grid>
    </>
}
export default Login
