import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

export default function Footer() {
    return (
        <AppBar position="relative" sx={{background: '#2E3B55', p: 6, zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Something here to give the footer a purpose!
            </Typography>
        </AppBar>
    );
}
