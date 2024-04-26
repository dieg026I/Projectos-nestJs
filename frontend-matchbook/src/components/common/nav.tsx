
import React from 'react';
import styles from './Nav.module.css';
import * as data from './links.json';



const Nav: React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
                <span>Logo</span>
            </div>
	<div>
        <a href={/login}> login</a>
	</div>

	<div>
        <a href={/register}> login</a>
	</div>

    </nav>
    )
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