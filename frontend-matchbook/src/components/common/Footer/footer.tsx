
import React, { useState } from 'react';
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
                <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent="left" padding="30px" paddingLeft="57px">
                        <img src={Logo} alt="Logo Matchbook" width="25" height="25" />
                        <Typography variant="h1" component="h1" style={{ fontWeight: 550, color: "white", fontSize: "20px", marginLeft: "10px"}}>
                            Matchbook
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="subs" style={{justifyContent:"right", padding: "30px", paddingRight: "50px", display: "flex", }} >
                        {/*<VscMail style={{ position: 'absolute', top: '10px', right: '10px', color: "#d8d5d5" }}/>*/}
                        <input style={{borderRadius: "30px", borderColor: "#d8d5d5", marginRight: "20px", paddingLeft: "30px",backgroundColor: "#404040", backgroundPosition: "5px center", backgroundRepeat: "no-repeat", color: "#d8d5d5", width: "400px"}} type="email" placeholder="Ingrese tu correo para más novedades" />
                        <button style={{borderRadius: "30px", backgroundColor: "orange", color: "white", padding: "15px", width: "150px"}}>Subscríbete</button>
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
                    <div className="footerLogos" style={{display:"flex", justifyContent: "center", alignContent: "start"}}>
                    <FaYoutube style={{margin: "0 10px"}}/>
                    <FaFacebookF style={{margin: "0 10px"}}/>
                    <IoLogoInstagram style={{margin: "0 10px"}}/>
                    <FaSpotify style={{margin: "0 10px"}}/>
                    <FaLinkedinIn style={{margin: "0 10px"}}/>

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