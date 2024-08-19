import axios from "axios";

export const saveLinkInfo = async (firstName: string, lastName: string, email: string) => {
    
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