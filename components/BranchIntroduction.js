import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import {fullScreenHotelImageUrl} from "../data";
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";

export default function BranchIntro({
                                        name,
                                        explanation,
                                        city,
                                        address,
                                        email,
                                        telephone,
                                        hotelInfo,
                                        userID,
                                        markedHotels
                                    }) { //分店的introduction卡片
    let x = Math.floor((Math.random() * 5));
    const [intro, setIntro] = React.useState(['', '', ''])
    const [isMarked, setIsMarked] = useState(false)

    useEffect(() => {
        if (markedHotels.indexOf(hotelInfo.hotelid) !== -1) {
            setIsMarked(true)
        } else {
            setIsMarked(false)
        }
        console.log("marked hotels: ", markedHotels)
    }, [markedHotels, userID])

    function handleIntroduction(info) {
        if (info === undefined) {
            return;
        }
        const intro_full = info.introduction
        const intro_array = intro_full.split(",")
        let intro_after_proc = ['', '', '']
        console.log(intro_array)
        for (const key in intro_array) {
            if (Object.hasOwnProperty.call(intro_array, key)) {
                const element = intro_array[key];
                // console.log(element)
                const yesorno = element.split("|")
                intro_after_proc[key] = yesorno[1]
            }
        }
        setIntro(intro_after_proc)
        console.log(intro)
    }

    // React.useEffect(()=>{
    //     console.log(hotelInfo)
    //     handleIntroduction(hotelInfo)
    // },[])

    async function MarkHotel(isChecked) {
        setIsMarked(isChecked)
        const body = {"userID": Number(userID), "hotelID": hotelInfo.hotelid};
        const options = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log("here: ", body)
        if (isChecked) {
            await fetch("http://120.25.216.186:8888/hotelwishlist/add", options)
                .then((response) => response.text()).then(data => console.log(data))
        } else {
            await fetch("http://120.25.216.186:8888/hotelwishlist/remove", options)
                .then((response) => response.text()).then(data => console.log(data))
        }
        // refreshRooms()
    }

    const pic_url = fullScreenHotelImageUrl[x]
    return (
        <Card sx={{display: 'flex', width: '98%'}} elevation={5}>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column', md: 'row'}, width: 'max-content'}}>
                <CardMedia component='img' src={pic_url} sx={{width: {md: '60%', sm: '100%'}}}/>
                <CardContent>
                    <Typography variant="h4">{hotelInfo.hotelname}</Typography>
                    <hr/>
                    <List>
                        <ListItem disableGutters>
                            <ListItemAvatar>
                                <Avatar>
                                    <LocationCityRoundedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={hotelInfo.cityname}/>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessOutlinedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={hotelInfo.explanation}/>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemAvatar>
                                <Avatar>
                                    <HomeRoundedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={hotelInfo.address}/>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneInTalkRoundedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={hotelInfo.telephone}/>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemAvatar>
                                <Avatar>
                                    <AlternateEmailRoundedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={hotelInfo.email}/>
                        </ListItem>
                    </List>
                </CardContent>
                <Grid
                    sx={{
                        justifyContent: 'flex-end',
                        alignItems: "end",
                        display: "flex",
                        flexDirection: "row"
                    }}>

                    <Typography sx={{marginBottom: "0.55em"}}>收藏</Typography>
                    <Checkbox id="admin" label={"收藏该房间"} checked={isMarked} onChange={(event) => {
                        MarkHotel(event.target.checked)
                    }}/>
                </Grid>
            </Box>
        </Card>
    )
}