
import {  Card , Grid ,  Typography, Select, MenuItem,  Button,  CardContent, TableContainer, Paper, TableHead, Table, TableCell, TableRow, TableBody, Box} from '@mui/material';
import Book1 from "../../assents/img/book1.jpeg";
import Book3 from "../../assents/img/book3.jpeg";
import  Logo from "../../assents/img/logoMatch.png";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface Publication {
    id_publication: string;
    date_publication: Date;
    users: User;
    book: Book;
    photo_showcase: string;
    photo_cover: string;
    photo_first_page: string;
    photo_back_cover: string;
    cost_book: number;
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
interface User {
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

const PaymentMessage: React.FC = () => {

    const [publication, setPublication] = useState<Publication | null>(null);

    const location = useLocation();
    const { publicationId } = location.state;

    {/* Publicacion carro */}
    useEffect(() => {
        axios.get(`http://localhost:3001/publications/onePublication/${publicationId}`)
        .then(response => {
        setPublication(response.data);
        console.log('Mostrar Publicaciones del carro'+ response.data);
        });
    }, []);

    const total = localStorage.getItem('total');
    const envio = localStorage.getItem('envio');


    return (
        <>
            <div className="fondoPay">
                <Grid  container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                <Grid className="text-center" item xs={12} sm={12} md={12} lg={4} xl={4}>

                <div style={{justifyContent:"center", textAlign:"center"}}>
                    <Box display="flex" alignItems="center" justifyContent="center" textAlign="center">
                        <img src={Logo} alt="Logo Matchbook" width="100" height="100" style={{marginBottom:"10px"}} /> 
                    </Box>
                    <Typography style={{fontFamily:"SF Pro Display regular", fontSize:"30px", marginLeft:"20px", marginRight:"20px", color:"#ffffff"}}>
                        ¡Gracias por preferirnos!
                        Somos una red lectora
                        que incentiva la búsqueda
                        de nuevos tesoros, con
                        esta compra estas
                        <Typography style={{fontFamily:"SF Pro Display medium", fontSize:"30px"}}>
                        volviendo a dar vida a
                        las historias que los
                        valientes se atrevieron
                        a escribir.
                        </Typography>
                    </Typography>
                </div>
                    <Button style={{ marginTop:"30px", backgroundColor:"#ffffff", borderRadius:"20px", textTransform: "none", height:"40px"}} href='/home2'>Volver al Inicio</Button>
                    

                </Grid>

                

                <Grid className="text-center" item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <div>
                        <Typography style={{fontSize:"60px", color:"#ffffff"}}>Ahora a esperar...</Typography>

                    </div>
                    <Card style={{marginRight:"20px", padding:"20px", height:"auto", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop:"40px"}}>
                        {publication && (
                            <>
                                <div>
                                    <Card>
                                        <Typography>
                                            Tu orden #fU20245182229765 está registrada,
                                            esperaremos comprobar el pago para validar la compra.
                                        </Typography>
                                    </Card>
                                    <br />
                                    {/* Línea horizontal */}
                                    <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                    
                                            <Typography style={{fontSize:"25px", fontFamily:"SF Pro Display Bold"}} >Resumen de los Productos</Typography>
                                            <div style={{ display: 'flex', flexDirection: 'column', marginTop:"20px" }}>
                        
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"20px", marginBottom:"10px"}}>Producto</Typography>
                                                <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"20px", marginBottom:"10px"}}>Subtotal</Typography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginBottom:"5px"}}>{publication.book.name_book}</Typography>
                                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginBottom:"5px"}}>${publication.cost_book}</Typography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"20px"}}>Envío:</Typography>
                                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px"}}>${envio}</Typography>
                                            </div>
                                        
                                </div>

                                <br />
                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                <br />
                                
                                </div>
                                <div style={{  height:"40px", display: 'flex', justifyContent: 'center', marginTop:"35px"}}>
                                    <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"20px", marginTop:"20px", marginRight:"10px"}}>Total</Typography>
                                    <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"20px", marginTop:"20px"}}>${total}</Typography>
                                </div>
                            </>
                        )}
                    </Card>
                    
                </Grid>
                </Grid>
            </div>
        </>
    );
};
export default PaymentMessage;