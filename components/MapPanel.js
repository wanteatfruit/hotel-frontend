import { Backdrop } from "@mui/material";

export default function MapPanel({open}){
    return(
        <Backdrop open={open} sx={{zIndex:1000}}>
        <iframe src={"map.html"} id="city_map" height="500" width="600" frameBorder="0"></iframe>
        </Backdrop>
    )
}