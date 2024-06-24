import React, { useState, ChangeEvent, useEffect } from "react";
import { Grid, Card , Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Slider, Button, CardMedia, CardContent, Box, Stack, Pagination} from '@mui/material'; // Asegúrate de tener MUI instalado
import banner from "../../assents/img/banner-marketplace.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import PlaceIcon from '@mui/icons-material/Place';
import { useLocation } from 'react-router-dom';


interface Publication {
    id_publication: string;
    date_publication: Date;
    user_rut_user: number;
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


export default function MarketplaceSearch() {

    {/* Accordion */}
    const [openRegion, setOpenRegion] = useState(true);
    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(true);

    const [term, setTerm] = React.useState('');

    {/*-----------------------------------------------------------------------------*/}
    {/* Mostrar Publicacion */}
    const [publications, setPublications] = React.useState<Publication[]>([]);

    const location = useLocation();
    const { searchResults } = location.state || {};
    
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                if (searchResults) {
                    setPublications(searchResults);
                } else {
                    const response = await axios.get('http://localhost:3001/publications');
                    setPublications(response.data);
                }
                console.log(JSON.stringify(publications, null, 2));
            } catch (error) {
                console.error('Error fetching publications:', error);
            }
        };
    
        fetchPublications();
    }, [searchResults]);
    
    {/*-----------------------------------------------------------------------------*/}
    {/* Mostrar boton "agregar al carro y ver detalle" */}
    const [activeCard, setActiveCard] = useState<string | null>(null);

    {/*-----------------------------------------------------------------------------*/}
    {/* Paginas Publicaciones */}
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            <NavBarLogin />
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
                    <img src={banner} alt="Imagen descriptiva" style={{ width: '1400px', height: '140px', objectFit: "cover", borderRadius:"18px" }} />
                </div>

                
                <div style={{ textAlign: 'right', margin: '10px 0', marginRight:"20px" }}>
                <Button 
                    href="/sales" 
                    variant="contained"  
                    style={{ 
                    textTransform: "none", 
                    backgroundColor: "#f05d16", 
                    color: "#ffffff",  
                    borderRadius: '30px', 
                    border: '2px solid borderColor',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',
                    fontSize:"15px", 
                    marginBottom: "20px" ,
                    fontFamily: "SF Pro Display Bold",
                    }}
                >
                    Quiero Vender
                </Button>
                </div>
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                        <h2 style={{marginLeft:"190px"}}>Novedades</h2>
                    </Grid>
                    <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                    <div style={{ display: "flex", justifyContent: "right", alignItems: "center" , marginRight:"20px"}}>
                        <span style={{ paddingRight:"10px"}}>Ordenar Por </span>
                        <select style={{ borderRadius:"10px" , width:"160px", height:"30px"}}>
                            {/* Tus opciones aquí */}
                            <option value="status_name">Nuevo</option> {/* Aqui va el estado el libro */}
                            {/* ... */}
                        </select>
                    </div>
                    </Grid>
                </Grid>

                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid className="text-center" item xs={12} sm={6} md={3} lg={3}>
                        <Accordion style={{ margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius:"20px",minHeight:"65px",  alignContent:"center"}} expanded={openRegion} onChange={() => setOpenRegion(!openRegion)} >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography style={{fontFamily:"SF Pro Text Bold"}}>Región</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{overflow: 'auto'}}>
                                <FormControl fullWidth>
                                    <Select>
                                        <MenuItem value="Selecciona una comuna" disabled><em>Selecciona una región</em></MenuItem>
                                        {/* Aquí puedes agregar las regiones */}
                                    </Select>
                                    <Typography style={{ fontFamily: "SF Pro Text Bold", alignItems: "flex-start", paddingTop: "10px", paddingBottom: "10px", display: "flex" }}>Comuna</Typography>
                                    <Select>
                                        <MenuItem value="Selecciona una comuna" disabled><em>Selecciona una comuna</em></MenuItem>
                                        {/* Aquí puedes agregar las comunas */}
                                    </Select>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>

                        
                        <Accordion style={{ margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',  borderRadius:"20px", minHeight:"65px", alignContent:"center"}}expanded={openCategory} onChange={() => setOpenCategory(!openCategory)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography style={{fontFamily:"SF Pro Text Bold"}}>Categoría</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{overflow: 'auto'}}>
                                <FormControl>
                                    {/* Aquí puedes agregar los checkbox */}
                                    <FormControlLabel control={<Checkbox />} label="Opción 1" />
                                    <FormControlLabel control={<Checkbox />} label="Opción 2" />
                                    <FormControlLabel control={<Checkbox />} label="Opción 3" />
                                    <FormControlLabel control={<Checkbox />} label="Opción 4" />
                                    <FormControlLabel control={<Checkbox />} label="Opción 5" />
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion style={{margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius:"20px", minHeight:"65px", alignContent:"center"}} expanded={openPrice} onChange={() => setOpenPrice(!openPrice)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography style={{fontFamily:"SF Pro Text Bold"}}>Precio</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{overflow: 'auto'}}>
                                <Slider
                                    defaultValue={[20, 40]}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={100}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid className="text-center" item xs={12} sm={6} md={9} lg={9}>
                        <Card style={{ height:"auto", marginRight:"20px", marginBottom:"20px", borderRadius:"20px"}}> 
                                <Grid container spacing={4} justifyContent="center" style={{padding: "20px", marginTop:"15px"}}>
                                {Array.isArray(publications) && publications.slice((page - 1) * 12, page * 12).reverse().map((publication) => (
                                        <Card 
                                            key={publication.id_publication} 
                                            style={{ margin: "10px", width: "230px", borderRadius: "20px", textAlign: "left", position: 'relative', padding:"22px"}} 
                                            sx={{ maxWidth: 345, padding: "10px"}}
                                            onMouseEnter={() => setActiveCard(publication.id_publication)}
                                            onMouseLeave={() => setActiveCard(null)}
                                        >
                                        {/* Imagen libros */}
                                        <CardMedia
                                            sx={{ height: 140, position: 'relative' }}
                                        >
                                            <img 
                                                src={`http://localhost:3001/images/${publication.photo_showcase}`}
                                                alt="Imagen del libro" 
                                                style={{ 
                                                    height: '180px', 
                                                    width: 'auto', 
                                                    maxWidth: '100%', 
                                                    display: 'block', 
                                                    marginLeft: 'auto', 
                                                    marginRight: 'auto', 
                                                }}
                                            />
                                            <FaHeart style={{ position: 'absolute', top: '10px', right: '10px', color: '#f05d16' }} />
                                        </CardMedia>
                                            
                                        <CardContent style={{padding: "5px", paddingTop: "15px", marginTop:"35px"}}>
                                            {/* Titulo Libro */}
                                            <Typography 
                                                gutterBottom 
                                                variant="h5" 
                                                component="div" 
                                                style={{
                                                    fontSize: "17px",  
                                                    paddingTop: "5px", 
                                                    fontFamily: "SF Pro Display Medium",
                                                    height: '3em',
                                                    overflow: 'hidden' 
                                                }}
                                            >
                                                {publication.book.name_book.length > 30 ? `${publication.book.name_book.substring(0, 30)}...` : publication.book.name_book}
                                            </Typography>

                                            
                                            <div style={{ height: '80px', overflow: 'hidden' }}>
                                            {activeCard === publication.id_publication ? (
                                                <div style={{ 
                                                    position: 'absolute', 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    width: '80%', 
                                                }}>
                                                    <Button type="button" style={{textTransform: "none", color:"#ffffff", backgroundColor:"#00a9e0", marginTop:"5px", textAlign: 'center', justifyContent:"center"}}>
                                                        Agregar al carro
                                                    </Button>
                                                    <Button type="button" style={{textTransform: "none", color:"#ffffff", backgroundColor:"#00a9e0", marginTop:"5px", textAlign: 'center', justifyContent:"center"}}>
                                                        Ir al Detalle
                                                    </Button>
                                                </div>
                                            
                                            ) : (
                                                <>
                                                    {/* Autor Libro */}
                                                    <Typography variant="body2" color="text.secondary" style={{ fontFamily: "SF Pro Display Regular"}}>
                                                        {publication.book.author_id_author.name_author} 
                                                    </Typography>
                                        
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , fontSize: "14px", marginTop:"15px" }}>
                                                    
                                                        {/* Precio Libro */}
                                                        <Typography gutterBottom variant="h5" component="div" style={{fontSize: "20px", fontWeight: "bold", paddingTop: "5px"}}>
                                                            ${publication.cost_book}
                                                        </Typography>
                                
                                                        {/* Ubicación Libro */}
                                                        <Box sx={{ display: 'flex', fontSize: "13px" }}>
                                                            <PlaceIcon style={{ color:"#00a9e0", alignItems: 'center' }} />
                                                            <span>Viña del Mar</span>
                                                        </Box>
                                                    </Box>
                                                </>
                                            )}
                                            </div>
                                        </CardContent>
                                        
                                    </Card>
                                    ))}

                                </Grid>
                                <Grid container justifyContent="center" alignItems="center" style={{padding: "20px"}}>
                                    <Stack spacing={2}>
                                        <Pagination count={Math.ceil(publications.length / 12)} page={page} onChange={handleChange} />
                                    </Stack>
                                </Grid>
                        </Card>
                    </Grid>
                </Grid>

            </div >
            <br />
            <Footer/>
        </>
    );
}
