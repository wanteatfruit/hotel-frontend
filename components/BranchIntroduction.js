import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function BranchIntro({name,description,url}){ //分店的introduction卡片
    return(
        <Card sx={{display:'flex', width:'95%'}}>
            <Box sx={{display:'flex',flexDirection:'row',width:'max-content'}}>
                <CardMedia component='img' src={url} sx={{width:'60%'}} />
                <CardContent>
                    <Typography variant="caption" sx={{borderColor:'divider',borderBottom:'10px'}}>旅途由此开始</Typography>
                    <Typography variant="h4">{name}</Typography>
                    <hr />
                    <Typography variant="body2">{description}</Typography>
                </CardContent>
            </Box>
        </Card>
    )
}