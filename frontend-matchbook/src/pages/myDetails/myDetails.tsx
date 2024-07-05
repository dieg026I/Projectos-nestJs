

import { Box, Grid, Card, Button, Avatar, Typography, Stack, Pagination, CardContent, PaginationItem, CardMedia, useColorScheme, TextField, FormControl, Select, MenuItem, InputLabel, Modal, Link, SelectChangeEvent } from "@mui/material";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import axios from "axios";
import React from "react";
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
interface Bank {
    code_sbif: number;
    name_bank: string;
};
interface AccountType {
    account_type_id: string;
    name: string;
};

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


const MyDetails: React.FC = () => {
    
    {/* Cargar Todas Las Regiones */}
    useEffect(() => {
        axios.get('http://localhost:3001/region')
            .then(response => {
            setRegion(response.data);
            console.log('Mostrar Regiones'+response.data);
            });
    }, []);
    {/*------------------------------------------ */}

    {/* Cargar Todos los bancos */}
    useEffect(() => {
        axios.get('http://localhost:3001/banks')
            .then(response => {
            setBank(response.data);
            console.log('Mostrar Bancos'+response.data);
            });
    }, []);

    {/*------------------------------------------ */}
    
    {/* Cargar Todos los tipos de cuentas */}
    useEffect(() => {
        axios.get('http://localhost:3001/account-types')
            .then(response => {
            setAccount(response.data);
            console.log('Mostrar Tipo de cuentas'+response.data);
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

    const [bank , setBank] = React.useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState('');

    const [account , setAccount] = React.useState<AccountType[]>([]);
    const [selectedAccount, setSelectedAccount] = useState('');

    const [region , setRegion] = React.useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [cities, setCities] = React.useState<Cities[]>([]);
    const [id_city, setIdCity] = useState(0);
    const [activeTab, setActiveTab] = useState('direcciones');
    const [isModalOpenAdress, setIsModalOpenAdress] = useState(false);
    const [isModalOpenBank, setIsModalOpenBank] = useState(false);

    const [name, setNameAdress] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [house_number, setHouseNumber] = React.useState<number | null>(null);
    const [extra_details, setExtraDetails] = React.useState('');
    const [postal_code, setPostalCode] = React.useState<number | null>(null);
    const [phone_number, setPhoneNumber] = React.useState<number | null>(null);


    {/* Modal Direccion */}

    const openModalAddress = () => setIsModalOpenAdress(true);

    const closeModalAddress = () => setIsModalOpenAdress(false);

    {/* Modal Cuenta Bancaria */}

    const openModalBank = () => setIsModalOpenBank(true);

    const closeModalBank = () => setIsModalOpenBank(false);

    // Funciones para manejar los cambios en los selectores
    const handleBankChange = (event: SelectChangeEvent<string>) => {
        setSelectedBank(event.target.value);
    };

    const handleAccountTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedAccount(event.target.value);
    };

    const [address, setAddress] = useState<Address[]>([]);
    const [user, setUser] = useState<User | null>(null);

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

    {/* Cargar Todos los bancos */}
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

    {/* Titulos */}
    const getTitle = () => {
        switch (activeTab) {
            case 'direcciones':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Direcciones</Typography>;
            case 'cuentaBancaria':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Cuenta Bancaria</Typography>;
            default:
                return "";
        }
    };

    {/* Contenido Pestañas */}
    const getContent = () => {
        switch (activeTab) {
            case 'direcciones':
                return (
                    <>
                        <div style={{paddingTop:"25px", marginRight:"35px", marginLeft:"35px"}}>
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
                    </>
                    
                );
            case 'cuentaBancaria':
                return (
                    <>
                        <div style={{paddingTop:"25px", marginRight:"35px", marginLeft:"35px"}}>
                            <Card style={{margin: '10px 0', textAlign:"left", padding:"14px", borderRadius:"20px"}}>
                                <p style={{fontFamily:"SF Pro Display Medium"}}>123456789123</p>
                                <p style={{fontFamily:"SF Pro Display Medium"}}>Banco de Chile</p>
                                <Link style={{color:"#000000", fontFamily:"SF Pro Display Medium"}} >Modificar</Link>
                            </Card>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:"20px"}}>
                                <p>Agregar datos de transferencia</p>
                                <Button onClick={openModalBank} variant="contained">+</Button>
                            </div>
                        </div>
                        {/* Modal Cuenta */}
                        <Modal open={isModalOpenBank} onClose={closeModalBank}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflowY: "auto" }} >
                                <Card style={{ width: "1030px", maxHeight: "650px", overflowY: "auto", position: "relative", paddingLeft:"20px", paddingRight:"20px", marginTop:"20px", marginBottom:"20px", paddingBottom:"20px", paddingTop:"30px"}}>
                                    <MdClose onClick={closeModalBank} style={{ position: "absolute", right: 0, top: 0, padding:"10px", width:"55px", height:"55px"}} />
                                    <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"30px", marginBottom:"15px", textAlign:"center"}}>Direccion de entrega</Typography>
                                    <Grid container spacing={2} alignItems="center" style={{marginTop:"20px"}} >
                                        {/* Nombre Titular */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Nombre Titular</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="name"
                                                className="mb-3 formulario"
                                                placeholder="Ej: Diego Isla"
                                                type="text"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>

                                        {/* Rut del Titular */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Rut del Titular</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black"}}
                                                id="rut"
                                                className="mb-3 formulario"
                                                placeholder="Ej: 99999999-9"
                                                type="text"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>

                                        {/* Banco */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Banco</h6>
                                            <FormControl fullWidth>
                                                <InputLabel id="bank-label">Selecciona un banco</InputLabel>
                                                <Select 
                                                    labelId="bank-label"
                                                    id="bank"
                                                    value={selectedBank}
                                                    onChange={handleBankChange}
                                                >
                                                    {bank.map((bank) => (
                                                        <MenuItem key={bank.code_sbif} value={bank.code_sbif}>{bank.name_bank}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        {/* Tipo de Cuenta */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Tipo de Cuenta</h6>
                                            <FormControl fullWidth>
                                                <InputLabel id="accountType-label">Selecciona un tipo de cuenta</InputLabel>
                                                <Select 
                                                    labelId="accountType-label"
                                                    id="accountType"
                                                    value={selectedAccount}
                                                    onChange={handleAccountTypeChange}
                                                >
                                                    {account.map((accountType) => (
                                                        <MenuItem key={accountType.account_type_id} value={accountType.account_type_id}>{accountType.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        {/* Número de Cuenta */}
                                        <Grid item xs={12}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Número de Cuenta</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="accountNumber"
                                                className="mb-3 formulario"
                                                placeholder="Ej: 000099999999"
                                                type="number"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>

                                        {/* Correo Electrónico */}
                                        <Grid item xs={12}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Correo Electrónico</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="email"
                                                className="mb-3 formulario"
                                                placeholder="Ej: Diego.I@gmail.com"
                                                type="email"
                                                InputLabelProps={{
                                                    sx: { fontSize: "16px" } 
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop:"28px",marginBottom:"10px" ,justifyContent:"center", display:"flex"}} >
                                            <Button fullWidth   style={{ backgroundColor: "#1eaeff", color: "#ffffff", borderRadius: "30px", textTransform: "none", width: "500px", height: "50px", fontWeight: "bold" }} >
                                                Completado
                                            </Button>
                                    </Grid>
                                </Card>
                            </div>
                        </Modal>
                    </>
                );
            default:
                return null;
        }
    };
    {/*-----------------------------------------------------------------------------*/}
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);


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
    
    return (
        <>

            <NavBarLogin />
            <div className="gestion">
                <Box className="fondoVenta" sx={{ position: 'relative', width: '100%' }}>
                    {/* Pestaña "Direcciones" */}
                    <Box sx={{
                        ...tabStyle,
                        right: 'calc(70% - 100px)',
                        top: '13%'
                    }} onClick={() => setActiveTab('direcciones')}>
                        <Typography variant="body2">Direcciones</Typography>
                    </Box>

                    {/* Pestaña "Cuenta Bancaria" */}
                    <Box sx={{
                        ...tabStyle,
                        right: 'calc(30% - 100px)',
                        top: '13%'
                    }} onClick={() => setActiveTab('cuentaBancaria')}>
                        <Typography variant="body2">Cuenta Bancaria</Typography>
                    </Box>
                
                    <Card sx={{
                        marginTop: "90px",
                        borderRadius: "20px",
                        width: "1100px",
                        maxWidth: "1400px",
                        height: "550px",
                        maxHeight: "100%",
                        display: 'flex', 
                        flexDirection: 'column' 
                    }}>
                        {/* Título Dinámico */}
                        <CardContent style={{ backgroundColor: "#002E5D", textAlign: "center" }}>
                            {getTitle()}
                        </CardContent>

                        {/* Contenido Dinámico */}
                        <CardContent style={{ flexGrow: 1, padding:"0" }}>
                            {getContent()}
                        </CardContent>
                        
                        <CardContent sx={{ backgroundColor: "#002E5D" }}></CardContent>
                    </Card> 
                </Box>
            </div>
            <Footer />
        </>
    );
};
// Estilos comunes para las pestañas
const tabStyle = {
    position: 'absolute',
    top: '78px',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '20px 20px 0 0',
    zIndex: '1200',
    width: "200px",
    height: "40px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
};
export default MyDetails;
