import React from "react";
import AdminNavBar from "./AdminNavbar";
import { Box, Container } from "@mui/material";
export default function AdminLayout({children}) {
  const appBarHeight = "64px";

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminNavBar/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            flexGrow: 1,
            
            overflow: "auto",
            mt: appBarHeight,
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 4, }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}
