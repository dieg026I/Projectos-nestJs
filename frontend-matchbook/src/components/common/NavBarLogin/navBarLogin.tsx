
import React, { useContext, useEffect, useState } from 'react';
import "../../common/NavBar/cssNav.css";
import { useLocation, useNavigate } from 'react-router-dom';

import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputBase,
    Link,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"; 

import { PiPencilSimpleBold } from "react-icons/pi";
import { LuShoppingCart, LuSearch, LuMenu, LuDollarSign, LuLogOut } from "react-icons/lu";
import  Logo from "../../../assents/img/logoMatch.png";
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import Book1 from "../../../assents/img/book1.jpeg";

interface Users {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    username: string
}

interface Publication {
    id_publication: string;
    date_publication: Date;
    users: Users;
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
    category: string;
    year_book: number;
    status_book: string;
    stock_book: number;
    description_book: string;
}
interface ShoppingCart {
    id_shopping_card: number,
    user: Users,
    publication: Publication[],
}


export const NavBarLogin: React.FC<{}> = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);


    const [count, setCount] = useState(0);


    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        console.log("Entro al popup")
    };

    {/* Nombre de usuario y correo */}
    const [users, setUsers] = React.useState<Users>();

    const [term, setTerm] = React.useState('');

    useEffect(() => {
        const fetchPublications = async () => {
        
        const userString = localStorage.getItem("user");
        if (userString !== null){
        const users : Users = JSON.parse(userString);
        try {
            const responseUser= await axios.get(`http://localhost:3001/users/rut/${users.rut_user}`);
            const userResponse = responseUser.data;
            setUsers(userResponse);
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
        }   
        
    };

    fetchPublications();
    }, []);


    {/* Resposivo */}
    const isMobile = useMediaQuery('(max-width:1080px)') ;
    
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    {/* Abrir Perfil */}
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    {/* Colores Boton Perfil */}
    const [bgColorProfile, setBgColorProfile] = useState('transparent');
    const [textColorProfile, setTextColorProfile] = useState('#f05d16');
    const [borderColorProfile, setBorderColorProfile] = useState('#ffffff');

    const handleMouseOverProfile = () => {
        setBgColorProfile('#f05d16');
        setTextColorProfile('#ffffff');
        setBorderColorProfile('#f05d16');
        
    };

    const handleMouseOutProfile = () => {
        setBgColorProfile('transparent');
        setTextColorProfile('#f05d16'); 
        setBorderColorProfile('#ffffff');
    };

    {/* Colores Boton Lapiz */}
    const [bgColorPencil, setBgColorPencil] = useState('#ffffff');
    const [textColorPencil, setTextColorPencil] = useState('#00a9e0');
    const [borderColorPencil, setBorderColorPencil] = useState('#ffffff');

    const handleMouseOverPencil = () => {
        setBgColorPencil('#00a9e0');
        setTextColorPencil('#ffffff');
        setBorderColorPencil('#00a9e0');
        
    };

    const handleMouseOutPencil = () => {
        setBgColorPencil('#ffffff');
        setTextColorPencil('#00a9e0'); 
        setBorderColorPencil('#ffffff');
    };


    const mobileMenuId = 'mobile-navBarLogin';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(mobileMoreAnchorEl)}
            onClose={() => setMobileMoreAnchorEl(null)}
            style={{justifyContent:"left"}}
        >
            <MenuItem>
                <Link underline="hover" href="/readingClub">Club de Lectura</Link>
            </MenuItem>
            <MenuItem>
                <Link underline="hover" href="/marketplace">Marketplace</Link>
            </MenuItem>
        </Menu>
    );

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    };
    
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/publications/search/${term}`);
            navigate('/marketplaceSearch', { state: { searchResults: response.data } });
        } catch (error) {
            console.error('Error fetching publications:', error);
        }
    };

    const location = useLocation();
    const { publicationCart } = location.state;

    const [publicacion, setPublicacion] = useState(null);
    const [cart, setCart] = useState<ShoppingCart>();

    const idUsuario = users?.rut_user;
    // Función para obtener el carro de un usuario
    async function obtenerCarroPorUsuario(idUsuario: number) {
    
        
        // Intenta obtener el carro del usuario desde el backend
        if (users) {
            let carro;
            try {
            const response = await axios.get(`http://localhost:3001/shopping-cart/userCart/${idUsuario}`);
            carro = response.data;
            } catch (error) {
            console.error('No se pudo obtener el carro del usuario', error);
            } 

            // Si el usuario no tiene un carro, crea uno
            if (!carro) {
                carro = await crearCarro(idUsuario);
            }
            return carro;
        }
    }

    // Función para crear un carro para un usuario
    async function crearCarro(idUsuario: number) {
        // Genera un id_cart aleatorio
        const id_cart = Math.random().toString(36).substring(2, 15);
    
        // Crea un nuevo carro en la base de datos y asócialo al usuario
        try {
            const response = await axios.post('http://localhost:3001/shopping-cart', {
            id_cart,
            user_id_user: idUsuario,
            publication: publicationCart
            });
            return response.data;
        } catch (error) {
            console.error('No se pudo crear el carro', error);
        }
    }
    
    // Función para agregar una publicación al carro
    async function agregarAlCarro(publicationCart: Publication) {
        if (users) {
            const carro = await obtenerCarroPorUsuario(users.rut_user);
        
            const IdPublication = publicationCart.id_publication;
        
    
        // Si el carro existe, agrega la publicación al carro
        if (carro) {
            const allCart: Publication[]= carro.publication;
            for (let i = 0; i < allCart.length; i++) {
                // Si el ID de la publicación coincide con el ID que estamos buscando...
                if (allCart[i].id_publication === publicationCart.id_publication) {
                  // Muestra un mensaje de alerta
                    alert('Ya existe este libro en tu carro');
                    break; // Sal del bucle for, ya que encontramos una coincidencia
                }
            }
            try {
            const response = await axios.post(`http://localhost:3001/shopping-cart/publicationCart/${carro.id_shopping_card}/publications/${carro.IdPublication}`);
            if(response){    
                const cartResponse: ShoppingCart = response.data; 
                setCart(cartResponse);
                setIsOpen(true)
            }
            } catch (error) {
                console.error('No se pudo agregar la publicación al carro', error);
            }
        }
        }
    }

    return (
        <div className="navbar">
            <AppBar position="static" sx={{backgroundColor: "#1e1e1e"}}>
                <Toolbar style={{padding: "0px", marginRight: "20px"}} >
                    <Container maxWidth="xl">
                        <Grid
                            direction="row"
                            alignItems="center"
                            container
                            justifyContent="space-between"
                        >
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                {isMobile ? (
                                    <Link href="/home2" underline="none">
                                        <Box display="flex" alignItems="center" justifyContent="left" textAlign="center">
                                            <img src={Logo} alt="Logo Matchbook" width="40" height="40"  /> 
                                        </Box>
                                    </Link>
                                
                                ) : (
                                    <Link href="/home2" underline="none">
                                        <Box display="flex" alignItems="center" justifyContent="left" textAlign="center">
                                            <img src={Logo} alt="Logo Matchbook" width="40" height="40"  /> 
                                            <Typography className="" variant="h1" component="h1"  style={{ fontWeight: 550, color:  "white", fontSize: "25px", marginLeft: "10px"}}>
                                                Matchbook
                                            </Typography>
                                        </Box>
                                    </Link>
                                )}
                            </Grid>

                            {isMobile ? (
                                <>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleMobileMenuOpen}
                                    >
                                        <LuMenu style={{ width: "30px", height:"30px"}}  />
                                    </IconButton>
                                    {renderMobileMenu}
                                </>
                            ) : (
                                <Grid  item xs={3} sm={3} md={3} lg={3} >
                                    <Box className="links-container text">
                                        <Link underline="hover" style={{color: "white"}} href="/readingClub">Club de Lectura</Link>
                                        <Link underline="hover" style={{color: "white"}} href="/marketplace">Marketplace</Link>
                                    </Box>
                                </Grid>
                            )}
                            <Grid  item xs={4} sm={4} md={4} lg={4}>
                                {isMobile ? (
                                    <IconButton color="inherit">
                                        <LuSearch style={{ width: "30px", height:"30px"}}  />
                                    </IconButton>
                                ) : (
                                    <div className="searchHome" >
                                        <input className="search" placeholder="Buscar" value={term} onChange={handleInputChange} />
                                        <LuSearch id="search-icon" onClick={handleSearch} />
                                    </div>
                                )}
                            </Grid>

                            {isOpen && (
                                <div style={{ position: 'absolute', top: '140%', right: '20.7%', transform: 'translateX(0%)', marginTop: '10px', padding: '14px', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center', backgroundColor: '#fff', width:"340px", height:"220px"}}>

                                    <div style={{ position: 'absolute', top: '-10px', left: '90%', transform: 'translateX(-50%) rotate(45deg)', width: '20px', height: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderColor: ' #ccc transparent transparent #ccc ' }} />
                                    <Typography variant="h5" style={{ textAlign: 'left', fontFamily:"SF Pro Display Bold", fontSize:"20px", marginBottom:"20px" }}>Alicia en el país de las maravillas</Typography>
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
                                </div>   
                            )}

                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Box className="space" >
                                    {isMobile ? (
                                        <>
                                            <Badge badgeContent={1} color="primary" onClick={togglePopup}>  
                                                <LuShoppingCart style={{width: "30px", height:"30px", cursor: 'pointer'}} href="/cart" color="inherit" />
                                            </Badge>

                                            

                                            <IconButton href="/sales" color="inherit"  >
                                                <LuDollarSign style={{ width: "35px", height:"35px", cursor: 'pointer'}} />
                                            </IconButton>
                                            <div onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <Avatar style={{ backgroundColor: "#f05d16" }} src="/broken-image.jpg" />
                                                <div style={{ marginLeft: '10px' }}>{users?.username}</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Badge badgeContent={1} color="primary">
                                                <LuShoppingCart onClick={togglePopup} style={{width: "30px", height:"30px", marginLeft:"40px", cursor: 'pointer'}} href="/cart" color="inherit" />
                                            </Badge>

                                            <Button style={{ backgroundColor: '#f05d16' , textTransform: "none", color: "#ffff", fontSize: "16px", marginLeft: "10px", borderRadius:"20px", width:"90px", padding:"6px" }} href="/sales">Vender</Button>

                                            <div onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <Avatar style={{ backgroundColor: "#f05d16" }} src="/broken-image.jpg" />
                                                <div style={{ marginLeft: '10px' }}>{users?.username}</div>
                                            </div>
                                        </>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>

            

            <div>
                <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '360px', maxHeight: '90vh' ,margin: 'auto', borderRadius:"20px"}, }}  >
                    <div style={{justifyContent:"center", textAlign: "center", position: 'relative',  }}>
                        <DialogTitle>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar style={{backgroundColor: "#f05d16", width:"50px", height:"50px"}} src="/broken-image.jpg" />
                                <div style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    backgroundColor: bgColorPencil, 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    position: 'absolute', 
                                    top: '14%', 
                                    left: '190px', 
                                    transform: 'translateY(-50%)',
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)'
                                }}>
                                    <PiPencilSimpleBold style={{ color: textColorPencil, width:"13px", height:"25px"}} onMouseOver={handleMouseOverPencil} onMouseOut={handleMouseOutPencil} /> {/* Icono de lápiz */}
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent style={{justifyContent:"center", textAlign: "center", paddingBottom: "0px", marginBottom:"0px"}}>
                            <h2 style={{ fontSize: "18px", fontFamily: "SF Pro Display Bold"}}>{users?.username}</h2> 
                            <p style={{ fontSize: "15px", fontFamily: "SF Pro Display Regular"}}>{users?.email_user}</p> 
                            <Button fullWidth
                                href="/profile" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: bgColorProfile, 
                                height:"40px",
                                color: textColorProfile,  
                                borderRadius: '30px', 
                                border: '2px solid borderColor',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                                fontSize:"15px", 
                                marginBottom: "20px" ,
                                fontFamily: "SF Pro Display Bold",
                                }}
                                onMouseOver={handleMouseOverProfile}
                                onMouseOut={handleMouseOutProfile}
                            >
                                Mi Perfil
                            </Button>

                            <Button fullWidth
                                href="/profile" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: "#ffffff", 
                                height:"40px",
                                color: "#f05d16",  
                                borderRadius: '30px', 
                                border: '2px solid borderColor',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                                fontSize:"15px", 
                                marginBottom: "15px" ,
                                fontFamily: "SF Pro Display Bold",
                                }}
                                
                            >
                                Mis Datos
                            </Button>

                            {/* Línea horizontal */}
                            <hr style={{ margin: "10px 0", opacity: 0.2 }} />

                            <Button fullWidth
                                href="/bookManagement" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: "#ffffff", 
                                height:"40px",
                                color: "#f05d16",  
                                borderRadius: '30px', 
                                border: '2px solid borderColor',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                                fontSize:"15px", 
                                marginBottom: "20px" ,
                                marginTop: "15px" ,
                                fontFamily: "SF Pro Display Bold",
                                }}
                                
                            >
                                Gestión de Libros
                            </Button>

                            <Button fullWidth
                                href="/wallet" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: "#ffffff", 
                                height:"40px",
                                color: "#f05d16",  
                                borderRadius: '30px', 
                                border: '2px solid borderColor',
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                                fontSize:"15px", 
                                marginBottom: "20px" ,
                                fontFamily: "SF Pro Display Bold",
                                }}
                                
                            >
                                Saldo
                            </Button>
                        </DialogContent>
                    </div>

                    {/* Línea horizontal */}
                    <hr style={{ margin: "10px 0", opacity: "0.2" }} />

                    <div style={{alignItems:"flex-start", display: "flex", flexDirection: "column", paddingRight:"8px"}}>
                        <DialogActions style={{paddingLeft:"26px"}}>   
                            <ul style={{listStyleType:"none", padding: "0px", fontSize: "13px", marginBottom:"2px", fontFamily: "SF Pro Display Medium",}}>
                                <li style={{marginBottom:"8px"}}>Configuración</li> 
                                <li>Ayuda</li>   
                            </ul>        
                        </DialogActions>
                    </div>


                    {/* Línea horizontal */}
                    <hr style={{ margin: "10px 0", opacity: 0.2 }} />

                    <div style={{justifyContent:"center", textAlign: "center", display: "flex"}}>
                    <DialogActions>
                        <Button onClick={logout} startIcon={<LuLogOut />}>Salir</Button> {/* Botón de Salir con un icono al lado izquierdo */}
                    </DialogActions>
                    </div>

                </Dialog>
            </div>



</div>
    );
}
    export default NavBarLogin;