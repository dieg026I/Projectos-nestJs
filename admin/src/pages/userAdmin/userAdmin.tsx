import SideMenu from "../../components/sideMenu/sideMenu";

import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface Cities {
    id_city: number,
    name: string,
}
interface User {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    username: string,
    cities: Cities,
}

const UserAdmin: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    // Función para cargar los usuarios desde la base de datos
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users/userCity');
                console.log('response data' + response.data)
                console.log('users'+users);
                setUsers(response.data);
            } catch (error) {
                console.error('Error al cargar los usuarios', error);
            }
        };

        fetchUsers();
    }, []);

    // Función para manejar la selección de usuarios
    const handleSelectUser = (id: number) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers: number[] = [];

        if (selectedIndex === -1) {
            newSelectedUsers = [...selectedUsers, id];
        } else {
            newSelectedUsers = selectedUsers.filter(selectedId => selectedId !== id);
        }

        setSelectedUsers(newSelectedUsers);
    };
    
    // Eliminar usuarios seleccionados
    const deleteSelectedUsers = () => {
        if (window.confirm('¿Realmente quieres eliminar el/los usuario(s)?')) {
            const deleteRequests = selectedUsers.map(id => axios.delete(`http://localhost:3001/users/${id}`));
            Promise.all(deleteRequests)
                .then(() => {
                    setUsers(users.filter(user => !selectedUsers.includes(user.rut_user)));
                    setSelectedUsers([]);
                })
                .catch(error => console.error('Hubo un error al eliminar los usuarios', error));
        }
    };

    return (
        <Box display="flex" sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu /> 
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}> 
                
                <div style={{ height: '100px', width: '100%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Usuarios</h2>
                </div>
                <br />
                <div style={{ justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor:"#ffffff", margin:"20px", marginLeft:"30px", marginRight:"30px"   }}>
                    
                    <Card >
                        <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center" >
                            <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Buscar"
                                    style={{margin:"20px", width: "500px", height:"35px", borderRadius:"20px", paddingLeft:"15px", borderColor:"#7A7A7A", color:"#7A7A7A"}}
                                    
                                /> {/*placeholder={value}*/}
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                <Button onClick={deleteSelectedUsers} variant="contained" style={{ textTransform: "none", backgroundColor: '#ff5252', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px', justifyContent:"flex-end" }}>
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper} style={{ padding: '0', height:"600px" }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#d2efff' }}>
                                    <TableCell  align="center"></TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Usuario</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Usuario</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Correo</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Nombre</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Apellido</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Rut</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Teléfono</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Comuna</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.filter(user => user.rut_user !== 21076030).map((user) => (
                                    <TableRow key={user.rut_user}>
                                    <Checkbox
                                            checked={selectedUsers.indexOf(user.rut_user) !== -1}
                                            onChange={() => handleSelectUser(user.rut_user)}
                                        />
                                    <TableCell align="center">{user.rut_user} </TableCell>

                                    <TableCell align="center"> {user.username} </TableCell>

                                    <TableCell align="center"> {user.email_user} </TableCell>

                                    <TableCell align="center"> {user.name_user} </TableCell>

                                    <TableCell align="center"> {user.lastname_user} </TableCell>

                                    <TableCell align="center"> {user.rut_user + user.dv_user}</TableCell>

                                    <TableCell align="center"> {user.phone_user}</TableCell>

                                    <TableCell align="center">{user.cities.name}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Card>
                </div>
                
            </Box>
        </Box>
    );
};

export default UserAdmin;
