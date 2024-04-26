
import React from 'react';
import "../../components/common/cssNav.css";
import {
    AppBar,
    Box,
    Container,
    Grid,
    Link,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material"; 

export const NavBar: React.FC<{}> = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                            <Typography>Codrr</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    <Link style={{color: "black"}} href="/login">Login</Link>

                                    <Link style={{color: "black"}}  href="/register">Registro</Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavBar;