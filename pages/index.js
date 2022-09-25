import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from 'next/link';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import {cities} from "../data";
import Ticket, {TicketCQ, TicketGZ, TicketSH, TicketSZ} from "../components/CityTicket";

const theme = createTheme();

export default function Home() {
    const link_path = "/sign-in";
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <NavBar />
        </div>
        <main>
          <Link href={"/account-center/account-center"}>
            temporary account center
          </Link>
          <br />
          <Link
            href={{
              pathname: "/sign-in",
              query: { href: "/account-center/account-center" },
            }}
          >
            temporary sign in
          </Link>
          <Link
            href={{
              pathname: "/admin",
            }}
          >
            temporary admin
          </Link>

          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                一家连锁酒店
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary">
                Discover contemporary luxury with signature oriental charm in
                our meticulously designed hotels, resorts and residences.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">订房</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack>
            </Container>
          </Box>
          <div>
            {" "}
            {/*can add animation later*/}
            <Container sx={{ py: 8 }} maxWidth="lg">
              {/*城市卡片*/}
              <Grid container spacing={8} sx={{}}>
                <Grid item>
                  <TicketSZ />
                </Grid>
                <Grid item>
                  <TicketGZ />
                </Grid>
                <Grid item>
                  <TicketCQ />
                </Grid>
                <Grid item>
                  <TicketSH />
                </Grid>
              </Grid>
              {/* <Grid container spacing={4}>
              {cities.map((item) => (
                <Grid item key={item} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{}}
                      image="https://www.michelin.com.cn/map-guide/assets/img/gz-mouseover.jpg"
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid> */}
            </Container>
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    );
}


// Home.getLayout=function getLayout(page){
//   return(
//     <Layout>
//       {page}
//     </Layout>
//   )
// }