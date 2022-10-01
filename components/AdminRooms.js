import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { Stack } from "@mui/system";
import { roomPageItem } from "../data";
import SearchIcon from "@mui/icons-material/Search";

import React from "react";

export default function AdminRooms({}) {
  const [citySelect, setCitySelect] = React.useState({
    sz: false,
    gz: false,
    cq: false,
    sh: false,
  });
  const handleCityChange = (event) => {
    setCitySelect({
      ...citySelect,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Paper >
      <Grid container columns={16} sx={{padding:1}}>
        <Grid item xs={16} md={12}>
          <Stack
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            gap={2}
            padding={1}
          >
            <Typography variant="h5">房间信息</Typography>
            <FormControl>
              <InputLabel>搜索房型</InputLabel>
              <OutlinedInput 
                sx={{width:400}}
                label="搜索房型"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl>
          </Stack>
          <Grid container>
            {roomPageItem.length > 0 ? (
              roomPageItem.map((item) => (
                <Grid key={item} item xs={12} md={6} lg={4} xl={3}></Grid>
              ))
            ) : (
              <Grid container justifyContent="center" padding={3}>
                <Typography variant="body2">No Rooms</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item sm={0} md={4} sx={{}}>
          <Stack padding="8px" sx={{display:'flex',justifyContent:'center'}}>
            
            <FormLabel>选择城市</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="深圳"
                control={
                  <Checkbox
                    checked={citySelect.sz}
                    onChange={handleCityChange}
                    name="sz"
                  />
                }
              />
              <FormControlLabel
                label="广州"
                control={
                  <Checkbox
                    checked={citySelect.gz}
                    onChange={handleCityChange}
                    name="gz"
                  />
                }
              />
              <FormControlLabel
                label="重庆"
                control={
                  <Checkbox
                    checked={citySelect.cq}
                    onChange={handleCityChange}
                    name="cq"
                  />
                }
              />
              <FormControlLabel
                label="上海"
                control={
                  <Checkbox
                    checked={citySelect.sh}
                    onChange={handleCityChange}
                    name="sh"
                  />
                }
              />
            </FormGroup>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
