
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Box, Grid, Typography } from "@mui/material"; 
import '../../App.css';
import  Logo from "../../assents/img/logoMatch.png"

type FieldType = {
username?: string;
password?: string;
remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
console.log('Failed:', errorInfo);
};

const LoginAdmin: React.FC = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div className="fondo" style={{
                    height: "50%",
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center', // Esto centra verticalmente
                    justifyContent: 'center' // Esto centra horizontalmente
                }}>
                    <Box  alignItems="center" justifyContent="center" textAlign="center">
                        <img src={Logo} alt="Logo Matchbook" width="80" height="80"  /> 
                        <Typography  style={{ fontWeight: 550, color:  "white", fontSize: "55px", marginLeft: "10px"}}>
                            Matchbook
                        </Typography>
                    </Box>
                </div>
                <div style={{backgroundColor:"#002E5D", height:"2%"}}></div>

                <div style={{
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    flex: 1 // Esto hace que el segundo div tome el espacio restante
                }}>
                    <Grid  container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  alignItems= "center " >
                        <Grid className="text-center" item xs={12} sm={6} md={6} lg={6}>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: '100%', paddingLeft: '90px', fontFamily: 'SF Pro Display Bold', color: '#5647363' }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                layout="vertical"
                            >
                                <Form.Item<FieldType>
                                label="Usuario"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                style={{fontFamily:"SF Pro Display Bold"}}
                                >
                                <Input />
                                </Form.Item>
                                <br />
                                <br />

                                <Form.Item<FieldType>
                                label="Contraseña"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                <Input.Password />
                                </Form.Item>

                                

                            </Form>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Button className="boton-personalizado" htmlType="submit" style={{ maxWidth: '200px', width: '100%', height: '50px', fontSize:"30px", color:"#ffffff", backgroundColor:"#FF7F41" }}>
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        
        </> 
    );
};
export default LoginAdmin;