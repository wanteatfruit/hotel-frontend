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
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            mt: appBarHeight,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}
