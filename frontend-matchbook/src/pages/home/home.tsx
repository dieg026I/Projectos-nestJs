import React from "react";
import { Button, Container } from "@mui/material";
interface HomeProps {

}

export const HomePage: React.FC<HomeProps> = ({}: HomeProps) => {

    return <>
    <div style={{justifyContent: "center", alignItems: "center", textAlign: "center", alignContent: "center"}}>
        <h1>Home Page</h1>
        <Button variant="contained" href="/login">Login</Button>
        <br />
        <br />

        <Button variant="contained" href="/register">Registro</Button>
    </div>

    </>
}