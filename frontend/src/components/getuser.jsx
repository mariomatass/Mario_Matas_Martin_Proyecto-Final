import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextField, Paper, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Topbar from "./Topbar";

function Zonapruebas(){
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const [item, setItem] = useState({ nombre: '', login: '', password: '', rol:''})
    const [tableData, setTableData] = useState([])

    const handleSelectItem = (e) => {
        fetch('http://localhost:3030/getuser')
            .then(response => response.json())
            .then(response => {
                setTableData(response.data)
            })
    }

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }else{
            handleSelectItem()
        }
    }, [isLoggedin, navigate]);

    const handleSaveItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/adduser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                handleSelectItem()
                setItem({ nombre: '', login: '', password: '',rol:''})
                
            })
    }

    return<>
        <Topbar></Topbar>
        <Paper
                elevation={3}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '700px',
                }}
            >
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSaveItem}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 2,
                    }}
                >
                    <TextField
                        label="Nombre"
                        required
                        value={item.nombre}
                        onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Login"
                        required
                        value={item.login}
                        onChange={(event) => setItem({ ...item, login: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Contraseña"
                        required
                        value={item.password}
                        onChange={(event) => setItem({ ...item, password: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Rol"
                        required
                        value={item.rol}
                        onChange={(event) => setItem({ ...item, rol: event.target.value })}
                        sx={{ marginBottom: 2 }}
                    >

                    </TextField>
                    <Button type="submit" variant="contained">
                        Insertar
                    </Button>
                </Box>
                <TableContainer>
                    <Table aria-label="tablaPruebas">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: 'white' }}>id</TableCell>
                                <TableCell style={{ color: 'white' }}>nombre</TableCell>
                                <TableCell style={{ color: 'white' }}>login</TableCell>
                                <TableCell style={{ color: 'white' }}>password</TableCell>
                                <TableCell style={{ color: 'white' }}>rol</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {tableData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.login}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.rol}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                </TableContainer>
        </Paper>
    </>
}


export default Zonapruebas