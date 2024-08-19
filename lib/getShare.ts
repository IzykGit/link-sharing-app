import axios from "axios";

export const getShare = async () => {
    
    try {

        const response = await axios.get("/api/profileApi")

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}