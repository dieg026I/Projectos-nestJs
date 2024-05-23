
import React, { useEffect, useState } from 'react';
import "../../common/NavBar/cssNav.css";
import { useNavigate } from 'react-router-dom';

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

import { PiPencilSimpleBold } from "react-icons/pi";
import { LuShoppingCart, LuSearch, LuMenu, LuDollarSign, LuLogOut } from "react-icons/lu";
import  Logo from "../../../assents/img/logoMatch.png";
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';

export const NavBarLogin: React.FC<{}> = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

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

    {/* Nombre de usuario */}
    const [email_user, setEmail_user] = useState('');
    const username = localStorage.getItem('username');

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
        // Elimina el token del almacenamiento local
        localStorage.removeItem('access_token');

        // Redirige al usuario a la página de inicio de sesión
        navigate('/login');
    };


    

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
                                        <input className="search" placeholder="Buscar" />
                                        <LuSearch id="search-icon" />
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Box className="space" >
                                    {isMobile ? (
                                        <>
                                            <IconButton href="/sales" color="inherit"  >
                                                <LuDollarSign style={{ width: "35px", height:"35px"}} />
                                            </IconButton>
                                            <div onClick={handleOpen}>
                                                <Avatar style={{backgroundColor: "#f05d16"}} src="/broken-image.jpg"  />
                                                <div>{username}</div> 
                                            </div>
                                            <Badge badgeContent={1} color="primary">  
                                                <LuShoppingCart style={{width: "30px", height:"30px"}} href="/cart" color="inherit" />
                                            </Badge>

                                        </>
                                    ) : (
                                        <>

                                            <Badge badgeContent={1} color="primary">
                                                <LuShoppingCart style={{width: "30px", height:"30px", marginLeft:"40px"}} href="/cart" color="inherit" />
                                            </Badge>

                                            <Button style={{ backgroundColor: '#f05d16' , textTransform: "none", color: "#ffff", fontSize: "16px", marginLeft: "10px", borderRadius:"20px", width:"90px", padding:"6px" }} href="/sales">Vender</Button>

                                            <div onClick={handleOpen}>
                                                <Avatar style={{backgroundColor: "#f05d16"}} src="/broken-image.jpg"  />
                                                <div>{username}</div> 
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
                <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '300px', maxHeight: '80vh', margin: 'auto', borderRadius:"20px"}, }}  >
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
                                    top: '27%', 
                                    left: '160px', 
                                    transform: 'translateY(-50%)',
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)'
                                }}>
                                    <PiPencilSimpleBold style={{ color: textColorPencil, width:"13px", height:"25px"}} onMouseOver={handleMouseOverPencil} onMouseOut={handleMouseOutPencil} /> {/* Icono de lápiz */}
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent style={{justifyContent:"center", textAlign: "center", paddingBottom: "0px", marginBottom:"0px"}}>
                            <h2 style={{ fontSize: "18px", fontFamily: "SF Pro Display Bold"}}>Na.rubilark</h2> {/*{username} */}
                            <p style={{ fontSize: "15px", fontFamily: "SF Pro Display Regular"}}>na.rubilar@duocuc.cl</p> {/*{email_user} */}
                            <Button fullWidth
                                href="/profile" 
                                variant="contained"  
                                style={{ 
                                textTransform: "none", 
                                backgroundColor: bgColorProfile, 
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
                                Ir a mi perfil
                            </Button>
                        </DialogContent>
                    </div>

                    {/* Línea horizontal */}
                    <hr style={{ margin: "10px 0", opacity: 0.5 }} />

                    <div style={{alignItems:"flex-start", display: "flex", flexDirection: "column", paddingRight:"8px"}}>
                        <DialogActions style={{paddingLeft:"26px"}}>   
                            <ul style={{listStyleType:"none", padding: "0px", fontSize: "13px", marginBottom:"2px", fontFamily: "SF Pro Display Medium",}}>
                                <li style={{marginBottom:"8px"}}>Ajustes de mi cuenta</li> 
                                <li>Ayuda</li>   
                            </ul>        
                        </DialogActions>
                    </div>


                    {/* Línea horizontal */}
                    <hr style={{ margin: "10px 0", opacity: 0.5 }} />

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