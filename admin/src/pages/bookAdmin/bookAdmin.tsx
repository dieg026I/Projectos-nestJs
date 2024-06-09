import SideMenu from "../../components/sideMenu/sideMenu";

import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const checkBook = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

const BookAdmin: React.FC = () => {

    const [selectedPublications, setSelectedPublications] = useState<string[]>([]);

    {/* Mostrar Publicacion */}
    const [publications, setPublications] = React.useState<Publication[]>([]);
    const [users, setUsers] = React.useState<Users>();
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
        <Box display="flex" sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: '100%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Libros</h2>
                </div>
                <br />
                <div style={{ justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor:"#ffffff",  margin:"20px", marginLeft:"30px", marginRight:"30px"   }}>
                    
                    <Card >
                        <Grid  container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center" >
                            <Grid className="text-center" item xs={12} sm={3} md={6} lg={6}>
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Buscar"
                                    style={{margin:"20px", width: "500px", height:"35px", borderRadius:"20px", paddingLeft:"15px", borderColor:"#7A7A7A", color:"#7A7A7A"}}
                                    
                                /> {/*placeholder={value}*/}
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button href="/" variant="contained" style={{ textTransform: "none", backgroundColor: '#7A7A7A', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Modificar
                                </Button>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button href="/" variant="contained" style={{ textTransform: "none", backgroundColor: '#0b9000', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Agregar
                                </Button>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button onClick={deleteSelectedPublications} variant="contained" style={{ textTransform: "none", backgroundColor: '#ff5252', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>

                        <TableContainer component={Paper} style={{ padding: '0', height:"600px" }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#d2efff' }}>
                                    <TableCell  align="center"></TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Imagen</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Lib</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Nombre</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Autor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Vendedor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Rut Vendedor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Precio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
        {publications.reverse().map((publication) => (
            <TableRow key={publication.id_publication}>
                <Checkbox
                    checked={selectedPublications.indexOf(publication.id_publication) !== -1}
                    onChange={() => handleSelectPublication(publication.id_publication)}
                />
                <TableCell align="center">
                    <img 
                        src={`http://localhost:3001/images/${publication.photo_showcase}`}
                        alt="Imagen del libro" 
                        style={{ 
                            height:"auto", 
                            width:"50px",
                            maxWidth: '100%', 
                            display: 'block', 
                            marginLeft: 'auto', 
                            marginRight: 'auto', 
                        }}
                    />
                </TableCell>
                <TableCell align="center">{publication.id_publication}</TableCell>
                <TableCell align="center">{publication.book?.name_book || 'No disponible'}</TableCell>
                <TableCell align="center">{publication.book?.author_id_author.name_author || 'No disponible'}</TableCell>
                <TableCell align="center">{publication.users?.name_user +' '+ publication.users?.lastname_user || 'No disponible'}</TableCell>
                <TableCell align="center">{publication.users?.rut_user || 'No disponible'}</TableCell>
                <TableCell align="center">{publication.cost_book}</TableCell>
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

export default BookAdmin;
