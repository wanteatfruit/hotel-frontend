import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions, Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Icon, IconButton, Paper, Stack, TextField, Typography
} from "@mui/material"
import styles from "../styles/RoomCard.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from "next/image";
import React from "react";
import { CheckBox, ColorLensSharp } from "@mui/icons-material";
import axios from "axios";
export default function RoomCard({ imageUrl, description, hotelName, admin, roomInfo, refresh }) {
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [changeInfo, setchangeInfo] = React.useState(false)
    const [guestNum, setGuestNum] = React.useState(roomInfo === undefined ? "" : roomInfo.number)
    const [roomName, setRoomName] = React.useState(roomInfo === undefined ? "" : roomInfo.roomname)
    const [roomPrice, setRoomPrice] = React.useState(roomInfo === undefined ? "" : roomInfo.price)
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])
    console.log(roomInfo)
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
    }

    React.useEffect(() => {
        handleIntroduction()
    }, [changeInfo])

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
        axios.get(`http://120.25.216.186:8888/roomtype/deleteRoom?roomID=${roomInfo.roomtypeid}`).then((resp)=>{
            console.log(resp.status)
        })
        // console.log(roomInfo.roomtypeid)
    }


    return (
        <>
            <Card>
                <CardMedia component='img' loading="eager" src={imageUrl}
                    height="375px">

                </CardMedia>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ paddingBottom: '0px' }}>
                        <Typography variant="h5" sx={{ paddingBottom: '4px' }}>{roomInfo.roomname}</Typography>
                        {admin == false && <Typography variant="body1">{`${roomInfo.price}RMB / 晚`}</Typography>}
                        {admin == true && <Typography variant="body1">{`${roomInfo.price}RMB / 晚`}</Typography>}
                        <Typography variant="body1">{`推荐入住${roomInfo.number}人`}</Typography>

                    </CardContent>
                    {admin == false &&
                        <CardContent>
                            <FormGroup sx={{ flexDirection: 'row', padding:0 }}>
                                <FormControlLabel control={<Checkbox readOnly checked={roomIntro[0]} />} label="窗户" />
                                <FormControlLabel control={<Checkbox readOnly checked={roomIntro[1]} />} label="阳台" />
                                <FormControlLabel control={<Checkbox readOnly checked={roomIntro[2]} />} label="洗衣房" />
                            </FormGroup>
                        </CardContent>
                    }
                </div>
                {admin == false && <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>

                    <Button variant="contained" href={`/book/${hotelName}`}>订房</Button>

                </CardActions>}
                {admin &&
                    <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>
                            <Button onClick={() => setchangeInfo(!changeInfo)} >修改信息</Button>
                            <Button onClick={() => { setDeleteDialog(true);  }}
                            >删除房间</Button>
                        </div>

                    </CardActions>
                }
            </Card>
            <Backdrop open={changeInfo} sx={{ zIndex: 10000 }}>
                <Paper  sx={{ width: 'max-content', padding: 2 }} >
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
                    <Button variant="contained" onClick={() => {handleUpdate(); refresh(); setchangeInfo(false)}}>提交</Button>
                </Paper>
            </Backdrop>
            <Dialog open={deleteDialog}>
                <DialogTitle>确定删除</DialogTitle>
                <DialogContent>
                    <DialogContentText>你确定要删除这个房间吗？此操作不可逆</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} >取消</Button>
                    <Button onClick={() => {handleDelete(); refresh("广州1号");  setDeleteDialog(false)}}>确定</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}