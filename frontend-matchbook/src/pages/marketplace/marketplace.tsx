import React, { useState, ChangeEvent } from "react";
import { Grid, Card , Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, Checkbox, Slider} from '@mui/material'; // Asegúrate de tener MUI instalado
import banner from "../../assents/img/banner-marketplace.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Marketplace() {



    {/* Accordion */}
    const [openRegion, setOpenRegion] = useState(true);
    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(true);


    return (
        <div>
            <img src={banner} alt="Imagen descriptiva" style={{ width: '900px', height: '100px', justifyContent:"center" }} />
            <div style={{ textAlign: 'right', margin: '10px 0', marginRight:"20px" }}>
                <button style={{borderRadius:"30px" , width:"150px", height:"45px"}}>Quiero vender</button>
            </div>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                    <h2 style={{marginLeft:"190px"}}>Novedades</h2>
                </Grid>
                <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                <div style={{ display: "flex", justifyContent: "right", alignItems: "center" , marginRight:"20px"}}>
                    <span style={{ paddingRight:"10px"}}>Ordenar Por </span>
                    <select style={{ borderRadius:"10px" , width:"160px", height:"30px"}}>
                        {/* Tus opciones aquí */}
                        <option value="status_name">Nuevo</option> {/* Aqui va el estado el libro */}
                        {/* ... */}
                    </select>
                </div>
                </Grid>
            </Grid>

            {/* Aquí es donde usamos el grid de MUI para dividir en dos partes */}
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid className="text-center" item xs={12} sm={6} md={6} lg={3}>
                    <Accordion style={{ margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius:"20px",minHeight:"65px",  alignContent:"center"}} expanded={openRegion} onChange={() => setOpenRegion(!openRegion)} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{fontFamily:"SF Pro Text Bold"}}>Región</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{overflow: 'auto'}}>
                            <FormControl>
                                <Select>
                                    <MenuItem value="Selecciona una comuna" disabled><em>Selecciona una región</em></MenuItem>
                                    {/* Aquí puedes agregar las regiones */}
                                </Select>
                                <Typography style={{fontFamily:"SF Pro Text Bold", justifyContent:"left", justifyItems:"left" ,paddingTop:"10px", paddingBottom:"10px"}}>Comuna</Typography>
                                <Select>
                                    <MenuItem value="Selecciona una comuna" disabled><em>Selecciona una comuna</em></MenuItem>
                                    {/* Aquí puedes agregar las comunas */}
                                </Select>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>

                    
                    <Accordion style={{ margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)',  borderRadius:"20px", minHeight:"65px", alignContent:"center"}}expanded={openCategory} onChange={() => setOpenCategory(!openCategory)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{fontFamily:"SF Pro Text Bold"}}>Categoría</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{overflow: 'auto'}}>
                            <FormControl>
                                {/* Aquí puedes agregar los checkbox */}
                                <FormControlLabel control={<Checkbox />} label="Opción 1" />
                                <FormControlLabel control={<Checkbox />} label="Opción 2" />
                                <FormControlLabel control={<Checkbox />} label="Opción 3" />
                                <FormControlLabel control={<Checkbox />} label="Opción 4" />
                                <FormControlLabel control={<Checkbox />} label="Opción 5" />
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion style={{margin:"10px", boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.36)', borderRadius:"20px", minHeight:"65px", alignContent:"center"}} expanded={openPrice} onChange={() => setOpenPrice(!openPrice)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{fontFamily:"SF Pro Text Bold"}}>Precio</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{overflow: 'auto'}}>
                            <Slider
                                defaultValue={[20, 40]}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                            />
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                {/* Segunda parte con espacio en blanco */}
                <Grid className="text-center" item xs={12} sm={6} md={6} lg={9}>
                    <Card style={{backgroundColor:"#000000", height:"587px", marginRight:"20px", marginBottom:"20px"}}> hola </Card>
                </Grid>
            </Grid>

        </div >
    );
}
