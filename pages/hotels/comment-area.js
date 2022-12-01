import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/future/image";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {Divider, IconButton, Tooltip} from "@mui/material";
import {Stack} from "@mui/system";
import CommentCard from "../../components/CommentCard";
import {QuestionMark, QuestionMarkOutlined, StarOutline} from "@mui/icons-material";

export default function CommentArea({hotelName}) {
    const [allComments, setAllComments] = useState('')
    const [meanScore, setMeanScore] = useState(0)
    const [reviewTag, setReviewTag] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps

    async function getComments() {
        if(hotelName===null || hotelName===undefined ||hotelName===''){
            return
        }
        let comments = {}
        await axios.get(`http://10.26.111.227:8888/comment/${hotelName}`,).then((response) => {
            comments = response.data
        }).catch((error) => {
            console.log("error")
        });
        if(comments!==[]){
            setAllComments(comments)
        }
        let total = 0
        if (comments.length === 0) {
            setMeanScore("无评论")
        } else {
            for (let idx in comments) {
                total += comments[idx].score
            }
            setMeanScore((total / comments.length).toFixed(1))
        }
        getReviewTag()
    }

    function getReviewTag() {
        let reviewTag = '暂无评论';
        if (meanScore >= 8) {
            setReviewTag("好评如潮")
            reviewTag = "好评如潮"
        } else if (meanScore >= 6) {
            setReviewTag("多半好评")
            reviewTag = "多半好评"

        } else {
            setReviewTag("褒贬不一")
            reviewTag = "褒贬不一"
        }
        return reviewTag;
    }

    useEffect(() => {
        getComments()
    }, [hotelName])

    function getCommentScore(score) {
        let image = null
        let img_width = 60, img_height = 60
        if (score >= 8) {
            image =
                <Image src={"/images/good-score.gif"} alt={"Good Score"} width={img_width} height={img_height}></Image>
        } else if (score >= 6) {
            image = <Image src={"/images/soso-score.gif"} alt={"So-so"} width={img_width} height={img_height}></Image>
        } else {
            image =
                <Image src={"/images/bad-score.gif"} alt={"Bad score"} width={img_width} height={img_height}></Image>
        }
        let scoreTag = <Typography
            sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 40
            }}>{score}分</Typography>
        return (<>
            <Typography></Typography>
            {scoreTag}
            {image}
        </>)


    }

    return (
        <>
            {allComments !== '' && <Paper elevation={false}>
                <Grid container columns={24} spacing={2} columnSpacing={4}>
                    <Grid item xs={24} sm={24}>
                        <Typography variant="h5">
                            <StarOutline sx={{marginBottom: -0.5}}/>
                            {`${meanScore} · ${allComments.length}条评价`}
                        </Typography>
                        <Divider sx={{pt: 2}} variant="middle"/>
                    </Grid>
                    <Grid item xs={24} sm={24}>
                        <Stack>
                            {allComments.map((item, index) => (
                                <CommentCard key={index} comments={item}/>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>}
            {allComments === '' && <Typography>暂无评论</Typography>}
        </>
    )
}