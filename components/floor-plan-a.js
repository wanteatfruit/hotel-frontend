import { Dialog } from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "../styles/HotelPage.module.css";


export default function FloorPlanA({href1, href2}) {
    function loadFloorPlan(href1, href2){
        document.getElementById("floorplan-frame").contentWindow.setHref("www.baidu.com", "www.bing.com");

    }


    return (
        
            <iframe className={styles.floorplan} id={"floorplan-frame"} onLoad={loadFloorPlan} src={"/floorplan1.html"} 
                    frameBorder="0"></iframe>
    )
}