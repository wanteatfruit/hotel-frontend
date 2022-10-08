import { Box, Card, CardActions, CardContent, CardMedia, IconButton } from "@mui/material"
import styles from "../styles/RoomCard.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from "next/image";
export default function RoomCard() {
    return (
        <Card>
            <CardMedia component='img' src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            height="400px">
                
            </CardMedia>
            <CardContent>
                {/* <Box sx={{height:'400px',backgroundColor:'transparent'}}> 
                    <Image layout="fill" src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">

                    </Image>
                </Box> */}
            </CardContent>
            <CardActions>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}