import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {Dialog, DialogContent, Divider} from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import {useState} from "react";

export default function Store() {
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [roomOnDialog, setRoomOnDialog] = useState("");

    function getFinishedInfo() {
        let room_list = [];
        let room_a = ['上海黄埔W酒店', '花园房'];
        room_list.push(room_a);
        return room_list;
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
                    PaperProps={{sx: {position: "fixed", right: 10, width: "100%", height: "100%", maxWidth: "md"}}}
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

    let rooms = getFinishedInfo();
    return (
        <>
            {roomInfoDialog()}
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
                            </CardContent>
                            <CardActions>
                                <Button size="medium" onClick={() => {
                                    setInfoDialogOpen(true)
                                    setRoomOnDialog(room)
                                }}>详情</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}