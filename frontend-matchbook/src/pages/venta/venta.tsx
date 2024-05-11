import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@mui/material";
import { CardBody, CardFooter } from "react-bootstrap";
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const Venta: React.FC = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div>
            <Box className="fondoVenta">
                <Card sx={{ maxWidth: 1200, borderRadius:"20px", width:"1100px"}}>
                    <CardActionArea>
                        <CardContent style={{backgroundColor:"#002E5D", alignContent:"center"}}>
                            <div style={{textAlign: "center", alignContent:"center", color:"#ffff", fontFamily: "SF Pro Display Medium", paddingTop:"10px"}} >
                                <h3>Indica tu libro ({step}/3)</h3>
                            </div>
                        </CardContent>
                        <CardContent style={{margin:"15px"}}>
                            {step === 1 && (
                                <>
                                {/* --Paso 1--*/}
                            <CardContent style={{margin:"15px"}}>
                            {step === 1 && (
                                <>
                                    <Grid container justifyContent="space-between">
                                        <Typography gutterBottom variant="h4" style={{fontFamily:"SF Pro Display Bold", color:"#002E5D"}} >
                                            Paso 1
                                        </Typography>
                                        <Typography variant="body2"  style={{fontFamily:"SF Pro Display Bold", color:"#002E5D"}}>
                                            ¡Recuerda que solo puedes vender libros originales!
                                        </Typography>
                                    </Grid>
                                    <Typography variant="body2" color="text.secondary">
                                        Detalla la información del libro
                                    </Typography>
                                    <Typography variant="body2" color="red">
                                        (*) campos obligatorios
                                    </Typography>
                                </>
                                )}
                                
                            </CardContent>
                            <CardBody style={{marginTop:"10px", marginLeft:"30px", marginBottom:"10px"}}>
                                <h6>Título</h6>
                                <FormControl style={{ width:"50%" }}>
                                    <InputLabel style={{ fontSize: "16px"}} id="demo-simple-select-standard-label" ></InputLabel>
                                    <Select 
                                        labelId="libro-label"
                                        id="libro"
                                        sx={{ width: '100%', color: "black", height:"45px", borderRadius:"10px" }}
                                        placeholder="Título de la obra"
                                    >
                                    </Select>
                                </FormControl>
                            </CardBody>

                                </>
                            )}

                            {/* --Paso 2--*/}
                            {step === 2 && (
                                <>
                                    <Typography gutterBottom variant="h4" style={{fontFamily:"SF Pro Display Bold", color:"#017095"}} >
                                        Paso 2
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Añade 3 fotografías iluminadas de tu libro
                                    </Typography>
                                    
                                    <br />
                                    <br />
                                    <div style={{backgroundColor:"#002E5D"}}>
                                        <Grid container spacing={4} justifyContent="center" style={{padding: "20px", alignContent:"center", textAlign: "center"}}>
                                            <Card style={{ margin: "10px", alignContent: "center", height:"175px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                <CardContent>
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        id="raised-button-file"
                                                        type="file"
                                                        onChange={handleImageChange}
                                                    />
                                                    <label htmlFor="raised-button-file">
                                                        {!image && (
                                                            <Button component="span">
                                                                <AddIcon />
                                                            </Button>
                                                        )}
                                                    </label>
                                                    {image ? (
                                                        <img src={image} alt="Portada de Vitrina" style={{ width: '100%', height: 'auto' }} />
                                                    ) : (
                                                        <Typography variant="body2" color="text.secondary">
                                                            Portada de Vitrina (opcional)
                                                        </Typography>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            {/* Segundo Card */}
                                            <Card style={{ margin: "10px", alignContent: "center", height:"175px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                <CardContent>
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        id="raised-button-file"
                                                        type="file"
                                                    />
                                                    <label htmlFor="raised-button-file">
                                                        <Button component="span">
                                                            <AddIcon />
                                                        </Button>
                                                    </label>
                                                    <Typography variant="body2" color="text.secondary">
                                                    Portada Real (Fotografía)
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                            {/* Segundo Card */}
                                            <Card style={{ margin: "10px", alignContent: "center", height:"175px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                <CardContent>
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        id="raised-button-file"
                                                        type="file"
                                                    />
                                                    <label htmlFor="raised-button-file">
                                                        <Button component="span">
                                                            <AddIcon />
                                                        </Button>
                                                    </label>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Portada Página (Fotografía)
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                            {/* Segundo Card */}
                                            <Card style={{ margin: "10px", alignContent: "center", height:"175px", width: "175px", borderRadius: "20px", textAlign: "center", position: 'relative'}} sx={{ maxWidth: 345, padding: "10px"}}>
                                                <CardContent>
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        id="raised-button-file"
                                                        type="file"
                                                    />
                                                    <label htmlFor="raised-button-file">
                                                        <Button component="span">
                                                            <AddIcon />
                                                        </Button>
                                                    </label>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Contraportada (Fotografía)
                                                    </Typography>
                                                </CardContent>
                                            </Card>


                                        </Grid>
                            
                                    </div>
                                </>
                            )}
                            {/* --Paso 3--*/}
                            {step === 3 && (
                                <>
                                    <Typography gutterBottom variant="h4" style={{fontFamily:"SF Pro Display Bold", color:"#017095"}} >
                                        Paso 3
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Completa la información del libro
                                    </Typography>
                                    <TextField label="Autor" variant="outlined" />
                                    <TextField label="Editorial" variant="outlined" />
                                    <TextField label="Precio de venta" variant="outlined" />
                                    {/* Aquí puedes agregar el resto del formulario */}
                                </>
                            )}
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ justifyContent: 'space-between' }}>
                        {step > 1 && (
                            <div style={{justifyContent: "flex-start"}}>
                                <Button onClick={handlePrevious} style={{ backgroundColor:"#95928f", color: "#ffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                    Anterior
                                </Button>
                            </div>
                        )}
                        {step < 3 ? (
                            <div style={{justifyContent: "flex-end"}}>
                                <Button onClick={handleNext} style={{ backgroundColor:"#95928f", color: "#ffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                    Siguiente
                                </Button>
                            </div>
                        ) : (
                            <div style={{justifyContent: "flex-end"}}>
                                <Button onClick={handleNext} style={{backgroundColor:"#95928f", color: "#ffff", borderRadius:"30px", textTransform: "none", marginRight:"30px", width:"130px", height:"50px", fontWeight:"bold"}} >
                                    Agregar otro
                                </Button>
                            </div>
                        )}
                    </CardActions>
                    <CardContent style={{backgroundColor:"#002E5D"}}>

                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}
export default Venta;
