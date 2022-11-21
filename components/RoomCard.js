import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Icon, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import styles from "../styles/RoomCard.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from "next/image";
import React from "react";
import { CheckBox, ColorLensSharp } from "@mui/icons-material";
export default function RoomCard({ imageUrl, description, hotelName, admin, roomInfo }) {

    const [changeInfo, setchangeInfo] = React.useState(false)
    const [roomName, setRoomName] = React.useState(roomInfo === undefined ? "" : roomInfo.roomname)
    const [roomPrice, setRoomPrice] = React.useState(roomInfo === undefined ? "" : roomInfo.price)
    const [roomIntro, setRoomIntro] = React.useState([false, false, false])
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
        console.log(roomIntro)
    }

    React.useEffect(() => {
        handleIntroduction()
    }, [changeInfo])


    function handleSubmit() { //handle post request here

    }

    return (
        <>
            <Card>
                <CardMedia component='img' src={imageUrl}
                    height="400px">

                </CardMedia>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <CardContent sx={{ paddingBottom: '0px' }}>
                    <Typography variant="h5" sx={{ paddingBottom: '4px' }}>{roomName}</Typography>
                    <Typography variant="body1">{`每晚 ${roomPrice}元`}</Typography>

                </CardContent>
                <CardContent>
                <FormGroup sx={{ flexDirection:'row'}}>
                        <FormControlLabel control={<Checkbox readOnly checked={roomIntro[0]}  />} label="窗户" />
                        <FormControlLabel control={<Checkbox  readOnly checked={roomIntro[1]}  />} label="阳台" />
                        <FormControlLabel control={<Checkbox readOnly checked={roomIntro[2]}  />} label="洗衣房" />
                    </FormGroup>

                </CardContent>
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
                            <Button>删除房间</Button>
                        </div>

                    </CardActions>
                }
            </Card>
            <Backdrop open={changeInfo} sx={{ zIndex: 10000 }}>
                <Paper onSubmit={handleSubmit} sx={{ width: 'max-content', padding: 2 }} component='form'>
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
                        <Typography variant="h6">杂项</Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={roomIntro[0]} onChange={(event) => setRoomIntro([event.target.checked, roomIntro[1], roomIntro[2]])} />} label="窗户" />
                            <FormControlLabel control={<Checkbox checked={roomIntro[1]} onChange={(event) => setRoomIntro([roomIntro[0], event.target.checked, roomIntro[2]])} />} label="阳台" />
                            <FormControlLabel control={<Checkbox checked={roomIntro[2]} onChange={(event) => setRoomIntro([roomIntro[0], roomIntro[1], event.target.checked])} />} label="洗衣房" />
                        </FormGroup>
                    </Stack>
                    <Button onClick={() => setchangeInfo(false)}>取消</Button>
                    <Button variant="contained" onClick={() => console.log(roomIntro)}>提交</Button>
                </Paper>
            </Backdrop>
        </>
    )
}