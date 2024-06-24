import SideMenu from "../../components/sideMenu/sideMenu";
import img from '../../assents/img/logoMatch.png'
import { Autocomplete, AutocompleteInputChangeReason, Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, FormControl, Grid, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import React from "react";
import '../../App.css';
import axios from "axios";



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

interface ReadingClub {
    id_club: string;
    date_club: Date;
    time_club: string;
    place_club: string;
    description_club:string;
    title_club: string;
    image_club: string;
    id_book_club: Book;
}

const ReadingClubAdmin: React.FC = () => {

    const [activeTab, setActiveTab] = useState('Agregar');
    const [selectedMeetingImage, setSelectedMeetingImage] = useState<File | null>(null);
    const [name_book, setNameBook] = React.useState('');
    const [suggestions, setSuggestions] = useState([]);



    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedMeetingImage(event.target.files[0]);
        }
    };

    {/* MALO */}
    const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setNameBook(searchTerm);
    
        if (searchTerm.length === 0) {
            setSuggestions([]);
            return;
        }
    
        try {
            const response = await axios.get('http://localhost:3001/book/book');
            console.log(response.data); // Agrega esta línea para ver qué devuelve tu API
            // ... resto del código
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    };
    


    return (
        <form >
        <Box sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box  flexGrow={1} sx={{ backgroundColor:"#f0f2f3", paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: '100%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Club de Lectura</h2>
                </div>
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Card  sx={{ width: '1150px', height: '550px', padding: '35px' }}>
                        <Grid container spacing={2} justifyContent="center"  >
                            <Grid item xs={12} sm={12} md={6} lg={6} className="myCard">
                                <Card  onClick={() => setActiveTab('Agregar')} style={{ backgroundColor:"#d2efff", width:"350px"  }}>
                                    <div>
                                        <Typography sx={{ textAlign: 'center', my: 2, fontSize: '23px', fontFamily: 'SF Pro Display Bold' }}>
                                            Agregar Publicación
                                        </Typography>
                                    </div>
                                </Card>
                                <hr style={{ margin: '10px 0', opacity: 0.1 }} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} className="myCard">
                                <Card onClick={() => setActiveTab('Ver')} style={{ backgroundColor:"#d2efff", width:"350px" }}>
                                    <div>
                                        <Typography sx={{ textAlign: 'center', my: 2, fontSize: '23px', fontFamily: 'SF Pro Display Bold' }}>
                                            Ver Publicación
                                        </Typography>
                                    </div>
                                </Card>
                                <hr style={{ margin: '10px 0', opacity: 0.1 }} />
                            </Grid>
                        </Grid>


                        {activeTab === 'Agregar' ? (
                            <div style={{paddingLeft:"30px" , paddingTop:"20px"}}>
                                <Typography  sx={{ textAlign: 'left', my: 2, fontSize:"20px", fontFamily:"SF Pro Display Bold" }}>
                                    Agregar Libro
                                </Typography>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                                <div style={{ display: 'flex', alignItems: 'center', marginTop:"26px", marginBottom:"26px"  }}>
                                    <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Titulo:</label>
                                    <TextField
                                        id="name"
                                        value={name_book}
                                        onChange={handleTitleChange}
                                        sx={{ width: '100%', color: "black", height: "45px", borderRadius: "10px" }}
                                    />
                                    {suggestions.length > 0 && (
                                        <div style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white', width: '100%' }}>
                                            {suggestions.map((name, index) => (
                                                <div key={index} onClick={() => setNameBook(name)} style={{ padding: '10px', cursor: 'pointer' }}>
                                                    {name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                                <Typography  sx={{ textAlign: 'left', my: 2, fontSize:"20px", fontFamily:"SF Pro Display Bold" }}>
                                    Reunión
                                </Typography>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                
                                <div style={{ marginTop:"26px", marginBottom:"26px"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Fecha:</label>
                                        <input type="date" id="fecha-input" name="meeting_Date" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '43px' }}>Hora:</label>
                                        <input type="time" id="hora-input" name="meeting_Time" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '38px' }}>Lugar:</label>
                                        <input type="text" id="lugar-input" name="meeting_Place" />
                                    </div>
                                    <br />
                                    
                                    <div style={{ marginTop:"50px" , display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                                        <Button   type="submit" style={{textTransform: "none", color:"#ffffff", backgroundColor:"#FF7F41", width:"200px", borderRadius:"15px"}}>Subir</Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                
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
                                    <Button
                                        variant="contained"
                                        style={{ /* ... */ }}
                                    >
                                        Eliminar
                                    </Button>
                                    </Grid>
                                </Grid>
                                <TableContainer component={Paper} style={{ padding: '0', height:"450px" }}>
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
                                        
                                            <TableRow >
                                                {/*}
                                            <Checkbox
                                                checked={selectedMeetingId === meeting.meeting_id}
                                                onChange={() => setSelectedMeetingId(meeting.meeting_id)}
                                            />*/}
                                            <TableCell align="center"></TableCell>   

                                            <TableCell align="center"></TableCell>
                                            
                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                            <TableCell align="center"></TableCell>

                                        </TableRow>
                                        
                                    </TableBody>
                                </Table>
                                </TableContainer>
                                
                            </div>
                        )}
                    </Card>
                </div>
            </Box>
        </Box>
        </form>
    );
};

export default ReadingClubAdmin;
