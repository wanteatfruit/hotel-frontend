import { useRouter } from "next/router";

export default function RoomDetails(){
    const router = useRouter()
    const id = router.query.id;
    return(
        <div>{id}</div>
    )
}