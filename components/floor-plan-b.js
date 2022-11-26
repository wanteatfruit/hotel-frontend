import React, {useEffect, useState} from "react";


export default function FloorPlanB({href1, href2}) {

    function loadFloorPlan(href1, href2){
        document.getElementById("floorplan-frame").contentWindow.setHref("www.baidu.com", "www.bing.com");

    }


    return (
        <>
            <iframe className={styles.floorplan} id={"floorplan-frame"} onLoad={loadFloorPlan} src={"/floorplan2.html"} 
                    frameBorder="0"></iframe>
        </>
    )
}