import axios from "axios"

export const getUserCard = async () => {

    try {

        const response = await axios({
            method: "GET",
            url: "/api/getUserCardApi"
        })

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}