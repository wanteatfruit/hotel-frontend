import { Dialog } from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "../styles/HotelPage.module.css";


export default function FloorPlanB({href1, href2}) {

    function loadFloorPlan(){
        document.getElementById("floorplan-frame").contentWindow.setHref(href1,href2);

    }


    return (
        <>
            <iframe className={styles.floorplan} id={"floorplan-frame"} onLoad={loadFloorPlan} src={"/floorplan2.html"} 
                    frameBorder="0"></iframe>
        </>
    )
}