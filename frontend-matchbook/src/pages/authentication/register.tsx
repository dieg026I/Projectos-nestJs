
import React, { useState } from "react";
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
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material"; 
import Form from 'react-bootstrap/Form';
import { CgDanger } from "react-icons/cg";
import "../../App.css";
import logo from "../../assents/img/logoMatch.png";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValue = {

    name: string,
    lastname: string,
    rut: string,
    dv: string,
    phone: string,
    email: string,
    password: string,
    repeatPassword: string,
    terms: boolean;
}

const RegisterPage: React.FC = () => {

    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');
    
    
    const handleRegionChange = (event: SelectChangeEvent) => {
        setRegion(event.target.value);
    };
    
    const handleComunaChange = (event: SelectChangeEvent) => {
        setComuna(event.target.value);
    };

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormValue>();

    const onSubmit: SubmitHandler<FormValue> = (data) => {
        console.log(data);
    };


    return (
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
                        <Form  className="formulario">
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
                                
                                InputLabelProps={{
                                    sx: { fontSize: "16px" } 
                                }}
                                {
                                ...register("name", {
                                    required: "Nombre Requerido",
                                })
                                }
                            />
                            {errors.name && (
                            <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.name.message}</p>
                            )}


                            {/*-Apellido-*/}
                            <TextField fullWidth 
                                style={{ color: "black" }}
                                label="Primer Apellido"
                                id="lastname"
                                className="mb-3 formulario"
                                variant="outlined" 
                                type="text"
                                
                                InputLabelProps={{
                                    sx: { fontSize: "16px" } 
                                }}
                                {
                                ...register("lastname", {
                                    required: "Apellido Requerido",
                                })
                                }
                            />
                            {errors.lastname && (
                            <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.lastname.message}</p>
                            )}

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
                                        
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                        {
                                        ...register("rut", {
                                            required: "Rut Requerido",
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: "Rut inválido, solo se permiten números",
                                            },
                                            minLength: {
                                                value: 7,
                                                message: "El Rut debe tener al menos 7 caracteres",
                                            },
                                            maxLength: {
                                                value: 8,
                                                message: "El Rut no debe tener más de 8 caracteres",
                                            },
                                        })
                                        }
                                    />
                                    {errors.rut && (
                                    <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.rut.message}</p>
                                    )}

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
                                        
                                        InputLabelProps={{
                                            sx: { fontSize: "16px", width: "40px"}
                                        }}
                                        {
                                        ...register("dv", {
                                            required: "Digito Verificador Requerido",
                                            pattern: {
                                                value: /^[0-9kK]{1}$/,
                                                message: "El Dv debe contener números, 'k' o 'K'",
                                            },
                                        })
                                        }
                                    />
                                    {errors.dv && (
                                    <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.dv.message}</p>
                                    )}
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
                                        
                                        InputLabelProps={{
                                            sx: { fontSize: "16px" } 
                                        }}
                                        {
                                        ...register("phone", {
                                            required: "Telefono Requerido",
                                            minLength: {
                                                value: 9,
                                                message: "El teléfono debe tener exactamente 9 dígitos",
                                            },
                                            maxLength: {
                                                value: 9,
                                                message: "El teléfono debe tener exactamente 9 dígitos",
                                            },

                                        })
                                        }
                                    />
                                    {errors.phone && (
                                    <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.phone.message}</p>
                                    )}
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
                                
                                InputLabelProps={{
                                    sx: { fontSize: "16px" } 
                                }}
                                {
                                ...register("email", {
                                    required: "Correo Requerido",
                                    pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Correo Invalido"
                                    }
                                })
                                }
                            />
                            {errors.email && (
                            <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.email.message}</p>
                            )}

                            {/*-Contraseña-*/}
                            <TextField fullWidth
                                style={{ color: "black" }}
                                label="Contraseña"
                                type="password"
                                className="mb-3"
                                id="password" 
                                variant="outlined"
                                
                                InputLabelProps={{
                                    sx: { fontSize: "16px" } 
                                }}
                                {
                                ...register("password", {
                                    required: "La contraseña es requerida",
                                })
                                }
                                />
                            {errors.password && (
                            <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.password.message}</p>
                            )}

                            <TextField
                                style={{ color: "black" }}
                                fullWidth
                                label="Repetir Contraseña"
                                type="password"
                                className="mb-3"
                                id="repeatPassword"
                                variant="outlined"
                                
                                InputLabelProps={{
                                    sx: { fontSize: "16px" } 
                                }}
                                {
                                    ...register("repeatPassword", {
                                        required: "Debes repetir la contraseña",
                                        validate: value => value === getValues("password") || "Las contraseñas no coinciden",
                                    })
                                }
                            />
                            {errors.repeatPassword && (
                                <p className='error-msg' style={{ fontSize: "13px", color: "red"}}>{errors.repeatPassword.message}</p>
                            )}

                            {/*-Select de Región-*/}
                            <Grid container spacing={2} style={{alignItems: "center", justifyContent: "center", justifyItems: "center"}} >
                                <Grid item xs={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel style={{ fontSize: "16px"}} variant="outlined" id="demo-simple-select-standard-label" >Región</InputLabel>
                                        <Select 
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={region}
                                            onChange={handleRegionChange}
                                            label="Región"
                                            sx={{ width: '100%', color: "black" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>

                                    {/*-Select de Comuna-*/}
                                    <FormControl className="formulario" fullWidth required>
                                        <InputLabel style={{fontSize: "16px"}} variant="outlined" id="demo-simple-select-standard-label">Comuna</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={comuna}
                                            onChange={handleComunaChange}
                                            label="Comuna"
                                            sx={{ width: '100%', color: "black" }}
                                            
                                            
                                        >
                                            
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                        </Select>
                                        
                                    </FormControl>
                                </Grid>
                            </Grid>
                            
                        </Form>
                        <br />

                        <Typography style={{ display: "flex", alignItems: "center" }}>
                            <Form.Check type="checkbox" style={{ borderColor: "black" }} id="terms" />
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
                        <Button type="submit" fullWidth variant="contained" onClick={handleSubmit(onSubmit)} style={{ textTransform: "none", fontSize: "15px", color: "#fff", backgroundColor: "#1976D2", borderRadius: "20px" }}> Régistrarme </Button> 
                        </Typography>
                        

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box> 
        );
}

export default RegisterPage;
