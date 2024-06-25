
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
import  logo from "../../assents/img/logoMatch.png";
import { useNavigate } from 'react-router-dom'; 

interface Region  {
    id_region: number;
    name: string;
};
interface Cities {
    id_city: number;
    name: string;
}

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
    const navigate = useNavigate();
    const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerms(event.target.checked);
    };

    {/* Cargar Todas Las Regiones */}
    useEffect(() => {
        axios.get('http://localhost:3001/region')
            .then(response => {
            setRegion(response.data);
            console.log('Mostrar Regiones'+response.data);
            });
    }, []);

    {/*------------------------------------------ */}
    {/* Seleccion de la Region */}
    const handleRegionChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setSelectedRegion(event.target.value);
        const numberRegion = event.target.value;
        console.log('region seleccionada: ' + event.target.value);
        axios.get(`http://localhost:3001/cities/region/${numberRegion}`)
            .then(response => {
            setCities(response.data);
            console.log(response.data);
        });
    };
    
    {/*------------------------------------------ */}
    {/* Seleccion de la Comuna */}
    const handleCityChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setIdCity(event.target.value);
    };

    {/*------------------------------------------ */}
    {/* Guardar Datos Registro */}
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

        // Validación de longitud mínima
        if (password_users.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        // Validación de mayúsculas
        if (!/[A-Z]/.test(password_users)) {
            alert('La contraseña debe contener al menos una letra mayúscula.');
            return;
        }

        // Validación de minúsculas
        if (!/[a-z]/.test(password_users)) {
            alert('La contraseña debe contener al menos una letra minúscula.');
            return;
        }

        // Validación de números
        if (!/[0-9]/.test(password_users)) {
            alert('La contraseña debe contener al menos un número.');
            return;
        }

        // Validación de espacios
        if (/\s/.test(password_users)) {
            alert('La contraseña no debe contener espacios.');
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

            const username = `${name_user.charAt(0).toUpperCase()}.${lastname_user.charAt(0).toUpperCase()}${lastname_user.slice(1).toLowerCase()}${String(rut_user).slice(-2)}`;

            const user  =  {
                name_user: name_user,
                lastname_user: lastname_user,
                rut_user: rut_user,
                dv_user: dv_user,
                phone_user: phone_user,
                email_user: email_user,
                password_users: password_users,
                username: username,
                city_id: id_city,
            };
        
            const response = await axios.post('http://localhost:3001/users', user);
            console.log(response.data);
            navigate('/login');
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
                        
                        <Card style={{justifyContent: "center", alignItems: "center", borderRadius: "20px",  overflowY: "auto", paddingRight: "20px", paddingLeft: "20px", paddingTop: "18px" }} sx={{ maxHeight: { xs: 565, md: 675, sm: 680, lg: 610}, maxWidth: { xs: 365, md: 420, sm: 450, lg: 500}  }} >
                            <CardContent>
                                {/*-Titulo Registro-*/}
                                <Typography  variant="h5" component="div" fontWeight="bold" sx={{ marginBottom: '10px'}}>
                                    Crear una cuenta
                                </Typography>
                                
                                <Typography variant="body2" sx={{ marginBottom: '25px' }}>
                                    <p style={{ fontSize: "15px" }} >¿Ya tienes una cuenta? <Button href="/login" size="small" style={{ textTransform: "none", fontSize: "15px" }}>Inicia Sesión</Button></p> 
                                </Typography>

                                {/*-Formulario Registro-*/}
                                
                                    {/*-Nombre-*/}
                                    <h6>Nombre</h6>
                                    <TextField fullWidth 
                                        style={{ color: "black" }}
                                        id="name"
                                        className="mb-3 formulario"
                                        placeholder="Ingrese su Nombre"
                                        type="text"
                                        value={name_user}
                                        onChange={e => setName(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    {/*-Apellido-*/}
                                    <h6>Apellido</h6>
                                    <TextField fullWidth 
                                        style={{ color: "black" }}
                                        id="lastname"
                                        className="mb-3 formulario"
                                        placeholder="Ingrese su Apellido"
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
                                            <h6>Rut o Pasaporte</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="rut"
                                                className="mb-3 formulario"
                                                placeholder="Ingrese su Rut"
                                                type="numeric"
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
                                            <h6>Dv</h6>
                                            <TextField  
                                                style={{ color: "black" }}
                                                id="dv"
                                                className="mb-3 formulario"
                                                placeholder="Dv"
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
                                            <h6>Teléfono</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="phone"
                                                className="mb-3 formulario"
                                                placeholder="Ingrese su Teléfono"
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
                                    <h6>Correo electrónico</h6>
                                    <TextField fullWidth 
                                        style={{ color: "black" }}
                                        id="email"
                                        className="mb-3 formulario"
                                        placeholder="Ingrese su Correo Electrónico"
                                        type="email"
                                        value={email_user}
                                        onChange={e => setEmail(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    {/*-Contraseña-*/}
                                    <h6>Contraseña</h6>
                                    <TextField fullWidth
                                        style={{ color: "black" }}
                                        type="password"
                                        className="mb-3"
                                        id="password" 
                                        placeholder="Ingrese su Contraseña"
                                        value={password_users}
                                        onChange={e => setPassword(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    <h6>Repetir contraseña</h6>
                                    <TextField
                                        style={{ color: "black" }}
                                        fullWidth
                                        
                                        type="password"
                                        className="mb-3"
                                        id="repeatPassword"
                                        variant="outlined"
                                        placeholder="Repetir Contraseña"
                                        value={repeatPassword_user}
                                        onChange={e => setRepeatPassword(e.target.value)}
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                    />

                                    {/*-Select de Región-*/}
                                    <Grid container spacing={2} style={{alignItems: "center", justifyContent: "center", justifyItems: "center"}} >
                                        <Grid item xs={6}>
                                            {/*-Select de Region-*/}
                                            <h6>Región</h6>
                                            <FormControl fullWidth>
                                                <InputLabel style={{ fontSize: "16px"}} id="demo-simple-select-standard-label" ></InputLabel>
                                                <Select 
                                                    labelId="region-label"
                                                    id="region"
                                                    sx={{ width: '100%', color: "black" }}
                                                    onChange={(event) => handleRegionChange({
                                                        target: {
                                                        value: Number(event.target.value),
                                                        },
                                                    })}
                                                    value = {selectedRegion}
                                                >
                                                {region.map(region => (
                                                    <MenuItem key={region.id_region} value={region.id_region}>{region.name}</MenuItem>
                                                ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>

                                            {/*-Select de Comuna-*/}
                                            <h6>Comuna</h6>
                                            <FormControl className="formulario" fullWidth>
                                                <InputLabel style={{fontSize: "16px"}} id="demo-simple-select-standard-label"></InputLabel>
                                                <Select
                                                    labelId="city-label"
                                                    id="city"
                                                    value={id_city}
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
                                <Button type="submit" onClick={handleSubmit}  fullWidth variant="contained"  style={{ textTransform: "none", fontSize: "15px", color: "#fff", backgroundColor: "#1976D2", borderRadius: "20px" }}> Registrarme </Button> 
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

