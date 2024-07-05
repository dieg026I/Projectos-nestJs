import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import axios from 'axios';
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscDebugStart } from "react-icons/vsc";

interface Cities {
    id_city: string;
    name: string;
}

interface Users {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    cities: Cities,
    publication: Publication[]
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


const BookManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('publicaciones');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = React.useState<Users>();
    const [publications, setPublications] = React.useState<Publication[]>([]);

    {/* Titulos */}
    const getTitle = () => {
        switch (activeTab) {
            case 'publicaciones':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Publicaciones</Typography>;
            case 'compras':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Compras</Typography>;
            case 'ventas':
                return <Typography style={{ color: "#ffffff", fontSize:"25px", fontFamily:"SF Pro Text Bold"  }}>Ventas</Typography>;
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchPublications = async () => {
        try {
            const response = await axios.get('http://localhost:3001/publications/publication');
            const publicationResponse = response.data;
            setPublications(response.data);
            console.log(JSON.stringify(response.data, null, 2))
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
        const userString = localStorage.getItem("user");
        
        
        try {
            const formData = new FormData();
            const userString = localStorage.getItem("user");
            if (userString !== null){
            const users : Users = JSON.parse(userString);
            const responseUser= await axios.get(`http://localhost:3001/users/publication/${users.rut_user}`);
            const userResponse = responseUser.data;
            setUsers(userResponse);
            console.log(JSON.stringify(responseUser.data, null, 2))
            }
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
        
    };

    fetchPublications();
    }, []);

    
    {/* Contenido Pestañas */}
    const getContent = () => {
        switch (activeTab) {
            case 'publicaciones':
                return (
                    <TableContainer component={Paper} style={{ padding: "0", maxHeight: '450px',  }}>
                        <Table style={{  borderRadius: '10px' }}>
                            <TableHead>
                                <TableRow style={{ backgroundColor:"#d2efff"}}>
                                    <TableCell align="center">Producto</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                    <TableCell align="center">Stock</TableCell>
                                    <TableCell align="center">Precio</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {users && Array.isArray(users.publication) && users.publication.reverse().map((publication) => (
                                <TableRow key={publication.id_publication}>
                                    <TableCell align="center" style={{ display: 'flex', alignItems: 'center', marginLeft: '50px', }}>
                                        <img
                                        src={`http://localhost:3001/images/${publication.photo_showcase}`}
                                        alt="Imagen del libro"
                                        style={{
                                            height: "auto",
                                            width: "110px",
                                            maxWidth: '100%',
                                            marginRight: '10px',
                                            margin:"5px"
                                        }}
                                        />
                                        <div style={{ alignSelf: 'flex-start', textAlign:"left", marginLeft:"10px"}}>
                                            <Typography style={{fontFamily:"SF Pro Display Bold"}}>{publication.book.name_book || 'No disponible'}</Typography>
                                            <span style={{fontFamily:"SF Pro Display Regular"}}>{publication.book.author_id_author.name_author || 'No disponible'}</span>
                                        </div>
                                        
                                    </TableCell>

                                    <TableCell align="center"> Activa </TableCell>

                                    <TableCell align="center"> 1 </TableCell>

                                    <TableCell align="center">${publication.cost_book}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', minWidth: '0', marginRight:"6px" }}>
                                            <IoTrashOutline />
                                        </Button>
                                        <Button variant="contained" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', minWidth: '0' }}>
                                            <HiOutlinePencil />
                                        </Button>
                                        <Button variant="contained" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', minWidth: '0', marginLeft:"6px" }}>
                                            <VscDebugStart />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            case 'compras':
                return (
                    <>
                        <div style={{justifyContent:"center", textAlign:"center"}}>
                            <h4>Aún no tienes Compras</h4>
                        </div>

                    </>
                );
            case 'ventas':
                return (
                    <>
                        <div style={{justifyContent:"center", textAlign:"center", alignContent:"center"}}>
                            <h4>Aún no tienes Ventas</h4>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const [selectedPublications, setSelectedPublications] = useState<string[]>([]);

    {/* Mostrar Publicacion */}

    useEffect(() => {
        const fetchPublications = async () => {
        try {
            const response = await axios.get('http://localhost:3001/publications/publication');
            const publicationResponse = response.data;
            setPublications(response.data);
            console.log(JSON.stringify(response.data, null, 2))
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
        
        
    };

    fetchPublications();
    }, []);

    // Función para manejar la selección de publicaciones
    const handleSelectPublication = (id: string) => {
        const selectedIndex = selectedPublications.indexOf(id);
        let newSelectedPublications: string[] = [];

        if (selectedIndex === -1) {
            newSelectedPublications = [...selectedPublications, id];
        } else {
            newSelectedPublications = selectedPublications.filter(selectedId => selectedId !== id);
        }

        setSelectedPublications(newSelectedPublications);
    };

    // Eliminar publicaciones seleccionadas
    const deleteSelectedPublications = () => {
        if (window.confirm('¿Realmente quieres eliminar la(s) publicación(es)?')) {
            const deleteRequests = selectedPublications.map(id => axios.delete(`http://localhost:3001/publications/${id}`));
            Promise.all(deleteRequests)
                .then(() => {
                    setPublications(publications.filter(publication => !selectedPublications.includes(publication.id_publication)));
                    setSelectedPublications([]);
                })
                .catch(error => console.error('Hubo un error al eliminar las publicaciones', error));
        }
    };

    return (
        <>
            <NavBarLogin />
            <div className="gestion">
                <Box className="fondoVenta" sx={{ position: 'relative', width: '100%' }}>
                        {/* Pestaña "Publicaciones" */}
                        <Box sx={{
                            ...tabStyle,
                            right: 'calc(70% - 100px)',
                            top: '13%'
                        }} onClick={() => setActiveTab('publicaciones')}>
                            <Typography variant="body2">Publicaciones</Typography>
                        </Box>

                        {/* Pestaña "Compras" */}
                        <Box sx={{
                            ...tabStyle,
                            right: 'calc(50% - 100px)',
                            top: '13%'
                        }} onClick={() => setActiveTab('compras')}>
                            <Typography variant="body2">Compras</Typography>
                        </Box>

                        {/* Pestaña "Ventas" */}
                        <Box sx={{
                            ...tabStyle,
                            right: 'calc(30% - 100px)',
                            top: '13%'
                        }} onClick={() => setActiveTab('ventas')}>
                            <Typography variant="body2">Ventas</Typography>
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

export default BookManagement;
