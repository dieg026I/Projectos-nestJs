
import React from 'react';
import "../../common/Footer/cssFooter.css";
import  Logo from "../../../assents/img/logoMatch.png";
import { Box, Grid, Typography } from '@mui/material';
import { FaYoutube } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaSpotify } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { VscMail } from "react-icons/vsc";

export const Footer: React.FC<{}> = () => {
    
    return (
        <div className="footer">
            <Grid container spacing={2} alignItems="center">
                {/*Icono Matchbook y Titulo*/}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Box display="flex" justifyContent="left" padding="30px" paddingLeft="57px">
                        <img src={Logo} alt="Logo Matchbook" width="30px" height="30px" />
                        <Typography variant="h1" component="h1" style={{ fontWeight: 550, color: "white", fontSize: "25px", marginLeft: "10px"}}>
                            Matchbook
                        </Typography>
                    </Box>
                </Grid>

                {/*correo y botón subscribir*/}
                <Grid item xs={12} sm={8} md={8} lg={8}>
                    <div className="subs" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "30px 50px 30px 30px" }}>
                        <div  className="inputEmail" style={{ position: 'relative', marginRight: "20px", width: "400px" }}>
                            <VscMail style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: "#d8d5d5", width:"25px", height:"25px" }}/>
                            <input  style={{ height: '55px', borderRadius: "30px", borderColor: "#d8d5d5", paddingLeft: "50px", backgroundColor: "#404040", color: "#d8d5d5", width: "100%" }} type="email" placeholder="Ingrese tu correo para más novedades" />
                        </div>
                        <button style={{ borderRadius: "30px", backgroundColor: "orange", color: "white", padding: "15px", width: "150px" }}>Subscríbete</button>
                    </div>
                </Grid>
            </Grid>

            {/* Línea horizontal */}
            <hr style={{ margin: "10px 0", opacity: 0.1 }} />

            <Grid container spacing={4} alignItems="center" style={{padding: "30px", textAlign: "center", alignItems: "center"}}>
                <Grid item xs={12} sm={3}>
                    <h6 className='footerTitle'>Sobre Matchbook</h6>
                    <ul className='footerText'>
                        <li>Quienes somos </li>
                        <li>Políticas de privacidad</li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h6 className='footerTitle'>Enlaces de interés</h6>
                    <ul className='footerText'>
                        <li>Biblioteca pública</li>
                        <li>Plan de lectura naciones</li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <h6 className='footerTitle'>Atención al cliente</h6>
                    <ul className='footerText'>
                        <li>ContactoQmatchbook</li>
                        <li>Preguntas frecuentes</li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={3} style={{marginBottom: "42px"}}>
                    <h6 className='footerTitle' >Síguenos</h6>
                    <div className="footerLogos icon" style={{display:"flex", justifyContent: "center", alignContent: "start"}}>
                        <ul style={{ padding: "0px"}}>
                            <a href="https://web.facebook.com/matchbook.cl?_rdc=1&_rdr" >
                                <FaFacebookF style={{margin: "0 10px", color: "#ffffff"}}/>
                            </a>

                            <a href="https://www.instagram.com/matchbook.cl/" >
                                <IoLogoInstagram style={{margin: "0 10px", color: "#ffffff"}}/>
                            </a>

                            <a href="https://open.spotify.com/user/65gbt8hb8usxon931smt8t9t9?si=n0LFW2ehSbai8yetfljRQA&nd=1" >
                                <FaSpotify style={{margin: "0 10px", color: "#ffffff"}}/>
                            </a>

                            <a href="https://www.linkedin.com/company/matchbook-chile/" >
                                <FaLinkedinIn  style={{margin: "0 10px", color: "#ffffff"}}/>
                            </a>
                        </ul>
                    </div>
                </Grid>
            </Grid>

            {/* Línea horizontal */}
            <hr style={{ margin: "10px 0", opacity: 0.1 }} />
            

            <div className="section3" style={{padding: "30px", paddingLeft: "60px", fontSize: "13px"}}>
                <p>Copyright@2020.2023</p>
            </div>
        </div>
    );
}
    export default Footer;