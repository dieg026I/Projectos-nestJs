
import type { FormProps } from 'antd';
import { Button } from 'antd';
import { Box, Grid, TextField, Typography } from "@mui/material"; 
import '../../App.css';
import  Logo from "../../assents/img/logoMatch.png"
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';


interface User {
name_user: string,
lastname_user: string,
rut_user: number,
dv_user: string,
phone_user: number,
email_user: string,
password_users: string,
city_id: number,
}

const LoginAdmin: React.FC = () => {

    const [email_user, setEmail] = React.useState('');
    const [password_user, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        //  --Validacion--
    
        //  -Email-
        if (!email_user.trim()) {
            alert('Correo requerido.');
            return;
        }
    
    
        //  -Contraseña-
        if (!password_user.trim()) {
            alert('Contraseña requerida.');
            return;
        }

        // Verificar si el correo electrónico ingresado es el del usuario permitido
        if (email_user !== 'nataliarubilarh@MatchbookAdmin.cl') {
            alert('Acceso denegado. Tu cuenta no es de administrador.');
            return;
        }
    
        //Conexion Base de datos
        try {
            const response = await axios.post('http://localhost:3001/auth/validate', {
            email_user : email_user,
            password_users : password_user
            });
    
            if (response.status === 201 && response.data.access_token ){
            const token = response.data.access_token;
            const user = response.data.user;
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                console.log("Usuario Guardado: ", JSON.parse(localStorage.getItem("user") || '{}'));
            } else {
                console.log("No hay usuario guardado");
            }
            localStorage.setItem("access_token", token);
            console.log("Token guardado: ", localStorage.getItem("access_token"));  
            
    
            console.log(response.data + "navegacion exitosa");
            navigate('/');
    
            } else {
            console.log("Error: No se recibió un token válido en la respuesta.");
            }
            //Error
        } catch (error:any) {
            if (error.response && error.response.status === 401){
            alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
            } else {
            console.error('Hubo un error al iniciar sesión:', error);
            }
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div className="fondo" style={{
                    height: "50%",
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center', // Esto centra verticalmente
                    justifyContent: 'center' // Esto centra horizontalmente
                }}>
                    <Box  alignItems="center" justifyContent="center" textAlign="center">
                        <img src={Logo} alt="Logo Matchbook" width="80" height="80"  /> 
                        <Typography  style={{ fontWeight: 550, color:  "white", fontSize: "55px", marginLeft: "10px"}}>
                            Matchbook
                        </Typography>
                    </Box>
                </div>
                <div style={{backgroundColor:"#002E5D", height:"2%"}}></div>

                <div style={{
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    flex: 1 // Esto hace que el segundo div tome el espacio restante
                }}>
                    <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                        
                            <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                
                                <div style={{marginLeft:"50px"}}>
                                    {/*-Formulario Login-*/}

                                    {/*-Correo electronico-*/}
                                    <h6 style={{textAlign:"left", fontSize:"20px", margin:"0", marginBottom:"15px"}}>Correo electrónico</h6>
                                    <TextField fullWidth 
                                        id="email"
                                        className="mb-3 formulario"
                                        placeholder="Ingrese su correo electrónico"
                                        type="email"  
                                        InputLabelProps={{
                                            sx: { fontSize: "auto" } 
                                        }}
                                        value={email_user}
                                        onChange={e => setEmail(e.target.value)}                     
                                    />

                                    <br />

                                    {/*-Contraseña-*/}
                                    <h6 style={{textAlign:"left", fontSize:"20px", margin:"0", marginBottom:"15px", marginTop:"70px"}}>Contraseña</h6>
                                    <TextField fullWidth
                                        type="password"
                                        className="mb-3"
                                        id="password" 
                                        placeholder="Ingrese su contraseña"
                                        InputLabelProps={{
                                            sx: { fontSize: "auto"  } 
                                        }}
                                        value={password_user}
                                        onChange={e => setPassword(e.target.value)}
                                    />

                                </div>
                                
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }} >
                                <Button className="boton-personalizado" htmlType="submit" style={{ maxWidth: '200px', width: '100%', height: '50px', fontSize:"30px", color:"#ffffff", backgroundColor:"#FF7F41" }}>
                                    Ingresar
                                </Button>
                            </Grid>
                        
                    </Grid>
                </div>
            </div>
            </form>
        
        </> 
    );
};
export default LoginAdmin;