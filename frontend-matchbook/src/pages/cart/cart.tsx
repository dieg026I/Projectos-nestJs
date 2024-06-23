
import React, { useEffect } from "react";
import {  Card ,  Typography, Select, MenuItem,  Button,  CardContent, TableContainer, Paper, TableHead, Table, TableCell, TableRow, TableBody} from '@mui/material';
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import { LuTrash2 } from "react-icons/lu";
import axios from "axios";

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
    username: string,
    publication: Publication[]
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
interface ShoppingCart {
    id_shopping_cart: number,
    user: Users,
    publication: Publication[],
}

const Cart: React.FC = () => {
    
    {/*-----------------------------------------------------------------------------*/}
    {/* Mostrar Publicacion en el carro*/}
    const [publicationsCart, setPublicationsCart] = React.useState<GroupedPublications>({});

    type GroupedPublications = {
        [seller: string]: Publication[];
    };
    

    useEffect(() => {
        const fetchPublicationsCart = async () => {
        const userString = localStorage.getItem("user");
            if (userString !== null){
                const user : Users = JSON.parse(userString);

                console.log("rut: "+ user.rut_user)
            
                try {
                    const response = await axios.get(`http://localhost:3001/shopping-cart/userCart/${user.rut_user}`);
                    const shoppingCartGet: ShoppingCart = response.data;
                    const publicationGet = shoppingCartGet.publication;


                    // Agrupa las publicaciones por vendedor
                    const groupedPublications: GroupedPublications = publicationGet.reduce((acc: GroupedPublications, publication) => {
                        const { username } = publication.users;
                        if (!acc[username]) {
                        acc[username] = [];
                        }
                        acc[username].push(publication);
                        return acc;
                    }, {});


                    setPublicationsCart(groupedPublications);
                    console.log(JSON.stringify(response.data, null, 2))
                    
                } catch (error) {
                console.error('Error fetching publications cart:', error);
                }  
            }
    };
    fetchPublicationsCart();
    }, []);
    

    
    return (
        <>
            <NavBarLogin />
            <br />
            <div>
                <br />
                <Card style={{backgroundColor:"#f05d16", height:"60px", alignContent:"center"}}>
                    <p style={{color:"#ffffff", paddingLeft:"20px", paddingTop:"10px", textAlign:"center", fontSize:"20px", fontFamily:"SF Pro Display Bold" }}>ATENCIÓN: Los pagos se realizan por separado si estás comprando a distintos bookers</p>
                </Card>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                    <TableContainer component={Paper} style={{width:"85%"}}>
                        <Table sx={{ minWidth: 650,  }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{paddingRight:"300px"}}>Detalle</TableCell>
                                    <TableCell align="center">Precio</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center">Subtotal</TableCell>
                                    <TableCell align="center">Quitar</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                            {Object.entries(publicationsCart).map(([seller, publications]) => {

                                    let subtotal = 0;
                                    publications.forEach(publication => {
                                    subtotal += publication.cost_book;
                                    });

                                return (
                                    <React.Fragment key={seller}>
                                        <TableRow >
                                            <TableCell colSpan={5} style={{ textAlign: 'center', padding: 0, borderColor:"transparent", verticalAlign: 'middle'}}>
                                                <div style={{ backgroundColor: "#d2efff", fontFamily: "SF Pro Display Medium", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100px', borderRadius:"20px"  }}>
                                                    <p style={{ marginBottom: "3px", fontSize: "15px"  }}>Estás comprando en</p>
                                                    <p style={{fontSize: "20px"}} ><strong style={{color:"#545250"}}>Librería de </strong> @{seller}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {publications.map((publication) => (
                                            <>
                                                <TableRow style={{marginBottom:"20px"}}>
                                                    <TableCell style={{border: 'none'}}> 
                                                        <Card style={{ margin: "10px", display: 'flex', borderRadius: "20px", textAlign: "left", position: 'relative', padding: "22px" , width:"350px" }} >
                                                            {/* Imagen del libro */}
                                                            <div style={{ flex: '1 1 auto', padding: '10px' }}>
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
                                                            </div>

                                                            {/* Contenido del libro */}
                                                            <CardContent style={{ flex: '2 1 auto', padding: "5px", paddingTop: "15px" }}>
                                                                {/* Título del libro */}
                                                                <Typography 
                                                                    gutterBottom 
                                                                    variant="h5" 
                                                                    component="div" 
                                                                    style={{
                                                                        fontSize: "17px",  
                                                                        fontFamily: "SF Pro Display Medium",
                                                                        overflow: 'hidden' 
                                                                    }}
                                                                >
                                                                    {publication.book.name_book}
                                                                </Typography>

                                                                {/* Autor del libro */}
                                                                <Typography variant="body2" color="text.secondary" style={{ fontFamily: "SF Pro Display Regular"}}>
                                                                    Autor: {publication.book.author_id_author.name_author}
                                                                </Typography>


                                                                {/* Estado del libro */}
                                                                <Typography style={{ fontSize: "13px",  paddingTop: "35px" }}>
                                                                    Estado: {publication.book.status_book}
                                                                </Typography>

                                                                {/* Ubicación del libro */}
                                                                <Typography style={{ fontSize: "13px",  paddingTop: "5px" }}>
                                                                    Ciudad: {publication.users.cities.name}
                                                                </Typography>

                                                                {/* Formato del libro*/}
                                                                <Typography style={{ fontSize: "13px",  paddingTop: "5px" }}>
                                                                    Formato: {publication.book.format_book}
                                                                </Typography>
                                                                
                                                            </CardContent>
                                                        </Card>  
                                                        
                                                    </TableCell>
                                                    
                                                    <TableCell align="center" style={{ marginRight: '20px', border: 'none' }} >${publication.cost_book}</TableCell>
                                                    <TableCell align="center" style={{ marginRight: '20px', border: 'none' }}>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        style={{width:"90px", borderRadius:"30px", height:"40px", textAlign:"center"}}
                                                        > 
                                                        <MenuItem value="">
                                                            <em>Nothing</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                    </Select>
                                                    </TableCell>
                                                    <TableCell align="center" style={{ marginRight: '20px', border: 'none' }}>$7000</TableCell>
                                                    <TableCell align="center" style={{ marginRight: '20px', border: 'none' }}><LuTrash2 /></TableCell>
                                                    
                                                    
                                                </TableRow>
                                                </>
                                        ))}
                                                <TableRow >
                                                    <TableCell colSpan={5} >
                                                        <Card style={{padding:"10px", margin:"15px", width:"150px", textAlign:"center"}}>
                                                            <Typography>SubTotal</Typography>
                                                            <Typography style={{fontFamily:"SF Pro Display Bold"}}>${subtotal}</Typography>
                                                            <Button style={{textTransform: "none", backgroundColor:"#00A9E0", color:"#ffffff"}}>Pagar</Button>
                                                        </Card>
                                                    </TableCell>
                                                </TableRow>
                                            
                                    </React.Fragment>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <div>

            </div>
            <br />
            <Footer/>
            
        </>
    );
};
export default Cart;