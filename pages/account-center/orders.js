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
import {useEffect, useState} from "react";
import {
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider, Menu, MenuItem, TextField,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import Paper from "@mui/material/Paper";
import axios from "axios";


export default function Orders({id}) {
    const [mode, setMode] = useState(0)
    const [infoDialogOpen, setInfoDialogOpen] = useState(false)
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
    const [commentDialogOpen, setCommentDialogOpen] = useState(false)
    const [roomOnDialog, setRoomOnDialog] = useState("");
    const [roomInfo, setRoomInfo] = useState({})
    const [modifyMenuAnchorEl, setModifyMenuAnchorEl] = useState(null);
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        let rooms = []
        if (mode) {
            // axios.get("http://120.25.216.186:8888/orders/finished-orders", {params: {"id": id}}).then((response) => {
            //     console.log(response.data);
            // });
            rooms = [
                {
                    "pay": 40,
                    "roomID": 37,
                    "roomTypeName": "位程半单",
                    "roomTypeID": 56,
                    "time": "2021-01-12 20:00:23",
                    "hotelName": "交头严族但深面",
                    "orderID": 29
                },
                {
                    "pay": 72,
                    "roomID": 72,
                    "roomTypeName": "员马外",
                    "roomTypeID": 12,
                    "time": "1994-04-04 14:45:40",
                    "hotelName": "温体究建军收大",
                    "orderID": 65
                },
                {
                    "pay": 66,
                    "roomID": 59,
                    "roomTypeName": "变安增只",
                    "roomTypeID": 31,
                    "time": "2015-10-01 22:06:18",
                    "hotelName": "节被里",
                    "orderID": 63
                },
                {
                    "pay": 30,
                    "roomID": 5,
                    "roomTypeName": "人按江办全处明",
                    "roomTypeID": 78,
                    "time": "1972-10-04 16:55:55",
                    "hotelName": "风平形位",
                    "orderID": 20
                },
                {
                    "pay": 82,
                    "roomID": 53,
                    "roomTypeName": "六造因决级",
                    "roomTypeID": 69,
                    "time": "1981-09-03 00:46:02",
                    "hotelName": "素一边节心",
                    "orderID": 52
                }
            ];
            setRooms(rooms);
        } else {
            // axios.get("http://120.25.216.186:8888/orders/ongoing-orders", {params: {"id": id}}).then((response) => {
            //     console.log(response.data);
            // });
            rooms = [
                {
                    "hotelName": "府整民",
                    "roomTypeID": 62,
                    "roomTypeName": "族备无文长",
                    "roomID": 84,
                    "time": "1993-06-16 11:30:46",
                    "pay": 17,
                    "orderID": 60
                },
                {
                    "hotelName": "子产总性",
                    "roomTypeID": 89,
                    "roomTypeName": "况受说东",
                    "roomID": 99,
                    "time": "1994-05-10 07:22:29",
                    "pay": 10,
                    "orderID": 56
                }
            ];
            setRooms(rooms);
        }
        let roomInfoDict = {}
        for (const room in rooms) {
            if (!room.roomTypeID in roomInfoDict) {
                let roomInfo = {
                    "name": "两往者使改设交",
                    "area": 67,
                    "breakfast": true,
                    "window": false,
                    "smoking": false,
                    "price": 45
                };
                // axios.get("http://120.25.216.186:8888/roomtype", {params: {"id": room.roomTypeID}}).then((response) => {
                //     console.log(response.data);
                // });
                roomInfoDict[room.roomTypeID] = roomInfo;
            }
        }
        setRoomInfo(roomInfoDict)
    }, [id, mode, roomOnDialog])

    function getListItemContent() {
        if (!roomOnDialog.roomTypeID in roomInfo || roomInfo[roomOnDialog.roomTypeID] === undefined) {
            return <></>
        }
        let nameItem = roomInfo[roomOnDialog.roomTypeID].name
        let areaItem = roomInfo[roomOnDialog.roomTypeID].area + "平方米"
        let windowItem = ''
        if (roomInfo[roomOnDialog.roomTypeID].window) {
            windowItem = "有窗"
        } else {
            windowItem = "无窗"
        }
        let smokingItem = ''
        if (roomInfo[roomOnDialog.roomTypeID].smoking) {
            smokingItem = <SmokingRoomsIcon/>
        } else {
            smokingItem = <SmokeFreeIcon/>
        }
        return (
            <>
                <List>
                    {/*{name, area, window, smoking};*/}
                    <ListItem>
                        <Grid container>
                            <Typography>{nameItem}</Typography>
                        </Grid>
                    </ListItem>
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container>
                            <Typography>{areaItem}</Typography>
                        </Grid>
                    </ListItem>
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container>
                            <Typography>{windowItem}</Typography>
                        </Grid>
                    </ListItem>
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container>
                            <Typography>{smokingItem}</Typography>
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
        return (
            <>
                <Dialog
                    open={infoDialogOpen}
                    onClose={() => {
                        setInfoDialogOpen(false)
                    }}
                    PaperProps={{sx: {position: "fixed", width: "100%", height: "100%", maxWidth: "md"}}}
                >
                    <DialogContent>
                        <Grid container component="main" sx={{height: '100%'}}>
                            <Grid
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    height: "100%",
                                    backgroundImage: 'url(/images/sign-in.jpg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <Grid container marginBottom={10}>
                                    {getListItemContent()}
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Button onClick={() => {
                                        setInfoDialogOpen(false)
                                    }}>关闭</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
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

        function getRoomCover(room) {
            if (mode) {
                return (
                    <>
                        <Grid item key={room.hotelName} xs={12} sm={6} md={4}>
                            <Card
                                sx={{maxWidth: 300, display: 'flex', flexDirection: 'column'}}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 300,
                                        height: 275
                                    }}
                                    image={getAlbumImage(room)}
                                    alt="random"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {room.hotelName}
                                    </Typography>
                                    <Typography>
                                        {room.roomTypeName}
                                    </Typography>
                                    <Typography>
                                        {room.time}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium" onClick={() => {
                                        setInfoDialogOpen(true);
                                        setRoomOnDialog(room);
                                    }}>详情</Button>
                                    <Button size="medium" onClick={() => {
                                        setCommentDialogOpen(true)
                                        setRoomOnDialog(room)
                                    }}>评价</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>
                )
            } else {
                return (
                    <>
                        <Grid item key={room.hotelName} xs={12} sm={6} md={4}>
                            <Card
                                sx={{maxWidth: 300, display: 'flex', flexDirection: 'column'}}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 300,
                                        height: 275
                                    }}
                                    image={getAlbumImage(room)}
                                    alt="random"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {room.hotelName}
                                    </Typography>
                                    <Typography>
                                        {room.roomTypeName}
                                    </Typography>
                                    <Typography>
                                        {room.time}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium" onClick={() => {
                                        setInfoDialogOpen(true);
                                        setRoomOnDialog(room);
                                    }}>详情</Button>
                                    <div>
                                        <Button
                                            id="basic-button"
                                            aria-controls={modifyMenuOpen ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={modifyMenuOpen ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            修改订单
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={modifyMenuAnchorEl}
                                            open={modifyMenuOpen}
                                            onClose={modifyMenuHandleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => {

                                            }}>修改入住时间</MenuItem>
                                            <MenuItem onClick={() => {
                                                const body = {"id": room.orderID};
                                                axios.post('http://120.25.216.186:8888/orders/delete', body)
                                                    .then(response => response);
                                                console.log("取消")
                                            }
                                            }>取消订单</MenuItem>
                                        </Menu>
                                    </div>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>
                )
            }

        }

        return (
            <>
                {roomInfoDialog()}
                {commentDialog()}
                <Grid container spacing={4}>
                    {rooms.map((room) => (
                        getRoomCover(room)
                    ))}
                </Grid>
            </>
        )
    }

    return (
        <Container maxWidth="md">
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                    <typography>订单信息</typography>
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={'已预定'}
                >
                    <FormControlLabel value="已预定" control={<Radio/>} label="已预定" onClick={() => {
                        setMode(0)
                    }}/>
                    <FormControlLabel value="已完成" control={<Radio/>} label="已完成" onClick={() => {
                        setMode(1)
                    }}/>
                </RadioGroup>
            </FormControl>
            <br/><br/>
            {getAlbum()}
        </Container>
    );
}