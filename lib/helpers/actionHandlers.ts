
import axios from "axios"
import Cookies from "js-cookie"
import { handleCardCookies } from "./cookies";




export const saveActionHandler = async () => {

    handleCardCookies()


    // if user has not shared a card then return
    const cardId = Cookies.get("cardId")
    if(!cardId) return;


    // if user has created a card, then delete their last shared card to prevent overlapping values when sharing again
    try {

        console.log("deleting last temp card")
        await axios({
            method: "DELETE",
            url: "/api/delTempCardApi",
        })

    }
    catch (error) {
        console.log(error)
    }

}

