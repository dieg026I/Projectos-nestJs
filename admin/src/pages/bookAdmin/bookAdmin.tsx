import SideMenu from "../../components/sideMenu/sideMenu";
import { Autocomplete, AutocompleteInputChangeReason, Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { MdClose } from "react-icons/md";
import { IoMdCloudDownload } from "react-icons/io";

interface Category {
    id_category: string;
    name_category: string;
}

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
    publication: Publication[]
}
interface BookSuggestion {
    title: string;
    authors: string[];
    publisher?: string;
    publishedDate?: string;
    image?: string;
}

const BookAdmin: React.FC = () => {

    const [selectedPublications, setSelectedPublications] = useState<string[]>([]);
    const [publications, setPublications] = React.useState<Publication[]>([]);
    const [users, setUsers] = React.useState<Users>();
    
    {/* Modal Agregar */}
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

    {/* Sugerencia */}

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<BookSuggestion[]>([]);

    {/* Book */}
    const [name_book, setNameBook] = React.useState('');
    const [format_book, setFormatBook] = React.useState('');
    const [author_name, setAuthorName] = React.useState('');
    const [publisher_name, setPublisherName] = React.useState('');
    const [cost_book, setCostBook] = React.useState(0);
    const [category, setCategory] = React.useState<Category[]>([]);
    const [OneCategory, setOneCategory] = React.useState<Category>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [year_book, setYearBook] = useState<number | null>(null);
    const [status_book, setStatusBook ] = React.useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [stock_book, setStockBook] = React.useState(1);
    const [description_book, setDescriptionBook] = React.useState('');

    {/* Publicación */}
    const [id_publication, setIdPublication] = React.useState('');
    const [date_publication, setDatePublication] = React.useState('');
    const [photo_showcase, setPhotoShowcase] = React.useState<File | null>(null);
    const [photo_cover, setPhotoCover] = React.useState<File | null>(null);
    const [photo_first_page, setPhotoFirstPage] = React.useState<File | null>(null);
    const [photo_back_cover, setPhotoBackCover] = React.useState<File | null>(null);
    const [book, setBook] = React.useState< Book | null>(null);

    {/* Imagenes */}
    const [imageShowcase, setImageShowcase] = useState<string | null>(null);
    const [imageCover, setImageCover] = useState<string | null>(null);
    const [imageFirst, setImageFirst] = useState<string | null>(null);
    const [imageBack, setImageBack] = useState<string | null>(null);

    {/* Editar/Modificar */}
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedBookName, setEditedBookName] = useState<string | null>(null);
    const [editedAuthorName, setEditedAuthorName] = useState<string | null>(null);

    const navigate = useNavigate();

    {/* Mostrar Publicacion */}
    useEffect(() => {
        const fetchPublications = async () => {
        try {
            const response = await axios.get('http://localhost:3001/publications/publication');
            const publicationResponse = response.data;
            setPublications(response.data);
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
    };

    fetchPublications();
    }, []);
    {/* ------------------------------------------------- */}

    {/* Publicación */}
    const handleSubmitPublication = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Validación de campos requeridos
        if (!name_book || !author_name || !publisher_name || !year_book || !cost_book || !category) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }
    
        try {
            let id_author = uuidv4();
            await axios.post('http://localhost:3001/author', {
                id_author: id_author,    
                name_author: author_name,
            });
    
            let id_publisher = uuidv4();
            await axios.post('http://localhost:3001/publisher', {
                id_publisher: id_publisher,    
                name_publisher: publisher_name  
            });
    
            const bookId = `${name_book}-${author_name.length}-${publisher_name.slice(0, 3)}`.toLowerCase();
    
            await axios.post('http://localhost:3001/book', {
                id_book: bookId,
                name_book: name_book,
                format_book: format_book,
                author_id_author: id_author,
                publisher_id_publisher: id_publisher,
                year_book: year_book,
                status_book: selectedStatus,
                stock_book: stock_book,
                description_book: description_book,
                categories: [OneCategory]
            });
    
            const formData = new FormData();
            const id_publication = uuidv4();
    
            if (photo_showcase) formData.append('images', photo_showcase);
            if (photo_cover) formData.append('images', photo_cover);
            if (photo_first_page) formData.append('images', photo_first_page);
            if (photo_back_cover) formData.append('images', photo_back_cover);
    
            const userString = localStorage.getItem("user");
            if (userString) {
                const user = JSON.parse(userString);
                formData.append('rut_user', JSON.stringify(user.rut_user));
            }
    
            formData.append('id_publication', id_publication);
            formData.append('id_book', bookId);
            formData.append('cost_book', cost_book.toString());
    
            await axios.post('http://localhost:3001/publications/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Publicación Agregada');
            closeModalAdd();
            window.location.reload();
    
        } catch (error) {
            console.error('Hubo un error al procesar tu solicitud:', error);
        }
    };
    {/* ------------------------------------------------- */}

    {/* Modal Agregar */}

    // Función para abrir el modal
    const openModalAdd = () => setIsModalOpenAdd(true);

    // Función para cerrar el modal
    const closeModalAdd = () => setIsModalOpenAdd(false);
    {/*-----------------------------------------------------------------------------*/}

    {/* Título libro (api google book) */}
    const handleInputChange = async (
        event: React.SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (reason === 'input') {
            if (value.length > 2) {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`);
                const books = response.data.items.map((item: any) => ({
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                publisher: item.volumeInfo.publisher,
                publishedDate: item.volumeInfo.publishedDate,
                image: item.volumeInfo.image,
                }));
                setOptions(books);
            } catch (error) {
                console.error('Error al buscar libros:', error);
            }
            }
        }
    };
    
    const handleSelectChange = (event: React.ChangeEvent<{}>, value: BookSuggestion | null) => {
        if (value) {
            setNameBook(value.title);
            setAuthorName(value.authors.join(', ')); 
            setPublisherName(value.publisher || '');
            setYearBook(value.publishedDate ? new Date(value.publishedDate).getFullYear() : null);
            setImageShowcase(value.image || null);
        } else {
            setNameBook('');
        }
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Categorias */}

    //Llamar categorias
    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(response => {
            setCategory(response.data);
            });
    }, []);

    //Seleccionar categorias
    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = (event.target.value);
        setSelectedCategory(selectedValue);
        let id_category = selectedValue
        axios.get(`http://localhost:3001/categories/${id_category}`)
            .then(response => {
            setOneCategory(response.data);
            });
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Descripción */}
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value) {
            const description_book = event.target.value;
            setDescriptionBook(description_book);
        }
    }

    {/*-----------------------------------------------------------------------------*/}
    {/* Estado */}
    
    const handleStatusChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Checkbox mas libros */}
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Imagenes */}

    //Portada Vitrina
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPhotoShowcase(file); 
            setImageShowcase(file.name); 
        }
    };

    //Portada Real
    const handleImageChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPhotoCover(file); 
            setImageCover(file.name); 
        }
    };
    

    //Portada Pagina
    const handleImageChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPhotoFirstPage(file); 
            setImageFirst(file.name); 
        }
    };
    
    //Contraportada
    const handleImageChangeBack = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPhotoBackCover(file); 
            setImageBack(file.name); 
        }
    };
    {/* ------------------------------------------------- */}

    {/* Eliminar publicaciones seleccionadas*/}
    const deleteSelectedPublications = () => {
        if (window.confirm('¿Realmente quieres eliminar la(s) publicación(es)?')) {
            const deleteRequests = selectedPublications.map(id => axios.delete(`http://localhost:3001/publications/${id}`));
            Promise.all(deleteRequests)
                .then(() => {
                    setPublications(publications.filter(publication => !selectedPublications.includes(publication.id_publication)));
                    setSelectedPublications([]);
                    alert('Publicación Eliminada');
                    window.location.reload();
                })
                .catch(error => console.error('Hubo un error al eliminar las publicaciones', error));
        }
    };
    {/* ------------------------------------------------- */}

    {/* Seleccion de Publicaciones*/}
    const handleSelectPublication = (id: string) => {
    
    const selectedIndex = selectedPublications.indexOf(id);
    let newSelectedPublications: string[] = [];
    
    if (selectedIndex === -1) {
        newSelectedPublications = [...selectedPublications, id];
    } else {
        newSelectedPublications = selectedPublications.filter(selectedId => selectedId !== id);
        
        if (editingId === id) {
        const publicationToReset = publications.find(pub => pub.id_publication === id);
        if (publicationToReset) {
            setEditedBookName(publicationToReset.book.name_book);
            setEditedAuthorName(publicationToReset.book.author_id_author.name_author);
        }
        setEditingId(null);
        }
    }
    setSelectedPublications(newSelectedPublications);
    };
    {/* ------------------------------------------------- */}

    {/* Modificar y Guardar edicion (nombre y autor)*/}
    const handleSaveClick = async () => {
        if (editingId) {
            try {
                console.log("editingId: " + editingId);
    
                const responseBook = await axios.get(`http://localhost:3001/publications/onePublication/${editingId}`);
                console.log("responseBook: ", responseBook);
    
                const publicationBook: Publication = responseBook.data;
                console.log("publicationBook: ", publicationBook);
    
                // Asegúrate de que publicationBook.book no es null antes de continuar
                if (publicationBook.book) {
                    const bookPublication: Book = publicationBook.book;
                    console.log("bookPublication: ", bookPublication);
    
                    // Utiliza bookPublication.id_book directamente aquí
                    const id_book = bookPublication.id_book;
                    console.log("id_book: " + id_book);
    
                    if (id_book) {
                        await axios.put(`http://localhost:3001/book/${id_book}`, {
                            id_book: bookPublication.id_book,
                            name_book: editedBookName,
                            format_book: bookPublication.format_book,
                            author_id_author: bookPublication.author_id_author,
                            publisher_id_publisher: bookPublication.publisher_id_publisher,
                            year_book: bookPublication.year_book,
                            status_book: bookPublication.status_book,
                            stock_book: bookPublication.stock_book,
                            description_book: bookPublication.description_book,
                            categories: bookPublication.category
                        });

                        

                        const id_author_book = bookPublication.author_id_author.id_author;
                        // Agrega depuración para verificar el valor de author_id_author
                        console.log("author_id_author: ", bookPublication.author_id_author.id_author);

                        if (id_author_book) {
                            console.log("nombre Autor: "+ id_author_book)
                            
                            console.log("Intentando actualizar autor con id: ", id_author_book);
                            const responseAuthor = await axios.put(`http://localhost:3001/author/${id_author_book}`, {
                                id_author: id_author_book,
                                name_author: editedAuthorName
                            });
                            console.log("Respuesta de actualización del autor: ", responseAuthor);

                            console.log("nombre Autor: "+ id_author_book)

                            console.log("nombre libro: "+ name_book )
                            console.log("editedname: " + editedBookName)

                            console.log("editedAuthorName: "+ editedAuthorName)
                        
                            setEditingId(null);
                            setSelectedPublications([]);
                            alert('Publicación actualizada con éxito');
                            window.location.reload();
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
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                alert('Error al guardar los cambios');
            }
        } else {
            alert('No hay una publicación seleccionada para guardar.');
        }
    };
    
    return (
        <Box display="flex" sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}>
                
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
                            <Button
                                onClick={() => {
                                    if (selectedPublications.length === 1) {
                                        const selectedId = selectedPublications[0];
                                        setEditingId(selectedId);
                                        // Encuentra la publicación seleccionada y establece los valores para la edición.
                                        const publicationToEdit = publications.find(pub => pub.id_publication === selectedId);
                                        if (publicationToEdit) {
                                            setEditedBookName(publicationToEdit.book.name_book);
                                            setEditedAuthorName(publicationToEdit.book.author_id_author.name_author);
                                        }
                                    } else {
                                        alert('Por favor, selecciona una sola publicación para modificar.');
                                    }
                                }}
                                variant="contained"
                                style={{ textTransform: "none", backgroundColor: '#7A7A7A', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}
                            >
                                Modificar
                            </Button>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button onClick={openModalAdd} variant="contained" style={{ textTransform: "none", backgroundColor: '#0b9000', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Agregar
                                </Button>
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={3} md={2} lg={2}>
                                <Button onClick={deleteSelectedPublications} variant="contained" style={{ textTransform: "none", backgroundColor: '#ff5252', color: 'white', borderRadius: '30px', width: 'auto', padding: '6px 16px' }}>
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Modal Agregar */}
                        <Modal open={isModalOpenAdd} onClose={closeModalAdd}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflowY: "auto" }} >
                                <Card style={{ width: "1030px", maxHeight: "650px", overflowY: "auto", position: "relative", paddingLeft:"20px", paddingRight:"20px", marginTop:"20px", marginBottom:"20px", paddingBottom:"20px"}}>
                                    <MdClose onClick={closeModalAdd} style={{ position: "absolute", right: 0, top: 0, padding:"10px", width:"25px", height:"25px"}} />
                                    <Grid container spacing={2} alignItems="center" >
                                        <Grid item xs={12}>
                                        <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px", margin:"0", marginTop:"20px", marginBottom:"20px"}}>Título</h6>
                                            <InputLabel id="book-select-label"></InputLabel>
                                            <Autocomplete
                                            id="book-search-autocomplete"
                                            open={open}
                                            onOpen={() => setOpen(true)}
                                            onClose={() => setOpen(false)}
                                            getOptionLabel={(option) => `${option.title} - ${option.authors.join(', ')}`}
                                            options={options}
                                            loading={open && options.length === 0}
                                            onChange={handleSelectChange}
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
                                        </Grid>
                                        
                                        {/* Autor */}
                                        <Grid item xs={6}>
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Autor</h6>
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
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"18px"}}>Categoría</h6>
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
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"20px"}}>Editorial</h6>
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
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"20px"}}>Año</h6>
                                            <TextField fullWidth 
                                                style={{ color: "black" }}
                                                id="year"
                                                className="mb-3 formulario"
                                                placeholder="Año"
                                                type="text"
                                                value={year_book === 0 ? '' : year_book}
                                                onChange={e => {
                                                    const value = e.target.value;
                                                    setYearBook(value === '' ? 0 : !isNaN(Number(value)) ? Number(value) : year_book);
                                                }}
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
                                            <h6 style={{fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"20px"}}>Precio de venta</h6>
                                            <TextField fullWidth 
                                            style={{ color: "black" }}
                                            id="cost"
                                            className="mb-3 formulario"
                                            placeholder="Precio"
                                            type="text"
                                            value={cost_book === 0 ? '' : cost_book}
                                            onChange={e => {
                                                const value = e.target.value;
                                                setCostBook(value === '' ? 0 : !isNaN(Number(value)) ? Number(value) : cost_book);
                                            }}
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
                                            <h6 style={{ fontFamily: "SF Pro Display Bold" , fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"20px"}}>Estado del libro</h6>
                                            <Select
                                            fullWidth
                                            style={{ color: "black" }}
                                            id="status"
                                            className="mb-3 formulario"
                                            onChange={handleStatusChange}
                                            value={selectedStatus}
                                            labelId="status-label"
                                            sx={{ borderRadius: "15px" }}
                                            displayEmpty
                                            >
                                            <MenuItem value="">Selecciona una opción</MenuItem>
                                            <MenuItem value="Nuevo">Nuevo</MenuItem>
                                            <MenuItem value="Usado: Como nuevo">Usado: Como nuevo</MenuItem>
                                            <MenuItem value="Usado: Con algo de desgaste">Usado: Con algo de desgaste</MenuItem>
                                            <MenuItem value="Usado: Con mucho desgaste">Usado: Con mucho desgaste</MenuItem>
                                            <MenuItem value="Usado: En mal estado">Usado: En mal estado</MenuItem>
                                            </Select>
                                        </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} >
                                        {/* Formato */}
                                        <Grid item xs={6}>
                                            <FormControl>
                                                <FormLabel id="format" style={{color: "#000000", fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"20px"}} >Formato</FormLabel>
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

                                            <div>
                                                <h6  style={{ fontFamily: "SF Pro Display Bold" , fontSize:"18px" , margin:"0", marginBottom:"20px", marginTop:"20px"}}>Imagenes </h6>

                                                <div style={{ display:"flex", justifyContent:"left" }}>

                                                    <div style={{padding:"0"}}>
                                                        <Button
                                                            style={{marginRight:"30px"}}
                                                            component="label"
                                                            variant="contained"
                                                            startIcon={<IoMdCloudDownload />}
                                                        >
                                                            Portada Vitrina
                                                            <input type="file" hidden onChange={handleImageChange} />
                                                        </Button>
                                                        {imageShowcase && (
                                                            <p style={{ fontSize: "small" }}>
                                                                {imageShowcase.length > 25 ? `...${imageShowcase.substring(imageShowcase.length - 25)}` : imageShowcase}
                                                            </p>
                                                        )}
                                                        <br />
                                                    </div>

                                                    <div >
                                                        <Button
                                                            component="label"
                                                            variant="contained"
                                                            startIcon={<IoMdCloudDownload />}
                                                        >
                                                            Portada Real
                                                            <input type="file" hidden onChange={handleImageChangeCover} />
                                                        </Button>
                                                        {imageCover && (
                                                            <p style={{ fontSize: "small"}}>
                                                                {imageCover.length > 25 ? `...${imageCover.substring(imageCover.length - 25)}` : imageCover}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <br />

                                                <div style={{ display:"flex", justifyContent:"left" }}>

                                                    <div>
                                                        <Button
                                                            style={{marginRight:"30px"}}
                                                            component="label"
                                                            variant="contained"
                                                            startIcon={<IoMdCloudDownload />}
                                                        >
                                                            Portada Página
                                                            <input type="file" hidden onChange={handleImageChangeFirst} />
                                                        </Button>
                                                        {imageFirst && (
                                                            <p style={{ fontSize: "small" }}>
                                                                {imageFirst.length > 25 ? `...${imageFirst.substring(imageFirst.length - 25)}` : imageFirst}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Button
                                                            component="label"
                                                            variant="contained"
                                                            startIcon={<IoMdCloudDownload />}
                                                        >
                                                            Contraportada
                                                            <input type="file" hidden onChange={handleImageChangeBack} />
                                                        </Button>
                                                        {imageBack && (
                                                            <p style={{ fontSize: "small" }}>
                                                                {imageBack.length > 25 ? `...${imageBack.substring(imageBack.length - 25)}` : imageBack}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <br />

                                        </Grid>
                                        {/* Num ejemplares */}
                                        <Grid item xs={6} alignItems="flex-start">
                                            
                                            {selectedStatus === "Nuevo" && (
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
                                            )}
                                            <br />
                                            {/* Descripción */}
                                            <h6 style={{color: "#000000", fontFamily:"SF Pro Display Bold", fontSize:"18px" , margin:"0", marginBottom:"20px"}}>Información Adicional</h6>
                                            <textarea style={{borderRadius:"10px", height: "180px"}} value={description_book} onChange={handleDescriptionChange} name="postContent" rows={4} cols={65} />                                                    
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop:"28px",marginBottom:"10px" ,justifyContent:"center", display:"flex"}} >
                                            <Button fullWidth  onClick={handleSubmitPublication} style={{ backgroundColor: "#1eaeff", color: "#ffffff", borderRadius: "30px", textTransform: "none", width: "500px", height: "50px", fontWeight: "bold" }} >
                                                Completado
                                            </Button>
                                    </Grid>
                                </Card>
                            </div>
                        </Modal>
                        
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
                                        <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Acciones</TableCell>
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
                                            <TableCell align="center">
                                                {editingId === publication.id_publication ? (
                                                <TextField
                                                    value={editedBookName}
                                                    onChange={(e) => setEditedBookName(e.target.value)}
                                                />
                                                ) : (
                                                publication.book?.name_book || 'No disponible'
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {editingId === publication.id_publication ? (
                                                <TextField
                                                    value={editedAuthorName}
                                                    onChange={(e) => setEditedAuthorName(e.target.value)}
                                                />
                                                ) : (
                                                publication.book?.author_id_author.name_author || 'No disponible'
                                                )}
                                            </TableCell>
                                            <TableCell align="center">{publication.users?.name_user +' '+ publication.users?.lastname_user || 'No disponible'}</TableCell>
                                            <TableCell align="center">{publication.users?.rut_user || 'No disponible'}</TableCell>
                                            <TableCell align="center">{publication.cost_book}</TableCell>
                                            {editingId === publication.id_publication && (
                                                <TableCell align="center">
                                                <Button onClick={handleSaveClick}>Guardar</Button>
                                                </TableCell>
                                            )}
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
