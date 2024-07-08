import { Box, Button, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Footer from "../../components/common/Footer/footer";
import { RiPencilFill } from "react-icons/ri";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";



const Wallet: React.FC = () => {

    return (

        <>
        <NavBarLogin />
        <Box className="fondoVenta" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} sm={10} md={5} lg={3}>
                    <Card sx={{ borderRadius:"20px", height:"auto", textAlign:"center", marginRight:"20px" }}>
                        <CardContent style={{ backgroundColor: "#002E5D", textAlign: "center", color:"#ffffff" }}>
                            <h3>Resumen</h3>
                        </CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:"30px", paddingBottom:"10px" }}>
                            
                            <h5>Saldo en Cuenta</h5>
                        
                            <Card style={{borderRadius:"30px", width:"280px", height:"40px", display:"flex", justifyContent:"space-between",textAlign: "center", alignContent:"center", alignItems:"center", paddingLeft:"20px", paddingRight:"20px"}}>
                                <div>Total</div>
                                <div>$0</div>
                            </Card>

                            <div style={{borderRadius:"30px", width:"280px", height:"40px", display:"flex", justifyContent:"space-between",textAlign: "center", alignContent:"center", alignItems:"center", paddingLeft:"20px", paddingRight:"20px"}}>
                                <div>Disponible</div>
                                <div>$0</div>
                            </div>
                            <div style={{borderRadius:"30px", width:"280px", height:"40px", display:"flex", justifyContent:"space-between",textAlign: "center", alignContent:"center", alignItems:"center", paddingLeft:"20px", paddingRight:"20px"}}>
                                <div>A Liberar</div>
                                <div>$0</div>
                            </div>

                        </div>
                        {/* Línea horizontal */}
                        <hr style={{ margin: "10px 0", opacity: 0.2 }} />

                        <div>
                            <Button 
                                href="/bookManagement" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: "#f05d16", 
                                height:"40px",
                                color: "#ffffff",  
                                borderRadius: '30px', 
                                border: '2px solid borderColor',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                                fontSize:"15px", 
                                marginBottom: "10px" ,
                                marginTop: "10px" ,
                                fontFamily: "SF Pro Display Bold",
                                }}
                                
                            >
                                Realizar retiro
                            </Button>

                            <br />
                            <h4>Cuenta para retiro</h4>

                        </div>

                        <div>
                            <h6>Aún no tienes una cuenta asociada</h6>
                            <br />

                            <Button 
                                href="/myDetails" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: "#f05d16", 
                                height:"40px",
                                color: "#ffffff",  
                                borderRadius: '30px', 
                                border: '2px solid borderColor',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                                fontSize:"15px", 
                                marginBottom: "10px" ,
                                marginTop: "10px" ,
                                fontFamily: "SF Pro Display Bold",
                                }}
                                
                            >
                                Agregar cuenta
                            </Button>
                        </div>
                        
                        
                    </Card>
                </Grid>
                <Grid item xs={12} sm={10} md={7} lg={6}>
                            <Card sx={{
                                borderRadius: "20px",
                                width: "auto",
                                height: "515px",
                                display: 'flex', 
                                flexDirection: 'column' 
                            }}>
                                {/* Título Dinámico */}
                                <CardContent style={{ backgroundColor: "#002E5D", textAlign: "center", color:"#ffffff" }}>
                                    <h3>Movimientos</h3>
                                </CardContent>

                                {/* Contenido Dinámico */}
                                <CardContent style={{ flexGrow: 1, padding:"0" }}>
                                    <TableContainer component={Paper} style={{padding:"0"}}>
                                        <Table>
                                            <TableHead style={{ backgroundColor:"#d2efff"}}>
                                                <TableRow style={{textAlign:"center"}}>
                                                    <TableCell align="center">N°</TableCell>
                                                    <TableCell align="center">Fecha Creación</TableCell>
                                                    <TableCell align="center">Monto</TableCell>
                                                    <TableCell align="center">Estado</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">
                                                    
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                                
                                <CardContent sx={{ backgroundColor: "#002E5D" }}></CardContent>
                            </Card> 
                        
                </Grid>

            </Grid>
        </Box>
        <Footer />
    </>
    );
};

export default Wallet;
