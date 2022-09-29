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
import {useState} from "react";
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


export default function Orders() {
    const [mode, setMode] = useState(0)
    const [infoDialogOpen, setInfoDialogOpen] = useState(false)
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
    const [commentDialogOpen, setCommentDialogOpen] = useState(false)
    const [roomOnDialog, setRoomOnDialog] = useState("");
    const [modifyMenuAnchorEl, setModifyMenuAnchorEl] = useState(null);

    function getListItemContent(attribute, value) {
        let content = ''
        switch (attribute) {
            case "name":
                content = value;
                break;
            case "area":
                content = value + " 平方"
                break;
            case "window":
                if (value) {
                    content = "有窗"
                } else {
                    content = "无窗"
                }
                break;
            case "smoking":
                if (value) {
                    content = <SmokingRoomsIcon/>
                } else {
                    content = <SmokeFreeIcon/>
                }
                break;
        }
        return content
    }

    function getAlbumImage(roomName) {
        return "https://source.unsplash.com/random"
    }

    function getRoomInfo() {
        let name = "大床房!!!";
        let area = 30;
        let window = true;
        let smoking = false;
        return {name, area, window, smoking};
    }

    function roomInfoDialog() {
        const gapHeight = 2;
        let roomInfo = getRoomInfo()
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
                        <Grid container component="main" sx={{height: '100vh'}}>
                            <Grid
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
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
                                    <List>
                                        {/*{name, area, window, smoking};*/}
                                        <ListItem>
                                            <Grid container>
                                                {getListItemContent("name", roomInfo.name)}
                                            </Grid>
                                        </ListItem>
                                        <Divider sx={{my: gapHeight}}/>
                                        <ListItem>
                                            <Grid container>
                                                {getListItemContent("area", roomInfo.area)}
                                            </Grid>
                                        </ListItem>
                                        <Divider sx={{my: gapHeight}}/>
                                        <ListItem>
                                            <Grid container>
                                                {getListItemContent("window", roomInfo.window)}
                                            </Grid>
                                        </ListItem>
                                        <Divider sx={{my: gapHeight}}/>
                                        <ListItem>
                                            <Grid container>
                                                {getListItemContent("smoking", roomInfo.smoking)}
                                            </Grid>
                                        </ListItem>
                                    </List>
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

    function getBookedInfo() {
        let room_list = [];
        let room_a = ['广州白云希尔顿', '山景房', '2022-11-5'];
        let room_b = ['深圳福田喜来登', '海景房', '2022-9-29'];
        room_list.push(room_a);
        room_list.push(room_b);
        return room_list;
    }

    function getFinishedInfo() {
        let room_list = [];
        let room_a = ['上海黄埔W酒店', '花园房', '2021-12-9'];
        room_list.push(room_a);
        return room_list;
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
                        <Grid item key={room} xs={12} sm={6} md={4}>
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
                                        {room[0]}
                                    </Typography>
                                    <Typography>
                                        {room[1]}
                                    </Typography>
                                    <Typography>
                                        {room[2]}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium" onClick={() => {
                                        setInfoDialogOpen(true)
                                        setRoomOnDialog(room)
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
                        <Grid item key={room} xs={12} sm={6} md={4}>
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
                                        {room[0]}
                                    </Typography>
                                    <Typography>
                                        {room[1]}
                                    </Typography>
                                    <Typography>
                                        {room[2]}
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
                                            <MenuItem onClick={modifyMenuHandleClose}>修改入住时间</MenuItem>
                                            <MenuItem onClick={modifyMenuHandleClose}>取消订单</MenuItem>
                                        </Menu>
                                    </div>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>
                )
            }

        }

        let rooms;
        if (mode) {
            rooms = getFinishedInfo();
        } else {
            rooms = getBookedInfo();
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