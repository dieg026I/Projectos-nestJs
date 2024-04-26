
import React from 'react';
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
    Stack,
    Toolbar,
    Typography,
} from "@mui/material"; 

import { FaShoppingCart } from "react-icons/fa"; 
import logo from "../../assents/img/logoMatch.png";

export const NavBar: React.FC<{}> = () => {

    return (
        <div className="navbar">
            <AppBar position="static" sx={{backgroundColor: "#1e1e1e"}}>
            <Toolbar>
                <Container  maxWidth="xl">
                <Grid
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                >
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
                        {/*-Icono-*/}
                        <img src={logo} alt="Logo Matchbook" width="40" height="40"  /> 
                        
                        {/*-Titulo Matchbook-*/}
                        <Typography className="" variant="h1" component="h1"  style={{ fontWeight: 550, color:  "white", fontSize: "25px", marginLeft: "10px"}}>
                            Matchbook
                        </Typography>
                        </Box>
                    </Grid>
    
                    <Grid item xs={3} sm={3} md={3} lg={3} >
                    <Box className="links-container">
                        <Link href="/clubdelectura">Club de Lectura</Link>
                        <Link href="/marketplace">Marketplace</Link>
                    </Box>
                    </Grid>
    
                    <Grid className="search" item xs={3} sm={3} md={3} lg={3}>
                    <InputBase
                        placeholder="Buscar…"
                        classes={{
                        root: "inputRoot",
                        input: "inputInput",
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Box>
                    <Button color="inherit" href="/login">Inicio de Sesión</Button>
                    <Button style={{ backgroundColor: 'orange' }} href="/register">Registro</Button>
                    <IconButton color="inherit">
                        <FaShoppingCart />
                    </IconButton>
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