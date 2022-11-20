import AdminDashboard from "../../components/AdminDashboard";
import AdminLayout from "../../components/AdminLayout";
import axios from "axios";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// export async function getStaticProps() {
//   const hot_city_resp = await axios.get(
//     "http://120.25.216.186:8888/manager/hotCity"
//   );
//   const hot_hotel_resp = await axios.get(
//     "http://120.25.216.186:8888/manager/hotHotel"
//   );
//   const hot_room_resp = await axios.get(
//     "http://120.25.216.186:8888/manager/hotRoomType"
//   );
//   const ordered_cnt_resp = await axios.get(
//     "http://120.25.216.186:8888/manager/orderedRoomNums"
//   );
//   const cur_customer_resp = await axios.get(
//     "http://120.25.216.186:8888/manager/currentCustomer"
//   );
//   const time_series_resp = await axios.get(
//     "http://120.25.216.186:8888/manager/sales"
//   );

//   const hot_city = hot_city_resp.data;
//   const hot_hotel = hot_hotel_resp.data;
//   const hot_room = hot_room_resp.data;
//   const cur_customer = cur_customer_resp.data;
//   const ordered_cnt = ordered_cnt_resp.data;
//   const sales_stat = time_series_resp.data;

//   console.log(ordered_cnt);

//   return {
//     props: {
//       hot_city,
//       hot_hotel,
//       hot_room,
//       cur_customer,
//       ordered_cnt,
//       sales_stat,
//     },
//     revalidate:10
//   };
// }

export default function AdDashboard({}) {
  return (
    <>
      <AdminLayout>
        <AdminDashboard
        />
      </AdminLayout>
    </>
  );
}
