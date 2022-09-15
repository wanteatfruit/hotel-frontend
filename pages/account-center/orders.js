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


export default function Orders() {
    const [mode, setMode] = useState(0);

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
        let rooms, actions;
        if (mode) {
            rooms = getFinishedInfo();
            actions = (
                <>
                    <CardActions>
                        <Button size="medium">详情</Button>
                        <Button size="medium">评价</Button>
                    </CardActions>
                </>
            )
        } else {
            rooms = getBookedInfo();
            actions = (
                <>
                    <CardActions>
                        <Button size="medium">详情</Button>
                        <Button size="medium">修改订单</Button>
                    </CardActions>
                </>
            )
        }

        return (
            <>
                <Grid container spacing={4}>
                    {rooms.map((room) => (
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
                                    image="https://source.unsplash.com/random"
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
                                {actions}
                            </Card>
                        </Grid>
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