import SideMenu from "../../components/sideMenu/sideMenu";

import img from '../../assents/img/logoMatch.png'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import axios from "axios";

interface Transfer {
    transaction_id: string;
    publication: Publication;
    name_book: string;
    username_buyer: string;
    username_seller: string;
    statusSend: StatusSend;
    shipment_type: Shipment_type;
    total: number;
    created_at: Date;
}

interface User {
    name_user: string,
    lastname_user: string,
    rut_user: number,
    dv_user: string,
    phone_user: number,
    email_user: string,
    password_users: string,
    cities: string,
    username: string,
    publication: Publication[]
}

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
    author_id_author: string;
    publisher_name: string; 
    publisher_id_publisher: string;
    categories: string;
    year_book: number;
    status_book: string;
    stock_book: number;
    description_book: string;
}
interface StatusSend {
    id_status: string;
    name_status: string;
}

interface Shipment_type {
    id_type: string;
    name_type: string;
}



const Transactions: React.FC = () => {

    const [transfer, setTransfer] = React.useState<Transfer[]>([]);
    const [statusOptions, setStatusOptions] = React.useState<StatusSend[]>([]);


    {/* Mostrar Publicacion */}
    useEffect(() => {
        const fetchPublications = async () => {
        try {
            const response = await axios.get('http://localhost:3001/transfers');
            console.log('Respuesta de la API:', response.data);
            setTransfer(response.data);
        } catch (error) {
        console.error('Error fetching transfer:', error);
        }
    };

    fetchPublications();
    }, []);

    useEffect(() => {
        const fetchStatusOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/status_send'); 
                setStatusOptions(response.data);
            } catch (error) {
                console.error('Error fetching status options:', error);
            }
        };
    
        fetchStatusOptions();
    }, []);


    const handleSave = async (id: string) => {
        const newStatus = editingStatus[id];
        if (newStatus) {
            try {
                // Aquí puedes hacer la llamada a la API para guardar el nuevo estado
                await axios.put(`http://localhost:3001/transfers/${id}`, {
                    id_status_send: newStatus
                });
                console.log('Estado guardado:', newStatus);
                setEditingId(null); 
                window.location.reload();
            } catch (error) {
                console.error('Error al guardar el estado:', error);
            }
        }
    };

    const [editingStatus, setEditingStatus] = React.useState<{ [key: string]: string }>({});
    const [editingId, setEditingId] = React.useState<string | null>(null);
    


    return (
        <Box display="flex" sx={{backgroundColor:"#f0f2f3"}}>
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                
                <div style={{ height: '100px', width: 'auto', backgroundColor:"#ffffff", color:"#00A9E0", paddingLeft:"28px", alignContent:"center", fontFamily:"SF Pro Display Bold", fontSize:"20px" }}>
                    <h2>Gestión de compra y venta</h2>
                </div>
                <br />
                <div style={{ borderRadius:"20px" ,justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor:"#ffffff", margin:"20px", marginLeft:"30px", marginRight:"30px"  }}>
                    
                    <Card style={{borderRadius:"20px"}} >
                        <input
                            type="search"
                            name="search"
                            placeholder="Buscar"
                            style={{margin:"20px", width: "410px", height:"35px", borderRadius:"20px", paddingLeft:"15px", borderColor:"#7A7A7A", color:"#7A7A7A"}}
                            
                        /> {/*placeholder={value}*/}
                        <TableContainer component={Paper} style={{ padding: '0', height:"600px" }}>
                        <div style={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#d2efff' }}>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Compra</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Id Publicación</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Nombre Libro</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Precio Libro</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Usuario Comprador</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Usuario Vendedor</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Estado envío</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Tipo envío</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Fecha Trans</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Estado Compra</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Total</TableCell>
                                    <TableCell style={{fontFamily:"SF Pro Display Semibold"}} align="center">Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {transfer.reverse().map((transaccion) => (
                                <TableRow key={transaccion.transaction_id}>
                                    <TableCell align="center">{transaccion.transaction_id}</TableCell>
                                    <TableCell align="center">{transaccion.publication.id_publication}</TableCell>
                                    <TableCell align="center">{transaccion.name_book}</TableCell>
                                    <TableCell align="center">{transaccion.publication.cost_book}</TableCell>
                                    <TableCell align="center">{transaccion.username_buyer}</TableCell>
                                    <TableCell align="center">{transaccion.publication.users?.username}</TableCell>
                                    <TableCell align="center">
                                        {editingId === transaccion.transaction_id ? (
                                            <select
                                                value={editingStatus[transaccion.transaction_id] || 'default'}
                                                onChange={(event) =>
                                                    setEditingStatus({
                                                        ...editingStatus,
                                                        [transaccion.transaction_id]: event.target.value,
                                                    })
                                                }
                                            >
                                                <option disabled value="default">Elige un estado</option>
                                                {statusOptions.map((option) => (
                                                    <option key={option.id_status} value={option.id_status}>
                                                        {option.name_status}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            transaccion.statusSend ? transaccion.statusSend.name_status : 'N/A'
                                        )}
                                    </TableCell>
                                    <TableCell align="center">{transaccion.shipment_type ? transaccion.shipment_type.name_type : 'N/A'}</TableCell>
                                    <TableCell align="center">{transaccion.created_at.toLocaleString()}</TableCell>
                                    <TableCell align="center">{transaccion.statusSend ? transaccion.statusSend.name_status : 'N/A'}</TableCell>
                                    <TableCell align="center">{transaccion.total}</TableCell>
                                    <TableCell align="center">
                                        {editingId === transaccion.transaction_id ? (
                                            <Button onClick={() => handleSave(transaccion.transaction_id)}>Guardar</Button>
                                        ) : (
                                            <Button onClick={() => setEditingId(transaccion.transaction_id)}>Editar</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </div>
                        </TableContainer>
                    </Card>
                </div>
                
            </Box>
        </Box>
    );
};

export default Transactions;
