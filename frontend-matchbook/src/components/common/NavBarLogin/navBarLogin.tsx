
import React, { useEffect, useState } from 'react';
import "../../common/NavBar/cssNav.css";

import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
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

import { FaPencilAlt, FaRegUserCircle, FaSearch, FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa"; 
import  Logo from "../../../assents/img/logoMatch.png";
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const NavBarLogin: React.FC<{}> = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1080px)') ;
    

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [email_user, setEmail_user] = useState('');
    const username = localStorage.getItem('username');

    //button
    const [bgColor, setBgColor] = useState('transparent');
    const [textColor, setTextColor] = useState('#f05d16');

    const handleMouseOver = () => {
        setBgColor('#f05d16');
        setTextColor('#ffffff');
        
    };

    const handleMouseOut = () => {
        setBgColor('transparent');
        setTextColor('#f05d16'); 
    };

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${email_user}`);
                setEmail_user(response.data.email_user);
            } catch (error) {
                console.error('Hubo un error al obtener el correo electrónico:', error);
            }
        };
    
        fetchEmail();
    }, [email_user]);

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(mobileMoreAnchorEl)}
            onClose={() => setMobileMoreAnchorEl(null)}
        >
            <MenuItem>
                <Link underline="hover" href="/clubdelectura">Club de Lectura</Link>
            </MenuItem>
            <MenuItem>
                <Link underline="hover" href="/marketplace">Marketplace</Link>
            </MenuItem>
        </Menu>
    );



    

    return (
        <div className="navbar">
            <AppBar position="static" sx={{backgroundColor: "#1e1e1e"}}>
                <Toolbar style={{padding: "0px", marginRight: "20px"}} >
                    <Container maxWidth="xl">
                        <Grid
                            direction="row"
                            alignItems="center"
                            container  // Aumenta este valor para más espacio entre los elementos
                            justifyContent="space-between" // Distribuye el espacio de manera uniforme entre los elementos
                        >
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
                                    <img src={Logo} alt="Logo Matchbook" width="40" height="40"  /> 
                                    <Typography className="" variant="h1" component="h1"  style={{ fontWeight: 550, color:  "white", fontSize: "25px", marginLeft: "10px"}}>
                                        Matchbook
                                    </Typography>
                                </Box>
                            </Grid>
                            {isMobile ? (
                                <>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleMobileMenuOpen}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    {renderMobileMenu}
                                </>
                            ) : (
                                <Grid  item xs={3} sm={3} md={3} lg={3} >
                                    <Box className="links-container text">
                                        <Link underline="hover" style={{color: "white"}} href="/clubdelectura">Club de Lectura</Link>
                                        <Link underline="hover" style={{color: "white"}} href="/marketplace">Marketplace</Link>
                                    </Box>
                                </Grid>
                            )}
                            <Grid  item xs={4} sm={4} md={4} lg={4}>
                                {isMobile ? (
                                    <IconButton color="inherit">
                                        <FaSearch />
                                    </IconButton>
                                ) : (
                                    <div className="searchHome" >
                                        <input className="search" placeholder="Buscar" />
                                        <FaSearch id="search-icon" />
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Box className="space" >
                                    {isMobile ? (
                                        <>
                                            <IconButton href="/sales" color="inherit" >
                                                <RiMoneyDollarCircleLine />
                                            </IconButton>
                                            <div onClick={handleOpen}>
                                                <Avatar style={{backgroundColor: "#6f6d6d"}} src="/broken-image.jpg"  />
                                                <div>{username}</div> 
                                            </div>
                                            <Badge badgeContent={1} color="primary">  
                                                <FaShoppingCart style={{width: "60px", height: "22px"}} href="/cart" color="inherit" />
                                            </Badge>

                                        </>
                                    ) : (
                                        <>
                                            <Button style={{ backgroundColor: '#f05d16' , textTransform: "none", color: "#ffff", fontSize: "16px", marginLeft: "25px" }} href="/sales">Vender</Button>
                                            <div onClick={handleOpen}>
                                                <Avatar style={{backgroundColor: "#6f6d6d"}} src="/broken-image.jpg"  />
                                                <div>{username}</div> 
                                            </div>
                                            

                                            <Badge badgeContent={1} color="primary">
                                                <FaShoppingCart style={{width: "60px", height: "22px"}} href="/cart" color="inherit" />
                                            </Badge>
                                        </>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>

            <div>
                <Dialog open={open} onClose={handleClose}>
                    <div style={{justifyContent:"center", textAlign: "center", position: 'relative', display: 'inline-block' }}>
                    <DialogTitle>
                        <Avatar style={{backgroundColor: "#6f6d6d"}} src="/broken-image.jpg" />
                        <FaPencilAlt style={{ position: 'absolute', right: 0, bottom: 0 }} /> {/* Icono de lápiz */}
                    </DialogTitle>
                    </div>

                    <DialogContent style={{justifyContent:"center", textAlign: "center" }}>
                    <h2 style={{ fontSize: "18px", fontFamily: "SF Pro Display Bold"}}>Na.rubilark</h2> {/*{username} */}
                    <p style={{ fontSize: "15px", fontFamily: "SF Pro Display Regular"}}>na.rubilar@duocuc.cl</p> {/*{email_user} */}
                    <Button 
                        href="/perfil" 
                        variant="contained"  
                        style={{ 
                        textTransform: "none", 
                        backgroundColor: bgColor, 
                        color: textColor,  
                        borderRadius: '30px', 
                        border: '2px solid #f05d16', 
                        fontWeight: "bold", 
                        fontSize:"15px", 
                        marginBottom: "20px" ,
                        fontFamily: "SF Pro Display Medium",
                        }}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        Ir a mi perfil
                    </Button>
                    </DialogContent>

                    {/* Línea horizontal */}
                    <hr style={{ margin: "10px 0", opacity: 0.5 }} />

                    <div style={{justifyContent:"left", display: "flex", flexDirection: "column", paddingRight:"15px"}}>
                    <DialogActions>   
                        <ul style={{listStyleType:"none", justifyContent:"left"}}>
                        <li>Ajustes de mi cuenta</li> 
                        <li>Ayuda</li>   
                        
                        </ul>        

                    </DialogActions>
                    </div>

                    {/* Línea horizontal */}
                    <hr style={{ margin: "10px 0", opacity: 0.5 }} />

                    <div style={{justifyContent:"center", textAlign: "center", display: "flex"}}>
                    <DialogActions>
                        <Button startIcon={<FaSignOutAlt />}>Salir</Button> {/* Botón de Salir con un icono al lado izquierdo */}
                    </DialogActions>
                    </div>
                </Dialog>
                </div>



</div>
    );
}
    export default NavBarLogin;