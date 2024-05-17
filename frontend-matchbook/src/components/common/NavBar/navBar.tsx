
import React, { useState } from 'react';
import "../../common/NavBar/cssNav.css";

import {
    AppBar,
    Badge,
    Box,
    Button,
    Container,
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

import { FaRegUserCircle, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"; 
import  Logo from "../../../assents/img/logoMatch.png";
import MenuIcon from '@mui/icons-material/Menu';


export const NavBar: React.FC<{}> = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1080px)') ;

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    

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
                                {isMobile ? (
                                    <Link href="/" underline="none">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
                                            <img src={Logo} alt="Logo Matchbook" width="40" height="40"  /> 
                                        </Box>
                                    </Link>
                                
                                ) : (
                                    <Link href="/" underline="none">
                                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
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
                                <Box className="space">
                                    {isMobile ? (
                                        <>
                                            <IconButton href="/login" color="inherit">
                                                <FaUser  />
                                            </IconButton>
                                            <IconButton href="/register" color="inherit">
                                                <FaRegUserCircle  />
                                            </IconButton>
                                            <Badge badgeContent={1} color="primary">  
                                                <FaShoppingCart style={{width: "60px", height: "22px"}} href="/cart" color="inherit" />
                                            </Badge>

                                        </>
                                    ) : (
                                        <>
                                            <Button className="text" color="inherit" href="/login" style={{paddingLeft: "20px", textTransform: "none", fontSize: "16px" }}>Inicia Sesión</Button>
                                            <Button style={{ backgroundColor: '#f05d16' , textTransform: "none", color: "#ffff", fontSize: "16px" }} href="/register">Registrate</Button>
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
        </div>
    );
}
    export default NavBar; 