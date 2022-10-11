import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import styles from "../styles/RoomCard.module.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from "next/image";
export default function RoomCard({ roomName, imageUrl, description, hotelName }) {
    return (
        <Card>
            <CardMedia component='img' src={imageUrl}
                height="400px">

            </CardMedia>
            <CardContent sx={{ paddingBottom: '0px' }}>
                <Typography variant="h5" sx={{ paddingBottom: '4px' }}>{roomName}</Typography>
                <Typography variant="body1">{description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <div>
                    <Button href={`/hotels/rooms/${roomName}`}>更多</Button>
                    <Button variant="contained">订房</Button>
                </div>
            </CardActions>
        </Card>
    )
}