import axios from "axios";
import Cookies from "js-cookie";

export const saveLinkInfo = async (firstName: string, lastName: string, email: string) => {

    const saveCookie = Cookies.get("saveCookies");

    if(saveCookie == "0") {
        console.log("No saves left, skipping save")
        return;
    }

    try {

        const response = await axios({
            method: "POST",
            url: "/api/saveLinkInfoApi",
            data: { firstName, lastName, email }
        })

        return response.data
    }
    catch (error) {
        console.log(error)
    }

}