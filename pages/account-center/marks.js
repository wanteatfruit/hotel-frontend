import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from "react";
import {
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider, Menu, MenuItem, TextField,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useRouter } from "next/router";
import WindowIcon from "@mui/icons-material/Window";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import BalconyIcon from "@mui/icons-material/Balcony";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import { hotelImageUrl, roomImageUrl } from "../../data";
import Styles from "../../styles/AccountCenter.module.css"


export default function Orders({ id }) {
    const [mode, setMode] = useState(0)
    const [infoDialogOpen, setInfoDialogOpen] = useState(false)
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
    const [commentDialogOpen, setCommentDialogOpen] = useState(false)
    const [roomOnDialog, setRoomOnDialog] = useState("");
    const [roomInfo, setRoomInfo] = useState({})
    const [modifyMenuAnchorEl, setModifyMenuAnchorEl] = useState(null);
    const [rooms, setRooms] = useState([])
    const [hotels, setHotels] = useState([])
    const router = useRouter()

    async function getRoomsAndHotels() {
        let _rooms = []
        await axios.get("http://120.25.216.186:8888/roomtypewishlist", { params: { "userId": id } }).then((response) => {
            _rooms = response.data
        });
        console.log("rooms: ", _rooms)
        setRooms(_rooms);
        let roomInfoDict = {}
        for (const idx in _rooms) {
            console.log("roomid: ", _rooms[idx].roomTypeID)
            if (!(_rooms[idx].roomTypeID in roomInfoDict)) {
                await axios.get("http://120.25.216.186:8888/roomtype", { params: { "id": _rooms[idx].roomTypeID } }).then((response) => {
                    roomInfoDict[_rooms[idx].roomTypeID] = response.data
                });
            }
        }
        setRoomInfo(roomInfoDict)
        let _hotels = []
        await axios.get("http://120.25.216.186:8888/hotelwishlist", { params: { "userId": id } }).then((response) => {
            _hotels = response.data
        });
        setHotels(_hotels)
    }

    useEffect(() => {
        getRoomsAndHotels()
    }, [id, mode, roomOnDialog])

    function getListItemContent() {
        if (!(roomOnDialog.roomTypeID in roomInfo) || roomInfo[roomOnDialog.roomTypeID] === undefined) {
            return <></>
        }
        let nameItem = roomInfo[roomOnDialog.roomTypeID].roomname
        const intro = roomInfo[roomOnDialog.roomTypeID].introduction.split(",")
        let windowItem = ''
        if (intro[0].substring(intro[0].length - 1) === "有") {
            windowItem = <>
                <Typography>有窗</Typography><WindowIcon /><DoneOutlineIcon />
            </>
        } else {
            windowItem = <>
                <Typography>无窗</Typography><WindowIcon /><CancelIcon />
            </>
        }
        let balconyItem = ''
        if (intro[1].substring(intro[1].length - 1) === "有") {
            balconyItem = <>
                <Typography>有阳台</Typography><BalconyIcon /><DoneOutlineIcon />
            </>
        } else {
            balconyItem = <>
                <Typography>无阳台</Typography><BalconyIcon /><CancelIcon />
            </>
        }
        let laundryItem = ''
        if (intro[2].substring(intro[2].length - 1) === "有") {
            laundryItem = <>
                <Typography>有洗衣房</Typography><LocalLaundryServiceIcon /><DoneOutlineIcon />
            </>
        } else {
            laundryItem = <>
                <Typography>无洗衣房</Typography><LocalLaundryServiceIcon /><CancelIcon />
            </>
        }

        const gapHeight = 2
        return (
            <>
                <List>
                    <ListItem>
                        <Grid container>
                            <Typography>{nameItem}</Typography>
                        </Grid>
                    </ListItem>
                    <Divider sx={{ my: gapHeight }} />
                    <ListItem>
                        <Grid container sx={{ width: "100%", display: "flex", flexDirection: "row", columnGap: "1em" }}>
                            {windowItem}
                        </Grid>
                    </ListItem>
                    <Divider sx={{ my: gapHeight }} />
                    <ListItem>
                        <Grid container sx={{ width: "100%", display: "flex", flexDirection: "row", columnGap: "1em" }}>
                            {balconyItem}
                        </Grid>
                    </ListItem>
                    <Divider sx={{ my: gapHeight }} />
                    <ListItem>
                        <Grid container sx={{ width: "100%", display: "flex", flexDirection: "row", columnGap: "1em" }}>
                            {laundryItem}
                        </Grid>
                    </ListItem>
                </List>
            </>
        )
    }

    function getAlbumImage(roomName) {
        return "https://source.unsplash.com/random"
    }

    function roomInfoDialog() {
        const gapHeight = 2;
        const image_url = "url(" + roomImageUrl[roomOnDialog.roomTypeID % roomImageUrl.length] + ")"
        return (
            <>
                <Dialog
                    open={infoDialogOpen}
                    maxWidth='lg'
                    onClose={() => {
                        setInfoDialogOpen(false)
                    }}
                    PaperProps={{ sx: { position: "fixed", width: "100%", height: "100%" } }}
                >
                    <DialogContent>
                        <Grid container component="main" sx={{ height: '100%' }}>
                            <Grid
                                sx={{
                                    width: "50%",
                                    height: "100%",
                                    backgroundImage: image_url,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid item width={"47%"} component={Paper} elevation={6} square>
                                <Grid container marginBottom={10} marginLeft={"5%"}>
                                    {getListItemContent()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setInfoDialogOpen(false)
                        }}>关闭</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    function commentDialog() {
        return (
            <>
                <Dialog open={commentDialogOpen} onClose={() => {
                    setCommentDialogOpen(false)
                }}>
                    <DialogTitle>评价</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            您可以写下对我们酒店和房间的恶评！
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            fullWidth
                            multiline
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setCommentDialogOpen(false)
                        }}>取消</Button>
                        <Button onClick={() => {
                            setCommentDialogOpen(false)
                        }}>提交</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }


    function getAlbum() {
        const modifyMenuOpen = Boolean(modifyMenuAnchorEl);
        const handleClick = (event) => {
            setModifyMenuAnchorEl(event.currentTarget);
        };
        const modifyMenuHandleClose = () => {
            setModifyMenuAnchorEl(null);
        };

        function getHotelCover(hotel) {
            return (
                <>
                    <Grid item key={hotel.hotelName} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                height='375px'
                                image={hotelImageUrl[hotel.hotelID % hotelImageUrl.length]}
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {hotel.hotelName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button className={Styles.Button} size="medium" onClick={() => {
                                    router.push({
                                        pathname: "/hotels/" + hotel.hotelName,
                                    })
                                }}>详情</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </>
            )
        }

        function getRoomCover(room) {
            return (
                <>
                    <Grid item key={room.hotelName} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                height='300px'
                                image={roomImageUrl[room.roomTypeID % roomImageUrl.length]}
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {room.hotelName}
                                </Typography>
                                <Typography>
                                    {room.roomTypeName}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{columnGap: "1em"}}>
                                <Button className={Styles.Button} size="medium" onClick={() => {
                                    setInfoDialogOpen(true);
                                    setRoomOnDialog(room);
                                }}>详情</Button>
                                <div>
                                    <Button
                                        id="basic-button"
                                        className={Styles.Button}
                                        aria-controls={modifyMenuOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={modifyMenuOpen ? 'true' : undefined}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/book/" + room.hotelName,
                                            })
                                        }}
                                    >
                                        预定房间
                                    </Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                </>
            )
        }

        return (
            <>
                {roomInfoDialog()}
                {commentDialog()}
                <Grid container spacing={4}>
                    {mode === 0 && rooms.map((room) => (
                        getRoomCover(room)
                    ))}
                    {mode === 1 && hotels.map((hotel) => (
                        getHotelCover(hotel)
                    ))}
                </Grid>
            </>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                    <Typography variant='h4'>收藏</Typography>
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={'房间'}
                >
                    <FormControlLabel value="房间" control={<Radio />} label="房间" onClick={() => {
                        setMode(0)
                    }} />
                    <FormControlLabel value="酒店" control={<Radio />} label="酒店" onClick={() => {
                        setMode(1)
                    }} />
                </RadioGroup>
            </FormControl>
            <br /><br />
            {getAlbum()}
        </Container>
    );
}