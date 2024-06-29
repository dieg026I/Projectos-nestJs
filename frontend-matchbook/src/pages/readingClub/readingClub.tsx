import { Card, Grid } from "@mui/material";
import React, { useEffect } from "react";

import libro from "../../assents/img/libro.png";
import ClubLectura from "../../assents/img/clubLectura.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import axios from "axios";
import { Typography } from "antd";

interface Categories {
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
    categories: Categories[];
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

export default function ReadingClub() {

    const [readingClub, setReadingClub] = React.useState<ReadingClub[]>([]);

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

    return (
        <>
            <NavBarLogin />
            <div >
                
                        <div style={{textAlign:"center", paddingTop:"80px"}}>
                            <h1 style={{fontFamily:"SF Pro Display Bold", fontSize:"44px", color:"#00A9E0", paddingBottom:"10px"}}>¿Cómo funciona nuestro club de lectura?</h1>
                            <p style={{fontFamily:"SF Pro Display Regular", fontSize:"18px", textAlign:"center", marginLeft:"220px", marginRight:"220px"}} >Compréndete a tí mismo y el fascinante mundo de la mente humana 
                                Nuestro club de lectura presencial se reúne una vez al mes en un lugar predeterminado, 
                                como una biblioteca local o una cafetería acogedora. Los miembros del club eligen un libro para leer antes de cada reunión. 
                                Durante la reunión mensual, los miembros discuten el libro, comparten sus opiniones y reflexiones, y eligen el próximo libro a leer. 
                                El ambiente es amigable y acogedor, fomentando el intercambio de ideas y el amor por la lectura.</p>
                        </div>
                        <br />
                    {readingClub.reverse().map((readingClubs) => (
                    <>
                        <div style={{textAlign:"left"}}>
                            <h2 style={{marginBottom:"25px", fontFamily:"SF Pro Display Bold", fontSize:"30px", textAlign:"center"}} >{readingClubs.title_club} </h2>
                            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                            <Grid className="text-center" item xs={12} sm={6} md={6} lg={5}>
                                    <img src={`http://localhost:3001/images/${readingClubs.image_club}`} style={{ width: "240px", marginLeft:"280px" }} alt="chile" />
                                </Grid>
                                <Grid className="text-left" item xs={12} sm={6} md={6} lg={7}>
                                    <div>
                                        <Typography style={{ fontFamily:"SF Pro Display Semibold", fontSize:"25px", marginBottom:"10px"}}>{readingClubs.book.name_book}</Typography>
                                        <Typography style={{ fontFamily:"SF Pro Display Semibold", fontSize:"20px", color:"#00254B"}}>{readingClubs.book.author_id_author.name_author}</Typography>
                                        <p style={{marginRight:"80px"}}>{readingClubs.description_club}</p>
                                        <br />
                                        <ul style={{ listStyleType: 'none' , paddingRight: '50px'}}>
                                            <li>Editorial: {readingClubs.book.publisher_id_publisher.name_publisher}</li>
                                            <li>Año: {readingClubs.book.year_book}</li>
                                            <li>Categoría: {readingClubs.book.categories.map((category) => category.name_category )}</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <br />
                            <h2 style={{ textAlign:"center"}}>Horario</h2>
                        <div style={{textAlign:"center", marginBottom:"50px", display: 'flex', justifyContent: 'center'}}>
                            
                            <br />
                            <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius:"20px", width:"1200px", justifyContent:"center"}}>
                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justifyContent="center">
                                    <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
                                        <div>
                                            <h3>Dia</h3>
                                            <p>{readingClubs.date_club instanceof Date ? readingClubs.date_club.toISOString() : readingClubs.date_club}</p>
                                        </div>
                                    </Grid>
                                    <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
                                        <div>
                                            <h3>Hora</h3>
                                            <p>{readingClubs.time_club}</p>
                                        </div>
                                    </Grid>
                                    <Grid className="text-center" item xs={12} sm={4} md={4} lg={4}>
                                        <div>
                                            <h3>Lugar</h3>
                                            <p>{readingClubs.place_club}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                        {/* Línea horizontal */}
                        <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                        <br />
                        </>
                    ))}

                        <div >
                            <div style={{ textAlign: 'center' }}>
                                <MdKeyboardArrowDown style={{ width:"100px", height:"100px"}} />
                                <h2>Ingresar al Club</h2>
                            </div>
                            
                            <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', marginTop:"60px", paddingBottom:"38px", display:"flex", alignItems:"center" }}>
                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justifyContent="center">
                                <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                    <button style={{borderRadius:"20px", backgroundColor:"#ff7f41", width: "90%", color:"#ffffff", height:"50px", border: "none", fontFamily:"Roboto Bold" }}>Whatsapp Club de Lectura</button>
                                </Grid>
                                    <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                        <img src={ClubLectura} style={{ width: "240px", alignContent:"center" }} alt="chile" />
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    
                
            </div>
            <Footer />
        </>
    );
}
