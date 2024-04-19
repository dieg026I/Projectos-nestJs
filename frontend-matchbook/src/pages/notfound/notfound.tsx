import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa Link si estás utilizando React Router

const NotFoundPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Lo sentimos, la página que estás buscando no se encuentra.
      </Typography>
      <Button variant="contained" component={Link} to="/home" color="primary">
        Volver a la página de inicio
      </Button>
    </Box>
  );
};

export default NotFoundPage;
