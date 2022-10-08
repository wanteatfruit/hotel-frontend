import { Button, IconButton, Typography } from "@mui/material";
import styles from "../styles/HotelCard.module.css";
import InfoIcon from '@mui/icons-material/Info';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Image from "next/image";
export default function HotelCard({hotelName, imageSrc}) {
    return (
        <div className={styles.card}>
            <Image
                src={imageSrc}
                // width="400px"
                // height="300px"
                layout="fill"
                 />
            <div className={styles.info}>
                <IconButton>
                    <InfoIcon />
                </IconButton>
            </div>

            <Typography sx={{ zIndex:2, position: 'absolute', bottom: 50,  color: 'white' }}
                variant="h3">{hotelName}</Typography>
            <Button variant="contained" sx={{ color: 'black', backgroundColor: 'antiquewhite', position: 'absolute', bottom: 0, zIndex: 2, borderRadius:0 }}>查看更多</Button>
        </div>
    )
}