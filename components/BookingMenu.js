import { Drawer,Button } from "@mui/material";
import React from "react"

export default function Booking(){
    const [drawerOpen, setDrawerOpen] =React.useState(false);
    const handleDrawerToggle=()=>{
        setDrawerOpen(!drawerOpen);
    }
    return (
      <>
        <Button color="error" size="large" variant="contained" onClick={handleDrawerToggle}>
          Book
        </Button>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} sx={{zIndex:200}}>
          askak
        </Drawer>
      </>
    );
}