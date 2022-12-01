import AdminLayout from "../../components/AdminLayout";
import AdminRooms from "../../components/AdminRooms";
import axios from "axios";
export async function getStaticProps() {
    const hotel_response = await axios.get('http://10.26.111.227:8888/hotel/getAll');
    const hotel_list = hotel_response.data
    return {
        props: {
            hotel_list
        },
        revalidate: 10
    }
  }
export default function AdRooms({hotel_list}){
    return(
        <AdminLayout>
            <AdminRooms hotel_list={hotel_list}/>
        </AdminLayout>
    )
}