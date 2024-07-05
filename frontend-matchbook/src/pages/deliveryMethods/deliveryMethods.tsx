
import { Autocomplete, Box, Button, Card, CardActionArea,Link ,CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, NoSsr, Popper, Radio, RadioGroup, Select, SelectChangeEvent, Tab, Tabs, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";

import Book1 from "../../assents/img/book1.jpeg";
import Book3 from "../../assents/img/book3.jpeg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import { BiMap } from "react-icons/bi";
import { v4 as uuidv4 } from 'uuid';
import { FiTrash2 } from "react-icons/fi";


interface Region  {
    id_region: number;
    name: string;
    cities: Cities[];
};
interface Cities {
    id_city: number;
    name: string;
    region: Region;
}
interface RegionApi {
    regionId: string ,
    regionName: string,
    ineRegionCode: number
}
interface CitiesApi {
    countyCode: string,
    countyName: string,
    regionCode: string,
    ineCountyCode: number,
    queryMode: number,
    coverageName: string
}
interface Sucursal  {
    regionName: string,
    countyName: string,
    officeName: string,
    officeType: number,
    streetName: string,
    streetNumber: number,
    complement: string,
    addressId: number,
    latitude: string,
    longitude: string,
    streetNameId: number,
    ineCountyId: number,
    managerName: string,
    telephone: string,
    businessHour: [{
        day: string,
        initialStartHour: string,
        initialEndHour: string,
        finalStartHour: string,
        finalEndHour: string;
    }],
}
interface Publication {
    id_publication: string;
    date_publication: Date;
    users: User;
    book: Book;
    photo_showcase: string;
    photo_cover: string;
    photo_first_page: string;
    photo_back_cover: string;
    cost_book: number;
}
interface Author {
    id_author: string;
    name_author: string;
}
interface Publisher {
    id_publisher: string;
    name_publisher: string;
}
interface Book {
    id_book: string;
    name_book: string;
    format_book: string;
    author_id_author: Author;
    publisher_name: string; 
    publisher_id_publisher: Publisher;
    categories: Categories[];
    year_book: number;
    status_book: string;
    stock_book: number;
    description_book: string;
}
interface User {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    cities: Cities,
    username: string,
    publication: Publication[]
}
interface Categories {
    id_category: string;
    name_category: string;
}
interface Address {
    address_id: string;
    name: string;
    street: string;
    house_number: number;
    extra_details: string;
    postal_code: number;
    phone_number: number;
    region: Region;
    city: Cities;
    user_id: User;
}

const DeliveryMethods: React.FC = () => {
    const [delivery, setDelivery] = useState(0);
    //Modal Agregar 
    const [isModalOpenAdress, setIsModalOpenAdress] = useState(false);

    //Modal Agregar 
    const [isModalOpenChilexpress, setIsModalOpenChilexpress] = useState(false);

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
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    //Api Chilexpress
    const [regionApi , setRegionApi] = React.useState<RegionApi[]>([]);
    const [selectedRegionApi, setSelectedRegionApi] = useState('');
    const [citiesApi, setCitiesApi] = React.useState<CitiesApi[]>([]);
    const [id_city_api, setIdCityApi] = useState('');
    const [sucursal, setSucursal] = React.useState<Sucursal[]>([]);
    const [id_sucu, setId_sucu] = React.useState('');
    const [publication, setPublication] = useState<Publication | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [address, setAddress] = useState<Address[]>([]);
    const [phoneNumberExpress, setPhoneNumberExpress] = useState(0);
    const [retireeName, setRetireeName] = useState('');

    const [displayRegionApi, setDisplayRegionApi] = useState('');
    const [displayCityApi, setDisplayCityApi] = useState('');
    const [displaySucursal, setDisplaySucursal] = useState('');
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState(0);
    const [displayRetireeName, setDisplayRetireeName] = useState('');
    const [displayIdExpress, setDisplayIdExpress] = useState('');
    const [selectedExpress, setSelectedExpress] = useState<string | null>(null);

    const location = useLocation();
    const { publicationId } = location.state;
    const navigate = useNavigate();

    const [envioExpress, setEnvioExpress] = useState(2500);
    const [envioAddress, setEnvioAddress] = useState(4500); 
    const [envio, setEnvio] = useState(0); 
    const [precio, setPrecio] = useState(0); 

    const [total, setTotal] = useState(precio); 
    {/*-----------------------------------------------------------------------------*/}

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setDelivery(newValue);
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Publicación carro */}
    useEffect(() => {
        axios.get(`http://localhost:3001/publications/onePublication/${publicationId}`)
        .then(response => {
            setPublication(response.data);
            // Guarda los datos que necesitas en el localStorage
            localStorage.setItem('cost_book', response.data.cost_book.toString());
            const cost_book = Number(localStorage.getItem('cost_book'));
            setPrecio(cost_book);
            console.log('Mostrar Publicaciones del carro'+ response.data);
        });
    }, []);
    {/*-----------------------------------------------------------------------------*/}

    {/* Api Chilexpress */}
    useEffect(() => {
        axios.get('http://testservices.wschilexpress.com/georeference/api/v1.0/regions')
            .then(response => {
            setRegionApi(response.data.regions);
            console.log('Mostrar Regiones'+ response.data);
            });
    }, []);
    {/*-----------------------------------------------------------------------------*/}

    {/* Region y Comuna chilexpress */}
    const handleRegionChangeApi = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        const numberRegion  = event.target.value;
        setSelectedRegionApi(numberRegion);
        console.log('region seleccionada: ' + event.target.value);
        if(numberRegion){
        axios.get(`http://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${numberRegion}&type=1`)
            .then(response => {
            const responseData : CitiesApi[] = response.data.coverageAreas;
            if(responseData){
            setCitiesApi(responseData);
            console.log("Datos comuna: " + responseData);
            }else{
                console.log("Entro pero no hay respuesta");
            }
            })
        }else{
            console.log("No hay datos de comunas")
        }
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Comuna y Sucursal chilexpress */}
    const handleCityChangeApi = (event: { target: { value: React.SetStateAction<string>; }; }) => { 
        console.log("antes de api")
        const cityApi = event.target.value;
        setIdCityApi(cityApi);

        console.log("cityApi "+ cityApi)
        console.log("selected region "+ selectedRegionApi)
        axios.get(`http://testservices.wschilexpress.com/georeference/api/v1.0/offices?Type=1&RegionCode=${selectedRegionApi}&CountyName=${cityApi}`)
            .then(response => {
            console.log("dentro de api")

            setSucursal(response.data.offices);
            console.log("Sucursales "+ response.data.offices);
        })
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Sucursal chilexpress */}
    const handleSucursal= (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setId_sucu(event.target.value);
        const apiDirec = event.target.value;
        console.log("apidirec "+apiDirec)
        localStorage.setItem("directionApi", JSON.stringify(apiDirec));
        console.log("Direccion Api Guardada: ", JSON.parse(localStorage.getItem("directionApi") || '{}'));
    };
    {/*------------------------------------------ */}

    {/* Modal Chilexpress */}

    // Función para abrir el modal
    const openModalChilexpress = () => setIsModalOpenChilexpress(true);

    // Función para cerrar el modal
    const closeModalChilexpress = () => setIsModalOpenChilexpress(false);
    {/*------------------------------------------ */}

    {/* Guardar Chilexpress */}
    const handleSaveExpress = () => {
        const id_express = uuidv4();
        localStorage.setItem('id_express', id_express);
        localStorage.setItem('phoneNumber', phoneNumberExpress.toString());
        localStorage.setItem('retireeName', retireeName);
        localStorage.setItem('selectedRegionApi', selectedRegionApi);
        localStorage.setItem('id_city_api', id_city_api);
        localStorage.setItem('id_sucu', id_sucu);
        setDisplayIdExpress(id_express);
        setDisplayPhoneNumber(phoneNumberExpress);
        setDisplayRetireeName(retireeName);
        setDisplayRegionApi(selectedRegionApi);
        setDisplayCityApi(id_city_api);
        setDisplaySucursal(id_sucu);
        closeModalChilexpress();
    
        console.log('id_express:', localStorage.getItem('id_express'));
        console.log('phoneNumber:', localStorage.getItem('phoneNumber'));
        console.log('retireeName:', localStorage.getItem('retireeName'));
        console.log('selectedRegionApi:', localStorage.getItem('selectedRegionApi'));
        console.log('id_city_api:', localStorage.getItem('id_city_api'));
        console.log('id_sucu:', localStorage.getItem('id_sucu'));
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Cargar Datos del LocalStorage */}
    useEffect(() => {
        let envioValue = 0;
        //selectedAddress y SelectedExpress = envio(1 o 2)
        console.log("selectedAddress: "+ selectedAddress)
        console.log("selectedExpress: "+ selectedExpress)
        if (selectedAddress && !selectedExpress) {
            envioValue = envioAddress;
            console.log("envioValue: "+ envioValue)
        } else if (!selectedAddress && selectedExpress) {
            envioValue = envioExpress;
            console.log("envioValue: "+ envioValue)
        }
        console.log("envioAddress: "+ envioAddress)
        console.log("envioExpress: "+ envioExpress)
    
        setEnvio(envioValue);
    
        const totalValue = precio + envioValue;
        //total y envio
        localStorage.setItem('envio', envioValue.toString());
        localStorage.setItem('total', totalValue.toString());
        console.log("envio: "+ envioValue.toString())
        console.log("total: "+ totalValue.toString())
        console.log("precio: "+ precio)
    
        setTotal(totalValue);
        console.log("totalValue" + totalValue)
        console.log("total" + total)
    }, [selectedAddress, selectedExpress]);
    {/*-----------------------------------------------------------------------------*/}

    {/* Seleccionar Dirección */}
    const handleSelectAddress = (addressId: string) => {
        if (selectedAddress === addressId) {
            setSelectedAddress(null);
            localStorage.removeItem('selectedAddress'); 
        } else {
            setSelectedAddress(addressId);
            localStorage.setItem('selectedAddress', addressId); 
        }
    };
    
    {/*-----------------------------------------------------------------------------*/}

    {/* Seleccionar Correos de Chile */}
    const handleSelectExpress = (expressId: string) => {
        if (selectedExpress === expressId) {
            setSelectedExpress(null); 
            localStorage.removeItem('selectedExpress'); 
        } else {
            setSelectedExpress(expressId); 
            localStorage.setItem('selectedExpress', expressId); 
        }
    };
    {/*------------------------------------------ */}

    {/* Modal Direccion */}

    // Función para abrir el modal
    const openModalAddress = () => setIsModalOpenAdress(true);

    // Función para cerrar el modal
    const closeModalAddress = () => setIsModalOpenAdress(false);
    
    {/*------------------------------------------ */}
    {/* Guardar Datos Direccion */}
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
        
        const user = localStorage.getItem("user");
        if (user) {
            const users : User = JSON.parse(user);
            const userD: User = users;
        
            let address_id = uuidv4();

            const selectedRegionObject = region.find(r => r.id_region === selectedRegion);
            const selectedCityObject = cities.find(c => c.id_city === id_city);
            try {
                const address  =  {
                    address_id: address_id,
                    name: name,
                    street: street,
                    house_number: house_number,
                    extra_details: extra_details,
                    postal_code: postal_code,
                    phone_number: phone_number,
                    region: selectedRegionObject,
                    city: selectedCityObject,
                    user_id: userD.rut_user,
                };
            
                const response = await axios.post('http://localhost:3001/addresses', address);
                console.log(response.data);
                alert('Dirección Agregada');
                closeModalAddress();
                window.location.reload();
            } catch (error) {
                console.error('Hubo un error en la direccion:', error);
            }
        }  
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Cargar Todas Las Direcciones */}
    useEffect(() => {

        const user = localStorage.getItem("user");
        if (user) {
            const users : User = JSON.parse(user);
            const userD: User = users;
            const rutUser = userD.rut_user;
            setUser(userD);

            axios.get(`http://localhost:3001/addresses/userAdress/${rutUser}`)
            .then(response => {
                console.log('rutUser: '+ rutUser);
                setAddress(response.data);
                console.log('Mostrar direcciones: '+ response.data);
            });
        } else {
            console.log("Usuario no existe")
        }
    }, []);
    {/*-----------------------------------------------------------------------------*/}

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

    {/* Eliminar Direccion */}
    const handleDeleteAddress = async (addressId: string) => {
        const confirmDelete = window.confirm('¿Realmente deseas eliminar esta dirección?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3001/addresses/${addressId}`);
                console.log(response.data);
                alert('Dirección eliminada');
                // Actualiza las direcciones después de eliminar una
                const updatedAddresses = address.filter(a => a.address_id !== addressId);
                setAddress(updatedAddresses);
            } catch (error) {
                console.error('Hubo un error al eliminar la dirección:', error);
            }
        }
    };
    {/*-----------------------------------------------------------------------------*/}
    {/* Refresh chilexpress */}
    const refreshPage = () => {
        window.location.reload();
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
                                {address && address.map((address) => (
                                    <Card 
                                        style={{
                                            margin: '10px 0', 
                                            textAlign:"left", 
                                            padding:"14px", 
                                            borderRadius:"20px",
                                            backgroundColor: address.address_id === selectedAddress ? '#ddd' : '#fff'
                                        }}
                                        onClick={() => handleSelectAddress(address.address_id)}
                                    >
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div>
                                                <p style={{fontFamily:"SF Pro Display Medium", fontSize:"20px"}}><BiMap style={{marginRight:"3px"}} /> {address.name}</p>
                                                <p style={{fontFamily:"SF Pro Display Medium"}}>{address.street}, {address.house_number}, {address.city.name} - {address.region.name} </p>
                                                <Link style={{color:"#000000", fontFamily:"SF Pro Display Medium"}} >Modificar</Link>
                                            </div>
                                            <FiTrash2 onClick={(e) => {e.stopPropagation(); handleDeleteAddress(address.address_id);}} style={{cursor: 'pointer', width:"25px", height:"auto", marginRight:"10px"}}/>
                                        </div>
                                    </Card>
                                ))}
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop:"20px"}}>
                                    <p>Agregar dirección</p>
                                    <Button onClick={openModalAddress} variant="contained">+</Button>
                                </div>
                            </div>
                        )}
                        {/* Modal Direccion */}
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
                                                value={name}
                                                onChange={e => setNameAdress(e.target.value)}
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
                                                value={street}
                                                onChange={e => setStreet(e.target.value)}
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
                                                value={house_number }
                                                onChange={e => setHouseNumber(Number(e.target.value))}
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
                                                value={extra_details}
                                                onChange={e => setExtraDetails(e.target.value)}
                                                
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
                                                value={postal_code}
                                                onChange={e => setPostalCode(Number(e.target.value))}
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
                                                value={phone_number}
                                                onChange={e => setPhoneNumber(Number(e.target.value))}
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* onClick={handleSubmitPublication} */}
                                    <Grid item xs={6} style={{ marginTop:"28px",marginBottom:"10px" ,justifyContent:"center", display:"flex"}} >
                                        <Button fullWidth onClick={handleSubmitAddress}   style={{ backgroundColor: "#1eaeff", color: "#ffffff", borderRadius: "30px", textTransform: "none", width: "500px", height: "50px", fontWeight: "bold" }} >
                                            Completado
                                        </Button>
                                    </Grid>
                                </Card>
                            </div>
                        </Modal>
                        {/* Api Chilexpress */}
                        {delivery === 1 && (

                            <div style={{paddingTop:"35px", marginRight:"35px", marginLeft:"55px"}}>
                                <h2>Sucursal Chilexpress</h2>
                                {displayIdExpress && displaySucursal && displayRetireeName && displayRegionApi && displayCityApi ? (
                                    <Card 
                                        style={{
                                            margin: '10px 0', 
                                            textAlign:"left", 
                                            padding:"14px", 
                                            borderRadius:"20px",
                                            backgroundColor: displayIdExpress === selectedExpress ? '#ddd' : '#fff'
                                        }}
                                        onClick={() => handleSelectExpress(displayIdExpress)}
                                    >
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div>
                                                <p style={{fontFamily:"SF Pro Display Medium", fontSize:"20px"}}><BiMap style={{marginRight:"3px"}} /> {displaySucursal}</p>
                                                <p style={{fontFamily:"SF Pro Display Medium"}}>{displayRetireeName} - {displayRegionApi}, {displayCityApi}  </p>
                                                <Link style={{color:"#000000", fontFamily:"SF Pro Display Medium"}} >Modificar</Link>
                                            </div>
                                        </div>
                                    </Card>
                                ) : null}
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop:"20px"}}>
                                    <p>Agregar dirección</p>
                                    <Button onClick={openModalChilexpress} variant="contained">+</Button>
                                </div>
                            </div>
                            
                        )}
                        {/* Modal Chilexpress */}
                        
                        <Modal open={isModalOpenChilexpress} onClose={closeModalChilexpress}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflowY: "auto" }} >
                                <Card style={{ width: "1030px", maxHeight: "650px", overflowY: "auto", position: "relative", paddingLeft:"20px", paddingRight:"20px", marginTop:"20px", marginBottom:"20px", paddingBottom:"20px", paddingTop:"30px"}}>
                                    <MdClose onClick={closeModalChilexpress} style={{ position: "absolute", right: 0, top: 0, padding:"10px", width:"55px", height:"55px"}} />
                                    <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"30px", marginBottom:"15px", textAlign:"center"}}>Direccion de entrega</Typography>
                                    <Grid container spacing={2} alignItems="center" >
                                        
                                        {/* Región */}
                                        <Grid item xs={6}>
                                        <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Región</h6>
                                            <FormControl fullWidth style={{marginRight: '10px', width:"200px"}}>
                                            <InputLabel id="region-label">Elige una región</InputLabel>
                                            <Select 
                                                labelId="region-label"
                                                id="region_sucursal"
                                                value={selectedRegionApi || ''}
                                                placeholder="Ej: Valparaiso"
                                                onChange={(event) => handleRegionChangeApi({
                                                    target: {
                                                        value:(event.target.value),
                                                    },
                                                })}
                                            >
                                                {regionApi.map(region => (
                                                    <MenuItem key={region.regionId} value={region.regionId}>{region.regionName}</MenuItem>
                                                ))}
                                            </Select>
                                            </FormControl>
                                        </Grid>
                                        
                                        {/* Comuna */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Comuna</h6>
                                            <FormControl className="formulario" fullWidth style={{marginLeft: '10px', width:"200px"}}>
                                                <InputLabel id="region-label">Elige una ciudad</InputLabel>
                                                <Select 
                                                    labelId="city-label"
                                                    id="city_sucursal"
                                                    value={id_city_api || ''}
                                                    placeholder="Ej: Viña del Mar"
                                                    onChange={(event) => handleCityChangeApi({
                                                        target: {
                                                            value: (event.target.value),
                                                        },
                                                    })}
                                                >
                                                    {citiesApi.map((city: CitiesApi) => (
                                                        <MenuItem key={city.countyCode} value={city.countyName}>{city.countyName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        
                                        {/* Sucursal*/}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Sucursal</h6>
                                            <FormControl style={{marginRight: '10px', width:"200px"}}>
                                                <InputLabel>Ej: Plaza Latorre 32</InputLabel>
                                                <Select
                                                labelId="sucu-label"
                                                    id="sucursal"
                                                    value={ id_sucu|| ''}
                                                    onChange={(event) => handleSucursal({
                                                        target: {
                                                            value:(event.target.value),
                                                        },
                                                    })}
                                                >
                                                    {sucursal.map((sucu: Sucursal) => (
                                                        <MenuItem key={sucu.addressId} value={sucu.streetName + " " + "#"+sucu.streetNumber + " " + sucu.countyName }>{sucu.officeName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        
                                        {/* Teléfono */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Teléfono</h6>
                                            <TextField onChange={(e) => setPhoneNumberExpress(Number(e.target.value))}  placeholder="Ej: +56 9 XXXX XXXX" style={{width: '100%'}} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}  >
                                        {/* Quien retira */}
                                        <Grid item xs={12}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginBottom:"20px", marginTop:"10px"}}>Nombre de quien retira</h6>
                                            <TextField onChange={(e) => setRetireeName(e.target.value)} placeholder="Ej: Natalia Rubilar" style={{width: '100%'}} />
                                        </Grid> 
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop:"28px",marginBottom:"10px" ,justifyContent:"center", display:"flex"}} >
                                        <Button fullWidth onClick={handleSaveExpress}   style={{ backgroundColor: "#1eaeff", color: "#ffffff", borderRadius: "30px", textTransform: "none", width: "500px", height: "50px", fontWeight: "bold" }} >
                                            Completado
                                        </Button>
                                    </Grid>
                                </Card>
                            </div>
                        </Modal>
                    </div>
                </Grid>

                <Grid className="text-center" item xs={12} sm={12} md={12} lg={5} xl={5}>
                    <Card style={{marginRight:"20px", padding:"20px", height:"auto", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {publication && (
                        <>
                            <div>
                                <Typography style={{fontSize:"25px", fontFamily:"SF Pro Display Bold"}} >Resumen de los Productos</Typography>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop:"20px" }}>
                                    <img 
                                        src={`http://localhost:3001/images/${publication.photo_showcase}`}
                                        alt="Imagen del libro"
                                        style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                    <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>{publication.book.name_book}</Typography>
                                        <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>${publication.cost_book}</Typography>
                                        <Typography >{publication.book.author_id_author.name_author}</Typography>
                                    </div>  
                                </div>
                                <br />
                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                <br />
                                <div style={{display: "flex", justifyContent: "space-between", marginLeft:"20px", marginRight:"20px"}}>
                                    <Typography style={{ fontSize:"16px",fontFamily:"SF Pro Display Semibold"}}>SubTotal: </Typography>
                                    <Typography style={{fontSize:"16px"}}>${publication.cost_book}</Typography>
                                </div>
                                <br />
                                <div style={{display: "flex", justifyContent: "space-between", marginLeft:"20px", marginRight:"20px"}}>
                                    <Typography style={{ fontSize:"16px",fontFamily:"SF Pro Display Semibold"}}>Despacho: </Typography>
                                    <Typography style={{fontSize:"16px"}}>${envio}</Typography>
                                </div>
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                <div style={{display: "flex", justifyContent: "space-between", marginLeft:"20px", marginRight:"20px"}}>
                                    <Typography style={{ fontSize:"19px",fontFamily:"SF Pro Display Semibold"}}>Total: </Typography>
                                    <Typography style={{fontSize:"19px"}}>${total}</Typography>
                                </div>

                            </div>
                            <div style={{  height:"40px", display: 'flex', justifyContent: 'center', marginTop:"35px"}}>
                                <Button onClick={() => navigate(-1)}  style={{backgroundColor:"#989ca8", color:"#ffffff", textTransform: "none",fontSize:"19px", marginRight: "130px", borderRadius:"30px"}} >Cancelar</Button>
                                <Button onClick={() => navigate('/pay', { state: { publicationId: publication.id_publication } })} style={{backgroundColor:"#00a9e0", textAlign:"center", color:"#ffffff", textTransform: "none", fontSize:"19px" , borderRadius:"30px"}}>Continuar</Button>
                            </div>
                        </>
                    )}
                    </Card>
                </Grid>
                
                
            </Grid>
            
            <br />
            <Footer/>
        </>
    );
};
export default DeliveryMethods;