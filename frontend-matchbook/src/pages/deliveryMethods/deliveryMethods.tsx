
import { Autocomplete, Box, Button, Card, CardActionArea,Link ,CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, NoSsr, Popper, Radio, RadioGroup, Select, SelectChangeEvent, Tab, Tabs, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";

import Book1 from "../../assents/img/book1.jpeg";
import Book3 from "../../assents/img/book3.jpeg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import { BiMap } from "react-icons/bi";

interface Region  {
    id_region: number;
    name: string;
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
        
            const response = await axios.post('http://localhost:3001/addresses', address);
            console.log(response.data);
            alert('Dirección Agregada');
            closeModalAddress();
            window.location.reload();
        } catch (error) {
            console.error('Hubo un error al registrarse:', error);
        }
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
    


    


    return (
        <>
        <NavBarLogin />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:"30px", marginTop:"30px" }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '300px', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F05D16', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>1</div>
                        <div style={{ marginTop: '10px' }}>Detalle de Entrega</div>
                    </div>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#C04A12', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2</div>
                        <div style={{ marginTop: '10px' }}>Pago</div>
                    </div>
                </div>
            </div>

            <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                <Grid className="text-center" item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <div style={{ display: 'block', gap: '20px', marginLeft: '5px', justifyContent:"center", borderRadius:"20px", alignContent:"flex-start", height:"700px", marginTop:"30px"}}>
                        <Tabs value={delivery} onChange={handleChange} style={{display: 'flex', marginLeft: '55px'}}>
                            <Tab icon={<TbTruckDelivery style={{ marginRight: '10px' }} />} label="Despacho a domicilio" style={{width:"320px", height:"70px"}} />
                            <Tab icon={<MdOutlinePlace style={{ marginRight: '10px' }} />} label="Retiro en sucursal" style={{width:"320px", height:"70px"}} />
                        </Tabs>

                        {delivery === 0 && (
                            <div style={{paddingTop:"35px", marginRight:"35px", marginLeft:"55px"}}>
                                <h2>Dirección de entrega</h2>
                                <Card style={{margin: '10px 0', textAlign:"left", padding:"14px", borderRadius:"20px"}}>
                                    <p style={{fontFamily:"SF Pro Display Medium", fontSize:"20px"}}><BiMap style={{marginRight:"3px"}} /> Mi Casa</p>
                                    <p style={{fontFamily:"SF Pro Display Medium"}}>Teresa Vial, 1330, 1402B, San Miguel - Metropolitana de Santigo</p>
                                    <Link style={{color:"#000000", fontFamily:"SF Pro Display Medium"}} >Modificar</Link>
                                </Card>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop:"20px"}}>
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
                                                <InputLabel id="region-label">Elige una región</InputLabel>
                                                <Select 
                                                    labelId="region-label"
                                                    id="region"
                                                    value={selectedRegion || ''}
                                                    placeholder="Elige una región"
                                                    onChange={(event) => handleRegionChange({
                                                        target: {
                                                            value: Number(event.target.value),
                                                        },
                                                    })}
                                                >
                                                    {region.map(region => (
                                                        <MenuItem key={region.id_region} value={region.id_region}>{region.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        {/* Comuna */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Comuna</h6>
                                            <FormControl fullWidth>
                                                <InputLabel id="city-label">Elige una ciudad</InputLabel>
                                                <Select 
                                                    labelId="city-label"
                                                    id="city"
                                                    value={id_city || ''}
                                                    placeholder="Elige una ciudad"
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
                            <form style={{paddingTop:"35px", marginRight:"200px", marginLeft:"200px"}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:"20px"}}>
                                <div style={{width: '45%'}}>
                                    <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px", textAlign:"left"}}>Región</h6>
                                    <FormControl fullWidth style={{marginRight: '10px', width:"200px"}}>
                                        <Select 
                                            labelId="region-label"
                                            id="region_sucursal"
                                            value={selectedRegion || ''}
                                            placeholder="Ej: Valparaiso"
                                            onChange={(event) => handleRegionChange({
                                                target: {
                                                    value: Number(event.target.value),
                                                },
                                            })}
                                        >
                                            {region.map(region => (
                                                <MenuItem key={region.id_region} value={region.id_region}>{region.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{width: '45%'}}>
                                    <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Comuna</h6>
                                    <FormControl className="formulario" fullWidth style={{marginLeft: '10px', width:"200px"}}>
                                        <Select 
                                            labelId="city-label"
                                            id="city_sucursal"
                                            value={id_city || ''}
                                            placeholder="Ej: Viña del Mar"
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

                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:"30px"}}>
                                <div style={{width: '45%'}}>
                                    <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Sucursal</h6>
                                    <FormControl style={{marginRight: '10px', width:"200px"}}>
                                        <InputLabel>Ej: Plaza Latorre 32</InputLabel>
                                        <Select>
                                            <MenuItem value="Valparaiso Victoria">Valparaiso Victoria</MenuItem>
                                            <MenuItem value="Congreso Centro">Congreso Centro</MenuItem>
                                            <MenuItem value="Valparaiso Brasil">Valparaiso Brasil</MenuItem>
                                            <MenuItem value="Valparaiso Blanco">Valparaiso Blanco</MenuItem>
                                            <MenuItem value="Valparaiso Curauma">Valparaiso Curauma</MenuItem>
                                            <MenuItem value="Centro de Servicios">Centro de Servicios</MenuItem>
                                            <MenuItem value="Vina Del Mar Plaza Latorre">Vina Del Mar Plaza Latorre</MenuItem>
                                            <MenuItem value="Plaza Latorre 32, Vina Del Mar">Plaza Latorre 32, Vina Del Mar</MenuItem>
                                            <MenuItem value="Vina Cinco Norte">Vina Cinco Norte</MenuItem>
                                            <MenuItem value="Full Service Cibereluno">Full Service Cibereluno</MenuItem>
                                            <MenuItem value="Pick Up Los Carinositos">Pick Up Los Carinositos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{width: '45%'}}>
                                    <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Teléfono</h6>
                                    <TextField placeholder="Ej: +56 9 XXXX XXXX" style={{width: '100%'}} />
                                </div>
                            </div>
                            <div style={{marginBottom:"20px"}}>
                                <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Nombre de quien retira</h6>
                                <TextField placeholder="Ej: Natalia Rubilar" style={{width: '100%'}} />
                            </div>
                        </form>
                        )}
                    </div>
                </Grid>

                <Grid className="text-center" item xs={12} sm={12} md={12} lg={5} xl={5}>

                    <Card style={{marginRight:"20px", padding:"20px", height:"auto", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <div>
                            <Typography style={{fontSize:"25px", fontFamily:"SF Pro Display Bold"}} >Resumen de los Productos</Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop:"20px" }}>
                                <img 
                                    src={Book1}
                                    alt="Imagen del libro"
                                    style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>Criaturas Imposibles</Typography>
                                    <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>$10990</Typography>
                                    <Typography style={{}}>Arnold Lobel</Typography>
                                </div>  
                            </div>
                            <br />
                            {/* Línea horizontal */}
                            <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                            <br />
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <img 
                                    src={Book3}
                                    alt="Imagen del libro"
                                    style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>Sapo y Sepo, Inseparables</Typography>
                                    <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>$10990</Typography>
                                    <Typography style={{}}>Katherine Rundell</Typography>
                                </div>  
                            </div>
                        </div>
                        <div style={{  height:"40px", display: 'flex', justifyContent: 'center', marginTop:"35px"}}>
                            <Button style={{backgroundColor:"#989ca8", color:"#ffffff", textTransform: "none",fontSize:"19px", marginRight: "130px", borderRadius:"30px"}} href="/cart">Cancelar</Button>
                            <Button href='/pay' style={{backgroundColor:"#00a9e0", textAlign:"center", color:"#ffffff", textTransform: "none", fontSize:"19px" , borderRadius:"30px"}}>Continuar</Button>
                        </div>
                    </Card>
                </Grid>
                
                
            </Grid>
            
            <br />
            <Footer/>
        </>
    );
};
export default DeliveryMethods;