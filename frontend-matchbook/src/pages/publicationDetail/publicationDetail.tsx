import { Grid, Card , Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Button, CardMedia, CardContent, Box, Stack, Pagination, SelectChangeEvent, FormHelperText, FormLabel, FormGroup, Tabs, Avatar} from '@mui/material'; 
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../App.css";
import { LuShoppingCart } from "react-icons/lu";
import { FiPlus, FiMinus, FiShare2 } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";
import { PiUserDuotone } from "react-icons/pi";


import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    categories: Categories[];
    year_book: number;
    status_book: string;
    stock_book: number;
    description_book: string;
}
interface Region  {
    id_region: number;
    name: string;
    cities: Cities[];
};
interface Cities {
    id_city: number;
    name: string;
    region: Region;
}
interface Categories {
    id_category: string;
    name_category: string;
}

const PublicationDetail: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { publicationId } = location.state;
    const [publication, setPublication] = useState<Publication | null>(null);

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const QuantityButton = ({ stock }: { stock: number }) => {
        const [quantity, setQuantity] = useState(1);
    }

    useEffect(() => {
        // Función para cargar los datos de la publicación
        const fetchPublication = async () => {
        try {
        const response = await axios.get(`http://localhost:3001/publications/onePublication/${publicationId}`);
        setPublication(response.data);

        } catch (error) {
        console.error('Error fetching publication details:', error);
        }
    };

    fetchPublication();
    }, [publicationId]);



    if (!publication) {
        return <div>Cargando...</div>;
    }

    const getFormatDisplay = (format: string) => {
        switch (format) {
            case 'dura':
            return 'Tapa Dura';
            case 'blanda':
            return 'Tapa Blanda';
            default:
            return format; 
        }
    };
    
    return (
        <>
            <NavBarLogin />
            <div style={{margin:"60px", marginTop:"90px"}}>
                
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} > 

                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Card className="card" style={{borderRadius:"20px", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", width:"560px", height:"auto", padding:"10px", paddingTop:"20px", marginLeft:"120px"}}>
                            {publication && (
                                <Carousel
                                    className="carouselDetail"
                                    showArrows={true}
                                    showIndicators={true}
                                    infiniteLoop={true}
                                    showThumbs={true}
                                    useKeyboardArrows={true}
                                    autoPlay={true}
                                    stopOnHover={true}
                                    swipeable={true}
                                    dynamicHeight={true}
                                    emulateTouch={true}
                                    autoFocus={false}
                                    selectedItem={0}
                                    interval={50000}
                                    transitionTime={500}
                                    swipeScrollTolerance={5}
                                    ariaLabel="Book Carousel"
                                >
                                    {[
                                    `http://localhost:3001/images/${publication.photo_showcase}`,
                                    `http://localhost:3001/images/${publication.photo_cover}`,
                                    `http://localhost:3001/images/${publication.photo_first_page}`,
                                    `http://localhost:3001/images/${publication.photo_back_cover}`
                                    ].map((image, index) => (
                                    <div key={index}>
                                        <img src={image} alt={`Imagen del libro ${index + 1}`} style={{ width: 'auto', height: '280px', objectFit: 'contain' }} />
                                    </div>
                                    ))}
                                </Carousel>
                                    )}
                            </Card>
                            
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={6}>
                        {publication && (

                            <div style={{marginLeft:"20px", width:"450px"}}>

                                <Typography style={{marginTop:"10px", fontSize:"30px", fontFamily:"SF Pro Display Bold"}}>{publication.book.name_book}</Typography>
                                <Typography style={{fontSize:"20px", fontFamily:"SF Pro Display Bold", color:"#F05D16"}}>{publication.book.author_id_author.name_author}</Typography>
                                <br />
                                <br />
                                <Typography style={{fontSize:"30px", fontFamily:"SF Pro Display Semibold"}}>${publication.cost_book}</Typography>
                                
                                
                                <Button style={{textTransform: "none", color:"#F05D16", width: "140px", height:"53px", justifyContent:"start", fontFamily:"SF Pro Display Medium", fontSize:"15px"}}>
                                    <span style={{marginRight:"5px"}}>Compartir</span>
                                    <FiShare2 style={{width: "20px", height:"20px",  cursor: 'pointer'}}  />
                                </Button>

                                <br />
                                <br />
                                <Button style={{textTransform: "none", width: "140px", height:"53px" , boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", borderRadius:"30px", marginRight:"30px", fontFamily:"SF Pro Display Bold", justifyContent: "space-between" }}>
                                    <FiMinus style={{ marginRight:"10px", justifyContent:"flex-start"}} />
                                    <span>1</span>
                                    <FiPlus style={{marginLeft:"10px", justifyContent:"flex-end"}} />
                                </Button>

                                <Button style={{textTransform: "none", backgroundColor:"#F05D16", color:"#ffffff", borderRadius:"30px", width: "280px", height:"53px", fontFamily:"SF Pro Display Bold", fontSize:"15px"}}>
                                    <LuShoppingCart style={{width: "20px", height:"20px", marginLeft:"5px", cursor: 'pointer', marginRight:"10px"}}  />
                                    <span>Agregar al carro</span>
                                </Button>
                                <br />
                                <br />
                                
                            </div>
                            )}
                        </Grid>
                    </Grid>

                    <br />

                    <Card style={{ marginLeft: "120px", marginRight: "120px", marginTop: "20px", borderRadius: "20px" }}>
                        <Box sx={{ width: '100%' }}>
                            <TabContext value={value}>
                                
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Reseña" value="1" />
                                    <Tab label="Información" value="2" />
                                    <Tab label="Especificaciones" value="3" />
                                </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <Typography>Descripción: </Typography>
                                    {publication && (
                                        <Typography>{publication.book.description_book}</Typography>
                                    )}
                                </TabPanel>
                                <TabPanel value="2">
                                    <div onClick={() => {
                                                const loggedInUser = localStorage.getItem("user");
                                                // Parsear el objeto JSON para obtener el Logged In User ID.
                                                const loggedInUserId = loggedInUser ? JSON.parse(loggedInUser).rut_user : null;

                                                console.log('Logged In User ID:', loggedInUserId);
                                                console.log('Publication User ID:', publication.users?.rut_user);

                                                if (publication.users?.rut_user === loggedInUserId) {
                                                    console.log('Ir a perfil logueado');
                                                    navigate('/profile');
                                                } else {
                                                    console.log('Ir a perfil usuarios');
                                                    navigate('/profileUsers', { state: { UserId: publication.users?.rut_user } });
                                                }
                                            }}
                                            style={{ display: 'flex', justifyContent: 'start', marginTop: "10px", marginLeft:"20px" }}>
                                        {publication && (
                                            <>
                                                <Avatar style={{ backgroundColor: "#f05d16", width: "80px", height: "80px" }} src="/broken-image.jpg" />
                                                <div style={{ marginLeft: '10px' }}>
                                                <p style={{fontFamily:"SF Pro Display Bold", marginBottom:"6px", marginLeft: '3px', fontSize:"20px"}}>{`${publication.users?.name_user} ${publication.users?.lastname_user}`}</p>
                                                <p style={{fontFamily:"SF Pro Display Regular", marginBottom:"6px"}}><PiUserDuotone style={{color:"#00A9E0"}} /> {publication.users?.username}</p>
                                                <p style={{fontFamily:"SF Pro Display Regular"}}><MdOutlinePlace style={{color:"#00A9E0"}} /> {publication.users?.cities?.name}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </TabPanel>
                                <TabPanel value="3" style={{ padding: 0 }}>
                                    {publication && (
                                        <table  style={{ width: '93%', borderCollapse: 'collapse', margin:"30px" }}>
                                            <tbody style={{}}>
                                                <tr style={{backgroundColor: "#eaebef"}}>
                                                    <td style={{ fontFamily:"SF Pro Display Bold" , padding: '8px', borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px"  }} ><strong>Formato</strong></td>
                                                    <td style={{ fontFamily:"SF Pro Display Regular",  padding: '8px', borderTopRightRadius:"10px", borderBottomRightRadius:"10px" }} >{getFormatDisplay(publication.book.format_book)}</td>
                                                </tr>
                                                <tr >
                                                    <td style={{ fontFamily:"SF Pro Display Bold" , padding: '8px' }} ><strong>Autor</strong></td>
                                                    <td style={{ fontFamily:"SF Pro Display Regular",  padding: '8px' }} >{publication.book.author_id_author.name_author}</td>
                                                </tr>
                                                <tr style={{backgroundColor: "#eaebef", borderTopLeftRadius: '20px'}}>
                                                    <td style={{ fontFamily:"SF Pro Display Bold" , padding: '8px',borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px"  }} ><strong>Editorial</strong></td>
                                                    <td style={{ textAlign: 'left', padding: '8px', borderTopRightRadius:"10px", borderBottomRightRadius:"10px" }} >{publication.book.publisher_id_publisher.name_publisher}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontFamily:"SF Pro Display Bold" , padding: '8px'}} ><strong>Año</strong></td>
                                                    <td style={{ fontFamily:"SF Pro Display Regular",  padding: '8px' }} >{publication.book.year_book}</td>
                                                </tr>
                                                <tr style={{backgroundColor: "#eaebef", borderTopLeftRadius: '20px'}}>
                                                    <td style={{ fontFamily:"SF Pro Display Bold" , padding: '8px',borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px"  }} ><strong>Categoría</strong></td>
                                                    <td style={{ textAlign: 'left', padding: '8px', borderTopRightRadius:"10px", borderBottomRightRadius:"10px" }} >{publication.book.categories.map((category) => category.name_category )}</td>   
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Card> 
            </div>
            <br />
            <Footer/>
        </>
    );
};

export default PublicationDetail;