import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, NoSsr, Radio, RadioGroup, Select, SelectChangeEvent, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { CardBody, CardFooter } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import axios from "axios";
import "../../App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import { UserContext } from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Console } from "console";
import Footer from "../../components/common/Footer/footer";

interface Author {
    id_author: string;
    name_author: string;
}

interface Category {
    id_category: string;
    name_category: string;
}
interface Book {
    id_book: string;
    name_book: string;
    format_book: string;
    author_name: string;
    publisher_name: string;
    cost_book: number;
    category: string;
    year_book: number;
    status_book: string;
    stock_book: number;
    description_book: string;
}

{/*-----------------------------------------------------------------------------*/}
{/* Sugerencia */}
const SuggestionsBox = ({ suggestions, onSelect }: { suggestions: { title: string; authors: string[] }[], onSelect: (selectedTitle: string) => void }) => {
    return (
        <div style={{ position: 'absolute', top: '74%', left: '255px', width: '35%', background: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxHeight: '200px', overflowY: 'auto' , zIndex: 1000 }}>
            {suggestions.map((book, index) => (
                <div key={index} onClick={() => onSelect(book.title)} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <strong>{book.title}</strong> by {book.authors.join(', ')}
                </div>
            ))}
        </div>
    );
};



const Sales: React.FC = () => {

    {/* Book */}
    const [name_book, setNameBook] = React.useState('');
    const [format_book, setFormatBook] = React.useState('');
    const [author_name, setAuthorName] = React.useState('');
    const [publisher_name, setPublisherName] = React.useState('');
    const [cost_book, setCostBook] = React.useState(0);
    const [category, setCategory] = React.useState<Category[]>([]);
    const [OneCategory, setOneCategory] = React.useState<Category>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [year_book, setYearBook] = React.useState(0);
    const [status_book, setStatusBook ] = React.useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [stock_book, setStockBook] = React.useState(0);
    const [description_book, setDescriptionBook] = React.useState('');

    {/* Publicación */}
    const [id_publication, setIdPublication] = React.useState('');
    const [date_publication, setDatePublication] = React.useState('');
    const [photo_showcase, setPhotoShowcase] = React.useState<File | null>(null);
    const [photo_cover, setPhotoCover] = React.useState<File | null>(null);
    const [photo_first_page, setPhotoFirstPage] = React.useState<File | null>(null);
    const [photo_back_cover, setPhotoBackCover] = React.useState<File | null>(null);
    const [book, setBook] = React.useState<Book>();
    const navigate = useNavigate();

    {/* Sugerencia */}
    const [suggestions, setSuggestions] = useState<{ title: string; authors: string[] }[]>([]);

    
    {/*-----------------------------------------------------------------------------*/}
    {/* Eliminar Animaciones */}
    const theme = createTheme({
        palette: {
        action: {
            active: "#000000", 
        },
        },
        components: {
        MuiCardActionArea: {
            styleOverrides: {
            focusHighlight: {
                opacity: '0 !important', 
            },
            root: {
                '&:active': {
                backgroundColor: '#ffffff !important', 
                },
                '&:focus': {
                backgroundColor: '#ffffff !important', 
                },
            },
            },
        },
        MuiTextField: {
            styleOverrides: {
            root: {
                '&:active': {
                backgroundColor: '#ffffff !important',
                },
                '&:focus': {
                backgroundColor: '#ffffff !important', 
                },
            },
            },
        },
        },
    });
    


    {/*-----------------------------------------------------------------------------*/}
    {/* Título */}

    const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDJrjXWiZuxrAOhRE4GB1Xltcdy0dhsPsM`
            );
            const books = response.data.items.map((item: any) => ({
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [], // Si no hay autores, establecemos un arreglo vacío
            }));
            setSuggestions(books);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    };
    

    const handleSuggestionSelect = (selectedTitle: string) => {
        setNameBook(selectedTitle);
        setSuggestions([]); 
    };

    {/*-----------------------------------------------------------------------------*/}
    {/* Step and Scroll */}
    const contentRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
        if (step === 2 && contentRef.current) {
            contentRef.current.scrollTop = 0; 
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const contentStyle: React.CSSProperties = {
        margin: "15px",
        overflowY: step === 2 ? 'scroll' : 'hidden'
    };
    
    {/*-----------------------------------------------------------------------------*/}
    {/* Imagenes */}
    const [imageShowcase, setImageShowcase] = useState<string | null>(null);
    const [imageCover, setImageCover] = useState<string | null>(null);
    const [imageFirst, setImageFirst] = useState<string | null>(null);
    const [imageBack, setImageBack] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotoShowcase(e.target.files[0]);
            setImageShowcase(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotoCover(e.target.files[0])
            setImageCover(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotoFirstPage(e.target.files[0])
            setImageFirst(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageChangeBack = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotoBackCover(e.target.files[0])
            setImageBack(URL.createObjectURL(e.target.files[0]));
        }
    };

    {/*-----------------------------------------------------------------------------*/}
    {/* Category */}

    //llamar categorias
    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(response => {
            setCategory(response.data);
            console.log('Mostrar Categorias: '+ response.data);
            });
    }, []);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = (event.target.value);
        setSelectedCategory(selectedValue);
        let id_category = selectedValue
        axios.get(`http://localhost:3001/categories/${id_category}`)
            .then(response => {
            setOneCategory(response.data);
            console.log('Mostrar Categorias: ' + response.data);
            });

    };
    
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value) {
            const description_book = event.target.value;
            setDescriptionBook(description_book);
        }
    }
    {/*-----------------------------------------------------------------------------*/}
    {/* Status */}
    
        
    const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
    console.log("estado: " + event.target.value)
    };

    {/*-----------------------------------------------------------------------------*/}
    {/* Checkbox mas libros */}
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    
    {/*-----------------------------------------------------------------------------*/}
    {/* Subir Libro */}
    
    const handleSubmitBook = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            // Primero, guarda el autor y obtén su ID
            let id_author = uuidv4();
            const responseAuthor = await axios.post('http://localhost:3001/author', {
            id_author: id_author,    
            name_author: author_name,
            });
            console.log(responseAuthor.data)
            const author_id = responseAuthor.data.id_author
            // Luego, guarda la editorial y obtén su ID
            let id_publisher = uuidv4();
            const responsePublisher = await axios.post('http://localhost:3001/publisher', {
                id_publisher: id_publisher,    
                name_publisher: publisher_name  
            });
            console.log(responsePublisher.data)
            const publisher_id = responsePublisher.data.id_publisher;
            const bookId = `${name_book}-${author_name.length}-${publisher_name.slice(0, 3)}`.toLowerCase();

    
            // Finalmente, guarda el libro con los IDs del autor y la editorial
            const responseBook = await axios.post('http://localhost:3001/book', {
                id_book: bookId,
                name_book: name_book,
                format_book: format_book,
                author_id_author: author_id,
                publisher_id_publisher: publisher_id,
                cost_book: cost_book,
                year_book: year_book,
                status_book: selectedStatus,
                stock_book: stock_book,
                description_book: description_book,
                categories: [OneCategory]
            });
    
            console.log(responseBook.data);
            handleNext();
        } catch (error) {
            console.error('Hubo un error al ingresar la publicación:', error);
        }
        const userString = localStorage.getItem('user');
        console.log('Usuario: ' + userString )
    };
    
    const add_book = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmitBook(event).then(() => {
            toast("Libro guardado con éxito!");
        });
    };

    {/*-----------------------------------------------------------------------------*/}
    {/* Publicación */}
    
    const handleSubmitPublication = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const formData = new FormData();

        const bookId = `${name_book}-${author_name.length}-${publisher_name.slice(0, 3)}`.toLowerCase()
            const id_publication = uuidv4();

            if (photo_showcase) {
                formData.append('images', photo_showcase);
            }
            if (photo_cover) {
                formData.append('images', photo_cover);
            }
            if (photo_first_page) {
                formData.append('images', photo_first_page);
            }
            if (photo_back_cover) {
                formData.append('images', photo_back_cover);
            }
            const userString = localStorage.getItem("user");

            if (userString !== null) {
                const user = JSON.parse(userString);
                formData.append('rut_user', JSON.stringify(user.rut_user));
            }           

            formData.append('id_publication', id_publication);
            
            if(bookId){
            formData.append('id_book', bookId);
            }
    try {
        const response = await axios.post('http://localhost:3001/publications/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    
        console.log(response.data);
        
        navigate('/home2')
    
    }catch (error) {
        console.error('Hubo un error al registrar el libro:', error);
        }
    
    };

    {/*-----------------------------------------------------------------------------*/}
    {/* Agregar mas publicaciones */}
    const handleAddAnother = () => {
        // Aquí puedes agregar la lógica para guardar el libro actual
        console.log('Libro guardado!');

        // Luego, restablece el paso a 1
        setStep(1);
    };

    return (
        <>
            <NavBarLogin />
            
                <NoSsr>
                    <ThemeProvider theme={theme}>
                    
                        <div>
                            
                            <Box className="fondoVenta" sx={{ paddingTop: step === 2 ? '64px' : '0px' }}>
                                
                                <Card  sx={{ marginTop:"90px", borderRadius:"20px",width:"1100px", maxWidth: "1400px", maxHeight:"100%" }} ref={contentRef} style={contentStyle} >
                                
                                    {suggestions.length > 0 && (
                                        <SuggestionsBox suggestions={suggestions} onSelect={handleSuggestionSelect} />
                                    )}
                                    <CardActionArea disableRipple>
                                        <CardContent style={{backgroundColor:"#002E5D", alignContent:"center"}}>
                                            <div style={{textAlign: "center", alignContent:"center", color:"#ffff", fontFamily: "SF Pro Display Medium", paddingTop:"10px"}} >
                                                <h3>Indica tu libro ({step}/3)</h3>
                                            </div>
                                        </CardContent>
                                        
                                        <CardContent  >
                                            {step === 1 && (
                                                <>
                                                {/* --Paso 1--*/}
                                                <CardContent style={{margin:"15px"}}>
                                                    {step === 1 && (
                                                        <>
                                                            <Grid container justifyContent="space-between">
                                                                <Typography gutterBottom variant="h4" style={{fontFamily:"SF Pro Display Bold", color:"#1eaeff"}} >
                                                                    Paso 1
                                                                </Typography>
                                                                <Typography variant="body2"  style={{fontFamily:"SF Pro Display Bold", color:"#002E5D"}}>
                                                                    ¡Recuerda que solo puedes vender libros originales!
                                                                </Typography>
                                                            </Grid>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Detalla la información del libro
                                                            </Typography>
                                                            <Typography variant="body2" color="red">
                                                                (*) campos obligatorios
                                                            </Typography>
                                                        </>
                                                    )}
                                                </CardContent>
                                                <CardBody style={{marginLeft:"30px", }}>
                                                    <h6 style={{fontFamily:"SF Pro Display Bold"}}>Título</h6>
                                                    <FormControl style={{ width:"50%" }}>
                                                        <InputLabel style={{ fontSize: "16px"}} ></InputLabel>
                                                        < TextField
                                                            id="name"
                                                            value={name_book}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                setNameBook(e.target.value);
                                                                handleTitleChange(e);
                                                            }}
                                                            sx={{ width: '100%', color: "black", height: "45px", borderRadius: "10px" }}
                                                        />
                                                    </FormControl>
                                                </CardBody>
                                                </> 
                                            )}

                                        {/* --Paso 2--*/}
                                        {step === 2 && (
                                            <>
                                                <div style={{marginTop:"10px", marginLeft:"50px", marginRight:"50px"}}>
                                                    <Typography gutterBottom variant="h4" style={{fontFamily:"SF Pro Display Bold", color:"#1eaeff"}} >
                                                        Paso 2
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Completa la información del libro
                                                    </Typography>
                                                    <br />

                                                    <div >
                                                        <Grid container spacing={2} alignItems="center" >
                                                            {/* Autor */}
                                                            <Grid item xs={6}>
                                                                <h6 style={{fontFamily:"SF Pro Display Bold"}}>Autor</h6>
                                                                <TextField fullWidth 
                                                                    style={{ color: "black", borderRadius: 20 }}
                                                                    id="author"
                                                                    className="mb-3 formulario"
                                                                    placeholder="Autor/a de la obra"
                                                                    type="text"
                                                                    value={author_name}
                                                                    onChange={e => setAuthorName(e.target.value)}
                                                                    InputLabelProps={{
                                                                        sx: { fontSize: "16px"} 
                                                                    }}
                                                                    
                                                                    sx={{ borderRadius: 20 }}
                                                                />
                                                            </Grid>
                                                            {/* Categoría */}
                                                            <Grid item xs={6}>
                                                                <h6 style={{fontFamily:"SF Pro Display Bold"}}>Categoría</h6>
                                                                <FormControl fullWidth>
                                                                    <InputLabel style={{ fontSize: "16px"}} id="demo-simple-select-standard-label" ></InputLabel>
                                                                    <Select 
                                                                        labelId="category-label"
                                                                        id="category"
                                                                        sx={{ width: '100%', color: "black", borderRadius:"15px"}}
                                                                        onChange={handleCategoryChange}
                                                                        value={selectedCategory.toString()}
                                                                        placeholder="Selecciona"
                                                                        displayEmpty
                                                                    >
                                                                    <MenuItem value="" disabled sx={{ color: "black" }}>Selecciona una categoría</MenuItem> 
                                                                    {category.map(category => (
                                                                    <MenuItem value={category.id_category} key={category.id_category}  sx={{ color: "black" }}>{category.name_category}</MenuItem>
                                                                    ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} alignItems="center">
                                                            {/* Editorial */}
                                                            <Grid item xs={6}>
                                                                <h6 style={{fontFamily:"SF Pro Display Bold"}}>Editorial</h6>
                                                                <TextField fullWidth 
                                                                    style={{ color: "black"}}
                                                                    id="publisher"
                                                                    className="mb-3 formulario"
                                                                    placeholder="Editorial"
                                                                    type="text"
                                                                    value={publisher_name}
                                                                    onChange={e => setPublisherName(e.target.value)}
                                                                    InputLabelProps={{
                                                                        sx: { fontSize: "16px" } 
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* Año */}
                                                            <Grid item xs={6}>
                                                                <h6 style={{fontFamily:"SF Pro Display Bold"}}>Año</h6>
                                                                <TextField fullWidth 
                                                                    style={{ color: "black" }}
                                                                    id="year"
                                                                    className="mb-3 formulario"
                                                                    placeholder="Año"
                                                                    type="year"
                                                                    value={year_book}
                                                                    onChange={e => setYearBook (Number(e.target.value))}
                                                                    InputLabelProps={{
                                                                        sx: { fontSize: "16px" } 
                                                                    }}
                                                                    InputProps={{
                                                                        inputProps: { 
                                                                            min: 0, 
                                                                            style: { 
                                                                                MozAppearance: 'textfield',
                                                                                appearance: 'textfield'
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}  >
                                                            {/* Precio de venta */}
                                                            <Grid item xs={6}>
                                                                <h6 style={{fontFamily:"SF Pro Display Bold"}}>Precio de venta</h6>
                                                                <TextField fullWidth 
                                                                    style={{ color: "black" }}
                                                                    id="cost"
                                                                    className="mb-3 formulario"
                                                                    placeholder="Precio"
                                                                    type="numeric"
                                                                    value={cost_book}
                                                                    onChange={e => setCostBook(Number(e.target.value))}
                                                                    InputLabelProps={{
                                                                        sx: { fontSize: "16px" } 
                                                                    }}
                                                                    variant="outlined"
                                                                    sx={{ borderRadius: 20 }}
                                                                />
                                                            </Grid>
                                                            {/* Estado del libro */}
                                                            <Grid item xs={6}>
                                                                <FormControl fullWidth>
                                                                    <h6 style={{fontFamily:"SF Pro Display Bold"}}>Estado del libro</h6>
                                                                    <Select fullWidth 
                                                                        style={{ color: "black" }}
                                                                        id="status"
                                                                        className="mb-3 formulario"
                                                                        onChange={handleStatusChange}
                                                                        value={selectedStatus}
                                                                        labelId="status-label"
                                                                        sx={{ borderRadius:"15px"}}
                                                                        displayEmpty                                       
                                                                    >
                                                                        <MenuItem value="">Selecciona una opción</MenuItem>
                                                                        <MenuItem value="Nuevo">Nuevo</MenuItem>
                                                                        <MenuItem value="Usado: Como nuevo">Usado: Como nuevo</MenuItem>
                                                                        <MenuItem value="Usado: Con algo de desgaste">Usado: Con algo de desgaste</MenuItem>
                                                                        <MenuItem value="Usado: Con mucho desgaste">Usado: Con mucho desgaste</MenuItem>
                                                                        <MenuItem value="Usado:  En mal estado">Usado:  En mal estado</MenuItem>
                                                                        </Select>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2} >
                                                            {/* Formato */}
                                                            <Grid item xs={6}>
                                                                <FormControl>
                                                                    <FormLabel id="format" style={{color: "#000000", fontFamily:"SF Pro Display Bold"}} >Formato</FormLabel>
                                                                    <RadioGroup
                                                                        row
                                                                        aria-labelledby="format"
                                                                        name="format"
                                                                        value={format_book}
                                                                        onChange={(event) => setFormatBook(event.target.value)}
                                                                    >
                                                                        <FormControlLabel value="dura" control={<Radio />} label="Tapa Dura" />
                                                                        <FormControlLabel value="blanda" control={<Radio />} label="Tapa Blanda" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                <br />
                                                                <br />
                                                                <h6>¿Cuál es la comisión por vender?</h6>
                                                                <p>Matchbook descontará un 10% del total de cada venta realizada. 
                                                                Este descuento se realiza al momento de asignar el saldo de una transacción.</p>

                                                                <br />
                                                                <h6>¿Cómo recibo mi dinero?</h6>
                                                                <p>Puedes solicitar tu dinero en "Mis ventas" una vez que tus libros sean recibidos por el comprador.</p>
                                                            </Grid>
                                                            {/* Num ejemplares */}
                                                            <Grid item xs={6} alignItems="flex-start">
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                                                                        label="Deseo publicar más de un ejemplar"
                                                                    />
                                                                    {isChecked && (
                                                                        <TextField 
                                                                            fullWidth 
                                                                            id="stock"
                                                                            label="Número de Libros"
                                                                            type="number"
                                                                            value={stock_book}
                                                                            onChange={(event) => setStockBook(Number(event.target.value))}
                                                                        />
                                                                    )}
                                                                </FormGroup>
                                                                <br />
                                                                <h6 style={{color: "#000000", fontFamily:"SF Pro Display Bold"}}>Información Adicional</h6>

                                                                <textarea style={{borderRadius:"10px", height: "180px"}} value={description_book} onChange={handleDescriptionChange} name="postContent" rows={4} cols={65} />                                                    
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </>

                                        )}
                                        {/* --Paso 3--*/}
                                        {step === 3 && (
                                            <>
                                                <Typography gutterBottom variant="h4" style={{fontFamily:"SF Pro Display Bold", color:"#1eaeff"}} >
                                                    Paso 3
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Añade 3 fotografías iluminadas de tu libro
                                                </Typography>
                                                
                                                <br />
                                                <br />
                                                <div style={{backgroundColor:"#002E5D"}}>
                                                    <Grid container spacing={4} justifyContent="center" style={{padding: "20px", alignContent:"center", textAlign: "center"}}>
                                                        
                                                        {/* Portada de Vitrina */}
                                                        <Card style={{ margin: "10px", alignContent: "center", height:"255px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                            <CardContent style={{padding:"0px", position: "relative"}}>
                                                                <input
                                                                    accept="image/*"
                                                                    style={{ display: 'none' }}
                                                                    id="image-showcase"
                                                                    type="file"
                                                                    onChange={handleImageChange}
                                                                />
                                                                <label htmlFor="image-showcase">
                                                                    {!imageShowcase && (
                                                                        <Button component="span">
                                                                            <AddIcon />
                                                                        </Button>
                                                                    )}
                                                                </label>
                                                                {imageShowcase ? (
                                                                    <>
                                                                    <img src={imageShowcase} alt="Portada Real" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                                    <Button 
                                                                        style={{ position: 'absolute', top: -7, right: -20}} 
                                                                        onClick={() => setImageShowcase(null)}
                                                                    >
                                                                        <DeleteIcon style={{color:"black", borderBlockColor:"white"}} />
                                                                    </Button>
                                                                    </>
                                                                ) : (
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        Portada de Vitrina (opcional)
                                                                    </Typography>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                            {/* Portada Real */}
                                                            <Card style={{ margin: "10px", alignContent: "center", height:"255px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                                <CardContent style={{padding:"0px", position: "relative"}}>
                                                                    <input
                                                                        accept="image/*"
                                                                        style={{ display: 'none' }}
                                                                        id="image-cover"
                                                                        type="file"
                                                                        onChange={handleImageChangeCover} 
                                                                    />
                                                                    <label htmlFor="image-cover">
                                                                        {!imageCover && (
                                                                            <Button component="span">
                                                                                <AddIcon />
                                                                            </Button>
                                                                        )}
                                                                    </label>
                                                                    {imageCover ? (
                                                                        <>
                                                                        <img src={imageCover} alt="Portada Real" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                                        <Button 
                                                                            style={{ position: 'absolute', top: -7, right: -20}} 
                                                                            onClick={() => setImageCover(null)}
                                                                        >
                                                                            <DeleteIcon style={{color:"black", borderBlockColor:"white"}} />
                                                                        </Button>
                                                                        </>
                                                                    ) : (
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Portada Real (Fotografía)
                                                                        </Typography>
                                                                    )}
                                                                </CardContent>
                                                            </Card>

                                                            {/* Portada Página (Fotografía) */}
                                                            <Card style={{ margin: "10px", alignContent: "center", height:"255px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                                <CardContent style={{padding:"0px", position: "relative"}}>
                                                                    <input
                                                                        accept="image/*"
                                                                        style={{ display: 'none' }}
                                                                        id="image-first"
                                                                        type="file"
                                                                        onChange={handleImageChangeFirst} 
                                                                    />
                                                                    <label htmlFor="image-first">
                                                                        {!imageFirst && (
                                                                            <Button component="span">
                                                                                <AddIcon />
                                                                            </Button>
                                                                        )}
                                                                    </label>
                                                                    {imageFirst ? (
                                                                        <>
                                                                        <img src={imageFirst} alt="Portada Pagina" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                                        <Button 
                                                                            style={{ position: 'absolute', top: -7, right: -20}} 
                                                                            onClick={() => setImageFirst(null)}
                                                                        >
                                                                            <DeleteIcon style={{color:"black", borderBlockColor:"white"}} />
                                                                        </Button>
                                                                        </>
                                                                    ) : (
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Portada Página (Fotografía)
                                                                        </Typography>
                                                                    )}
                                                                </CardContent>
                                                            </Card>

                                                            {/* Contraportada (Fotografía) */}
                                                            <Card style={{ margin: "10px", alignContent: "center", height:"255px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                                <CardContent style={{padding:"0px", position: "relative"}}>
                                                                    <input
                                                                        accept="image/*"
                                                                        style={{ display: 'none' }}
                                                                        id="image-back"
                                                                        type="file"
                                                                        onChange={handleImageChangeBack} 
                                                                    />
                                                                    <label htmlFor="image-back">
                                                                        {!imageBack && (
                                                                            <Button component="span">
                                                                                <AddIcon />
                                                                            </Button>
                                                                        )}
                                                                    </label>
                                                                    {imageBack ? (
                                                                        <>
                                                                        <img src={imageBack} alt="Contraportada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                                        <Button 
                                                                            style={{ position: 'absolute', top: -7, right: -20}} 
                                                                            onClick={() => setImageBack(null)}
                                                                        >
                                                                            <DeleteIcon style={{color:"black", borderBlockColor:"white"}} />
                                                                        </Button>
                                                                        </>
                                                                    ) : (
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Contraportada (Fotografía)
                                                                        </Typography>
                                                                    )}
                                                                </CardContent>
                                                            </Card>

                                                    </Grid>
                                                </div>
                                            </>
                                        )}            
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{ justifyContent: 'space-between', marginRight:"50%", marginLeft:"60%" }}>
                                    {step > 1 && (
                                        <div style={{justifyContent: "flex-end"}}>
                                        <Button onClick={handlePrevious} style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                            Anterior
                                        </Button>
                                        </div>
                                    )}
                                    {step === 1 ? (
                                        <div style={{justifyContent: "flex-start"}}>
                                        <Button onClick={handleNext} style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                            Siguiente
                                        </Button>
                                        </div>
                                    ) : step === 2 ? (
                                        <div style={{justifyContent: "flex-start"}}>
                                        <Button onClick={add_book}  style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                            Siguiente
                                        </Button>
                                        <ToastContainer 
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        />
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Button onClick={handleAddAnother} style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none",  width:"130px", height:"50px", fontWeight:"bold"}} >
                                            Agregar otro
                                        </Button>
                                        <Button onClick={handleSubmitPublication} style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none",  width:"130px", height:"50px", fontWeight:"bold"}} >
                                            Completado
                                        </Button>
                                        </div>
                                    )}
                                </CardActions>
                                    <CardContent style={{backgroundColor:"#002E5D"}}></CardContent>
                            </Card> 
                        </Box>
                    </div>
                </ThemeProvider>
            </NoSsr>
            <Footer />
        </>
    );
}
export default Sales;
