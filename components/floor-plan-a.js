import React, {useEffect, useState} from "react";


export default function FloorPlanA({href1, href2}) {

    useEffect(() => {
        if(typeof(window)!==undefined){
            document.getElementById("floorplan-frame").contentWindow.setHref(href1, href2);
        }
    }, [href1, href2, typeof(window)])


    return (
        <>
            <iframe id={"floorplan-frame"} src={"/floorplan1.html"} height={"400px"} width={"600px"}
                    frameBorder="0"></iframe>
        </>
    )
}