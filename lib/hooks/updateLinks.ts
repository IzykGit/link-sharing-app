import Cookies from "js-cookie";
import axios from "axios";

// updating links
export const updateLinks = async (inputFields: any) => {

    const saveCookie = Cookies.get("saveCookies");

    // if user has no more saves then return
    if(saveCookie == "0") {
        console.log("No saves left, skipping save")
        return;
    }

    try {

        const response = await axios.put("/api/saveLinksApi", inputFields, { headers: { "Content-Type": "application/json" } }
        )

        console.log(response.data)
        return response.status
    }
    catch (error) {
        console.log(error)
    }
    
}