import React from "react";
import AdminNavBar from "../../components/AdminNavbar";
import { Box,Container } from "@mui/material";
import AdminDashboard from "../../components/AdminDashboard";
import AdminCheckOrder from "../../components/AdminCheckOrder";
export default function AdminHome() {
  const [drawerItem, setDrawerItem] = React.useState(0);
  const appBarHeight = "64px";
    function showItem(){
        switch(drawerItem){
            case 0:
                return(
                    <AdminDashboard />
                )
            case 1:
                return(
                    <AdminCheckOrder />
                )
        }
    }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminNavBar setDrawerItem={setDrawerItem} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            mt:appBarHeight
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {showItem()}
          </Container>
        </Box>
      </Box>
    </>
  );
}
