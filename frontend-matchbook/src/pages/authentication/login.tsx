
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material"; 

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import "../../App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../assents/img/logoMatch.png";
import React, { useContext, useState } from "react";


type FormValue = {
  email: string,
  password: string

}

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
const LoginPage: React.FC = () => {

  const [email_user, setEmail] = React.useState('');
  const [password_user, setPassword] = React.useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  {/*-----------------------------------------------------------------------------*/}
  {/* Login */}
  
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
        navigate('/home2');

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
    <form onSubmit={handleSubmit}>
      <Box  className= "d-flex login-container" justifyContent="center" alignItems="center" >
          <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
            
            {/* -- Icono y titulo Matchbook -- */}
            <Grid className="text-center" item xs={12} sm={6} md={6} lg={7}>
              <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
                  {/*-Icono-*/}
                  <img src={logo} alt="Logo Matchbook" width="50" height="50"  /> 
                
                  {/*-Titulo Matchbook-*/}
                  <Typography variant="h1" component="h1"  style={{ fontWeight: 550, color:  "white", fontSize: "50px", marginLeft: "10px"}}>
                    Matchbook
                  </Typography>
              </Box>
            </Grid>

              {/* -- Login -- */}
            <Grid className="centrado" item xs={12} sm={6} md={6} lg={4} style={{display: "flex"}}>

              <Card style={{justifyContent: "center", alignItems: "center", borderRadius: "20px", overflowY: "auto", flex: "1 1 auto", paddingRight: "20px", paddingLeft: "20px", paddingTop: "10px" }} sx={{ height: "510px", maxWidth: { xs: 310, sm: 500, md: 600, lg: 800, xl: 500} }} >
                <CardContent>

                  {/*-Titulo Inicio de sesión-*/}
                  <Typography  variant="h5" component="div" fontWeight="bold" sx={{ marginBottom: '10px' }}>
                    Inicio de sesión
                  </Typography>
                  
                  <Typography variant="body2" sx={{ marginBottom: '25px' }}>
                    <p style={{ fontSize: "15px" }} >¿Eres un nuevo usuario? <Button href="/register" size="small" style={{ textTransform: "none", fontSize: "15px" }}>Crear una cuenta</Button></p> 
                  </Typography>

                  {/*-Formulario Login-*/}

                  {/*-Correo electronico-*/}
                  <h6>Correo electrónico</h6>
                  <TextField fullWidth 
                      id="email"
                      className="mb-3 formulario"
                      placeholder="Ingrese su correo electrónico"
                      type="email"  
                      InputLabelProps={{
                        sx: { fontSize: "auto"  } 
                      }}
                      value={email_user}
                      onChange={e => setEmail(e.target.value)}                     
                  />

                  {/* Línea horizontal */}
                  <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                  {/*-Contraseña-*/}
                  <h6>Contraseña</h6>
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

                  <Typography fontSize = "10px" variant="body2">
                    <p style={{color: "#3f3f3fb3"}} > Distingue mayusculas y minusculas  <Button  style={{ textTransform: "none", fontSize: "12px", float: "right" }} size="small">¿Olvidaste tu contraseña?</Button></p> 
                  </Typography>

                  <br />
                  
                  {/*-Boton Ingresar-*/}
                  <div style={{ width: '100%' }}>
                    <Typography d-flex justify-content-center h-100 alight-items-center text-center text-alight-center fontSize = "10px" variant="body2">
                      <Button fullWidth variant="contained" onClick={handleSubmit} style={{ textTransform: "none", fontSize: "12px", color: "#fff", backgroundColor: "#1976D2", borderRadius: "20px" }}> Ingresar </Button> 
                    </Typography>
                  </div>

                  <br />

                  {/*-Boton Google-*/} 
                  <Typography d-flex justify-content-center h-100 alight-items-center text-center text-alight-center fontSize = "10px" variant="body2">
                  <Button fullWidth variant="outlined" startIcon={<FcGoogle />} style={{ textTransform: "none", fontSize: "12px", color: "black", borderRadius: "20px" }}> Inicia sesión con google </Button> 
                  </Typography>

                  <br />

                  {/*-Boton Facebook-*/}
                  <Typography fontSize = "10px" variant="body2">
                  <Button fullWidth variant="outlined" startIcon={<FaFacebookF />} style={{ color: "#3b5999", textTransform: "none", fontSize: "12px", borderRadius: "20px" }}>
                    <span style={{ color: "black" }}>Inicia sesión con Facebook</span>
                  </Button> 
                  </Typography>

                </CardContent>

                <CardActions>
                  <Button style={{ textTransform: "none", fontSize: "8px", borderRadius: "20px", }} size="small">Obtener ayuda sobre cómo iniciar sesión</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
      </Box> 
    </form>
  );
}

export default LoginPage;