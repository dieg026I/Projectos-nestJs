

import {  Card , Grid ,  Typography, Select, MenuItem,  Button,  CardContent, TableContainer, Paper, TableHead, Table, TableCell, TableRow, TableBody} from '@mui/material';
import Footer from '../../components/common/Footer/footer';
import NavBarLogin from '../../components/common/NavBarLogin/navBarLogin';
import Book1 from "../../assents/img/book1.jpeg";
import Book3 from "../../assents/img/book3.jpeg";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { useState } from 'react';
import { FiCheck } from "react-icons/fi";

const Pay: React.FC = () => {


    //Animación y diseño Buttons 
    const [bgColor, setBgColor] = useState('transparent');
    const [textColor, setTextColor] = useState('#00A9E0');

    {/* Animación y diseño Buttons */}
    const handleMouseOver = () => {
        setBgColor('#00A9E0');
        setTextColor('#ffffff');
    };

    const handleMouseOut = () => {
        setBgColor('transparent');
        setTextColor('#00A9E0'); 
    };

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
                        <div>
                            <Typography style={{fontSize:"25px", fontFamily:"SF Pro Display Bold"}} >Resumen de los Productos</Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop:"20px" }}>
                                <img 
                                    src={Book1}
                                    alt="Imagen del libro"
                                    style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>Criaturas Imposibles</Typography>
                                    <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>$10990</Typography>
                                    <Typography style={{}}>Arnold Lobel</Typography>
                                </div>  
                            </div>
                            <br />
                            {/* Línea horizontal */}
                            <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                            <br />
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <img 
                                    src={Book3}
                                    alt="Imagen del libro"
                                    style={{ height: '100px', width: 'auto', maxWidth: '100%', float: 'left' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '18%', textAlign: 'left', marginBottom:"10px" }}>
                                <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>Sapo y Sepo, Inseparables</Typography>
                                    <Typography style={{fontFamily:"SF Pro Display Semibold", fontSize:"17px", marginTop:"20px"}}>$10990</Typography>
                                    <Typography style={{}}>Katherine Rundell</Typography>
                                </div>  
                            </div>
                        </div>
                        <div style={{  height:"40px", display: 'flex', justifyContent: 'center', marginTop:"35px"}}>
                            <Button style={{backgroundColor:"#989ca8", color:"#ffffff", textTransform: "none",fontSize:"19px", marginRight: "130px", borderRadius:"30px"}} href="/deliveryMethods">Cancelar</Button>
                            <Button href='/paymentMessage' style={{backgroundColor:"#00a9e0", textAlign:"center", color:"#ffffff", textTransform: "none", fontSize:"19px" , borderRadius:"30px"}}>Continuar</Button>
                        </div>
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