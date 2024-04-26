
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material"; 
import Form from 'react-bootstrap/Form';
import { CgDanger } from "react-icons/cg";
import "../../App.css";
import axios from 'axios';
import logo from "../../assents/img/logoMatch.png";

interface Region  {
    id_region: number;
    name_region: string;
};
interface Cities {
    id_city: number;
    name: string;
<<<<<<< HEAD
}
=======
  }

  interface Users  {
    name_user: string,
    lastname_user: string,
    rut_user: string,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    id_city: number,
};
>>>>>>> origin/Diego-Back
const RegisterPage: React.FC = () => {
    const [name_user, setName] = React.useState('');
    const [lastname_user, setLastname] = React.useState('');
    const [rut_user, setRut] = React.useState<number | null>(null);
    const [dv_user, setDv] = React.useState('');
    const [phone_user, setPhone] = React.useState<number | null>(null);
    const [email_user, setEmail] = React.useState('');
    const [password_users, setPassword] = React.useState('');
    const [repeatPassword_user, setRepeatPassword] = React.useState('');
    const [region , setRegion] = React.useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [cities, setCities] = React.useState<Cities[]>([]);
    const [id_city, setIdCity] = useState(0);
    const [terms, setTerms] = React.useState(false);

    const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerms(event.target.checked);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/region')
            .then(response => {
            setRegion(response.data);
            console.log('Mostrar Regiones'+response.data);
            });
    }, []);

    const handleRegionChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setSelectedRegion(event.target.value);
        const numberRegion = event.target.value;
        console.log('numero de region: ' + numberRegion);
        console.log('region seleccionada: ' + event.target.value);
        console.log('region : ' + selectedRegion);
        axios.get(`http://localhost:3001/cities/region/${numberRegion}`)
            .then(response => {
            setCities(response.data);
            console.log(response.data);
        });
    };
    
    const handleCityChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setIdCity(event.target.value);
    };
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        //  --Validaciones--

        //  -Nombre-
        if (!name_user.trim()) {
            alert('Nombre requerido.');
            return;
        }

        //  -Apellido-
        if (!lastname_user.trim()) {
            alert('Apellido requerido.');
            return;
        }

        //  -Rut-
        if (rut_user == null ) {
            alert('Rut requerido.');
            return;
        }

        if (rut_user < 1000000 || rut_user > 99999999) {
            alert('El RUT debe tener al menos 7 caracteres y no más de 8 caracteres.');
            return;
        }

        //  -Digito Verificador-
        if (!dv_user.trim() ) {
            alert('Se requiere el Digito Verificador');
            return;
        }

        if (!/^[0-9kK]$/.test(dv_user)) {
            alert('El dígito verificador debe contener números o k .');
            return;
        }

        //  -Telefono-
        if (phone_user == null ) {
            alert('Teléfono requerido.');
            return;
        }

        if (phone_user < 100000000 || phone_user > 999999999) {
            alert('El teléfono debe tener exactamente 9 dígitos.');
            return;
        }

        //  -Correo Electronico-
        if (!email_user.trim()) {
            alert('Correo requerido.');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email_user)) {
            alert('Por favor, ingresa un correo válido.');
            return;
        }

        //  -Contraseña-
        if (!password_users.trim()) {
            alert('Contraseña requerida.');
            return;
        }

        //  -Repetir Contraseña-
        if (password_users !== repeatPassword_user) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        //  -Terminos y condiciones-
        if (!terms) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }

        try {
            
            const user  =  {
                name_user: name_user,
                lastname_user: lastname_user,
                rut_user: rut_user,
                dv_user: dv_user,
                phone_user: phone_user,
                email_user: email_user,
                password_users: password_users,
                city_id: id_city,
            };
        
            const response = await axios.post('http://localhost:3001/users', user);
            console.log(response.data);
        } catch (error) {
            console.error('Hubo un error al registrarse:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}> 
            <Box  className= "d-flex reg-container" justifyContent="center" alignItems="center" >
                <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                    
                    {/* -- Icono y titulo Matchbook -- */}
                    <Grid className="text-center" item xs={12} sm={12} md={6} lg={7}>
                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
                            {/*-Icono-*/}
                            <img src={logo} alt="Logo Matchbook" width="50" height="50"  /> 
                            
                            {/*-Titulo Matchbook-*/}
                            <Typography variant="h1" component="h1"  style={{ fontWeight: 550, margin: "10px" ,color: "white", fontSize: "50px", marginLeft: "10px"}}>
                                Matchbook
                            </Typography>
                        </Box>
                    </Grid>

                    {/* -- Register -- */}
                    <Grid className="centrado" item xs={12} sm={12} md={6} lg={4} justifyContent="center" alignItems="center" style={{display: "flex"}}>
                        
                        <Card style={{justifyContent: "center", alignItems: "center", borderRadius: "20px",  overflowY: "auto"}} sx={{ maxHeight: { xs: 565, md: 675, sm: 680, lg: 610}, maxWidth: { xs: 365, md: 420, sm: 450, lg: 500}  }} >
                            <CardContent>
                                {/*-Titulo Registro-*/}
                                <Typography  variant="h5" component="div" fontWeight="bold" sx={{ marginBottom: '10px'}}>
                                    Crear una cuenta
                                </Typography>
                                
                                <Typography variant="body2" sx={{ marginBottom: '25px' }}>
                                    <p style={{ fontSize: "15px" }} >¿Ya tienes una cuenta? <Button href="/login" size="small" style={{ textTransform: "none", fontSize: "15px" }}>Inicia Sesión</Button></p> 
                                </Typography>

                                {/*-Formulario Registro-*/}
                                
                                    {/* Línea horizontal */}
                                    <hr style={{ margin: "10px 0", opacity: 0.1  }} />

                                    {/*-Formulario Registro-*/}

                                    {/*-Nombre-*/}
                                    <TextField fullWidth 
                                        style={{ color: "black" }}
                                        label="Nombre"
                                        id="name"
                                        className="mb-3 formulario"
                                        variant="outlined" 
                                        type="text"
                                        value={name_user}
                                        onChange={e => setName(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    {/*-Apellido-*/}
                                    <TextField fullWidth 
                                        style={{ color: "black" }}
                                        label="Primer Apellido"
                                        id="lastname"
                                        className="mb-3 formulario"
                                        variant="outlined" 
                                        type="text"
                                        value={lastname_user}
                                        onChange={e => setLastname(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    <Grid container spacing={3} alignItems="center">
                                        {/* Rut */}
                                        <Grid item xs={6}>

                                            {/*-Rut o Pasaporte-*/}
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                label="Rut o Pasaporte"
                                                id="rut"
                                                className="mb-3 formulario"
                                                variant="outlined" 
                                                type="number"
                                                value={rut_user === null ? '' : rut_user}

                                                onChange={e => setRut(Number(e.target.value))}
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />


                                        </Grid>
                                        <Grid item xs={1}>
                                            <p style={{ fontSize: "20px" }}>-</p>
                                        </Grid>
                                            
                                        <Grid item xs={4}>
                                            {/*-dv-rut-*/}
                                            <TextField  
                                                style={{ color: "black" }}
                                                label="Dv"
                                                id="dv"
                                                className="mb-3 formulario"
                                                variant="outlined" 
                                                type="text"
                                                value={dv_user}
                                                onChange={e => setDv(e.target.value)}
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px", width: "40px"}
                                                }}
                                            />

                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        {/* Teléfono */}
                                        <Grid item xs={2} display= "flex" justifyContent="center" alignItems="center" height= "100%">
                                            <Typography > +56</Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            {/*-Telefono-*/}
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                label="Numéro Teléfono"
                                                id="phone"
                                                className="mb-3 formulario"
                                                variant="outlined" 
                                                type="tel"
                                                value={phone_user}
                                                onChange={e => setPhone(Number(e.target.value))}
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/*-Correo electrónico-*/}
                                    <TextField fullWidth 
                                        style={{ color: "black" }}
                                        label="Correo electrónico"
                                        id="email"
                                        className="mb-3 formulario"
                                        variant="outlined" 
                                        type="email"
                                        value={email_user}
                                        onChange={e => setEmail(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    {/*-Contraseña-*/}
                                    <TextField fullWidth
                                        style={{ color: "black" }}
                                        label="Contraseña"
                                        type="password"
                                        className="mb-3"
                                        id="password" 
                                        variant="outlined"
                                        value={password_users}
                                        onChange={e => setPassword(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    <TextField
                                        style={{ color: "black" }}
                                        fullWidth
                                        label="Repetir Contraseña"
                                        type="password"
                                        className="mb-3"
                                        id="repeatPassword"
                                        variant="outlined"
                                        value={repeatPassword_user}
                                        onChange={e => setRepeatPassword(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    {/*-Select de Región-*/}
                                    <Grid container spacing={2} style={{alignItems: "center", justifyContent: "center", justifyItems: "center"}} >
                                        <Grid item xs={6}>
                                            <FormControl fullWidth required>
                                                <InputLabel style={{ fontSize: "16px"}} variant="outlined" id="demo-simple-select-standard-label" >Región</InputLabel>
                                                <Select 
                                                    labelId="region-label"
                                                    id="region"
                                                    label="Región"
                                                    sx={{ width: '100%', color: "black" }}
                                                    onChange={(event) => handleRegionChange({
                                                        target: {
                                                          value: Number(event.target.value),
                                                        },
                                                      })}
                                                    value = {selectedRegion}
                                                >
                                                {region.map(region => (
                                                    <MenuItem key={region.id_region} value={region.id_region}>{region.name_region}</MenuItem>
                                                ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>

                                            {/*-Select de Comuna-*/}
                                            <FormControl className="formulario" fullWidth required>
                                                <InputLabel style={{fontSize: "16px"}} variant="outlined" id="demo-simple-select-standard-label">Comuna</InputLabel>
                                                <Select
                                                    labelId="city-label"
                                                    id="city"
                                                    value={id_city}
                                                    label="Comuna"
                                                    sx={{ width: '100%', color: "black" }}
                                                    onChange={(event) => handleCityChange({
                                                        target: {
                                                          value: Number(event.target.value),
                                                        },
                                                      })}
                                                >   
                                                    {cities.map((city: Cities) => (
                                                    <MenuItem key={city.id_city} value={city.id_city}>{city.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                <br />

                                <Typography style={{ display: "flex", alignItems: "center" }}>
                                    <Form.Check 
                                    type="checkbox" 
                                    style={{ borderColor: "black" }} 
                                    id="terms"     
                                    checked={terms}
                                    onChange={handleTermsChange} 
                                    />
                                    <span style={{ marginLeft: "5px" }}>
                                        Acepto los <span style={{ fontWeight:"bold", color: "#f48650" }}>Términos y condiciones </span> de Matchbook
                                    </span>
                                    <IconButton style={{ marginLeft: "5px", color: "#f48650" }}>
                                        <CgDanger />
                                    </IconButton>
                                </Typography>

                                <br />
                                {/*-Boton Registrar-*/}
                                <Typography d-flex justify-content-center h-100 align-items-center text-center text-align-center fontSize = "10px" variant="body2" >
                                <Button type="submit" onClick={handleSubmit} fullWidth variant="contained"  style={{ textTransform: "none", fontSize: "15px", color: "#fff", backgroundColor: "#1976D2", borderRadius: "20px" }}> Régistrarme </Button> 
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </form> 
        );
}

export default RegisterPage;
function setSelectedRegion(value: any) {
    throw new Error("Function not implemented.");
}

