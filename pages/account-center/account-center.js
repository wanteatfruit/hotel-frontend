import DrawerLeft from "./drawer-left";
import Box from "@mui/material/Box";
import Layout from "../../components/Layout";
import {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Account from "./account";
import Orders from "./orders";
import Marks from "./marks";
import {useRouter} from "next/router";
import {createTheme, Dialog, DialogContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {ThemeProvider} from "@emotion/react";
import * as React from "react";

export default function AccountCenter() {
    const router = useRouter()
    const [drawerItem, setDrawerItem] = useState(0);
    let _id = router.query['id'];
    const [id, setID] = useState(-1)
    const [chatDialogOpen, setChatDialogOpen] = useState(false)

    useEffect(() => {
        setID(_id)
    }, [_id])

    function accountContent() {
        return <Account id={id}/>;
    }

    function ordersContent() {
        return <Orders id={id}/>;
    }

    function marksContent() {
        return <Marks id={id}/>;
    }

    function storeContent() {
        return <h1>Store</h1>
    }

    function ChatDialog() {
        return (
            <>
                <Dialog
                    open={chatDialogOpen}
                    onClose={() => {
                        setChatDialogOpen(false)
                    }}
                    PaperProps={{sx: {position: "fixed", width: "100%", height: "100%", maxWidth: "md", backgroundColor: "#f1cec2"}}}
                >
                    <DialogContent>
                        <iframe src={"/chat-app.html"} height="95%" width="100%" frameBorder="0"></iframe>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    function drawerContent() {
        switch (drawerItem) {
            case 0:
                return accountContent();
            case 1:
                return ordersContent();
            case 2:
                return marksContent();
            case 3:
                return storeContent();
        }
    }

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
            <NavBar isLoggedIn='true' buttonsMode={1}
                    openChatDialog={() => {
                        setChatDialogOpen(true)
                    }}/>
            <main>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <DrawerLeft setDrawerItem={setDrawerItem}></DrawerLeft>
                    {ChatDialog()}
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                            {drawerContent()}
                        </Container>
                    </Box>
                </Box>
            </main>
            <Footer/>
        </ThemeProvider>

    );
}