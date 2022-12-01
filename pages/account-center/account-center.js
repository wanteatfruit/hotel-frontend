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
import {ButtonGroup, createTheme, Dialog, DialogContent, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import NavBar from "../../components/Navbar";
import {ThemeProvider} from "@emotion/react";
import * as React from "react";

export default function AccountCenter() {
    const [drawerItem, setDrawerItem] = useState(0);
    const [id, setID] = useState(0)
    const [chatDialogOpen, setChatDialogOpen] = useState(false)
    let refresh = 0

    useEffect(() => {
        setID(localStorage.getItem("userID"))
    }, [])

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
                    PaperProps={{
                        sx: {
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            maxWidth: "md",
                            backgroundColor: "#f1cec2"
                        }
                    }}
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
        palette: {
            primary: {
                main: '#2E3B55'
            },
            secondary: {
                main: '#fff'
            }
        },
        typography: {
            fontFamily: "'Noto Serif SC', serif",

        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {refresh += 1}
            <NavBar isLoggedIn='true' buttonsMode={1}
                    openChatDialog={() => {
                        setChatDialogOpen(true)
                    }}/>
            <main>

                <Box sx={{display: {md:'flex',xs:'none'}, marginTop:'40px', borderColor: "red", borderWidth: "5px", backgroundColor: "white"}}>
                <DrawerLeft setDrawerItem={setDrawerItem}></DrawerLeft>
                    {ChatDialog()}
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: "white",
                            flexGrow: 1,
                            minHeight:'100vh',
                            pb:6,
                            zIndex:100
                            // overflow: 'hidden',
                        }}
                    >
                       
                            {drawerContent()}
                        
                    </Box>
                </Box>
                <Box sx={{display:{xs:'flex', md:'none'}, flexDirection:'column', marginTop:'62px', minHeight:'100vh',
                            pb:6}}>
                    <ButtonGroup sx={{px:2,pt:3, height:'10vh', fontSize:'2rem'}} fullWidth direction='row'>
                        <Button onClick={()=>setDrawerItem(0)}>账单</Button>
                        <Button onClick={()=>setDrawerItem(1)}>订单</Button>
                        <Button onClick={()=>setDrawerItem(2)}>收藏</Button>
                    </ButtonGroup>
                    {drawerContent()}
                </Box>
            </main>
        </ThemeProvider>

    );
}