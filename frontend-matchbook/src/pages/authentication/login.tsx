
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

import logo from "../../assents/img/logoMatch.png";

type FormValue = {
  email: string,
  password: string
}

const LoginPage: React.FC = () => {




  return (
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

            <Card style={{justifyContent: "center", alignItems: "center", borderRadius: "20px", overflowY: "auto", flex: "1 1 auto" }} sx={{ height: "510px", maxWidth: { xs: 310, sm: 500, md: 600, lg: 800, xl: 500} }} >
              <CardContent>

                {/*-Titulo Inicio de sesión-*/}
                <Typography  variant="h5" component="div" fontWeight="bold" sx={{ marginBottom: '10px' }}>
                  Inicio de sesión
                </Typography>
                
                <Typography variant="body2" sx={{ marginBottom: '25px' }}>
                  <p style={{ fontSize: "15px" }} >¿Es un nuevo usuario? <Button href="/register" size="small" style={{ textTransform: "none", fontSize: "15px" }}>Crear una cuenta</Button></p> 
                </Typography>

                {/*-Formulario Login-*/}

                {/*-Correo electronico-*/}
                <TextField fullWidth 
                    label="Ingresa tu correo electronico"
                    id="email"
                    className="mb-3 formulario"
                    variant="outlined" 
                    type="email"
                    focused
                    InputLabelProps={{
                      sx: { fontSize: "auto"  } 
                    }}

                />


                {/* Línea horizontal */}
                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                {/*-Contraseña-*/}
                <TextField fullWidth
                    label="Ingresa tu contraseña"
                    type="password"
                    className="mb-3"
                    id="password" 
                    variant="outlined"
                    focused
                    InputLabelProps={{
                      sx: { fontSize: "auto"  } 
                    }}
                    />



                <Typography fontSize = "10px" variant="body2">
                  <p style={{color: "#3f3f3fb3"}} > Distingue mayusculas y minusculas  <Button  style={{ textTransform: "none", fontSize: "12px", float: "right" }} size="small">¿Olvidaste tu contraseña?</Button></p> 
                </Typography>

                <br />
                
                {/*-Boton Ingresar-*/}
                <div style={{ width: '100%' }}>
                  <Typography d-flex justify-content-center h-100 alight-items-center text-center text-alight-center fontSize = "10px" variant="body2">
                    <Button fullWidth variant="contained"  style={{ textTransform: "none", fontSize: "12px", color: "#fff", backgroundColor: "#1976D2", borderRadius: "20px" }}> Ingresar </Button> 
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
  );

}

export default LoginPage;