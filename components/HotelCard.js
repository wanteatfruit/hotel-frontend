import { Button, IconButton, Typography } from "@mui/material";
import styles from "../styles/HotelCard.module.css";
import InfoIcon from '@mui/icons-material/Info';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Image from "next/image";
import Link from "next/link";
//hotelName为卡片上显示的字，imageSrc为图片地址，尽量在pexels.com上找图，
//用其他网站的图片需要在next.config里设置域名
export default function HotelCard({hotelName, imageSrc, city,}) {
    return (
        <Link href={`/hotels/${hotelName}`}>
        <div className={styles.card}>
            <Image
                src={imageSrc}
                layout="fill"
                priority
                 />
            <div className={styles.info}>
                <IconButton>
                    <InfoIcon />
                </IconButton>
            </div>

            <Typography sx={{ zIndex:2, position: 'absolute', bottom: 50,  color: 'white' }}
                variant="h3">{hotelName}</Typography>
            {/* <Button href={`/hotels/${hotelName}`} variant="contained" sx={{ color: 'black', backgroundColor: 'antiquewhite', position: 'absolute', bottom: 10, right:10, zIndex: 2, borderRadius:5 }}>查看更多</Button> */}
        </div>
        </Link>
    )
}