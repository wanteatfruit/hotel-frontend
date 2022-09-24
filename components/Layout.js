import Footer from "./Footer";
import NavBar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

export default function Layout({children}) {
    return (
        <>
            <CssBaseline/>
            <NavBar isLoggedIn='true'/>
            <main>{children}</main>
            <Footer/>
        </>
    );
}
