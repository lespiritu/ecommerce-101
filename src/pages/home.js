
import { useContext } from "react"
import UserContext from "../context/userContext"

export default function Home(){

    const {userData} = useContext(UserContext)
    return(
        <>
            <h1>Home</h1>
            <h3>{userData ?  userData.message : ''}</h3>
            
        </>
    )
}