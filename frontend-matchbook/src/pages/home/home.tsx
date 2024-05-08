import React, { useEffect, useRef, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";
import NavBar from "../../components/common/navBar";
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


interface HomeProps {

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

                            <Button href="/clubdelectura" variant="contained" style={{ textTransform: "none", backgroundColor: '#f05d16', color: 'white', borderRadius: '30px', position: 'absolute', top: '75%', left: '11.3%', transform: 'translate(-50%, -50%)', width: 'auto', padding: '6px 16px' }}>
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
                
                    <Carousel  showThumbs={false}
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
                    }>
                        <div>
                        <Grid container spacing={4} justifyContent="center" style={{padding: "20px"}}>
                        <Card style={{ margin: "10px", width: "230px", borderRadius: "20px", textAlign: "left", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                <CardMedia
                                    sx={{ height: 140, position: 'relative' }}
                                >
                                    <img 
                                    src={libro} 
                                    alt="green iguana" 
                                    style={{ 
                                        height: '140px', 
                                        width: 'auto', 
                                        maxWidth: '100%', 
                                        display: 'block', 
                                        marginLeft: 'auto', 
                                        marginRight: 'auto' 
                                    }}
                                />
                                    <FaHeart style={{ position: 'absolute', top: '10px', right: '10px', color: '#f05d16' }} />
                                </CardMedia>
                                    
                                    <CardContent style={{padding: "5px", paddingTop: "15px"}}>
                                        <Typography gutterBottom variant="h5" component="div" style={{fontSize: "15px", fontWeight: "bold", paddingTop: "5px", fontFamily: "SF Pro Display Medium"}}>
                                        Cómo Ganar Amigos e Influir en las Personas
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{ fontFamily: "SF Pro Display Regular"}}>
                                        Dale Carnegie
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography gutterBottom variant="h5" component="div" style={{fontSize: "25px", fontWeight: "bold", paddingTop: "5px"}}>
                                            $6.990
                                        </Typography>
                                        <Box sx={{ display: 'flex', fontSize: "13px" }}>
                                            <PlaceIcon style={{ color:"#00a9e0", alignItems: 'center' }} />
                                            <span>Viña del Mar</span>
                                        </Box>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth href="/" variant="contained"  style={{ textTransform: "none", backgroundColor: 'white', color: '#f05d16', borderRadius: '30px', borderBlockColor: "black", fontWeight: "bold", fontSize:"15px" }}>
                                            Agregar al Carro
                                        </Button>
                                    </CardActions>
                                </Card>
                                {/* Segundo Card */}
                                <Card style={{ margin: "20px", width: "230px", borderRadius: "20px", textAlign: "left"}} sx={{ maxWidth: 345, padding: "10px"}}>
                                <h1>agsfdgndgndt</h1>
                                </Card>

                                {/* Segundo Card */}
                                <Card style={{ margin: "20px", width: "230px", borderRadius: "20px", textAlign: "left"}} sx={{ maxWidth: 345, padding: "10px"}}>
                                <h1>agsfdgndgndt</h1>
                                </Card>

                                {/* Segundo Card */}
                                <Card style={{ margin: "20px", width: "230px", borderRadius: "20px", textAlign: "left"}} sx={{ maxWidth: 345, padding: "10px"}}>
                                <h1>agsfdgndgndt</h1>
                                </Card>

                                {/* Segundo Card */}
                                <Card style={{ margin: "20px", width: "230px", borderRadius: "20px", textAlign: "left"}} sx={{ maxWidth: 345, padding: "10px"}}>
                                <h1>agsfdgndgndt</h1>
                                </Card>
                            </Grid>
                            
                        </div>
                        <div>
                            <Card style={{ margin: "30px", width: "230px", borderRadius: "20px", textAlign: "left"}} sx={{ maxWidth: 345, padding: "10px"}}>
                                
                            <CardMedia
                                    sx={{ height: 140, position: 'relative' }}
                                >
                                    <img 
                                    src={libro} 
                                    alt="green iguana" 
                                    style={{ 
                                        height: '140px', 
                                        width: 'auto', 
                                        maxWidth: '100%', 
                                        display: 'block', 
                                        marginLeft: 'auto', 
                                        marginRight: 'auto' 
                                    }}
                                />
                                    <FaHeart style={{ position: 'absolute', top: '10px', right: '10px', color: '#f05d16' }} />
                                </CardMedia>
                                <CardContent style={{padding: "5px", paddingTop: "15px"}}>
                                    <Typography gutterBottom variant="h5" component="div" style={{fontSize: "15px", fontWeight: "bold", paddingTop: "5px"}}>
                                    Cómo Ganar Amigos e Influir en las Personas
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Dale Carnegie
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div" style={{fontSize: "25px", fontWeight: "bold", paddingTop: "5px"}}>
                                        $6.990
                                    </Typography>
                                    <Box sx={{ display: 'flex', fontSize: "13px" }}>
                                        <PlaceIcon style={{ color:"#00a9e0", alignItems: 'center' }} />
                                        <span>Viña del Mar</span>
                                    </Box>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth href="/" variant="contained"  style={{ textTransform: "none", backgroundColor: 'white', color: '#f05d16', borderRadius: '30px', borderBlockColor: "black", fontWeight: "bold", fontSize:"15px" }}>
                                        Agregar al Carro
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                        
                    </Carousel>

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
    </>
    );
}