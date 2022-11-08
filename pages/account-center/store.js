import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Layout from "../../components/Layout";
import {useState} from "react";
import {Dialog, DialogContent, TextField} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getMerchandiseInfo() {
    let merchandise_list = [];
    let merchandise_a = ['大床房一晚', '免费住一晚！', '2000'];
    let merchandise_b = ['喜来登大白兔', '我们的酒店公仔！', '500'];
    merchandise_list.push(merchandise_a);
    merchandise_list.push(merchandise_b);
    return merchandise_list;
}


export default function Store() {
    let merchandiseList = getMerchandiseInfo();
    const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
    const [merchandiseOnDialog, setMerchandiseOnDialog] = useState("")

    const purchaseOnClick = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const telephone = data.get('telephone');
        console.log(telephone)
    }

    function purchaseDialog() {
        return (
            <>
                <Dialog open={purchaseDialogOpen} onClose={() => setPurchaseDialogOpen(false)}
                        PaperProps={{
                            sx: {
                                position: "fixed",
                                width: "100%",
                                height: "100%",
                                maxWidth: "sm",
                                maxHeight: "sm"
                            }
                        }}>
                    <DialogContent>
                        <Grid container component="main" sx={{height: '100%', width: '100%'}}>
                            <CssBaseline/>
                            <Grid
                                item
                                width={"100%"}
                                height={"100%"}
                                // marginBottom={"10px"}
                                sx={{
                                    backgroundImage: 'url(/images/sign-in.jpg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid width={"100%"} component={Paper} elevation={6} square>
                                <Box container width={"100%"} justifyContent={"center"} my={8}>
                                    <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                                        <typography>您拥有xxx积分</typography>
                                    </Box>
                                    <Box sx={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
                                        <typography>本次兑换消耗yyy积分</typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box component="form" noValidate onSubmit={purchaseOnClick} sx={{mt: 3}}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="姓名"
                                            name="username"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="address"
                                            label="地址"
                                            id="address"
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="telephone"
                                            label="电话"
                                            id="telephone"
                                        />
                                        {/*<Button onClick={() => {setPurchaseDialogOpen(false)}}>取消</Button>*/}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant=" contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            兑换
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    return (
        <Layout>
            <main>
                {purchaseDialog()}
                <Box
                    sx={{
                        bgcolor: ' background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            商城
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            您可以用积分换购商品
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{py: 2}} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {merchandiseList.map((merchandise) => (
                            <Grid item key={merchandise[0]} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{height: "100%", display: ' flex', flexDirection: ' column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            height: "250px"
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {merchandise[0]}
                                        </Typography>
                                        <Typography>
                                            {merchandise[1]}
                                        </Typography>
                                        <Typography>
                                            {merchandise[2]}积分
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => setPurchaseDialogOpen(true)}>购买</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </Layout>
    );
}