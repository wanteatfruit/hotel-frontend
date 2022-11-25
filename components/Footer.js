import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export default function Footer() {
    return (
        <AppBar position="relative" elevation={false} sx={{background: 'antiqueWhite', p: 6, zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <div style={{display:'flex', justifyContent:'center'}}>
            <Typography variant="h6" align="center" color="text.secondary">
                酒店管理项目
            </Typography>
            <IconButton sx={{marginBottom:1}} href="https://github.com/wanteatfruit/hotel-frontend">
                <GitHub />
            </IconButton>
            </div>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                安钧文，黄惠慧，王思懿，致新04张嘉浩，张文程
            </Typography>
        </AppBar>
    );
}
