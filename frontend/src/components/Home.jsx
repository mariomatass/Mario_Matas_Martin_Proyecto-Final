import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, MenuItem } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Topbar from "./Topbar"
import { Tooltip } from "@mui/material";

function Home() {
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;
    const [item, setItem] = useState({
        tipo: '',
        asignatura: '',
        editorial: '',
        curso: '',
        cantidad: 1,
        autor: '',
        nombreLibro: ''
    });
    const [tableData, setTableData] = useState([]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        } else {
            handleSelectItem()
        }
    }, [isLoggedin, navigate]);

    const handleSaveItem = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3030/addItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                handleSelectItem();
                setItem({
                    tipo: '',
                    asignatura: '',
                    editorial: '',
                    curso: '',
                    cantidad: 1,
                    autor: '',
                    nombreLibro: ''
                });
            })
    };

    const handleSelectItem = () => {
        fetch('http://localhost:3030/getItems')
            .then(response => response.json())
            .then(response => {
                setTableData(response.data);
            });
    };

    const handleDeleteItem = (id) => {
        fetch(`http://localhost:3030/deleteItem?id=${id}`)
            .then(response => response.json())
            .then(response => {
                handleSelectItem();
            });
    };

    console.log(userData);

    return (
        <>
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
                        label="Tipo"
                        select
                        required
                        value={item.tipo}
                        onChange={(event) => {
                            const value = event.target.value;
                            setItem({ ...item, tipo: value });
                            if (value === 'Libro de texto' || value === 'Libro de lectura' || value === 'Otro') {
                                setShowAdditionalFields(true);
                            } else {
                                setShowAdditionalFields(false);
                            }
                        }}
                        sx={{ marginBottom: 2 }}
                    >
                        <MenuItem value="Libro de texto">Libro de texto</MenuItem>
                        <MenuItem value="Libro de lectura">Libro de lectura</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </TextField>
                    {showAdditionalFields && item.tipo === 'Libro de texto' && (
                        <>
                            <TextField
                                label="Asignatura"
                                required
                                value={item.asignatura}
                                onChange={(event) => setItem({ ...item, asignatura: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Editorial"
                                required
                                value={item.editorial}
                                onChange={(event) => setItem({ ...item, editorial: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Curso"
                                required
                                value={item.curso}
                                onChange={(event) => setItem({ ...item, curso: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Cantidad"
                                type="number"
                                value={item.cantidad}
                                onChange={(event) => setItem({ ...item, cantidad: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                        </>
                    )}
                    {showAdditionalFields && item.tipo === 'Libro de lectura' && (
                        <>
                            <TextField
                                label="Autor"
                                required
                                value={item.autor}
                                onChange={(event) => setItem({ ...item, autor: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Nombre del libro"
                                required
                                value={item.nombreLibro}
                                onChange={(event) => setItem({ ...item, nombreLibro: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Cantidad"
                                type="number"
                                value={item.cantidad}
                                onChange={(event) => setItem({ ...item, cantidad: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                        </>
                    )}
                    {showAdditionalFields && item.tipo === 'Otro' && (
                        <>
                            <TextField
                                label="Autor"
                                required
                                value={item.autor}
                                onChange={(event) => setItem({ ...item, autor: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Nombre de la obra"
                                required
                                value={item.nombreLibro}
                                onChange={(event) => setItem({ ...item, nombreLibro: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Cantidad"
                                type="number"
                                value={item.cantidad}
                                onChange={(event) => setItem({ ...item, cantidad: event.target.value })}
                                sx={{ marginBottom: 2 }}
                            />
                        </>
                    )}
                    {userData.userRol !== 'invitado' && <Tooltip title="Añadir registro" arrow><Button type="submit" variant="contained">Insertar</Button></Tooltip>}
                </Box>
                <TableContainer>
                    <Table aria-label="tabla">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ color: 'black' }}>Tipo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedTableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {userData.userRol === 'admin' &&
                                            <Tooltip title="Borrar" arrow>
                                                <Button onClick={() => handleDeleteItem(row.id)}>
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </Tooltip>}
                                    </TableCell>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.marca}</TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>{row.precio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}

export default Home;
