import React from "react";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import { Box, Grid, Card, Button, Avatar, Typography } from "@mui/material";
import { RiPencilFill } from "react-icons/ri";
import "../../App.css";

export default function Profile() {
    return (
        <>
            <NavBarLogin />
            <Box className="fondoVenta">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={10} md={5} lg={3}>
                        <Card sx={{ borderRadius:"20px", padding: "20px", height:"440px", textAlign:"center", marginRight:"20px" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop:"30px", paddingBottom:"30px", position:"relative"  }}>
                                <Avatar style={{backgroundColor: "#f05d16", width:"170px", height:"170px"}} src="/broken-image.jpg" />
                                <div style={{ 
                                    width: '35px', 
                                    height: '35px', 
                                    backgroundColor: '#188bcc', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    position: 'relative', 
                                    top: '80px', 
                                    left: '2px', 
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)'
                                }}>
                                    <RiPencilFill style={{ color: "#ffffff", width:"33px", height:"25px"}} /> {/* Icono de lápiz */}
                                </div>
                            </div>
                            <Typography variant="h2" style={{ fontSize: "23px", fontFamily: "SF Pro Display Bold", paddingBottom:"32px"}}>Na.rubilark</Typography> {/*{username} */}
                            <Typography variant="body1" style={{ fontSize: "15px", fontFamily: "SF Pro Display Regular", paddingBottom:"35px"}}>sin comentarios</Typography> {/*{email_user} */}
                            <Button style={{borderRadius:"20px", textTransform: "none", fontSize:"17px"}} fullWidth variant="contained">Valparaiso</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={10} md={7} lg={6}>
                        <Box sx={{ position: 'relative', width: '100%', marginBottom: '24px', textAlign:"center"}}>
                            <Box sx={{ position: 'absolute', top: '-16px', right:'20px', backgroundColor:'#f44336', color:'#fff', borderRadius:'20px 20px 0 0', zIndex: 'tooltip', width:"200px", height:"40px", display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                            <Typography variant="body2" style={{ padding:'6px 16px', fontSize:"18px" }}>Mi Librería</Typography>
                            </Box>
                        </Box>
                        <Card sx={{ height:"415px", borderRadius:"20px", padding: "20px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography style={{paddingBottom:"15px"}} variant="body1">Aun no tienes publicaciones activas. Crea la primera aquí:</Typography>
                            <Button variant="contained" href="/sales" style={{ backgroundColor: "#f05d16", color:"#ffffff" }}>Vender</Button>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
            <Footer />
        </>
    );
}
