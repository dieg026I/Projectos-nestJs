import { Grid, Card , Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Button, CardMedia, CardContent, Box, Stack, Pagination, SelectChangeEvent, FormHelperText, FormLabel, FormGroup, Tabs} from '@mui/material'; // Asegúrate de tener MUI instalado
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import React, { useState } from 'react';
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
import { LuShoppingCart, LuSearch, LuMenu, LuDollarSign, LuLogOut } from "react-icons/lu";

import book1 from "../../assents/img/book1.jpeg";
import book2 from "../../assents/img/book2.jpg";
import book3 from "../../assents/img/book3.jpeg";
import book4 from "../../assents/img/book4.jpeg";


const PublicationDetail: React.FC = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const images = [book1, book2, book3, book4];

    const QuantityButton = ({ stock }: { stock: number }) => {
        const [quantity, setQuantity] = useState(1);
    }


    return (
        <>
            <NavBarLogin />
            <div style={{margin:"60px", marginTop:"90px"}}>

                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} > 

                    <Grid item xs={12} sm={12} md={12} lg={6}>

                        <Card className="card" style={{borderRadius:"20px", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", width:"560px", height:"auto", padding:"10px", paddingTop:"20px", marginLeft:"120px"}}>
                        
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
                                    interval={50000} // 50 segundos
                                    transitionTime={500}
                                    swipeScrollTolerance={5}
                                    ariaLabel="Book Carousel"
                                >
                                    {images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Book ${index + 1}`} style={{ width: 'auto', height: '280px', objectFit: 'contain' }} />
                                        </div>

                                    ))}
                                </Carousel>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div style={{marginLeft:"20px"}}>

                            <Typography style={{marginTop:"10px", fontSize:"30px", fontFamily:"SF Pro Display Bold"}}>De sangre y ceniza</Typography>
                            <Typography style={{fontSize:"20px", fontFamily:"SF Pro Display Bold", color:"#F05D16"}}>Jennifer L. Armentrout</Typography>
                            <br />
                            <Typography style={{fontSize:"30px", fontFamily:"SF Pro Display Semibold"}}>$8990</Typography>
                            
                            <Button>hola</Button>
                        
                            <Button style={{backgroundColor:"#F05D16", color:"#ffffff"}} >
                            <i className="LuShoppingCart"></i> Agregar al carro
                            </Button>
                            
                        </div>
                    </Grid>
                </Grid>

                <br />

                <Card>
                    <Box sx={{ width: '100%', typography: 'body1', textAlign:"center", justifyContent:"center", alignItems:"center" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Reseña" value="1" />
                                <Tab label="Información" value="2" />
                                <Tab label="Especificaciones" value="3" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Typography>descripcion del libro</Typography>
                            </TabPanel>
                            <TabPanel value="2">
                                Item Two

                            </TabPanel>
                            <TabPanel value="3">
                                Item Three
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