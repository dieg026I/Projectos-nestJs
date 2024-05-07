
import React, { useState } from 'react';
import "../../components/common/cssNav.css";

import {
    AppBar,
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
import  Logo from "../../assents/img/logoMatch.png";
import MenuIcon from '@mui/icons-material/Menu';


export const NavBar: React.FC<{}> = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                <Link href="/clubdelectura">Club de Lectura</Link>
            </MenuItem>
            <MenuItem>
                <Link href="/marketplace">Marketplace</Link>
            </MenuItem>
        </Menu>
    );

    return (
        <div className="navbar">
            <AppBar position="static" sx={{backgroundColor: "#1e1e1e"}}>
                <Toolbar>
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
                                <Grid item xs={3} sm={3} md={3} lg={3} >
                                    <Box className="links-container">
                                        <Link href="/clubdelectura">Club de Lectura</Link>
                                        <Link href="/marketplace">Marketplace</Link>
                                    </Box>
                                </Grid>
                            )}
                            <Grid  item xs={3} sm={3} md={3} lg={3}>
                                {isMobile ? (
                                    <IconButton color="inherit">
                                        <FaSearch />
                                    </IconButton>
                                ) : (
                                    <div className="searchHome" >
                                        <FaSearch id="search-icon" />
                                        <input className="search" placeholder="Type to search..." />
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Box className="space">
                                    {isMobile ? (
                                        <>
                                            <IconButton color="inherit">
                                                <FaUser />
                                            </IconButton>
                                            <IconButton color="inherit">
                                                <FaRegUserCircle />
                                            </IconButton>
                                            <IconButton color="inherit">
                                                <FaShoppingCart />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <Button color="inherit" href="/login">Inicio de Sesión</Button>
                                            <Button style={{ backgroundColor: 'orange' }} href="/register">Registro</Button>
                                            <IconButton color="inherit">
                                                <FaShoppingCart />
                                            </IconButton>
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