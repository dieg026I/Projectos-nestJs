

import {  Card , Grid ,  Typography, Select, MenuItem,  Button,  CardContent, TableContainer, Paper, TableHead, Table, TableCell, TableRow, TableBody} from '@mui/material';
import Footer from '../../components/common/Footer/footer';
import NavBarLogin from '../../components/common/NavBarLogin/navBarLogin';
import Book1 from "../../assents/img/book1.jpeg";
import Book3 from "../../assents/img/book3.jpeg";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { FiCheck } from "react-icons/fi";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

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

const Pay: React.FC = () => {

    const [publication, setPublication] = useState<Publication | null>(null);
    const location = useLocation();
    const { publicationId } = location.state;
    const navigate = useNavigate();
    const [usernameBuyer, setUsernameBuyer] = React.useState('');
    const [usernameSeller, setUsernameSeller] = React.useState('');
    
    //Animación y diseño Buttons 
    const [bgColor, setBgColor] = useState('transparent');
    const [textColor, setTextColor] = useState('#00A9E0');
    {/*-----------------------------------------------------------------------------*/}

    {/* Animación y diseño Buttons */}
    const handleMouseOver = () => {
        setBgColor('#00A9E0');
        setTextColor('#ffffff');
    };

    const handleMouseOut = () => {
        setBgColor('transparent');
        setTextColor('#00A9E0'); 
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Copiar texto */}
    const info = `
        MATCHBOOK SPA
        77.407.884-3
        Cuenta Corriente
        9 027 05 9451 3
        Banco Estado
        ventas@matchbook.cl
    `;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(info);
            console.log('Información copiada al portapapeles');
        } catch (err) {
            console.error('Error al copiar la información al portapapeles: ', err);
        }
    };
    {/*-----------------------------------------------------------------------------*/}

    {/* Publicacion carro */}
    useEffect(() => {
        axios.get(`http://localhost:3001/publications/onePublication/${publicationId}`)
        .then(response => {
        setPublication(response.data);
        console.log('Mostrar Publicaciones del carro'+ response.data);
        });
    }, []);
    {/*-----------------------------------------------------------------------------*/}

    const handleTransaction = () => {

    }
    {/*-----------------------------------------------------------------------------*/}

    {/* Guardar Transaccion */}

    const id_publication = localStorage.getItem('id_publication');
    const name_book = localStorage.getItem('name_book');
    const cost_book = Number(localStorage.getItem('cost_book'));
    const usuario_vendedor = localStorage.getItem('usuario_vendedor');
    const selectedAddress = localStorage.getItem('selectedAddress');
    const selectedExpress = localStorage.getItem('selectedExpress');

    const saveTransaction = async () => {
        // Genera el ID de la transacción
        const id_transaccion = uuidv4();
    
        // Obtiene el usuario comprador del localStorage
        const user = localStorage.getItem("user");
        if (user) {
            const users : User = JSON.parse(user);
            const userD: User = users;
            const usernameBuyer = userD.username;
            setUsernameBuyer(usernameBuyer);

            const userSeller = localStorage.getItem("user_seller");
            if (userSeller) {
                const userSellerObj : User = JSON.parse(userSeller);
                const usernameSeller = userSellerObj.username;
                setUsernameSeller(usernameSeller);
            }
    
            // Define el tipo de envío
            let id_type_send = 0;
            if (selectedAddress) {
                id_type_send = 2;
            } else if (selectedExpress) {
                id_type_send = 1;
            }
        
            // Crea el objeto de la transacción
            const transaction = {
                id_transaccion,
                id_publication: id_publication,
                name_book: name_book,
                cost_book: cost_book,
                username_buyer: usernameBuyer,
                username_seller: usernameSeller,
                id_status_send: 1,
                id_type_send,
                total: Number(localStorage.getItem('total')),
            };
        
            try {
                // Envía la transacción a tu API
                const response = await axios.post('http://localhost:3001/transactions', transaction);
                console.log('Transacción guardada:', response.data);
            } catch (error) {
                console.error('Error al guardar la transacción:', error);
            }
        }
    };


    return (
        <>
            <div>
            <NavBarLogin />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:"30px", marginTop:"30px" }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '300px', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#C04A12', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FiCheck /></div>
                        <div style={{ marginTop: '10px' }}>Detalle de Entrega</div>
                    </div>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F05D16', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2</div>
                        <div style={{ marginTop: '10px' }}>Pago</div>
                    </div>
                </div>
            </div>
            <br />

            <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                <Grid className="text-center" item xs={12} sm={12} md={12} lg={7} xl={7}>
                    <div style={{ display: 'block', gap: '20px', marginLeft: '5px', justifyContent:"center", borderRadius:"20px", alignContent:"center"}}>
                        
                        <Typography style={{textAlign:"left", marginLeft:"50px", marginBottom:"20px"}}><FaRegCreditCard style={{width:"22px", height:"22px"}} /> Metodo de Pago</Typography>
                        <Card style={{marginLeft:"50px", paddingBottom:"30px"}}>

                            <Typography style={{fontSize:"20px", fontFamily:"SF Pro Display Bold", paddingTop:"20px"}}>Transferencia Bancaria</Typography>
                            <br />
                        <div style={{marginLeft:"110px", marginRight:"110px"}}>
                            <Typography>Para completar el pedido, por favor, 
                                    transfiere el total de <strong>$26.980</strong> en la siguiente cuenta corriente con el 
                                    <strong> ASUNTO: Pedido ad20245242155104 pagado.</strong> 
                            </Typography>
                        </div>
                            
                            <Typography style={{color:"#F05D16", marginBottom:"30px", marginTop:"5px", fontWeight: "bold" }}>Una vez realizada, haz click en continuar.</Typography>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:"30px" }}>
                                <div style={{marginRight:"40px"}}>
                                    <Typography>MATCHBOOK SPA</Typography>
                                    <Typography>77.407.884-3</Typography>
                                    <Typography>Cuenta Corriente</Typography>
                                    <Typography>9 027 05 9451 3</Typography>
                                    <Typography>Banco Estado</Typography>
                                    <Typography>ventas@matchbook.cl</Typography>
                                </div>
                                <Button 
                                    onClick={handleCopy}
                                    style={{ 
                                        textTransform: "none", 
                                        backgroundColor: bgColor, 
                                        color: textColor,  
                                        borderRadius: '30px', 
                                        border: '2px solid #00A9E0', 
                                        fontWeight: "bold", 
                                        fontSize:"15px", 
                                        marginBottom: "20px" ,
                                        fontFamily: "SF Pro Display Medium",
                                    }}
                                    variant="contained" 
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut} 
                                >
                                    <FaRegCopy style={{marginRight:"10px"}} /> Copiar datos
                                </Button>
                            </div>

                            <Typography style={{color:"#F05D16",  fontWeight: "bold"}}>Una vez realizada, haz click en continuar.</Typography>

                        </Card>
                        
                        
                    </div>
                </Grid>

                <Grid className="text-center" item xs={12} sm={12} md={12} lg={5} xl={5}>

                    <Card style={{marginRight:"20px", padding:"20px", height:"auto", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        {publication && (
                            <>
                                <div>
                                    <Typography style={{fontSize:"25px", fontFamily:"SF Pro Display Bold"}} >Resumen de los Productos</Typography>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop:"20px" }}>
                                        <img 
                                            src={`http://localhost:3001/images/${publication.photo_showcase}`}
                                            alt="Imagen del libro"
                                            style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                        <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>{publication.book.name_book}</Typography>
                                            <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>${publication.cost_book}</Typography>
                                            <Typography >{publication.book.author_id_author.name_author}</Typography>
                                        </div>  
                                    </div>
                                    <br />
                                    {/* Línea horizontal */}
                                    <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                    <br />
                                    <div style={{display: "flex", justifyContent: "space-between", marginLeft:"20px", marginRight:"20px"}}>
                                        <Typography style={{ fontSize:"16px",fontFamily:"SF Pro Display Semibold"}}>SubTotal: </Typography>
                                        <Typography style={{fontSize:"16px"}}>${publication.cost_book}</Typography>
                                    </div>
                                    <br />
                                    <div style={{display: "flex", justifyContent: "space-between", marginLeft:"20px", marginRight:"20px"}}>
                                        <Typography style={{ fontSize:"16px",fontFamily:"SF Pro Display Semibold"}}>Despacho: </Typography>
                                        <Typography style={{fontSize:"16px"}}>${localStorage.getItem('envio')}</Typography>
                                    </div>
                                    <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                    <div style={{display: "flex", justifyContent: "space-between", marginLeft:"20px", marginRight:"20px"}}>
                                        <Typography style={{ fontSize:"19px",fontFamily:"SF Pro Display Semibold"}}>Total: </Typography>
                                        <Typography style={{fontSize:"19px"}}>${localStorage.getItem('total')}</Typography>
                                    </div>

                                </div>
                                <div style={{  height:"40px", display: 'flex', justifyContent: 'center', marginTop:"35px"}}>
                                    <Button onClick={() => navigate(-1)} style={{backgroundColor:"#989ca8", color:"#ffffff", textTransform: "none",fontSize:"19px", marginRight: "130px", borderRadius:"30px"}} >Cancelar</Button>
                                    <Button 
                                        onClick={async () => {await saveTransaction(); navigate('/paymentMessage', { state: { publicationId: publication.id_publication } }); }}
                                        style={{backgroundColor:"#00a9e0", textAlign:"center", color:"#ffffff", textTransform: "none", fontSize:"19px" , borderRadius:"30px"}}>Completar 
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <br />
            <Footer/>

            </div>
        </>
    );
};
export default Pay;