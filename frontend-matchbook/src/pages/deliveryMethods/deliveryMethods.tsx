
import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, NoSsr, Popper, Radio, RadioGroup, Select, SelectChangeEvent, Tab, Tabs, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";

import Book1 from "../../assents/img/book1.jpeg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Region  {
    id_region: number;
    name_region: string;
};
interface Cities {
    id_city: number;
    name: string;
};

const DeliveryMethods: React.FC = () => {
    const [delivery, setDelivery] = useState(0);
    {/* Modal Agregar */}
    const [isModalOpenAdress, setIsModalOpenAdress] = useState(false);

    const [name, setNameAdress] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [house_number, setHouseNumber] = React.useState<number | null>(null);
    const [extra_details, setExtraDetails] = React.useState('');
    const [postal_code, setPostalCode] = React.useState<number | null>(null);
    const [phone_number, setPhoneNumber] = React.useState<number | null>(null);

    const [region , setRegion] = React.useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [cities, setCities] = React.useState<Cities[]>([]);
    const [id_city, setIdCity] = useState(0);
    const navigate = useNavigate();
    
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setDelivery(newValue);
    };
    
    {/* Modal Direccion */}

    // Función para abrir el modal
    const openModalAddress = () => setIsModalOpenAdress(true);

    // Función para cerrar el modal
    const closeModalAddress = () => setIsModalOpenAdress(false);
    
    {/*------------------------------------------ */}
    {/* Guardar Datos Registro */}
    const handleSubmitAddress = async (event: React.FormEvent) => {
        event.preventDefault();

        //  --Validaciones--

        //  -Nombre-
        if (!name.trim()) {
            alert('Nombre requerido.');
            return;
        }

        //  -Street-
        if (!street.trim()) {
            alert('Calle requerida.');
            return;
        }

        //  -House Number-
        if (house_number == null ) {
            alert('Número requerido.');
            return;
        }

        {/*
        if (rut_user < 1000000 || rut_user > 99999999) {
            alert('El RUT debe tener al menos 7 caracteres y no más de 8 caracteres.');
            return;
        }
        */}

        //  -Datos de Referencia-
        if (!extra_details.trim() ) {
            alert('Se requiere el Digito Verificador');
            return;
        }

        //  -Codigo Postal-
        if (postal_code == null ) {
            alert('Número requerido.');
            return;
        }

        //  -Telefono-
        if (phone_number == null ) {
            alert('Teléfono requerido.');
            return;
        }

        if (phone_number < 100000000 || phone_number > 999999999) {
            alert('El teléfono debe tener exactamente 9 dígitos.');
            return;
        }


        try {


            const address  =  {
                name: name,
                street: street,
                house_number: house_number,
                extra_details: extra_details,
                postal_code: postal_code,
                phone_number: phone_number,

            };
        
            const response = await axios.post('http://localhost:3001/users', address);
            console.log(response.data);
            alert('Dirección Agregada');
            closeModalAddress();
            window.location.reload();
        } catch (error) {
            console.error('Hubo un error al registrarse:', error);
        }
    };


    return (
        <>
            <div>
                <p>botones</p>
            </div>

            <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                <Grid className="text-center" item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <div style={{ display: 'block', gap: '20px', marginLeft: '5px', justifyContent:"center", borderRadius:"20px", alignContent:"center"}}>
                        <Tabs value={delivery} onChange={handleChange} style={{display: 'flex', marginLeft: '55px'}}>
                            <Tab icon={<TbTruckDelivery style={{ marginRight: '10px', }} />} label="Despacho a domicilio" style={{width:"320px", height:"70px"}} />
                            <Tab icon={<MdOutlinePlace style={{ marginRight: '10px' }} />} label="Retiro en sucursal" style={{width:"320px", height:"70px"}} />
                        </Tabs>

                        {delivery === 0 && (
                            <div style={{paddingTop:"35px", marginRight:"35px", marginLeft:"55px"}}>
                                <h2>Dirección de entrega</h2>
                                <Card style={{margin: '10px 0'}}>
                                    <p>Dirección</p>
                                </Card>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p>Agregar dirección</p>
                                    <Button onClick={openModalAddress} variant="contained">+</Button>
                                </div>
                            </div>
                        )}
                        {/* Modal Agregar */}
                        <Modal open={isModalOpenAdress} onClose={closeModalAddress}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflowY: "auto" }} >
                                <Card style={{ width: "1030px", maxHeight: "650px", overflowY: "auto", position: "relative", paddingLeft:"20px", paddingRight:"20px", marginTop:"20px", marginBottom:"20px", paddingBottom:"20px", paddingTop:"30px"}}>
                                    <MdClose onClick={closeModalAddress} style={{ position: "absolute", right: 0, top: 0, padding:"10px", width:"55px", height:"55px"}} />
                                    <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"30px", marginBottom:"15px", textAlign:"center"}}>Direccion de entrega</Typography>
                                    <Grid container spacing={2} alignItems="center" >
                                        
                                        {/* Nombre Dirección */}
                                        <Grid item xs={12}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Nombre</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="name"
                                                className="mb-3 formulario"
                                                placeholder="Ej: Mi casa"
                                                type="text"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>
                                        
                                        {/* Región */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Región</h6>
                                            <FormControl fullWidth>
                                                <Select 
                                                    labelId="region-label"
                                                    id="region"
                                                    sx={{ width: '100%', color: "black", borderRadius:"15px"}}
                                                    placeholder="Selecciona una region"
                                                    displayEmpty
                                                >
                                                <MenuItem value="" disabled sx={{ color: "black" }}>Selecciona una region</MenuItem> 
                                                <MenuItem  sx={{ color: "black" }}>opcionies</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        {/* Comuna */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Comuna</h6>
                                            <FormControl fullWidth>
                                                <Select 
                                                    labelId="comuna-label"
                                                    id="comuna"
                                                    sx={{ width: '100%', color: "black", borderRadius:"15px"}}
                                                    placeholder="Selecciona"
                                                    displayEmpty
                                                >
                                                <MenuItem value="" disabled sx={{ color: "black" }}>Selecciona una comuna</MenuItem>
                                                <MenuItem   sx={{ color: "black" }}>opcionies</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">

                                        {/* Calle */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"30px"}}>Calle</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black"}}
                                                id="calle"
                                                className="mb-3 formulario"
                                                placeholder="Ej: Avda Vicuña Mackena, Santiago"
                                                type="text"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>
                                        {/* Número */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"30px"}}>Número</h6>
                                            {/*value={rut_user === null ? '' : rut_user}*/}
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="numero"
                                                className="mb-3 formulario"
                                                placeholder="Ej: 123"
                                                type="numeric"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                                
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}  >
                                        {/* Datos de referencia */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"10px"}}>Datos de referencia</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="datosDeReferencia"
                                                className="mb-3 formulario"
                                                placeholder="Ej: piso 8, depto 1701"
                                                type="text"
                                                
                                            />

                                        </Grid>
                                            {/* Codigo Postal */}
                                            <Grid item xs={6}>
                                                <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"10px"}}>Codigo Postal</h6>
                                                {/*value={rut_user === null ? '' : rut_user}*/}
                                                <TextField fullWidth 
                                                    style={{ color: "black" }}
                                                    id="codigoPostal"
                                                    className="mb-3 formulario"
                                                    placeholder="Ej: 1234567"
                                                    type="numeric"
                                                    InputLabelProps={{
                                                        sx: { fontSize: "16px" } 
                                                    }}
                                                    
                                                />
                                            </Grid>
                                        
                                        {/* Teléfono */}
                                        <Grid item xs={12}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Teléfono</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="phone"
                                                className="mb-3 formulario"
                                                placeholder="Ej: +56 9 XXXX XXXX"
                                                type="tel"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>
                                            
                                        
                                    </Grid>
                                    {/* onClick={handleSubmitPublication} */}
                                    <Grid item xs={6} style={{ marginTop:"28px",marginBottom:"10px" ,justifyContent:"center", display:"flex"}} >
                                            <Button fullWidth   style={{ backgroundColor: "#1eaeff", color: "#ffffff", borderRadius: "30px", textTransform: "none", width: "500px", height: "50px", fontWeight: "bold" }} >
                                                Completado
                                            </Button>
                                    </Grid>
                                </Card>
                            </div>
                        </Modal>
                        {delivery === 1 && (
                            <form style={{paddingTop:"35px", marginRight:"35px", marginLeft:"55px"}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Select>
                                        <MenuItem value={10}>Opción 1</MenuItem>
                                        <MenuItem value={20}>Opción 2</MenuItem>
                                    </Select>
                                    <Select>
                                        <MenuItem value={10}>Opción 1</MenuItem>
                                        <MenuItem value={20}>Opción 2</MenuItem>
                                    </Select>
                                </div>
                                <TextField label="Campo 1" style={{margin: '10px 0'}} />
                                <TextField label="Campo 2" style={{margin: '10px 0'}} />
                            </form>
                        )}
                    </div>
                </Grid>

            <Grid className="text-center" item xs={12} sm={12} md={12} lg={5} xl={5}>

                <Card style={{marginRight:"20px", padding:"20px"}}>
                    <Typography>Resumen</Typography>
                    <Typography>s productos</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <img 
                                src={Book1}
                                alt="Imagen del libro"
                                style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"17px", marginTop:"20px"}}>$10990</Typography>
                                <Typography style={{}}>Arnold Lobel</Typography>
                            </div>  
                        </div>
                        <Card style={{backgroundColor:"#00a9e0", marginTop:"10px"}}>
                            <Button fullWidth href='/cart' style={{ textAlign:"center", color:"#ffffff" }}>Ir al Carro</Button>
                        </Card> 
                </Card>

            </Grid>
                
                

            </Grid>
            {/*                     <br />
                    <div>
                        <h6>Correo electrónico</h6>
                        <TextField fullWidth 
                            id="email"
                            className="mb-3 formulario"
                            placeholder="Ingrese su correo electrónico"
                            type="email"  
                                
                        />
                    </div> */}

            
        </>
    );
};
export default DeliveryMethods;