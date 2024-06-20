
import React from "react";
import { Grid, Card , Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Button, CardMedia, CardContent, Box, Stack, Pagination, SelectChangeEvent, FormHelperText, FormLabel, FormGroup, Tabs, Avatar, TableContainer, Paper, TableHead, Table, TableCell, TableRow, TableBody} from '@mui/material';
import Footer from "../../components/common/Footer/footer";
import NavBarLogin from "../../components/common/NavBarLogin/navBarLogin";
import { LuTrash2 } from "react-icons/lu";
import Book1 from "../../assents/img/book1.jpeg";
import PlaceIcon from '@mui/icons-material/Place';

const Cart: React.FC = () => {
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
                                <TableRow>
                                    <TableCell colSpan={5} style={{ textAlign: 'center', padding: 0, borderColor:"transparent", verticalAlign: 'middle'}}>
                                        <div style={{ backgroundColor: "#d2efff", fontFamily: "SF Pro Display Medium", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100px', borderRadius:"20px"  }}>
                                            <p style={{ marginBottom: "3px", fontSize: "15px"  }}>Estás comprando en</p>
                                            <p style={{fontSize: "20px"}} ><strong style={{color:"#545250"}}>Librería de </strong> @Natalia</p>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{marginBottom:"20px"}}  >
                                    <TableCell > 
                                        
                                        <Card style={{ margin: "10px", display: 'flex', borderRadius: "20px", textAlign: "left", position: 'relative', padding: "22px" , width:"350px" }} >
                                            {/* Imagen del libro */}
                                            <div style={{ flex: '1 1 auto', padding: '10px' }}>
                                                <img 
                                                    src={Book1}
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
                                                    Sapo y sepo
                                                </Typography>

                                                {/* Autor del libro */}
                                                <Typography variant="body2" color="text.secondary" style={{ fontFamily: "SF Pro Display Regular"}}>
                                                    J. K. Rowline
                                                </Typography>


                                                {/* Precio del libro */}
                                                <Typography style={{ fontSize: "13px",  paddingTop: "35px" }}>
                                                    Estado: Usado
                                                </Typography>

                                                {/* Ubicación del libro */}
                                                <Typography style={{ fontSize: "13px",  paddingTop: "5px" }}>
                                                    Ciudad: Viña del mar
                                                </Typography>

                                                {/* Formato del libro*/}
                                                <Typography style={{ fontSize: "13px",  paddingTop: "5px" }}>
                                                    Formato: Tapa Dura
                                                </Typography>
                                                
                                            </CardContent>
                                        </Card>  
                                    </TableCell>
                                    <TableCell align="center" style={{ marginRight: '20px' }} >$2000</TableCell>
                                    <TableCell align="center" style={{ marginRight: '20px' }}>
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
                                    <TableCell align="center" style={{ marginRight: '20px' }}>$7000</TableCell>
                                    <TableCell align="center" style={{ marginRight: '20px' }}><LuTrash2 /></TableCell>
                                </TableRow>
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