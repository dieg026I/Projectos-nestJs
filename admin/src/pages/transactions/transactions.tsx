import SideMenu from "../../components/sideMenu/sideMenu";

import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";


const Transactions: React.FC = () => {
    return (
        <Box display="flex" sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: 'auto', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Gestión de compra y venta</h2>
                </div>
                <br />
                <div style={{ borderRadius:"20px" ,justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor:"#ffffff", margin:"20px", marginLeft:"30px", marginRight:"30px"  }}>
                    
                    <Card style={{borderRadius:"20px"}} >
                        <input
                            type="search"
                            name="search"
                            placeholder="Buscar"
                            style={{margin:"20px", width: "410px", height:"35px", borderRadius:"20px", paddingLeft:"15px", borderColor:"#7A7A7A", color:"#7A7A7A"}}
                            
                        /> {/*placeholder={value}*/}
                        <TableContainer component={Paper} style={{ padding: '0', height:"600px" }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#d2efff' }}>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Compra</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Publicación</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Nombre Libro</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Precio Libro</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Usuario Comprador</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Usuario Vendedor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Estado envío</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Tipo envío</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Fecha Trans</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Estado Compra</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Card>
                </div>
                
            </Box>
        </Box>
    );
};

export default Transactions;
