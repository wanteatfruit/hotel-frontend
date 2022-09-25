import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { branchHotels } from "../data";

export default function AdminCheckOrder() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <Card>
          <CardHeader title="Filter" />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <TextField label="订单ID"></TextField>

              <Autocomplete
                options={branchHotels}
                groupBy={(option) => option.city}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="分店" />}
              ></Autocomplete>
              <Button type="submit" variant="contained">
                筛选
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
