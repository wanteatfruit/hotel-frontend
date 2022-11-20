import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/future/image";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export default function CommentArea() {
    const [allComments, setAllComments] = useState([])
    const [meanScore, setMeanScore] = useState(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps

    async function getComments() {
        let comments = [
            {
                "username": "wc",
                "roomType": "大床房",
                "commentTime": "2022-09-30",
                "score": 8,
                "text": "一般般的酒店，下次不一定还回来",
                "picture1": "/images/hotel.jpg",
                "picture2": "/images/sign-in.jpg",
                "picture3": "/images/sign-up.jpg"
            }
        ]
        // let response = await axios.get('https://mock.apifox.cn/m1/1589145-0-default/comment/1');
        // let comments = response.data
        setAllComments(comments)
        let total = 0
        if (comments.length === 0) {
            setMeanScore("No score yet")
        } else {
            for (let idx in comments) {
                total += comments[idx].score
            }
            setMeanScore((total / comments.length).toFixed(1))
        }
    }

    useEffect(() => {
        getComments()
    }, [])

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
            <main>
                <Grid sx={{
                    width: "80%",
                    height: "100%",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2em",
                    marginTop: "3em"
                }}>
                    <Grid sx={{
                        width: "100%",
                        height: "25%", justifyContent: "flex-start", marginLeft: "10em", marginBottom: "2em"
                    }}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                height: "100%",
                            }}
                        >
                            <Grid sx={{
                                width: "100%",
                                justifyContent: "flex-start",
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "1em"
                            }}
                            >
                                <Image src={"/images/beer-rate.png"} width={50} height={50}
                                       alt={"Our hotel logo!"}></Image>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                        fontSize: 45
                                    }}>{meanScore}分</Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    {allComments.map((comment) => (
                        // eslint-disable-next-line react/jsx-key
                        <Grid sx={{
                            width: "100%",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "0.2em",
                        }}>
                            <Grid sx={{
                                width: "100%",
                                height: "25%",
                                justifyContent: "flex-start",
                                marginLeft: "10em",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        rowGap: "1em",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <Grid sx={{width: "100%"}}><Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 20
                                        }}>{comment.username}</Typography></Grid>
                                    <Grid sx={{display: "flex", flexDirection: "row", columnGap: "5em"}}>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: 20
                                            }}>{comment.commentTime}</Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: 20
                                            }}>{comment.roomType}</Typography>
                                    </Grid>
                                    <Grid sx={{display: "flex", flexDirection: "row", columnGap: "1em"}}>
                                        {getCommentScore(comment.score)}
                                    </Grid>
                                    <Grid><Typography>{comment.text}</Typography></Grid>
                                    <Grid sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        columnGap: "1em",
                                        marginTop: "1em"
                                    }}>
                                        <CardMedia
                                            component='video'
                                            image={"/videos/1.mp4"}
                                            autoPlay
                                            sx={{
                                                width: "250px",
                                                height: "180px"
                                            }}
                                        />
                                        <CardMedia
                                            component='image'
                                            image={comment.picture1}
                                            sx={{
                                                width: "150px",
                                                height: "150px"
                                            }}
                                        />
                                        <CardMedia
                                            component='image'
                                            image={comment.picture2}
                                            sx={{
                                                width: "150px",
                                                height: "150px"
                                            }}
                                        />
                                        <CardMedia
                                            component='image'
                                            image={comment.picture3}
                                            sx={{
                                                width: "150px",
                                                height: "150px"
                                            }}
                                        />
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </>
    )
}