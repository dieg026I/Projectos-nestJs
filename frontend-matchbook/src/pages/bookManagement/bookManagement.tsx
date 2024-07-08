import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import axios from 'axios';
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi2";
import { VscDebugStart } from "react-icons/vsc";
import { CiSaveDown2 } from "react-icons/ci";

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
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedPublication, setEditedPublication] = useState<Publication | null>(null);

    const handleEdit = (publication: Publication) => {
        setEditingId(publication.id_publication);
        setEditedPublication(publication);
    };
    
    const handleSaveClick = async () => {
        if (editingId && editedPublication) {
            try {
            console.log("editingId: " + editingId);
        
            const responsePublication = await axios.get(`http://localhost:3001/publications/onePublication/${editingId}`);
            console.log("responsePublication: ", responsePublication);
        
            const publication: Publication = responsePublication.data;
            console.log("publication: ", publication);
        
            // Asegúrate de que publication.book no es null antes de continuar
            if (publication.book) {
                const book: Book = publication.book;
                console.log("book: ", book);
        
                // Utiliza book.id_book directamente aquí
                const id_book = book.id_book;
                console.log("id_book: " + id_book);
        
                if (id_book) {
                await axios.put(`http://localhost:3001/book/${id_book}`, {
                    id_book: book.id_book,
                    name_book: editedPublication.book.name_book,
                    author_id_author: book.author_id_author,
                    // Aquí puedes agregar o modificar los campos que necesites
                });
        
                const id_author_book = book.author_id_author.id_author;
                // Agrega depuración para verificar el valor de author_id_author
                console.log("author_id_author: ", book.author_id_author.id_author);
        
                if (id_author_book) {
                    console.log("nombre Autor: "+ id_author_book)
                    
                    console.log("Intentando actualizar autor con id: ", id_author_book);
                    const responseAuthor = await axios.put(`http://localhost:3001/author/${id_author_book}`, {
                    id_author: id_author_book,
                    name_author: editedPublication.book.author_id_author.name_author
                    });
                    console.log("Respuesta de actualización del autor: ", responseAuthor);
        
                    console.log("nombre Autor: "+ id_author_book)
        
                    console.log("nombre libro: "+ book.name_book )
                    console.log("editedname: " + editedPublication.book.name_book)
        
                    console.log("editedAuthorName: "+ editedPublication.book.author_id_author.name_author)
                } else {
                    console.error('El ID del autor es undefined');
                    alert('Error: No se encontró el ID del autor.');
                }
                } else {
                console.error('id_book es undefined');
                alert('Error: No se encontró el ID del libro.');
                }
            } else {
                console.error('El libro asociado a la publicación es null');
                alert('Error: El libro asociado a la publicación no se encontró.');
            }
        
            // Actualizar el precio de la publicación
            await axios.put(`http://localhost:3001/publications/${editingId}`, {
                ...editedPublication,
                cost_book: editedPublication.cost_book,
            });
        
            setEditingId(null);
            setEditedPublication(null);
            alert('Publicación actualizada con éxito');
            window.location.reload();
            } catch (error) {
            console.error('Error al guardar los cambios:', error);
            alert('Error al guardar los cambios');
            }
        } else {
            alert('No hay una publicación seleccionada para guardar.');
        }
        };

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

    const deletePublication = async (id: string) => {
    const userConfirmation = window.confirm('¿Realmente deseas eliminar la publicación?');
        if (userConfirmation) {
            try {
                await axios.delete(`http://localhost:3001/publications/${id}`);
                // Actualizar la lista de publicaciones después de la eliminación
                const updatedPublications = publications.filter(publication => publication.id_publication !== id);
                setPublications(updatedPublications);
                console.log('Publicación eliminada');
                window.location.reload();
            } catch (error) {
            console.error('Error deleting publication:', error);
            }
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
                                        {editingId === publication.id_publication ? (
                                            <TextField 
                                            label="Nombre del libro" 
                                            value={editedPublication ? editedPublication.book.name_book : ''} 
                                            onChange={(e) => editedPublication && setEditedPublication({...editedPublication, book: {...editedPublication.book, name_book: e.target.value}})} />
                                        ) : (
                                            <Typography style={{fontFamily:"SF Pro Display Bold"}}>{publication.book.name_book || 'No disponible'}</Typography>
                                        )}
                                        {editingId === publication.id_publication ? (
                                            <TextField label="Autor" value={editedPublication ? editedPublication.book.author_id_author.name_author : ''} onChange={(e) => editedPublication && setEditedPublication({...editedPublication, book: {...editedPublication.book, author_id_author: {...editedPublication.book.author_id_author, name_author: e.target.value}}})} />
                                        ) : (
                                            <span style={{fontFamily:"SF Pro Display Regular"}}>{publication.book.author_id_author.name_author || 'No disponible'}</span>
                                        )}
                                        </div>
                                    </TableCell>

                                    <TableCell align="center"> Activa </TableCell>

                                    <TableCell align="center"> 1 </TableCell>

                                    <TableCell align="center">                                        
                                        {editingId === publication.id_publication ? (
                                            <TextField label="Precio" value={editedPublication ? editedPublication.cost_book.toString() : ''} onChange={(e) => editedPublication && setEditedPublication({...editedPublication, cost_book: Number(e.target.value)})} />
                                        ) : (
                                            <Typography>{publication.cost_book || 'No disponible'}</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => deletePublication(publication.id_publication)} variant="contained" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', minWidth: '0', marginRight:"6px" }}>
                                        <IoTrashOutline />
                                        </Button>
                                        <Button variant="contained" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', minWidth: '0' }} onClick={() => handleEdit(publication)}>
                                        <HiOutlinePencil />
                                        </Button>
                                        {editingId === publication.id_publication && 
                                        <Button variant="contained" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0', minWidth: '0' }} onClick={handleSaveClick}>
                                            <CiSaveDown2 />
                                        </Button>
                                        }
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
