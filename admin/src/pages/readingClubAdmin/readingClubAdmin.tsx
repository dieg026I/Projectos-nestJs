import SideMenu from "../../components/sideMenu/sideMenu";
import img from '../../assents/img/logoMatch.png'
import { Autocomplete, AutocompleteInputChangeReason, Box, Button, Popover,Card, CardActionArea, CardActions, CardContent, Checkbox, FormControl, Grid, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import React from "react";
import '../../App.css';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { FaRegTrashCan } from "react-icons/fa6";

interface Category {
    id_category: string;
    name_category: string;
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

interface ReadingClub {
    id_club: string;
    date_club: Date;
    time_club: string;
    place_club: string;
    description_club:string;
    title_club: string;
    image_club: string;
    id_book_club: string;
    book: Book;
}

interface Book {
    title: string;
}

const ReadingClubAdmin: React.FC = () => {

    const [activeTab, setActiveTab] = useState('Agregar');



    {/* Publicar libro Club */}
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');
    const [readingClub, setReadingClub] = React.useState<ReadingClub[]>([]);

    const [selectedClub, setSelectedClub] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    {/* almacenar libro */}
    const [books, setBooks] = React.useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<Book[]>([]);

    {/*-----------------------------------------------------------------------------*/}

    {/* Mostrar Libros*/}
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/book');
            setBooks(response.data);
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
    };
    fetchBooks();
    }, []);
    {/*-----------------------------------------------------------------------------*/} 

    {/* Mostrar Publicaciones del Club de lectura*/}
    useEffect(() => {
        const fetchReadingClub = async () => {
        try {
            const response = await axios.get('http://localhost:3001/reading-club');
            setReadingClub(response.data);
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
    };

    fetchReadingClub();
    }, []);
    {/*-----------------------------------------------------------------------------*/} 

    {/* Mostrar libros publicados*/}
    const handleInputChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (reason === 'input') {
            if (value.length > 2) {
                const filteredBooks = books.filter((book) => book.title && book.title.toLowerCase().includes(value.toLowerCase()));
                setOptions(filteredBooks);
            }
        }
    };
    {/*-----------------------------------------------------------------------------*/} 

    {/* Datos de readiadingClub*/}   

    //Descripcion
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    //Imagen
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    //Eliminar Imagen
    const handleDeleteImage = () => {
        setImage(null);
    };

    //Fecha
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };
    
    //Tiempo
    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };
    
    //Lugar
    const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlace(event.target.value);
    };
    {/*-----------------------------------------------------------------------------*/} 

    {/* Subir Publicacion al Club de lectura*/} 
    const handleSubmitClub = async () => {

        const formData = new FormData();
        let id_club = uuidv4();

        formData.append('id_club', id_club);
        if (image) {
            formData.append('image', image);
        }else{
            console.log("no se encuentran valores en image")
        }

        formData.append('description_club', description);

        formData.append('title_club',  title );
        if (selectedBook) {
            formData.append('id_book_club', selectedBook.id_book );
        }else{
            console.log("no se encuentran valores en selectedBook")
        }
        
        formData.append('date_club', date);
        formData.append('time_club', time);
        formData.append('place_club', place);

        try {
            const response = await axios.post('http://localhost:3001/reading-club', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 201) {
                alert('Datos guardados exitosamente');
            } else {
                alert('Hubo un error al guardar los datos');
            }
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    };   
    {/*-----------------------------------------------------------------------------*/} 

    {/* Seleccionar una publicación del club*/} 
        const handleSelectClub = (id: string) => {
    
            const selectedIndex = selectedClub.indexOf(id);
            let newSelectedClub: string[] = [];
            
            if (selectedIndex === -1) {
                newSelectedClub = [...selectedClub, id];
            } else {
                newSelectedClub = selectedClub.filter(selectedId => selectedId !== id);
            }
            setSelectedClub(newSelectedClub);
        };
    {/*-----------------------------------------------------------------------------*/} 

    {/* Eliminar publicaciones seleccionadas*/} 
        const deleteSelectedClub = () => {
            if (window.confirm('¿Realmente quieres eliminar la(s) publicación(es)?')) {
                const deleteRequests = selectedClub.map(id => axios.delete(`http://localhost:3001/reading-club/${id}`));
                Promise.all(deleteRequests)
                    .then(() => {
                        setReadingClub(readingClub.filter(readingClubs => !selectedClub.includes(readingClubs.id_club)));
                        setSelectedClub([]);
                        alert('Publicación(es) Eliminada(s)');
                        window.location.reload();
                    })
                    .catch(error => console.error('Hubo un error al eliminar la(s) publicación(es)', error));
            }
        };
    {/*-----------------------------------------------------------------------------*/} 

    {/* Ver mas en descripcion*/} 
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setAnchorEl(event.currentTarget);
        };

        const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        setAnchorEl(null);
        };
    
    return (
        <form >
        <Box sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box  flexGrow={1} sx={{ backgroundColor:"#f0f2f3", paddingLeft: '218px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: '97.8%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Club de Lectura</h2>
                </div>
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Card  sx={{ width: '1150px', height: 'auto', padding: '35px', overflow: 'auto' }}>
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
                            <div style={{paddingLeft:"30px" , paddingTop:"20px"}} >
                                <Typography  sx={{ textAlign: 'left', my: 2, fontSize:"20px", fontFamily:"SF Pro Display Bold" }}>
                                    Agregar Libro
                                </Typography>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                                <div style={{ marginTop: "26px", marginBottom: "26px" }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        <label htmlFor="title" style={{ marginRight: '54px' }}>Titulo:</label>
                                        <TextField 
                                            id="title"
                                            value={title}
                                            placeholder="Ingresar titulo"
                                            onChange={e => setTitle(e.target.value)}                      
                                        />
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom:"20px" }}>
                                    <label htmlFor="imagen-input" style={{ marginRight: '40px' }}>Imagen:</label>
                                    <input
                                            type="file"
                                            id="image"
                                            onChange={handleImageChange}
                                            style={{ marginRight: '10px' }}
                                        />
                                        {image && (
                                            <>
                                                <img src={URL.createObjectURL(image)} alt="Imagen seleccionada" style={{ width: "90px", height:"auto" }} />
                                                <FaRegTrashCan style={{ position: 'absolute', top: 0, right: 626, cursor: 'pointer', color:"#dc001a" }} onClick={handleDeleteImage} />
                                            </>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        
                                        <label htmlFor="nombre-input" style={{ marginRight: '56px' }}>Libro:</label>
                                        <FormControl>
                                            <InputLabel id="book-select-label"></InputLabel>
                                            <Autocomplete
                                            style={{width:"400px"}}
                                                id="book-search-autocomplete"
                                                open={open}
                                                onOpen={() => setOpen(true)}
                                                onClose={() => setOpen(false)}
                                                getOptionLabel={(option) => option ? option.name_book : ""}
                                                options={books}
                                                loading={open && books.length === 0}
                                                value={selectedBook}
                                                onChange={(event, newValue) => setSelectedBook(newValue)}
                                                onInputChange={handleInputChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Buscar libro"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>

                                        <label htmlFor="descripcion-input" style={{  marginRight:"10px" }}>Descripción:</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            placeholder="Ej: El libro relata las aventuras y desventuras de un hidalgo de 50 años llamado Alonso Quijano..."
                                            style={{ width: '100%', height: '100px', marginTop: '10px' }}
                                        />
                                        
                                    </div>
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
                                        <input style={{width:"auto", height:"40px"}} type="date" id="fecha-input" name="meeting_Date" onChange={handleDateChange} />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '43px' }}>Hora:</label>
                                        <input style={{width:"auto", height:"40px"}} type="time" id="hora-input" name="meeting_Time" onChange={handleTimeChange} />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '38px' }}>Lugar:</label>
                                        <input style={{width:"400px", height:"40px"}} placeholder="Ej: Café Magia y Letras - 1 Nte. 461, Viña del Mar, Valparaíso" type="text" id="lugar-input" name="meeting_Place" onChange={handlePlaceChange} />
                                    </div>
                                    <br />
                                    
                                    <div style={{ marginTop:"50px" , display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                                        <Button onClick={handleSubmitClub} type="submit" style={{textTransform: "none", color:"#ffffff", backgroundColor:"#FF7F41", width:"200px", borderRadius:"15px"}}>Subir</Button>
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
                                        onClick={deleteSelectedClub}
                                    >
                                        Eliminar
                                    </Button>
                                    </Grid>
                                </Grid>
                                <TableContainer component={Paper} style={{ padding: '0', height:"auto", width:"auto"}}>
                                <div style={{ overflowX: 'auto' }}>
                                <Table>
                                    <TableHead >
                                        <TableRow style={{ backgroundColor: '#d2efff' }}>
                                            <TableCell align="center"></TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Id Club</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Imagen</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Titulo</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Autor</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Descripcion</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Editorial</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Año</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Categoria</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Dia</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Hora</TableCell>
                                            <TableCell style={{width: '150px',fontFamily:"SF Pro Display Semibold"}} align="center">Lugar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {readingClub.reverse().map((readingClubs) => (
                                        
                                            <TableRow key={readingClubs.id_club} >

                                                <Checkbox
                                                    checked={selectedClub.indexOf(readingClubs.id_club) !== -1}
                                                    onChange={() => handleSelectClub(readingClubs.id_club)}
                                                />
                                                <TableCell align="center">{readingClubs.id_club}</TableCell>
                                                <TableCell align="center">
                                                    <img 
                                                        src={`http://localhost:3001/images/${readingClubs.image_club}`}
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
                                            
                                                <TableCell align="center">{readingClubs.book.name_book}</TableCell>
                                                <TableCell align="center">{readingClubs.book.author_id_author.name_author}</TableCell>
                                                <TableCell align="center">
                                                    <button style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        maxWidth: '35ch', // Aumenta a 50 caracteres
                                                        border: 'none',
                                                        background: 'none',
                                                        padding: 0,
                                                        color: 'inherit',
                                                        textAlign: 'left',
                                                    }} onClick={handleClick}>
                                                        {readingClubs.description_club.length > 30 ? `${readingClubs.description_club.substring(0, 30)}... ` : readingClubs.description_club}
                                                        {readingClubs.description_club.length > 30 && <span style={{color: 'blue', textDecoration: 'underline'}}>ver más</span>}
                                                    </button>
                                                    <Popover
                                                        open={Boolean(anchorEl)}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                        }}
                                                        PaperProps={{
                                                        style: {
                                                            maxHeight: '400px',  // Ajusta la altura máxima
                                                            maxWidth: '400px',  // Ajusta la anchura máxima
                                                            overflow: 'auto'  // Añade scroll si el contenido es más grande que el popover
                                                        },
                                                        }}
                                                    >
                                                        <div style={{ padding: '16px' }}>
                                                        {readingClubs.description_club}
                                                        </div>
                                                    </Popover>
                                                    </TableCell>
                                                
                                                <TableCell align="center">{readingClubs.book.publisher_id_publisher.name_publisher}</TableCell>
                                                <TableCell align="center">{readingClubs.book.year_book}</TableCell>
                                                <TableCell align="center">{readingClubs.book.category}</TableCell>
                                                <TableCell align="center">
                                                    {readingClubs.date_club instanceof Date ? `${("0" + readingClubs.date_club.getDate()).slice(-2)}/${("0" + (readingClubs.date_club.getMonth() + 1)).slice(-2)}/${readingClubs.date_club.getFullYear()}` : readingClubs.date_club}
                                                </TableCell>
                                                <TableCell align="center">{readingClubs.time_club}</TableCell>
                                                <TableCell align="center">{readingClubs.place_club}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </div>
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
