import React, { useEffect, useState } from "react";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import Footer from "../../components/common/Footer/footer";
import { Box, Grid, Card, Button, Avatar, Typography, Stack, Pagination, CardContent, PaginationItem, CardMedia } from "@mui/material";
import { RiPencilFill } from "react-icons/ri";
import "../../App.css";
import axios from "axios";
import PlaceIcon from '@mui/icons-material/Place';
import { FaHeart } from "react-icons/fa6";


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
    user_rut_user: number;
    book: Book;
    users: Users;
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

export default function Profile() {

    const [users, setUsers] = React.useState<Users>();

    {/* Mostrar Publicacion */}
    const [publications, setPublications] = React.useState<Publication[]>([]);

    {/* Paginas Publicaciones */}
    const [page, setPage] = useState(1);

    {/*-----------------------------------------------------------------------------*/}
    {/* Paginas Publicaciones */}
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };


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
        const userString = localStorage.getItem("user");
        if (userString !== null){
        const users : Users = JSON.parse(userString);
        try {
            const responseUser= await axios.get(`http://localhost:3001/users/${users.rut_user}`);
            const userResponse = responseUser.data;
            setUsers(userResponse);
            console.log(JSON.stringify(responseUser.data, null, 2))
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
        }   
    };

    console.log('fetchPublication' + fetchPublications)
    fetchPublications();
    }, []);
    
    {/*-----------------------------------------------------------------------------*/}

    return (
        <>
            <NavBarLogin />
            <Box className="fondoVenta">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={10} md={5} lg={3}>
                        <Card sx={{ borderRadius:"20px", padding: "20px", height:"440px", textAlign:"center", marginRight:"20px" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop:"30px", paddingBottom:"30px", position:"relative"  }}>
                                <Avatar style={{backgroundColor: "#f05d16", width:"170px", height:"170px"}} src="/broken-image.jpg" />
                                <div style={{ 
                                    width: '35px', 
                                    height: '35px', 
                                    backgroundColor: '#188bcc', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    position: 'relative', 
                                    top: '80px', 
                                    left: '2px', 
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)'
                                }}>
                                    <RiPencilFill style={{ color: "#ffffff", width:"33px", height:"25px"}} /> {/* Icono de lápiz */}
                                </div>
                            </div>
                            <Typography variant="h2" style={{ fontSize: "23px", fontFamily: "SF Pro Display Bold", paddingBottom:"32px"}}>Na.rubilark</Typography> {/*{username} */}
                            <Typography variant="body1" style={{ fontSize: "15px", fontFamily: "SF Pro Display Regular", paddingBottom:"35px"}}>sin comentarios</Typography> {/*{email_user} */}
                            <Button style={{borderRadius:"20px", textTransform: "none", fontSize:"17px"}} fullWidth variant="contained">Valparaiso</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={10} md={7} lg={6}>
                        <Box sx={{ position: 'relative', width: '100%', marginBottom: '24px', textAlign:"center"}}>
                            <Box sx={{ position: 'absolute', top: '-16px', right:'20px', backgroundColor:'#f44336', color:'#fff', borderRadius:'20px 20px 0 0', zIndex: 'tooltip', width:"200px", height:"40px", display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                                <Typography variant="body2" style={{ padding:'6px 16px', fontSize:"18px" }}>Mi Librería</Typography>
                            </Box>
                        </Box>
                        <div>
            
                                {/* Mostrar las publicaciones del usuario*/}
                                <Card className="us" elevation={0} style={{backgroundColor: "#f4f6f9"}} >
                                
                                    <Grid container spacing={4} justifyContent="center" style={{padding: "20px"}}>
                                    
                                        {Array.isArray(publications) && publications.slice(Math.max(publications.length - 10, 0)).reverse().slice((page - 1) * 5, page * 5).map((publication) => (
                                            <Card 
                                                key={publication.id_publication} 
                                                style={{ margin: "10px", width: "230px", borderRadius: "20px", textAlign: "left", position: 'relative', padding:"22px"}} 
                                                sx={{ maxWidth: 345, padding: "10px"}}
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
                                                                        <span>{users?.cities.name}</span>
                                                                    </Box>
                                                                </Box>
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
                            
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
}
