import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, NoSsr, Radio, RadioGroup, Select, SelectChangeEvent, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { CardBody, CardFooter } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import axios from "axios";
import "../../App.css";
import DeleteIcon from '@mui/icons-material/Delete';



const Sales: React.FC = () => {

    {/* Book */}
    const [id_book, setIdbook] = React.useState('');
    const [name_book, setNameBook] = React.useState('');
    const [format_book, setFormatBook] = React.useState('');
    const [author_id, setAuthorId] = React.useState('');
    const [publisher_id, setPublisherId] = React.useState('');
    const [cost_book, setCostBook] = React.useState('');
    const [id_category, setCategoryId] = React.useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [year_book, setYearBook] = React.useState('');
    const [status_book, setStatusBook ] = React.useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [stock_book, setStockBook] = React.useState('');
    const [description_book, setDescriptionBook] = React.useState('');

    {/* Publicación */}
    const [id_publication, setIdPublication] = React.useState('');
    const [date_publication, setDatePublication] = React.useState('');
    const [photo_showcase, setPhotoShowcase] = React.useState('');
    const [photo_cover, setPhotoCover] = React.useState('');
    const [photo_first, setPhotoFirst] = React.useState('');
    const [photo_back, setPhotoBack] = React.useState('');

    {/*-----------------------------------------------------------------------------*/}
    {/* Eliminar Animaciones */}
    const theme = createTheme({

        palette: {
            action: {
                active: "#000000", 
            },
        },
    });

    {/*-----------------------------------------------------------------------------*/}
    {/* Step and Scroll */}
    const contentRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
        if (step === 2 && contentRef.current) {
            contentRef.current.scrollTop = 0; // Reinicia la posición del scroll al comienzo del paso 2
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
            setImageShowcase(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageCover(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageChangeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFirst(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageChangeBack = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageBack(URL.createObjectURL(e.target.files[0]));
        }
    };

    {/*-----------------------------------------------------------------------------*/}
    {/* Category */}

    //llamar categorias
    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(response => {
            setCategoryId(response.data);
            console.log('Mostrar Categorias'+response.data);
            });
    }, []);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = Number(event.target.value);
        setSelectedCategory(selectedValue);
    
        const id_category = event.target.value;
    
        axios.get(`http://localhost:3001/categories/${id_category}`)
            .then(response => {
            setCategoryId(response.data);
            console.log(response.data);
        });
    };
    
    
    
    
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

        //  --Validaciones--


    try {
        const responseA = await axios.post('http://localhost:3001/book', {
            id_book,
            name_book,
            format_book,
            author_id,
            publisher_id,
            cost_book ,
            id_category,
            year_book,
            status_book,
            stock_book,
            description_book,
        });

        console.log(responseA.data);

    } catch (error) {
        console.error('Hubo un error al ingresar la publicacion:', error);
        }
    };


    {/*-----------------------------------------------------------------------------*/}
    {/* Publicación */}
    const handleSubmitPublication = async (event: React.FormEvent) => {
        event.preventDefault();

    try {
        const responseB = await axios.post('http://localhost:3001/publication', {
            id_publication,
            date_publication,
            photo_showcase,
            photo_cover,
            photo_first,
            photo_back
        });

        console.log(responseB.data);

    } catch (error) {
        console.error('Hubo un error al registrar el libro:', error);
        }
    };

    return (
        <NoSsr>
        <ThemeProvider theme={theme}>
        <div>
            <Box className="fondoVenta">
                <Card  sx={{ borderRadius:"20px",width:"1100px", maxWidth: "1400px", maxHeight:"100%" }} ref={contentRef} style={contentStyle} >
                
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
                                        <h6>Título</h6>
                                        <FormControl style={{ width:"50%" }}>
                                            <InputLabel style={{ fontSize: "16px"}} ></InputLabel>
                                            <Select 
                                                labelId="libro-label"
                                                id="name"
                                                value={name_book}
                                                onChange={e => setNameBook(e.target.value)}
                                                sx={{ width: '100%', color: "black", height:"45px", borderRadius:"10px" }}
                                                
                                            >
                                            </Select>
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

                                        <div >
                                            <Grid container spacing={2} alignItems="center" >
                                                {/* Autor */}
                                                <Grid item xs={6}>
                                                    <h6>Autor</h6>
                                                    <TextField fullWidth 
                                                        style={{ color: "black", borderRadius: 20 }}
                                                        id="author"
                                                        className="mb-3 formulario"
                                                        placeholder="Autor/a de la obra"
                                                        type="text"
                                                        value={author_id}
                                                        onChange={e => setAuthorId(e.target.value)}
                                                        InputLabelProps={{
                                                            sx: { fontSize: "16px"} 
                                                        }}
                                                        
                                                        sx={{ borderRadius: 20 }}
                                                    />
                                                </Grid>
                                                {/* Categoría */}
                                                <Grid item xs={6}>
                                                    <h6>Categoría</h6>
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
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} alignItems="center">
                                                {/* Editorial */}
                                                <Grid item xs={6}>
                                                    <h6>Editorial</h6>
                                                    <TextField fullWidth 
                                                        style={{ color: "black"}}
                                                        id="publisher"
                                                        className="mb-3 formulario"
                                                        placeholder="Editorial"
                                                        type="text"
                                                        value={publisher_id}
                                                        onChange={e => setPublisherId(e.target.value)}
                                                        InputLabelProps={{
                                                            sx: { fontSize: "16px" } 
                                                        }}
                                                    />
                                                </Grid>
                                                {/* Año */}
                                                <Grid item xs={6}>
                                                    <h6>Año</h6>
                                                    <TextField fullWidth 
                                                        style={{ color: "black" }}
                                                        id="year"
                                                        className="mb-3 formulario"
                                                        placeholder="Año"
                                                        type="number"
                                                        value={year_book}
                                                        onChange={e => setYearBook(e.target.value)}
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
                                                    <h6>Precio de venta</h6>
                                                    <TextField fullWidth 
                                                        style={{ color: "black" }}
                                                        id="cost"
                                                        className="mb-3 formulario"
                                                        placeholder="Precio"
                                                        type="number"
                                                        value={cost_book}
                                                        onChange={e => setCostBook(e.target.value)}
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
                                                        <h6>Estado del libro</h6>
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
                                                        <FormLabel id="format" style={{fontWeight:"bold"}} >Formato</FormLabel>
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
                                                                onChange={(event) => setStockBook(event.target.value)}
                                                            />
                                                        )}
                                                    </FormGroup>
                                                    <br />
                                                    <h6>Información Adicional</h6>

                                                    <textarea style={{borderRadius:"10px", height: "180px"}} name="postContent" rows={4} cols={65} />                                                    
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
                                                            value={photo_showcase}
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
                                                            value={photo_cover}
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
                                                            value={photo_first}
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
                                                            value={photo_back}
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
                            <div style={{justifyContent: "flex-start"}}>
                                <Button onClick={handlePrevious} style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                    Anterior
                                </Button>
                            </div>
                        )}
                        {step < 3 ? (
                            <div style={{justifyContent: "flex-end"}}>
                                <Button onClick={handleNext} style={{ backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                    Siguiente
                                </Button>
                            </div>
                        ) : (
                            <div style={{justifyContent: "flex-end"}}>
                                <Button onClick={handleNext} style={{backgroundColor:"#1eaeff", color: "#ffffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                    Agregar otro
                                </Button>
                            </div>
                        )}
                    </CardActions>
                    <CardContent style={{backgroundColor:"#002E5D"}}>
                    </CardContent>
                </Card> 
            </Box>
        </div>
        </ThemeProvider>
    </NoSsr>
    );
}
export default Sales;
