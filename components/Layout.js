import Footer from "./Footer";
import NavBar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

export default function Layout({children, hotel_list, room_list}) {
    return (
        <>
            <CssBaseline/>
            <NavBar isLoggedIn='true' hotel_list={hotel_list} room_list={room_list}/>
            <main>{children}</main>
            <Footer/>
        </>
    );
}
