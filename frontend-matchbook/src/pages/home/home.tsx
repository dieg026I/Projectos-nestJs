import React, { useEffect, useRef, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Grid, Link, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import NavBar from "../../components/common/NavBar/navBar";
import Footer from "../../components/common/Footer/footer";
import image1 from "../../assents/img/car1.png";
import image2 from "../../assents/img/car2.png";
import libro from "../../assents/img/libro.png";
import us1 from "../../assents/img/us1.png";
import us2 from "../../assents/img/us2.png";
import us3 from "../../assents/img/us3.png";
import us4 from "../../assents/img/us4.png";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import MenuIcon from '@mui/icons-material/Menu';
import PlaceIcon from '@mui/icons-material/Place';
import { FaHeart } from "react-icons/fa6";
import axios from "axios";


interface HomeProps {
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
    publications: Publication[]
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


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export const HomePage: React.FC<HomeProps> = ({}: HomeProps) => {

    const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
        borderBlockColor: 'rgb(255, 255, 255)',
        borderColor:'rgb(255, 255, 255)',
        borderBlockEndColor: 'rgb(255, 255, 255)',
        borderRadius: '50%',
        color: 'rgb(0, 169, 224)',
    };

    //button
    const [bgColor, setBgColor] = useState('transparent');
    const [textColor, setTextColor] = useState('#000000');

    const handleMouseOver = () => {
        setBgColor('#f05d16');
        setTextColor('#ffffff');
        
    };

    const handleMouseOut = () => {
        setBgColor('transparent');
        setTextColor('#000000'); 
    };

    //novedades
    const novedadesRef = useRef(null);

    const handleLinkClick = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    {/*-----------------------------------------------------------------------------*/}
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
        <NavBar />
        <div style={{justifyContent: "center", alignItems: "center", textAlign: "center", alignContent: "center", marginTop: "44px"}}>
            <div style={{color: "black", paddingRight: "5px", paddingLeft: "20px", marginBottom: "15px"}} role="presentation" onClick={handleClick}>
                <Breadcrumbs separator=" " aria-label="breadcrumb">
                    <MenuIcon sx={{ mr: 0.5 }}  fontSize="inherit" />
                    <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center',  paddingRight: "5px", paddingLeft: "5px" }}
                    color="text.primary"
                    href="/"
                    >
                    
                    Menú
                    </Link>

                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center',  paddingRight: "5px", paddingLeft: "5px" }}
                        color="text.primary"
                        onClick={() => handleLinkClick(novedadesRef)}
                    >
                        Novedades
                    </Link>

                    <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' , paddingRight: "5px", paddingLeft: "5px"}}
                    color="text.primary"
                    href="#novedades"
                    
                    >
                    Noticias Literarias
                    </Link>
                </Breadcrumbs>
            </div>
            
            <div>
                <Carousel className="carousel" showThumbs={false}
                    renderArrowPrev={(onClickHandler, hasPrev, label) => 
                        hasPrev && (
                            <button type="button" onClick={onClickHandler} title={label} style={{...arrowStyles, left: 15}}>
                                &#10094;
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) => 
                        hasNext && (
                            <button type="button" onClick={onClickHandler} title={label} style={{...arrowStyles, right: 15}}>
                                &#10095;
                            </button>
                        )
                    }
                >
                    <div>
                        <img className="carousel" src={image1}  />

                            <Button href="/readingClub" variant="contained" style={{ textTransform: "none", backgroundColor: '#f05d16', color: 'white', borderRadius: '30px', position: 'absolute', top: '75%', left: '11.3%', transform: 'translate(-50%, -50%)', width: 'auto', padding: '6px 16px' }}>
                                Ir al Club
                            </Button>
                    </div>
                    <div>
                        <img className="carousel" src={image2} />
                    </div>
                </Carousel>
            </div>
            <br />
            <div style={{ textAlign: "center" , marginLeft: "80px" , marginRight: "80px" }}>
                <Card className="us" elevation={0} style={{ borderRadius: "20px", justifyContent: "center", textAlign: "center", backgroundColor: "#f4f6f9"}}>
                <br />
                <h6 className="texto" style={{fontWeight: "bold", fontSize: "20px", fontFamily: 'SF Pro Display Bold'}}>¿QUÉ HACEMOS EN MATCHBOOK?</h6>
                
                <Grid container spacing={4} justifyContent="center" style={{padding: "20px"}}>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Card sx={{ width: "70px", height: "70px" }}>
                                <img src={us1} style={{ width: "100%", height: "100%" }} alt="chile" /> 
                            </Card>
                            <p style={{ paddingTop: "10px" }}>Nuestra misión es acercar la lectura a las personas</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Card sx={{ width: "70px", height: "70px" }}>
                                <img src={us2} style={{ width: "100%", height: "100%" }} alt="chile" />
                            </Card>
                            <p style={{ paddingTop: "10px" }}>Incentivamos la existencia de una comunidad lectora</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Card sx={{ width: "70px", height: "70px" }}>
                                <img src={us3} style={{ width: "100%", height: "100%" }} alt="chile" />
                            </Card> 
                            <p style={{ paddingTop: "10px" }}>Aportamos al medio ambiente, con la circularidad de libros</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Card sx={{ width: "70px", height: "70px" }}>
                                <img src={us4} style={{ width: "100%", height: "100%" }} alt="chile" />
                            </Card> 
                            <p style={{ paddingTop: "10px" }}>Hacemos lecturas guidas en nuestro club de lectura</p> 
                        </div>
                    </Grid>
                </Grid>
                </Card>
            </div>
            <br />
            <div id="novedades" ref={novedadesRef}>
            <Card className="us" elevation={0} style={{backgroundColor: "#f4f6f9"}} >
                    <br />
                    <h5 style={{ fontWeight: "600", fontFamily: "Roboto Bold"}}> NOVEDADES</h5>
                    <h2 style={{ fontWeight: "bold", fontFamily: "Roboto Bold" }} >Lo más nuevo que tenemos para ti</h2>
                    <br />
                    <Grid container spacing={4} justifyContent="center" style={{padding: "20px"}}>
                    
                        {Array.isArray(publications) && publications.slice(Math.max(publications.length - 10, 0)).reverse().slice((page - 1) * 5, page * 5).map((publication) => (
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
                                                width: '80%', // Añade esta línea
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
                                                        <span>{publication.users?.cities?.name}</span>
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
                            <Pagination 
                                count={Math.min(Math.ceil(publications.length / 5), 2)} 
                                page={page} 
                                onChange={handleChange}
                                renderItem={(item) => (
                                    <PaginationItem
                                        {...item}
                                        sx={{
                                            '&.Mui-selected': {
                                                color: 'black',
                                            },
                                        }}
                                    >
                                        •
                                    </PaginationItem>
                                )}
                            />
                        </Stack>
                    </Grid>
                </Card>

                <br />
                <Button 
                    href="/" 
                    variant="contained"  
                    style={{ 
                        textTransform: "none", 
                        backgroundColor: bgColor, 
                        color: textColor,  
                        borderRadius: '30px', 
                        border: '2px solid #f05d16', 
                        fontWeight: "bold", 
                        fontSize:"15px", 
                        marginBottom: "20px" ,
                        fontFamily: "SF Pro Display Medium",
                    }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    Revisa todos los libros
                </Button>
                
                
            </div>


        </div>
        <Footer />
    </>
    );
}