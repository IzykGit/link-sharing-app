import { handleShareCookies } from "@/lib/helpers/cookies";
import axios from "axios";

export const updateLinks = async (inputFields: any) => {

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