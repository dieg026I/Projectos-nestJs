import SideMenu from "../../components/sideMenu/sideMenu";

import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";

const checkBook = { inputProps: { 'aria-label': 'Checkbox demo' } };

const BookAdmin: React.FC = () => {

    return (
        <Box display="flex" sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: '100%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Libros</h2>
                </div>
                <br />
                <div style={{ justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor:"#ffffff",  margin:"20px", marginLeft:"30px", marginRight:"30px"   }}>
                    
                    <Card >
                        <Grid  container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center" >
                            <Grid className="text-center" item xs={12} sm={3} md={6} lg={6}>
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Buscar"
                                    style={{margin:"20px", width: "500px", height:"35px", borderRadius:"20px", paddingLeft:"15px", borderColor:"#7A7A7A", color:"#7A7A7A"}}
                                    
                                /> {/*placeholder={value}*/}
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button href="/" variant="contained" style={{ textTransform: "none", backgroundColor: '#7A7A7A', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Modificar
                                </Button>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button href="/" variant="contained" style={{ textTransform: "none", backgroundColor: '#0b9000', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Agregar
                                </Button>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button href="/" variant="contained" style={{ textTransform: "none", backgroundColor: '#ff5252', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>

                        <TableContainer component={Paper} style={{ padding: '0', height:"600px" }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#d2efff' }}>
                                    <Checkbox {...checkBook} />
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Lib</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Nombre</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Autor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Vendedor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Precio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <Checkbox {...checkBook} />
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
                    </Card>
                </div>
                
            </Box>
        </Box>
    );

};

export default BookAdmin;
