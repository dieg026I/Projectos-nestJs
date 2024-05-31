import SideMenu from "../../components/sideMenu/sideMenu";
import { Box } from '@mui/system';
import img from '../../assents/img/logoMatch.png'

const BookAdmin: React.FC = () => {
    return (
        <Box display="flex">
            <SideMenu />
            {/* Añade un padding-left al componente principal para evitar que el contenido se solape con el SideMenu */}
            <Box component="main" flexGrow={1} sx={{ paddingLeft: '224px' }}> {/* Ajusta el valor de 224px según el ancho de tu SideMenu */}
                <div>
                    <img src={img} alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dicta consequatur voluptate. Officiis, dolor? Neque sapiente, facilis reiciendis distinctio, ratione tenetur doloribus, minima eveniet atque numquam eligendi placeat. Consequuntur, eveniet.</p>
            </Box>
        </Box>
    );
};

export default BookAdmin;
