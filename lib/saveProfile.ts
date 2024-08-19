import axios from "axios";

export const saveShare = async (firstName: string, lastName: string) => {
    
    try {

        const response = await axios({
            method: "POST",
            url: "/api/saveCreatedShare",
            data: { firstName, lastName }
        })

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}