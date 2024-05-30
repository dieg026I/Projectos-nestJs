import React, { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";

const BookManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('publicaciones');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cardStyle = {
        borderRadius: "20px",
        width: isSmallScreen ? '90%' : '1100px', // Ajusta el ancho para pantallas pequeñas
        // ... otros estilos ...
    };


    {/* Titulos */}
    const getTitle = () => {
        switch (activeTab) {
            case 'publicaciones':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Publicaciones</Typography>;
            case 'compras':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Compras</Typography>;
            case 'ventas':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Ventas</Typography>;
            default:
                return "";
        }
    };
    
    {/* Contenido Pestañas */}
    const getContent = () => {
        switch (activeTab) {
            case 'publicaciones':
                return (
                    <TableContainer component={Paper} style={{padding:"0"}}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor:"#d2efff"}}>
                                    <TableCell align="center">Producto</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                    <TableCell align="center">Stock</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        <Button variant="contained">Producto</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained">Estado</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained">Stock</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained">Total</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained">Acciones</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            case 'compras':
                return (
                    <>
                        <div style={{justifyContent:"center", textAlign:"center"}}>
                            <h4>Aún no tienes Compras</h4>
                        </div>

                    </>
                );
            case 'ventas':
                return (
                    <>
                        <div style={{justifyContent:"center", textAlign:"center", alignContent:"center"}}>
                            <h4>Aún no tienes Ventas</h4>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <NavBarLogin />
            <div className="gestion">
                <Box className="fondoVenta" sx={{ position: 'relative', width: '100%' }}>
                        {/* Pestaña "Publicaciones" */}
                        <Box sx={{
                            ...tabStyle,
                            right: 'calc(70% - 100px)'
                        }} onClick={() => setActiveTab('publicaciones')}>
                            <Typography variant="body2">Publicaciones</Typography>
                        </Box>

                        {/* Pestaña "Compras" */}
                        <Box sx={{
                            ...tabStyle,
                            right: 'calc(50% - 100px)',
                        }} onClick={() => setActiveTab('compras')}>
                            <Typography variant="body2">Compras</Typography>
                        </Box>

                        {/* Pestaña "Ventas" */}
                        <Box sx={{
                            ...tabStyle,
                            right: 'calc(30% - 100px)',
                        }} onClick={() => setActiveTab('ventas')}>
                            <Typography variant="body2">Ventas</Typography>
                        </Box>
                    
                    <Card sx={{
                        marginTop: "90px",
                        borderRadius: "20px",
                        width: "1100px",
                        maxWidth: "1400px",
                        height: "550px",
                        maxHeight: "100%",
                        display: 'flex', 
                        flexDirection: 'column' 
                    }}>
                        {/* Título Dinámico */}
                        <CardContent style={{ backgroundColor: "#002E5D", textAlign: "center" }}>
                            {getTitle()}
                        </CardContent>

                        {/* Contenido Dinámico */}
                        <CardContent style={{ flexGrow: 1, padding:"0" }}>
                            {getContent()}
                        </CardContent>
                        
                        <CardContent sx={{ backgroundColor: "#002E5D" }}></CardContent>
                    </Card> 
                </Box>
            </div>
            <Footer />
        </>
    );
};

// Estilos comunes para las pestañas
const tabStyle = {
    position: 'absolute',
    top: '95px',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '20px 20px 0 0',
    zIndex: '1200',
    width: "200px",
    height: "40px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer' // Agrega el cursor de mano al pasar el mouse
};

export default BookManagement;
