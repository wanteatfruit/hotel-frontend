import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Backdrop,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Icon,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    Chip,
    Divider
} from "@mui/material"
import styles from "../styles/RoomCard.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ChevronLeftOutlined } from "@mui/icons-material";
import Image from "next/image";
import React, { useState, useSyncExternalStore } from "react";
import { CheckBox, ColorLensSharp, DiscountOutlined } from "@mui/icons-material";
import axios from "axios";
import Grid from "@mui/material/Grid";
import PlaceOrder from "./PlaceOrderDrawer";

export default function RoomCard({
    hotelID,
    roomTypeID,
    imageUrl,
    description,
    hotelName,
    admin,
    roomInfo,
    refresh,
    markedRooms,
    userID,
    refreshRooms,
    needMarkBox,
    needHotelName

}) {
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [changeInfo, setchangeInfo] = React.useState(false)
    const [guestNum, setGuestNum] = React.useState(roomInfo === undefined ? "" : roomInfo.number)
    const [roomName, setRoomName] = React.useState(roomInfo === undefined ? "" : roomInfo.roomname)
    const [roomPrice, setRoomPrice] = React.useState(roomInfo === undefined ? "" : roomInfo.price)
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])
    const [isMarked, setIsMarked] = useState(false)
    const [onSale, setOnSale] = useState(false)
    const [orderDrawer, setOrderDrawer] = useState(false);
    function handleIntroduction() {
        let intro = roomInfo.introduction
        const intro_array = intro.split(",")
        let intro_after_proc = [false, false, false]
        for (const key in intro_array) {
            if (Object.hasOwnProperty.call(intro_array, key)) {
                const element = intro_array[key];
                // console.log(element)
                const yesorno = element.split("|")
                yesorno[1] == '有' ? intro_after_proc[key] = true : intro_after_proc[key] = false
            }
        }
        // console.log(intro_after_proc)
        setRoomIntro(intro_after_proc)
        if (roomInfo.discount !== 1.0) {
            setOnSale(true)
        }
    }

    React.useEffect(() => {
        handleIntroduction()
        if (needMarkBox) {
            if (markedRooms.indexOf(roomTypeID) !== -1) {
                setIsMarked(true)
            } else {
                setIsMarked(false)
            }
        }

    }, [markedRooms, needMarkBox, roomTypeID, userID])

    function convertYesNo(bool) {
        if (bool === false) {
            return "无"
        }
        else return "有"
    }


    async function handleUpdate() { //handle post request here
        const intro = `窗户|${convertYesNo(roomIntro[0])},阳台|${convertYesNo(roomIntro[1])},洗衣房|${convertYesNo(roomIntro[2])}`
        const updatedInfo = { roomTypeName: roomName, price: roomPrice, introduction: intro, roomTypeId: roomInfo.roomtypeid, number: guestNum }
        console.log(updatedInfo)
        const response = await fetch('http://120.25.216.186:8888/roomtype/updateRoomType', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        })
        console.log(response)
    }

    function handleDelete() {
        axios.get(`http://120.25.216.186:8888/roomtype/deleteRoom?roomID=${roomInfo.roomtypeid}`).then((resp) => {
            console.log(resp.status)
        })
        // console.log(roomInfo.roomtypeid)
    }

    async function MarkRoom(isChecked) {
        setIsMarked(isChecked)
        const body = { "userID": Number(userID), "roomTypeID": roomTypeID, "hotelID": hotelID };
        const options = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log("here: ", body)
        if (isChecked) {
            await fetch("http://120.25.216.186:8888/roomtypewishlist/add", options)
                .then((response) => response.text()).then(data => console.log(data))
        } else {
            const info = JSON.stringify(body);
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const result = await axios.put('http://120.25.216.186:8888/roomtypewishlist/remove', info, customConfig);
            console.log("result: ", result)
        }
        // refreshRooms()
    }


    function MarkBox() {
        if (needMarkBox) {
            return (
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'left',
                        alignItems: "center",
                        width: "50%",
                        marginLeft: "0.5em"
                    }}>
                    <Typography>收藏</Typography>
                    <Checkbox id="admin" label={"收藏该房间"} checked={isMarked} onChange={(event) => {
                        MarkRoom(event.target.checked)
                    }} />
                </Grid>
            )
        } else {
            return <></>
        }
    }

    function getOff() {
        const disc = roomInfo.discount
        const off = (1.0 - disc).toFixed(2) * 100
        return off.toString()
    }

    return (
        <>
            <Card sx={{ borderWidth: 1, borderRadius: 3, borderSpacing: 1 }}>
                <CardMedia component='img' loading="eager" src={imageUrl}
                    height="300">

                </CardMedia>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ paddingBottom: '0px' }}>
                        {needHotelName==true &&<Stack direction='row' justifyContent='space-between'>
                            <Typography variant="h5" sx={{ paddingBottom: '4px' }}>{roomInfo.roomname}</Typography>
                            <Chip label={`${hotelName}`} clickable component='a' href={`/hotels/${hotelName}`}></Chip>
                            </Stack>}
                        {needHotelName==undefined && <Typography variant="h5" sx={{ paddingBottom: '4px' }}>{roomInfo.roomname}</Typography>
}
                        <Typography variant="body1">{`推荐入住${roomInfo.number}人`}</Typography>

                    </CardContent>
                    {admin == false &&
                        <CardContent sx={{ mb: 0 }}>
                            <FormGroup sx={{ flexDirection: 'row', padding: 0 }}>
                                <FormControlLabel control={<Checkbox readOnly checked={roomIntro[0]} />} label="窗户" />
                                <FormControlLabel control={<Checkbox readOnly checked={roomIntro[1]} />} label="阳台" />
                                <FormControlLabel control={<Checkbox readOnly checked={roomIntro[2]} />} label="洗衣房" />
                            </FormGroup>
                            <Divider sx={{ mb: 1 }} />
                            {admin == false && onSale == false && <Typography textAlign='center' variant="h6">{`${roomInfo.price}RMB / 晚`}</Typography>}
                            {admin == true && <Typography variant="body1" textAlign='center'>{`${roomInfo.price}RMB / 晚`}</Typography>}
                            {admin == false && onSale == true &&
                                <Stack justifyContent='center'>
                                    <Typography variant="h6" textAlign='center' sx={{ textDecoration: 'line-through' }}>
                                        {`${roomInfo.price}RMB / 晚`}
                                    </Typography>
                                    <Stack direction='row' justifyContent='center'>
                                        <Typography variant="h6" textAlign='center' sx={{ paddingRight: 1 }}> {`${roomInfo.afterEventPrice}RMB / 晚`}</Typography>
                                        <Chip size="medium" color="success" label={'-' + getOff() + '%'}></Chip>
                                    </Stack>
                                </Stack>
                            }
                        </CardContent>

                    }
                </div>
                {admin == false &&
                    <Grid sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                        {MarkBox()}
                        <Grid sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'flex-end',
                            alignItems: "flex-end",
                            width: "100%"
                        }}>
                            <CardActions>
                                <IconButton onClick={async () => {
                                    const body = {
                                        "userID": localStorage.getItem("userID"),
                                        "roomTypeID": roomTypeID,
                                        "hotelID": hotelID
                                    }
                                    await fetch('http://120.25.216.186:8888/roomtypewishlist/add', {
                                        method: 'PUT',
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        body: JSON.stringify(body)
                                    });
                                }
                                }>
                                </IconButton>
                                <Button variant="contained"  onClick={() => setOrderDrawer(true)}>订房</Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                }
                {admin &&
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>
                            <Button onClick={() => setchangeInfo(!changeInfo)} >修改信息</Button>
                            <Button onClick={() => { setDeleteDialog(true); }}
                            >删除房间</Button>
                        </div>

                    </CardActions>
                }
            </Card>
            <Backdrop open={changeInfo} sx={{ zIndex: 10000 }}>
                <Paper sx={{ width: 'max-content', padding: 2 }} >
                    <Typography variant="h4" sx={{ marginBottom: 3 }}>修改信息</Typography>
                    <Stack gap={2} >
                        <TextField value={roomName} onChange={(event) => {
                            setRoomName(event.target.value);
                        }} label="房间名" required>
                        </TextField>
                        <TextField value={roomPrice} onChange={(event) => {
                            setRoomPrice(event.target.value)
                        }} inputProps={{ type: 'numeric', pattern: "^([0-9]*[.])?[0-9]+$" }} label="价格" required>
                        </TextField>
                        <TextField value={guestNum} onChange={(event) => {
                            setGuestNum(event.target.value)
                        }} inputProps={{ type: 'numeric', pattern: "^([0-9]*[.])?[0-9]+$" }} label="入住人数" required>
                        </TextField>
                        <Typography variant="h6">杂项</Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={roomIntro[0]} onChange={(event) => setRoomIntro([event.target.checked, roomIntro[1], roomIntro[2]])} />} label="窗户" />
                            <FormControlLabel control={<Checkbox checked={roomIntro[1]} onChange={(event) => setRoomIntro([roomIntro[0], event.target.checked, roomIntro[2]])} />} label="阳台" />
                            <FormControlLabel control={<Checkbox checked={roomIntro[2]} onChange={(event) => setRoomIntro([roomIntro[0], roomIntro[1], event.target.checked])} />} label="洗衣房" />
                        </FormGroup>
                    </Stack>
                    <Button onClick={() => setchangeInfo(false)}>取消</Button>
                    <Button variant="contained" onClick={() => { handleUpdate(); refresh(); setchangeInfo(false) }}>提交</Button>
                </Paper>
            </Backdrop>
            <Dialog open={deleteDialog}>
                <DialogTitle>确定删除</DialogTitle>
                <DialogContent>
                    <DialogContentText>你确定要删除这个房间吗？此操作不可逆</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} >取消</Button>
                    <Button onClick={() => { handleDelete(); refresh("广州1号"); setDeleteDialog(false) }}>确定</Button>
                </DialogActions>
            </Dialog>
            <PlaceOrder hotelName={hotelName} roomInfo={roomInfo} open={orderDrawer}>
                <IconButton onClick={() => setOrderDrawer(false)} color="secondary">
                    <ChevronLeftOutlined fontSize="large" />
                </IconButton>
                <Typography variant="h3" color='secondary'>{hotelName}</Typography>
            </PlaceOrder>


        </>
    )
}