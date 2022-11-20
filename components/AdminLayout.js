import React from "react";
import AdminNavBar from "./AdminNavbar";
import { Box, Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
export default function AdminLayout({children}) {
  const appBarHeight = "64px";
  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans SC', serif",
      h2: {
        fontWeight: 500
      }
    },
  })
  return (
    <ThemeProvider theme={theme}>
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
          <Container maxWidth="xl" sx={{ mt: 4,pb:4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
