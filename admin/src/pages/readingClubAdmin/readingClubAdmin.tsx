import SideMenu from "../../components/sideMenu/sideMenu";
import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Checkbox, FormControl, Grid, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import React from "react";
import '../../App.css';

interface ReadingClub {
    meeting_id: string;
    meeting_Title: string;
    meeting_Author: string;
    meeting_Publisher: string;
    meeting_Year: number;
    meeting_Category: string;
    meeting_Description: string;
    meeting_Date: Date;
    meeting_Time: number;
    meeting_Place: string;
}

const ReadingClubAdmin: React.FC = () => {

    const [activeTab, setActiveTab] = useState('Agregar');
    const [selectedMeetingImage, setSelectedMeetingImage] = useState<File | null>(null);
    const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
    
    const [readingClub, setReadingClub] = useState<ReadingClub[]>(() => {
        // Obtener los datos guardados al cargar el componente
        const savedReadingClub = localStorage.getItem('readingClub');
        return savedReadingClub ? JSON.parse(savedReadingClub) : [];
    });

    const handleSaveReadingClub = (newReadingClub: ReadingClub) => {
        // Actualizar el estado y guardar en localStorage
        const updatedReadingClub = [...readingClub, newReadingClub];
        setReadingClub(updatedReadingClub);
        localStorage.setItem('readingClub', JSON.stringify(updatedReadingClub));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedMeetingImage(event.target.files[0]);
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('meeting_Title') as string;
        const publisher = formData.get('meeting_Publisher') as string;
        const date = new Date(formData.get('meeting_Date') as string);
    
        const newReadingClub: ReadingClub = {
            meeting_id: createMeetingId(title, publisher, date),
            meeting_Title: title,
            meeting_Author: formData.get('meeting_Author') as string,
            meeting_Publisher: publisher,
            meeting_Year: Number(formData.get('meeting_Year')),
            meeting_Category: formData.get('meeting_Category') as string,
            meeting_Description: formData.get('meeting_Description') as string,
            meeting_Date: date,
            meeting_Time: Number(formData.get('meeting_Time')),
            meeting_Place: formData.get('meeting_Place') as string,
        };
        handleSaveReadingClub(newReadingClub);
    };
    
    const createMeetingId = (title: string, publisher: string, date: Date) => {
        const publisherPrefix = publisher.substring(0, 3);
        const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        return `${title}-${publisherPrefix}-${dateString}`;
    };

      // Función para eliminar una publicación
    const deleteReadingClub = (meetingId: string) => {
        const updatedReadingClub = readingClub.filter(pub => pub.meeting_id !== meetingId);
        setReadingClub(updatedReadingClub);
        localStorage.setItem('readingClub', JSON.stringify(updatedReadingClub));
    };
        
    return (
        <form onSubmit={handleSubmit}>
        <Box sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box  flexGrow={1} sx={{ backgroundColor:"#f0f2f3", paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: '100%', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Administración de Club de Lectura</h2>
                </div>
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Card  sx={{ width: '1150px', height: '550px', padding: '35px' }}>
                        <Grid container spacing={2} justifyContent="center"  >
                            <Grid item xs={12} sm={12} md={6} lg={6} className="myCard">
                                <Card  onClick={() => setActiveTab('Agregar')} style={{ backgroundColor:"#d2efff", width:"350px"  }}>
                                    <div>
                                        <Typography sx={{ textAlign: 'center', my: 2, fontSize: '23px', fontFamily: 'SF Pro Display Bold' }}>
                                            Agregar Publicación
                                        </Typography>
                                    </div>
                                </Card>
                                <hr style={{ margin: '10px 0', opacity: 0.1 }} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} className="myCard">
                                <Card onClick={() => setActiveTab('Ver')} style={{ backgroundColor:"#d2efff", width:"350px" }}>
                                    <div>
                                        <Typography sx={{ textAlign: 'center', my: 2, fontSize: '23px', fontFamily: 'SF Pro Display Bold' }}>
                                            Ver Publicación
                                        </Typography>
                                    </div>
                                </Card>
                                <hr style={{ margin: '10px 0', opacity: 0.1 }} />
                            </Grid>
                        </Grid>


                        {activeTab === 'Agregar' ? (
                            <div style={{paddingLeft:"30px" , paddingTop:"20px"}}>
                                <Typography  sx={{ textAlign: 'left', my: 2, fontSize:"20px", fontFamily:"SF Pro Display Bold" }}>
                                    Agregar Libro
                                </Typography>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                                <div style={{ display: 'flex', alignItems: 'center', marginTop:"26px", marginBottom:"26px"  }}>
                                    <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Titulo:</label>
                                    <input type="text" id="titulo-input" name="meeting_Title" />
                                </div>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />

                                <Typography  sx={{ textAlign: 'left', my: 2, fontSize:"20px", fontFamily:"SF Pro Display Bold" }}>
                                    Reunión
                                </Typography>

                                {/* Línea horizontal */}
                                <hr style={{ margin: "10px 0", opacity: 0.1 }} />
                                
                                <div style={{ marginTop:"26px", marginBottom:"26px"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '35px' }}>Fecha:</label>
                                        <input type="date" id="fecha-input" name="meeting_Date" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '43px' }}>Hora:</label>
                                        <input type="time" id="hora-input" name="meeting_Time" />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="nombre-input" style={{ marginRight: '38px' }}>Lugar:</label>
                                        <input type="text" id="lugar-input" name="meeting_Place" />
                                    </div>
                                    <br />
                                    
                                    <div style={{ marginTop:"50px" , display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                                        <Button type="submit" style={{textTransform: "none", color:"#ffffff", backgroundColor:"#FF7F41", width:"200px", borderRadius:"15px"}}>Subir</Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center" >
                                    <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                        <input
                                            type="search"
                                            name="search"
                                            placeholder="Buscar"
                                            style={{margin:"20px", width: "500px", height:"35px", borderRadius:"20px", paddingLeft:"15px", borderColor:"#7A7A7A", color:"#7A7A7A"}}
                                            
                                        /> {/*placeholder={value}*/}
                                    </Grid>
                                    <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                                    <Button
                                        onClick={() => selectedMeetingId && deleteReadingClub(selectedMeetingId)}
                                        variant="contained"
                                        style={{ /* ... */ }}
                                    >
                                        Eliminar
                                    </Button>
                                    </Grid>
                                </Grid>
                                <TableContainer component={Paper} style={{ padding: '0', height:"450px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#d2efff' }}>
                                            <TableCell  align="center"></TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Usuario</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Usuario</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Correo</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Nombre</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Apellido</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Rut</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Teléfono</TableCell>
                                            <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Comuna</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {readingClub.map((meeting) => (
                                            <TableRow key={meeting.meeting_id}>
                                            <Checkbox
                                                checked={selectedMeetingId === meeting.meeting_id}
                                                onChange={() => setSelectedMeetingId(meeting.meeting_id)}
                                            />
                                            <TableCell align="center">{meeting.meeting_id}</TableCell>   

                                            <TableCell align="center">{meeting.meeting_Title}</TableCell>
                                            
                                            <TableCell align="center">{meeting.meeting_Author}</TableCell>

                                            <TableCell align="center">{meeting.meeting_Publisher}</TableCell>

                                            <TableCell align="center">{meeting.meeting_Year}</TableCell>

                                            <TableCell align="center">{meeting.meeting_Category}</TableCell>

                                            <TableCell align="center">{meeting.meeting_Description}</TableCell>

                                            <TableCell align="center">{new Date(meeting.meeting_Date).toLocaleDateString()}</TableCell>

                                            <TableCell align="center">{meeting.meeting_Time}</TableCell>

                                            <TableCell align="center">{meeting.meeting_Place}</TableCell>

                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </div>
                        )}
                    </Card>
                </div>
            </Box>
        </Box>
        </form>
    );
};

export default ReadingClubAdmin;
