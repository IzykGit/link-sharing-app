import axios from "axios";
import Cookies from 'js-cookie'

interface Links {
    id: number,
    platform: string,
    url: string,
    img: string,
    color: string
}


// creating new temp card
export const createTempCard = async ({ links, linkInfo, avatar }: { links: Array<Links>, linkInfo: any, avatar: string }) => {


    const shareCookies = Cookies.get("shareCookies")

    // if user has no more shares then return
    if(shareCookies === "0") {
        return;
    }

    try {

        const response = await axios({
            method: "POST",
            url: "/api/createTempCardApi",
            data: { links, linkInfo }
        })

        return response.data

    }
    catch (error) {
        console.log(error)
    }
}