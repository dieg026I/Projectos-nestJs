
import {  Card , Grid ,  Typography, Select, MenuItem,  Button,  CardContent, TableContainer, Paper, TableHead, Table, TableCell, TableRow, TableBody, Box} from '@mui/material';
import Book1 from "../../assents/img/book1.jpeg";
import Book3 from "../../assents/img/book3.jpeg";
import  Logo from "../../assents/img/logoMatch.png";

const PaymentMessage: React.FC = () => {

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
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginBottom:"5px"}}>Criaturas Imposibles</Typography>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginBottom:"5px"}}>$10990</Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginBottom:"10px"}}>Sapo y Sepo, Inseparables</Typography>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginBottom:"10px"}}>$10990</Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"20px"}}>Envío:</Typography>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px"}}>0</Typography>
                            </div>
                        </div>
                        <br />
                        {/* Línea horizontal */}
                        <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                        <br />
                    </div>
                    <div style={{  height:"40px", display: 'flex', justifyContent: 'center', marginTop:"35px"}}>
                        <Typography style={{fontFamily:"SF Pro Display Bold", fontSize:"20px", marginTop:"20px", marginRight:"10px"}}>Total</Typography>
                        <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"20px", marginTop:"20px"}}>$2.500</Typography>
                    </div>
                    </Card>
                    
                </Grid>
                </Grid>
            </div>
        </>
    );
};
export default PaymentMessage;