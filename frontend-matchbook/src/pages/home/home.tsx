import React from "react";
import { Button } from "@mui/material";
import NavBar from "../../components/common/navBar";
interface HomeProps {

}


export const HomePage: React.FC<HomeProps> = ({}: HomeProps) => {
    return (
    <>
        <NavBar />
        <div style={{justifyContent: "center", alignItems: "center", textAlign: "center", alignContent: "center", marginTop: "64px"}}>
            <h1>Pagina Machbook</h1>

        </div>
    </>
    );
}