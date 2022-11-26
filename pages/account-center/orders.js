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
import WindowIcon from '@mui/icons-material/Window';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import BalconyIcon from '@mui/icons-material/Balcony';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import {
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider, IconButton, Menu, MenuItem, TextField,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import {hotelImageUrl, roomImageUrl} from "../../data"
import Paper from "@mui/material/Paper";
import axios from "axios";
import {PhotoCamera} from "@mui/icons-material";
import Image from "next/image";


export default function Orders({id}) {
    const [mode, setMode] = useState(0)
    const [infoDialogOpen, setInfoDialogOpen] = useState(false)
    const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
    const [commentDialogOpen, setCommentDialogOpen] = useState(false)
    const [roomOnDialog, setRoomOnDialog] = useState("");
    const [roomInfo, setRoomInfo] = useState({})
    const [modifyMenuAnchorEl, setModifyMenuAnchorEl] = useState(null);
    const [rooms, setRooms] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])
    const [uploadedImageFiles, setUploadedImageFiles] = useState([])
    const [uploadedVideo, setUploadVideo] = useState("")
    const [uploadedVideoFile, setUploadedVideoFile] = useState("")
    const [commentWords, setCommentWords] = useState("")
    const [commentResponse, setCommentResponse] = useState("")
    const [commentResponseDialogOpen, setCommentResponseDialogOpen] = useState(false)

    async function getRooms() {
        let _rooms = []
        if (mode) {
            await axios.get("http://120.25.216.186:8888/orders/finished-orders", {params: {"userID": id}}).then((response) => {
                _rooms = response.data
            });
            setRooms(_rooms);
        } else {
            await axios.get("http://120.25.216.186:8888/orders/ongoing-orders", {params: {"userID": id}}).then((response) => {
                _rooms = response.data
            });
            setRooms(_rooms);
        }
        let roomInfoDict = {}
        for (const idx in _rooms) {
            if (!(_rooms[idx].roomTypeID in roomInfoDict)) {
                await axios.get("http://120.25.216.186:8888/roomtype", {params: {"id": _rooms[idx].roomTypeID}}).then((response) => {
                    roomInfoDict[_rooms[idx].roomTypeID] = response.data
                });
            }
        }
        setRoomInfo(roomInfoDict)
    }

    useEffect(() => {
        getRooms()
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
                <Typography>有窗</Typography><WindowIcon/><DoneOutlineIcon/>
            </>
        } else {
            windowItem = <>
                <Typography>无窗</Typography><WindowIcon/><CancelIcon/>
            </>
        }
        let balconyItem = ''
        if (intro[1].substring(intro[1].length - 1) === "有") {
            balconyItem = <>
                <Typography>有阳台</Typography><BalconyIcon/><DoneOutlineIcon/>
            </>
        } else {
            balconyItem = <>
                <Typography>无阳台</Typography><BalconyIcon/><CancelIcon/>
            </>
        }
        let laundryItem = ''
        if (intro[2].substring(intro[2].length - 1) === "有") {
            laundryItem = <>
                <Typography>有洗衣房</Typography><LocalLaundryServiceIcon/><DoneOutlineIcon/>
            </>
        } else {
            laundryItem = <>
                <Typography>无洗衣房</Typography><LocalLaundryServiceIcon/><CancelIcon/>
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
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container sx={{width: "100%", display: "flex", flexDirection: "row", columnGap: "1em"}}>
                            {windowItem}
                        </Grid>
                    </ListItem>
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container sx={{width: "100%", display: "flex", flexDirection: "row", columnGap: "1em"}}>
                            {balconyItem}
                        </Grid>
                    </ListItem>
                    <Divider sx={{my: gapHeight}}/>
                    <ListItem>
                        <Grid container sx={{width: "100%", display: "flex", flexDirection: "row", columnGap: "1em"}}>
                            {laundryItem}
                        </Grid>
                    </ListItem>
                </List>
            </>
        )
    }

    function roomInfoDialog() {
        const gapHeight = 2;
        const image_url = "url(" + roomImageUrl[roomOnDialog.roomTypeID % roomImageUrl.length] + ")"
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
        function showUploadedImages() {
            return <Grid sx={{display: "flex", flexDirection: "row", columnGap: "0.5em"}}>
                {uploadedImages.length >= 1 && <Image
                    src={uploadedImages[0]}
                    width="100px"
                    height="100px"
                    alt={"Uploaded Image1"}/>}
                {uploadedImages.length >= 2 && <Image
                    src={uploadedImages[1]}
                    width="100px"
                    height="100px"
                    alt={"Uploaded Image2"}/>}
                {uploadedImages.length >= 3 && <Image
                    src={uploadedImages[2]}
                    width="100px"
                    height="100px"
                    alt={"Uploaded Image3"}/>}
            </Grid>
        }

        function showUploadedVideo() {
            return <Grid sx={{display: "flex", flexDirection: "row", columnGap: "0.5em"}}>
                {uploadedVideo !== "" && <CardMedia
                    component='video'
                    image={uploadedVideo}
                    autoPlay
                    allow="autoPlay"
                    controls
                    sx={{
                        width: "210px",
                        height: "180px"
                    }}
                />}
            </Grid>
        }

        async function uploadOnClick() {
            let data = new FormData()
            for (let i = 0; i < uploadedImageFiles.length; i++) {
                data.append("picture" + (i + 1).toString(), uploadedImageFiles[i], uploadedImageFiles[i].name)
            }
            if (uploadedVideo !== "") {
                data.append("video", uploadedVideoFile, uploadedVideoFile.name)
            }
            data.append("words", commentWords)
            data.append("orderid", roomOnDialog.orderID)
            for (const value of data.entries()) {
                console.log(value);
            }
            let commentReceived = "true"
            // let commentReceived = await fetch('http://120.25.216.186:8888/comment/insert', {
            //     method: 'POST',
            //     body: data
            // });
            // console.log(commentReceived)
            if (commentReceived === "true") {
                setCommentResponse("我们已收到您的评价！感谢您的支持")
                setCommentResponseDialogOpen(true)
            } else {
                setCommentResponse("您的评论提交失败！可能是网络问题，请稍后重试")
            }
            setCommentResponseDialogOpen(true)
            setCommentDialogOpen(false)
            eraseComment()
        }

        function eraseComment() {
            setCommentDialogOpen(false)
            setUploadedImages([])
            setUploadVideo("")
            setCommentWords("")
            setUploadedImageFiles([])
            setUploadedVideoFile("")
        }

        return (
            <>
                <Dialog open={commentDialogOpen} onClose={() => {
                    setCommentDialogOpen(false)
                }}>
                    <DialogTitle>评价</DialogTitle>
                    <DialogContent>
                        <Grid sx={{display: "flex", flexDirection: "column", rowGap: "1em"}}>
                            <DialogContentText>
                                您的支持与鼓励是我们最大的动力！
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                fullWidth
                                multiline
                                variant="standard"
                                value={commentWords}
                                onChange={(event) => {
                                    setCommentWords(event.target.value);
                                }}
                            />
                            <Grid sx={{display: "flex", flexDirection: "row", columnGap: "1em"}}>
                                <IconButton color="primary" aria-label="upload picture" component="label"
                                            sx={{justifyContent: "flex-start"}}>
                                    {uploadedImages.length < 3 &&
                                        <input hidden accept="image/*" type="file" onChange={(event) => {
                                            if (event.currentTarget.files) {
                                                const file = event.currentTarget.files[0];
                                                let binaryData = [];
                                                binaryData.push(file);
                                                const blobData = new Blob(binaryData)
                                                setUploadedImageFiles(
                                                    [
                                                        ...uploadedImageFiles,
                                                        blobData
                                                    ]
                                                )
                                                const url = URL.createObjectURL(blobData)
                                                setUploadedImages( // Replace the state
                                                    [ // with a new array
                                                        ...uploadedImages, // that contains all the old items
                                                        url // and one new item at the end
                                                    ]
                                                );
                                            }
                                        }}/>}
                                    <PhotoCamera/>
                                </IconButton>
                                <IconButton color="primary" aria-label="upload picture" component="label"
                                            sx={{justifyContent: "flex-start"}}>
                                    <input hidden accept="video/*" type="file" onChange={(event) => {
                                        if (event.currentTarget.files) {
                                            const file = event.currentTarget.files[0];
                                            let binaryData = [];
                                            binaryData.push(file);
                                            const blobData = new Blob(binaryData)
                                            setUploadedVideoFile(blobData)
                                            const url = URL.createObjectURL(blobData);
                                            setUploadVideo(url)
                                        }
                                    }}/>
                                    <VideoCallIcon/>
                                </IconButton>
                            </Grid>
                            <Grid><Typography>You can upload three photos and one video</Typography></Grid>
                            {showUploadedImages()}
                            {showUploadedVideo()}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={eraseComment}>取消</Button>
                        <Button onClick={uploadOnClick}>提交</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    function ResponseDialog() {
        return (
            <>
                <Dialog
                    open={commentResponseDialogOpen}
                    onClose={() => setCommentResponseDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        评论提交
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {commentResponse}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCommentResponseDialogOpen(false)} autoFocus>
                            好的
                        </Button>
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
                                    image={roomImageUrl[room.roomTypeID % roomImageUrl.length]}
                                    alt="random"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {room.hotelName}
                                    </Typography>
                                    <Typography>
                                        {room.rommTypeName}
                                    </Typography>
                                    <Typography>
                                        {room.time.split(" ")[0]}
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
                                    image={roomImageUrl[room.roomTypeID % roomImageUrl.length]}
                                    alt="random"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {room.hotelName}
                                    </Typography>
                                    <Typography>
                                        {room.rommTypeName}
                                    </Typography>
                                    <Typography>
                                        {room.time.split(" ")[0]}
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
                                                    .then(response => console.log("取消", response));
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

        function emptyOrders() {
            if (rooms.length === 0) {
                return (
                    <>
                        <Typography sx={{fontSize: "2em"}}>暂无订单</Typography>
                    </>
                )
            }
        }

        return (
            <>
                {roomInfoDialog()}
                {commentDialog()}
                {ResponseDialog()}
                <Grid container spacing={4}>
                    <Grid sx={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        marginTop: "2em"
                    }}>
                        {emptyOrders()}
                    </Grid>
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