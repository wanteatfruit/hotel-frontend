import { ExpandMoreOutlined } from "@mui/icons-material";
import { Collapse, IconButton, Typography, Avatar, Card, CardContent, CardHeader, Grid, Paper, Rating, CardMedia, CardActionArea, Button, CardActions, Stack, Divider, Backdrop, Dialog, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import React from "react";
import Image from "next/image";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
export default function CommentCard({ comments, meanScore }) {

    const [expanded, setExpanded] = React.useState(false);
    const [zoomPic1, setZoomPic1] = React.useState(false);
    const [zoomPic2, setZoomPic2] = React.useState(false);
    const [zoomPic3, setZoomPic3] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    function getCommentScore(score) {
        let image = null
        let src = "";
        let img_width = 60, img_height = 60
        if (score >= 8) {
            src = "/images/good-score.gif"
            image =
                <Image src={"/images/good-score.gif"} alt={"Good Score"} width={img_width} height={img_height}></Image>
        } else if (score >= 6) {
            src = "/images/soso-score.gif"
            image = <Image src={"/images/soso-score.gif"} alt={"So-so"} width={img_width} height={img_height}></Image>
        } else {
            src = "/images/bad-score.gif"
            image =
                <Image src={"/images/bad-score.gif"} alt={"Bad score"} width={img_width} height={img_height}></Image>
        }
        let scoreTag = <Typography
            sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 40
            }}>{score}分</Typography>
        return src
    }


    function handleZoom() {
        setZoomPic1(true);
    }




    return (
        <>
            <Card elevation={false} sx={{ borderRadius: 0 }}>
                <CardHeader sx={{ paddingBottom: 0 }} avatar={
                    <Avatar variant="rounded" src={getCommentScore(comments.score)}></Avatar>
                } title={comments.roomType} subheader={comments.commentTime.substring(0, 7)}>

                </CardHeader>
                <CardContent>
                    <Typography>{comments.text}</Typography>
                    <Rating value={comments.score} max={10} precision={0.5} readOnly />
                </CardContent>
                <CardActions sx={{ paddingTop: 0, paddingBottom: 2, paddingX: 2, display: { xs: 'none', sm: 'flex' } }}>
                    {comments.picture1 !== null && <Button onClick={handleZoom}   sx={{ backgroundImage: `url(${comments.picture1})`, height: '120px', width: '10vw', backgroundSize: 'cover', borderRadius: 1 }}></Button>}
                    {comments.picture2 !== null && <Button onClick={()=>setZoomPic2(true)} sx={{ backgroundImage: `url(${comments.picture2})`, height: '120px', width: '10vw', backgroundSize: 'cover', borderRadius: 1 }}></Button>}
                    {comments.picture3 !== null && <Button onClick={()=>setZoomPic3(true)} sx={{ backgroundImage: `url(${comments.picture3})`, height: '120px', width: '10vw', backgroundSize: 'cover', borderRadius: 1 }}></Button>}
                    <video style={{ marginLeft: 10 }} src="/videos/1.mp4" height='120' controls ></video>
                </CardActions>
                <CardActions sx={{ paddingY: 0, display: { xs: 'flex', sm: 'none' }, flexDirection: 'column' }}>
                    <ExpandMore expand={expanded} onClick={handleExpandClick}>

                        <ExpandMoreOutlined />
                    </ExpandMore>
                    <Collapse in={expanded} timeout='auto' unmountOnExit>
                        <Stack gap={2} paddingBottom={4}>
                            {comments.picture1 !== null && <Button  sx={{ backgroundImage: `url(${comments.picture1})`, height: '240px', width: '80vw', backgroundSize: 'cover', borderRadius: 1 }}></Button>}
                            {comments.picture2 !== null && <Button  sx={{ backgroundImage: `url(${comments.picture2})`, height: '240px', width: '80vw', backgroundSize: 'cover', borderRadius: 1 }}></Button>}
                            {comments.picture3 !== null && <Button  sx={{ backgroundImage: `url(${comments.picture3})`, height: '240px', width: '80vw', backgroundSize: 'cover', borderRadius: 1 }}></Button>}
                            <video style={{ marginLeft: 0, width: '80vw' }} src="/videos/1.mp4" controls ></video>
                        </Stack>
                    </Collapse>
                </CardActions>
                <Divider sx={{ marginY: 2 }} variant="middle" />
            </Card>
            <Dialog open={zoomPic1}  fullWidth maxWidth='lg'  onClose={() => setZoomPic1(false)} >
                <DialogContent sx={{height:'100vh',backgroundImage: `url(${comments.picture1})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                    {/* <Image src={comments.picture1} /> */}
                </DialogContent>
            </Dialog>
            <Dialog open={zoomPic2}  fullWidth maxWidth='lg'  onClose={() => setZoomPic2(false)} >
                <DialogContent sx={{height:'100vh',backgroundImage: `url(${comments.picture2})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                    {/* <Image src={comments.picture1} /> */}
                </DialogContent>
            </Dialog>
            <Dialog open={zoomPic3}  fullWidth maxWidth='lg'  onClose={() => setZoomPic3(false)} >
                <DialogContent sx={{height:'100vh',backgroundImage: `url(${comments.picture3})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                    {/* <Image src={comments.picture1} /> */}
                </DialogContent>
            </Dialog>
        </>
    )
}