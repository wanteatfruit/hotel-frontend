import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../styles/Main.module.css";
import Container from "@mui/material/Container";
import Link from "next/link";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import {cities} from "../data";
import Ticket, {
    TicketCQ,
    TicketGZ,
    TicketSH,
    TicketSZ,
} from "../components/CityTicket";
import SendIcon from "@mui/icons-material/Send";
import {motion} from "framer-motion";
import Image from "next/future/image";
import {positions} from "@mui/system";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {isLeaf} from "@mui/x-data-grid";

const theme = createTheme();

// 获取酒店和房间列表，传给navbar

export async function getStaticProps() {

    const hotel_response = await axios.get('http://120.25.216.186:8888/hotel/getAll');
    const hotel_list = hotel_response.data
    const room_respose = await axios.get('http://120.25.216.186:8888/roomtype/getAll');
    const room_list = room_respose.data
    return {
        props: {
            hotel_list, room_list
        },
        revalidate: 10
    }


}


export default function Home({hotel_list, room_list}) {
    const router = useRouter()
    let _sessionKey = router.query['sessionKey'];
    let _username = router.query['username'];
    let _isLoggedIn = router.query['isLoggedIn'];
    let _id = router.query['id'];
    // don't use the three above, the three below instead
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [sessionKey, setSessionKey] = useState('')
    const [id, setID] = useState(-1)
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false)
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

    function LogoutDialog() {
        return (
            <>
                <Dialog
                    open={isLogoutDialogOpen}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setIsLogoutDialogOpen(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    {/*<DialogTitle>{"Use Google's location service?"}</DialogTitle>*/}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            You are logging out of your account...
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsLogoutDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            setIsLoggedIn(false)
                            setUsername("")
                            setSessionKey("")
                            setID(-1)
                            setIsLogoutDialogOpen(false);
                        }}>Log out</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    useEffect(() => {
        setIsLoggedIn(_isLoggedIn)
        setUsername(_username)
        setSessionKey(_sessionKey)
        setID(_id)
    }, [_isLoggedIn, _username, _sessionKey, _id])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <NavBar id={id} hotel_list={hotel_list} room_list={room_list} isLoggedIn={isLoggedIn}
                        openLoggedOutDialog={() => setIsLogoutDialogOpen(true)} buttonsMode={0} openChatDialog={() => {
                    setChatDialogOpen(true)
                }}/>
            </div>
            <div>
                {ChatDialog()}
                {LogoutDialog()}
            </div>
            <main>
                <Link href={"/hotels/comment-area"}>
                    temporary comment area
                </Link>
                <Link href={"/account-center/account-center"}>
                    temporary account center
                </Link>
                <br/>
                <Link
                    href={{
                        pathname: "/sign-in",
                        query: {href: "/account-center/account-center"},
                    }}
                >
                    temporary sign in
                </Link>
                <Link
                    href={{
                        pathname: "/admin/dashboard",
                    }}
                >
                    temporary admin
                </Link>

                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                    }}
                >
                    <Container
                        maxWidth="false"
                        disableGutters
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            height: "100vh",
                            // width:'100vw',
                            backgroundColor: "gray",
                            justifyContent: "space-around",
                        }}
                    >
                        {/** 小屏幕不显示动画 */}
                        <Stack
                            sx={{
                                alignItems: "center",
                                justifyContent: "center",
                                display: {xs: "flex", sm: "none"},
                            }}
                        >
                            <Diversity1Icon sx={{fontSize: "15rem"}}/>
                            <Typography variant="h2">梦剧场</Typography>
                        </Stack>
                        {/**大屏部分 */}
                        <motion.div className={styles.picOne}>
                            <motion.div
                                style={{
                                    backgroundColor: "white",
                                    mixBlendMode: "darken",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        position: "absolute",
                                        // mixBlendMode: "screen",
                                        top: 200,
                                        fontWeight: "bold",
                                        fontSize: "20rem",
                                        // background: "#fff",
                                        color: "#000",
                                        // lineHeight:'100vh'
                                    }}
                                >
                                    盛夏
                                </Typography>
                                <div style={{mixBlendMode: "screen"}}>
                                    <video
                                        style={{objectFit: "cover", overflow: "hidden"}}
                                        disablepictureinpicture="true"
                                        muted="true"
                                        loop="true"
                                        autoplay="true"
                                    >
                                        <source
                                            src="https://crustac.fr/wp-content/themes/crustac/img/video_waves3.mp4"
                                            type="video/mp4"
                                        />
                                    </video>
                                </div>
                            </motion.div>
                            <ExpandMoreIcon
                                sx={{
                                    fontSize: "20rem",
                                    position: "absolute",
                                    left: "35%",
                                    textAlign: "center",
                                    top: "1.5em",
                                }}
                            />
                        </motion.div>
                    </Container>


                    <Container
                        maxWidth="false"
                        sx={{
                            padding: 0,
                            display: "flex",
                            flexDirection: "row",
                            height: "100vh",
                            backgroundColor: "antiquewhite",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack sx={{justifyContent: "center", paddingLeft: "5%"}}>
                            <Typography
                                // variant="h2"
                                sx={{
                                    background:
                                        "linear-gradient(90deg, rgba(8,200,255,1) 0%, rgba(232,53,255,1) 47%, rgba(255,165,92,1) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: "5rem",
                                    fontWeight: "1002",
                                }}
                            >
                                盛夏酒店
                            </Typography>
                            <Typography variant="h2">梦开始的地方</Typography>
                            <Typography variant="h6">“生动诠释了宾至如归” ———</Typography>
                            <Button href="/hotels">现在入住！</Button>
                        </Stack>
                        <Stack>
                            <SendIcon sx={{fontSize: "20rem"}}/>
                        </Stack>
                        {/* <Grid container columns={12} sx={{justifyContent:'center',alignItems:'center'}}>

              <Grid item>
              </Grid>
            </Grid> */}
                    </Container>
                </Box>
                <div>
                    {" "}
                    {/*can add animation later*/}
                    <Container sx={{py: 8}} maxWidth="lg">
                        {/*城市卡片*/}
                        <Grid container spacing={8} sx={{}}>
                            <Grid item>
                                <TicketSZ/>
                            </Grid>
                            <Grid item>
                                <TicketGZ/>
                            </Grid>
                            <Grid item>
                                <TicketCQ/>
                            </Grid>
                            <Grid item>
                                <TicketSH/>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Grid container sx={{
                    marginTop: 10,
                    marginBottom: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}>
                    <iframe src={"map.html"} height="500" width="600" frameBorder="0"></iframe>
                </Grid>
            </main>
            <Footer/>
        </ThemeProvider>
    );
}
