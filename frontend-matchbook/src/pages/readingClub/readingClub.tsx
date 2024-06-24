import { Card, Grid } from "@mui/material";
import React from "react";

import libro from "../../assents/img/libro.png";
import ClubLectura from "../../assents/img/clubLectura.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";

export default function ReadingClub() {
    return (
        <>
            <NavBarLogin />
            <div >
                <div style={{textAlign:"center", paddingTop:"80px"}}>
                    <h1 style={{fontFamily:"SF Pro Display Bold", fontSize:"44px", color:"#00A9E0", paddingBottom:"10px"}}>¿Cómo funciona nuestro club de lectura?</h1>
                    <p style={{fontFamily:"SF Pro Display Regular", fontSize:"18px", textAlign:"center", marginLeft:"220px", marginRight:"220px"}} >Compréndete a tí mismo y el fascinante mundo de la mente humana 
                        Nuestro club de lectura presencial se reúne una vez al mes en un lugar predeterminado, 
                        como una biblioteca local o una cafetería acogedora. Los miembros del club eligen un libro para leer antes de cada reunión. 
                        Durante la reunión mensual, los miembros discuten el libro, comparten sus opiniones y reflexiones, y eligen el próximo libro a leer. 
                        El ambiente es amigable y acogedor, fomentando el intercambio de ideas y el amor por la lectura.</p>
                </div>
                <br />

                <div style={{textAlign:"center"}}>
                    <h2 >Estamos leyendo</h2>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                        <Grid className="text-center" item xs={12} sm={6} md={6} lg={5}>
                            <img src={libro} style={{ width: "240px" }} alt="chile" />
                        </Grid>
                        <Grid className="text-center" item xs={12} sm={6} md={6} lg={7}>
                            <div>
                                <h3>De sangre y cenizas</h3>
                                <h4>Jennider I. Armentrout</h4>
                                <p>Apasionante y con una accion...</p>
                                <p>Elegida desde su nacimiento</p>
                                <br />
                                <ul>
                                    <li>Editorial: Punck</li>
                                    <li>Año: 2022</li>
                                    <li>Categoría: Historia, Romance</li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <br />

                <div style={{textAlign:"center", marginBottom:"50px"}}>
                    <h2>Horario</h2>
                    <br />
                    <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)' }}>
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justifyContent="center">
                            <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
                                <div>
                                    <h3>Dia</h3>
                                    <p>29/03/2024</p>
                                </div>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
                                <div>
                                    <h3>Hora</h3>
                                    <p>16:30</p>
                                </div>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
                                <div>
                                    <h3>Lugar</h3>
                                    <p>Café Magia y Letras - 1 Nte. 461, Viña del Mar, Valparaíso</p>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
                <br />


                <div >
                    <div style={{ textAlign: 'center' }}>
                        <MdKeyboardArrowDown style={{ width:"100px", height:"100px"}} />
                        <h2>Ingresar al Club</h2>
                    </div>
                    
                    <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', marginTop:"60px", paddingBottom:"38px", display:"flex", alignItems:"center" }}>
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justifyContent="center">
                        <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                            <button style={{borderRadius:"20px", backgroundColor:"#ff7f41", width: "90%", color:"#ffffff", height:"50px", border: "none", fontFamily:"Roboto Bold" }}>Whatsapp Club de Lectura</button>
                        </Grid>
                            <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                <img src={ClubLectura} style={{ width: "240px", alignContent:"center" }} alt="chile" />
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
}
