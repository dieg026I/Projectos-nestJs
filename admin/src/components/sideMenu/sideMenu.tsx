import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, colors, useTheme, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiBookMarkedLine } from "react-icons/ri";
import { RiFileUserLine } from "react-icons/ri";
import { RiBookOpenLine } from "react-icons/ri";
import { useLocation } from 'react-router';


export const SideMenu: React.FC<{}> = () => {

    const theme = useTheme();
    const location = useLocation();
    
    const isSelected = (path: string) => location.pathname === path;
    
    return (
        <>
            <Drawer variant='permanent'>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" style={{ backgroundColor:"#2C2C2C", color:"#ffffff"}}>

                    <Box width="100%" height={theme.spacing(20)} display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{marginTop:"15px"}}>
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://yt3.ggpht.com/grfYgQadT8iNg9WPb-jkrKB-9224y_DBDXAOtV4Yt7cyQmtR47J_453uveQOTDsp_dRSH851TMM=s108-c-k-c0x00ffffff-no-rj"
                        />
                        <p style={{ color: '#ffffff', marginTop: theme.spacing(1) }}>Hola</p>
                        
                    </Box>
                    
                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                        {/* Transacciones */}

                        <br />
                        <div className="listItemButtonContainer">
                            <ListItemButton
                                href='/transactions'
                                selected={isSelected('/transactions')}
                                className={isSelected('/transactions') ? 'listItemButtonSelected' : ''}
                                style={{ backgroundColor: isSelected('/transactions') ? '#00A9E0' : 'inherit', position: 'relative' }}
                            >
                                <ListItemIcon style={{ width: '2.5rem', fontSize: '2.2rem', color: "#ffffff" }}>
                                    <RiMoneyDollarCircleLine />
                                </ListItemIcon>
                                <ListItemText primary="Transacciones" />
                            </ListItemButton>
                        </div>
                        <br />

                        {/* Perfil */}
                        <div className="listItemButtonContainer">
                            <ListItemButton
                            href='/profileAdmin'
                            selected={isSelected('/profileAdmin')}
                            className={isSelected('/profileAdmin') ? 'listItemButtonSelected' : ''}
                            style={{ backgroundColor: isSelected('/profileAdmin') ? '#00A9E0' : 'inherit' }}
                            >
                                <ListItemIcon style={{ width: '2.5rem', fontSize: '2rem', color: "#ffffff" }}>
                                    <RiAccountCircleLine />
                                </ListItemIcon>
                                <ListItemText primary="Perfil" />
                            </ListItemButton>
                        </div>

                        <br />
                        {/* Libros */}
                        <div className="listItemButtonContainer">
                            <ListItemButton
                            href='/bookAdmin'
                            selected={isSelected('/bookAdmin')}
                            className={isSelected('/bookAdmin') ? 'listItemButtonSelected' : ''}
                            style={{ backgroundColor: isSelected('/bookAdmin') ? '#00A9E0' : 'inherit' }}
                            >
                                <ListItemIcon style={{ width: '2.5rem', fontSize: '2rem', color: "#ffffff" }}>
                                    <RiBookMarkedLine />
                                </ListItemIcon>
                                <ListItemText primary="Libros" />
                            </ListItemButton>
                        </div>

                        <br />
                        {/* Usuarios */}
                        <div className="listItemButtonContainer">
                            <ListItemButton
                            href='/userAdmin'
                            selected={isSelected('/userAdmin')}
                            className={isSelected('/userAdmin') ? 'listItemButtonSelected' : ''}
                            style={{ backgroundColor: isSelected('/userAdmin') ? '#00A9E0' : 'inherit' }}
                            >
                                <ListItemIcon style={{ width: '2.5rem', fontSize: '2rem', color: "#ffffff" }}>
                                    <RiFileUserLine />
                                </ListItemIcon>
                                <ListItemText primary="Usuarios" />
                            </ListItemButton>
                        </div>

                        <br />
                        {/* Club de lectura */}
                        <div className="listItemButtonContainer">
                            <ListItemButton
                            href='/readingClubAdmin'
                            selected={isSelected('/readingClubAdmin')}
                            className={isSelected('/readingClubAdmin') ? 'listItemButtonSelected' : ''}
                            style={{ backgroundColor: isSelected('/readingClubAdmin') ? '#00A9E0' : 'inherit' }}
                            >
                                <ListItemIcon style={{ width: '2.5rem', fontSize: '2rem', color: "#ffffff" }}>
                                    <RiBookOpenLine />
                                </ListItemIcon>
                                <ListItemText primary="Club de lectura" />
                            </ListItemButton>
                        </div>

                        <br />                        
                        <ListItemButton style={{ justifyContent:"center"}}>
                            <Button style={{textTransform: "none", color:"#ffffff", backgroundColor:"#FF7F41", width:"300px"}}>Cerrar Sesión</Button>
                        </ListItemButton>

                        </List>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};
export default SideMenu; 