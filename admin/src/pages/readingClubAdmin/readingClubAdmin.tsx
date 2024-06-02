import SideMenu from "../../components/sideMenu/sideMenu";
import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, FormControl, Grid, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Divider from '@mui/material/Divider';

const ReadingClubAdmin: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    return (
        <Box sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box  flexGrow={1} sx={{ backgroundColor:"#f0f2f3", paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: '100%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Club de Lectura</h2>
                </div>
                <br />
                <div style={{  display: 'flex', justifyContent: 'center', width: '100%'  }}>
                    
                    <Card sx={{  width:"1150px", height:"550px", padding:"35px" }}>
                        <Grid  container spacing={2} justifyContent="center" alignItems="flex-start" >
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography  sx={{ textAlign: 'center', my: 2, fontSize:"23px", fontFamily:"SF Pro Display Bold" }}>
                                    Libro Actual
                                </Typography>
                                
                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                                <div style={{paddingTop:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '23px' }}>Imagen:</label>
                                        <input type="file" id="imagen-input" name="imagen" onChange={handleImageChange} style={{ display: 'block' }} />
                                        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Titulo:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Autor:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '18px' }}>Editorial:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '48px' }}>Año:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '9px' }}>Categoría:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex',  flexDirection: 'column' }}>
                                        <Typography component="label" htmlFor="descripcion-input" sx={{ my: 2 }}>
                                            Descripción:
                                        </Typography>
                                        <textarea id="descripcion-input" name="descripcion" rows={4} style={{ width: '100%' }} />
                                    </div>
                                </div>
                            
                            </Grid>
                            <Grid className="text-center" item xs={12} sm={12} md={6} lg={6}>
                                <Typography  sx={{ textAlign: 'center', my: 2, fontSize:"23px", fontFamily:"SF Pro Display Bold" }}>
                                    Reunion
                                </Typography>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                
                                <div style={{paddingLeft:"50px" , paddingTop:"20px"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Fecha:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '43px' }}>Hora:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '38px' }}>Lugar:</label>
                                        <input type="text" id="nombre-input" name="nombre" />
                                    </div>
                                    <br />
                                    
                                    <div style={{ marginTop:"50px" , display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                                        <Button style={{textTransform: "none", color:"#ffffff", backgroundColor:"#FF7F41", width:"200px", borderRadius:"15px"}}>Subir</Button>
                                    </div>
                                    
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </Box>
        </Box>
    );
};

export default ReadingClubAdmin;
