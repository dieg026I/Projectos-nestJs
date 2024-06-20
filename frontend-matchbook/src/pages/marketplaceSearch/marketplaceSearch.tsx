import React, { useState, ChangeEvent, useEffect } from "react";
import { Grid, Card , Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Slider, Button, CardMedia, CardContent, Box, Stack, Pagination, SelectChangeEvent, FormGroup} from '@mui/material'; // Asegúrate de tener MUI instalado
import banner from "../../assents/img/banner-marketplace.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import PlaceIcon from '@mui/icons-material/Place';
import { useLocation, useNavigate } from 'react-router-dom';


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
interface Users {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    cities: Cities,
    username: string,
    publication: Publication[]
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
interface Region  {
    id_region: number;
    name_region: string;
    cities: Cities[];
};
interface Cities {
    id_city: number;
    name: string;
    region: Region;
}
interface Category {
    id_category: string;
    name_category: string;
}

type FilterParams = {
    region?: string;
    city?: string;
    category?: string[];
    minPrice?: number;
    maxPrice?: number;
};


export default function MarketplaceSearch() {

    {/* Accordion */}
    const [openRegion, setOpenRegion] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);

    {/* Region y City */}
    const [region , setRegion] = React.useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [cities, setCities] = React.useState<Cities[]>([]);
    const [id_city, setIdCity] = useState<number | null>(null);
    const [city, setCity] = React.useState<Cities>();
    const [authors, setAuthors] = useState([]);
    const [cityName, setCityName] = useState(' ');


    {/* Publicación */}
    const [publications, setPublications] = React.useState<Publication[]>([]);

    {/* Mostrar boton "agregar al carro y ver detalle" */}
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const [page, setPage] = useState(1);

    {/* Categoria */}
    const [category, setCategory] = React.useState<Category[]>([]);
    const [OneCategory, setOneCategory] = React.useState<Category>();
    const [categoryList, setCategoryList] = React.useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    const [priceRange, setPriceRange] = useState([500, 100000]);
    const [nameCategory, setNameCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);

    const navigate = useNavigate();

    const location = useLocation();
    const { searchResults } = location.state || {};

    {/*-----------------------------------------------------------------------------*/}
    {/* Mostrar Publicacion */}

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
    

    {/* Cargar Todas Las Regiones */}
    useEffect(() => {
        axios.get('http://localhost:3001/region')
            .then(response => {
            setRegion(response.data);
            });
    }, []);
    {/*-----------------------------------------------------------------------------*/}

    {/* Cargar todas las categorias */}
    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(response => {
            setCategory(response.data);
            });
    }, []);
    {/*-----------------------------------------------------------------------------*/}

    {/* Paginas Publicaciones */}
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    {/*------------------------------------------ */}
    {/* Seleccion de la Region */}
    const handleRegionChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setSelectedRegion(event.target.value);
        const numberRegion = event.target.value;
        axios.get(`http://localhost:3001/cities/region/${numberRegion}`)
            .then(response => {
            setCities(response.data);
        });
    };
    
    {/*------------------------------------------ */}
    {/* Seleccion de la Comuna */}
    const handleCityChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value === "" ? null : Number(event.target.value);
        setIdCity(value);
    };
    {/*-----------------------------------------------------------------------------*/}
    
    {/* Category */}
    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
        const newSelectedCategories = [...selectedCategories];
        const currentIndex = newSelectedCategories.indexOf(categoryId);
    
    if (currentIndex === -1) {

        if (newSelectedCategories.length < 10) {
        newSelectedCategories.push(categoryId);
        } else {
        alert('Solo puedes seleccionar hasta 10 categorías.');
        }
    } else {
        newSelectedCategories.splice(currentIndex, 1);
    }

    try {
        const response = await axios.get(`http://localhost:3001/categories/categoryOne/${categoryId}`);
        console.log("categoryId: "+ categoryId);
        const category: Category = response.data;
        console.log("category: "+ category);
        setOneCategory(category);
        const nameCategory = category.name_category;
        console.log("nameCategory: "+ nameCategory);
        console.log("categoryList1: "+ categoryList);
    
        if (!event.target.checked) {
            if (!categoryList.includes(nameCategory)) {
                const updatedCategoryList = [...categoryList, nameCategory];
                setCategoryList(updatedCategoryList);
                console.log("categoryList2: ", updatedCategoryList);
                console.log("Categoria marcada")
            }
        } else {
            console.log("Categoria desmarcada")

            setCategoryList(prevList => prevList.filter(item => item !== nameCategory));
        }
    } catch (error) {
        console.error('Error al obtener las publicaciones filtradas:', error);
    }
    
    setSelectedCategories(newSelectedCategories);
    };
    {/*-----------------------------------------------------------------------------*/}
    
    {/* Filtro Publicaciones */}
    const fetchFilteredPublications = async () => {
        try {
            let params: FilterParams = {};

            // Region
            if (selectedRegion) {
                const oneRegion = await axios.get(`http://localhost:3001/region/oneRegion/${selectedRegion}`);
                const regionOne: Region = oneRegion.data;
                params.region = regionOne.name_region;
            }

            // Ciudad
            if (id_city) {
                const oneCity = await axios.get(`http://localhost:3001/cities/oneCity/${id_city}`);
                const cityOne: Cities = oneCity.data;
                params.city = cityOne.name;
            }

            console.log("categorylist: "+ categoryList)
            // Categoria
            if (categoryList) { 
                params.category = categoryList;
                console.log("categorylist: "+ categoryList)
            } else{
                
            }
            
            // Precio
            if (minPrice && maxPrice) { 
                params.minPrice = minPrice;
                params.maxPrice = maxPrice;
            }
                
            const response = await axios.get('http://localhost:3001/publications/findByFilters', { params });
        
            setFilteredPublications(response.data);
            // Si no se encuentran publicaciones, muestra un mensaje
            if (response.data.length === 0) {
                // Puedes establecer un estado para manejar el mensaje o usar una variable
                console.log("No se encontraron publicaciones con los filtros aplicados.");
            }
        } catch (error) {
            console.error('Error al obtener las publicaciones filtradas:', error);
        }
    };
    {/*-----------------------------------------------------------------------------*/}
    
    {/* Seleccionar rango de precio */}
    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        const newPriceRange = newValue as number[];
        const priceMin = newPriceRange[0];
        const priceMax = newPriceRange[1];
    
        setPriceRange(newPriceRange);
    
        setMinPrice(priceMin);
        setMaxPrice(priceMax);
    
        console.log("price range: ", priceRange);
        console.log("minPrice: ", minPrice);
        console.log("maxPrice: ", maxPrice);
    };
    
    
    const getAriaValueText = (value: number) => `${value} CLP`;

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
                <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid className="text-center" item xs={12} sm={3} md={3} lg={3}>
                        <h2 style={{marginBottom:"0px", }}>Filtros</h2>
                    </Grid>
                    <Grid className="text-center" item xs={12} sm={5} md={5} lg={5}>
                        <h2 style={{marginRight:"490px"}}>Novedades</h2>
                    </Grid>
                    <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
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
                        <Accordion style={{ margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius:"20px", minHeight:"65px",  alignContent:"center"}} expanded={openRegion} onChange={() => setOpenRegion(!openRegion)} >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} classes={{ content: 'custom-accordion-summary' }}>
                                <Typography style={{fontFamily:"SF Pro Text Bold", marginBottom:"0"}}>Región</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{overflow: 'auto'}}>
                                <FormControl fullWidth>       
                                <Select
                                    id="region"
                                    sx={{ width: '100%', color: "black" }}
                                    onChange={(event) => handleRegionChange({
                                    target: {
                                        value: Number(event.target.value),
                                    },
                                    })}
                                    value={selectedRegion || ""}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>Elige una región</MenuItem>
                                    {region.map(region => (
                                    <MenuItem key={region.id_region} value={region.id_region}>{region.name_region}</MenuItem>
                                    ))}
                                </Select>
                                

                                <Typography style={{ fontFamily: "SF Pro Text Bold", alignItems: "flex-start", paddingTop: "10px", paddingBottom: "10px", display: "flex" }}>Comuna</Typography>
                                <Select
                                    id="city"
                                    value={id_city || ''} 
                                    sx={{ width: '100%', color: "black" }}
                                    onChange={handleCityChange}
                                    displayEmpty
                                    >
                                    <MenuItem value="" disabled>Elige una ciudad</MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={city.id_city} value={city.id_city}>{city.name}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ margin: "10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius: "20px", minHeight: "65px", alignContent: "center"}} expanded={openCategory} onChange={() => setOpenCategory(!openCategory)}>
                            <AccordionSummary className="AccordionSummary-root" expandIcon={<ExpandMoreIcon />}>
                                <Typography style={{ fontFamily: "SF Pro Text Bold" }}>Categoría</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="AccordionDetails-root custom-scroll" style={{ overflow: 'auto', maxHeight: '260px'}}>
                                <FormControl fullWidth>
                                <FormGroup>
                                    {category.map((categoryItem) => (
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={selectedCategories.includes(categoryItem.id_category)}
                                            onChange={(e) => handleCheckboxChange(e, categoryItem.id_category)}
                                            value={categoryItem.id_category}
                                            />
                                        }
                                        label={categoryItem.name_category}
                                        key={categoryItem.id_category}
                                        />
                                    ))}
                                </FormGroup>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion style={{ margin: "10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius: "20px", minHeight: "65px", alignContent: "center" }} expanded={openPrice} onChange={() => setOpenPrice(!openPrice)}>
                            <AccordionSummary className="AccordionSummary-root" expandIcon={<ExpandMoreIcon />}>
                                <Typography style={{ fontFamily: "SF Pro Text Bold" }}>Precio</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="AccordionDetails-root" >
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={500}
                                max={100000}
                                step={1000}
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => `${value} CLP`}
                                marks={[
                                    {
                                    value: 500,
                                    label: <span style={{ marginRight: '-100%' }}>500 CLP</span>,
                                    },
                                    {
                                    value: 100000,
                                    label: <span style={{ marginLeft: '-100%' }}>100000 CLP</span>,
                                    },
                                ]}
                            />
                            </AccordionDetails>
                        </Accordion>
                        <Card style={{borderRadius:"20px", marginTop:"15px",margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)'}}>
                            <Button onClick={fetchFilteredPublications}  fullWidth >Filtrar</Button>
                        </Card>
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
                                                    <Button onClick={() => navigate('/publicationDetail', { state: { publicationId: publication.id_publication } })} type="button" style={{textTransform: "none", color:"#ffffff", backgroundColor:"#00a9e0", marginTop:"5px", textAlign: 'center', justifyContent:"center"}}>
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
