import DrawerLeft from "./drawer-left";
import Box from "@mui/material/Box";
import Layout from "../../components/Layout";
import {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Account from "./account";
import Orders from "./orders";
import Marks from "./marks";

export default function AccountCenter() {
    const [drawerItem, setDrawerItem] = useState(0);


    function accountContent() {
        return <Account/>;
    }

    function ordersContent() {
        return <Orders/>;
    }

    function marksContent() {
        return <Marks/>;
    }

    function storeContent() {
        return <h1>Store</h1>
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

    return (
        <Layout>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <DrawerLeft setDrawerItem={setDrawerItem}></DrawerLeft>
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
        </Layout>
    );
}