import DrawerLeft from "./drawer-left";
import Box from "@mui/material/Box";
import Layout from "../../components/Layout";
import {useState} from 'react';
import Container from "@mui/material/Container";
import {createTheme} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Account from "./account";

export default function AccountCenter() {
    const [drawerItem, setDrawerItem] = useState(0);


    function accountContent() {
        return <Account/>;
    }

    function ordersContent() {
        return <h1>Order</h1>
    }

    function marksContent() {
        return <h1>Marks</h1>
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

    // return (
    // <>
    //     <Layout>
    //         <DrawerLeft setDrawerItem={setDrawerItem}></DrawerLeft>
    //
    //     </Layout>
    // </>
    const mdTheme = createTheme();
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