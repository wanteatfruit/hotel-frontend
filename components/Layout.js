import Footer from "./Footer";
import NavBar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function Layout({children, hotel_list, room_list}) {
    const theme = createTheme({
        typography: {
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 15
        },
        palette: {
            secondary: {
                main: '#fff'
            }
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <NavBar isLoggedIn='true' hotel_list={hotel_list} room_list={room_list}/>
            <main>{children}</main>
            <Footer/>
        </ThemeProvider>
    );
}
