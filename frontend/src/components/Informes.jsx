import { Button, Paper, Tooltip } from "@mui/material"
import Topbar from "./Topbar"
import React, { useState, useEffect } from "react";
import InformeColeccion from "./InformeColeccion";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InformeUsuarios from "./InformeUsuarios";

function Informes() {
    const [botonClicked, setBotonClicked] = useState(false)
    const [botonClicked2, setBotonClicked2] = useState(false)
    const [tableInform, setTableInform] = useState([])
    const [tableInform2, setTableInform2] = useState([])
    const userData = useSelector(state => state.login);
    const navigate = useNavigate();
    const isLoggedin = userData.isAutenticated;

    const handleShowInfo  = (e) => {
        fetch('http://localhost:3030/getItems')
            .then(response => response.json())
            .then(response => {
                setTableInform(response.data)
                setBotonClicked(true)
            })
        
    }
    const handleShowInfo2  = (e) => {
        fetch('http://localhost:3030/getuser')
            .then(response => response.json())
            .then(response => {
                setTableInform2(response.data)
                setBotonClicked2(true)
            })
        
    }

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    return <>
        <Topbar></Topbar>
        <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Tooltip title="Obtener Informe Colección" arrow>
                <Button 
                    variant="contained"
                    onClick={handleShowInfo}
                >
                    INFORME DE COLECCIÓN
                </Button>
            </Tooltip>
            <Tooltip title="Obtener Informe Usuarios" arrow>
                <Button 
                    variant="contained"
                    onClick={handleShowInfo2}
                >
                    INFORME DE USUARIOS
                </Button>
            </Tooltip>
        </Paper>
        {botonClicked===true && <InformeColeccion datos = {tableInform}/>}
        {botonClicked2===true && <InformeUsuarios datos = {tableInform2}/>}
    </>
}
export default Informes