import axios from "axios";
import Cookies from "js-cookie";

export const saveLinkInfo = async (firstName: string, lastName: string, email: string) => {

    const saveCookie = Cookies.get("saveCookies");

    // if user has no more saves then return
    if(saveCookie == "0") {
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