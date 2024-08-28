import axios from "axios";

// grabbing temp doc
export const getTempCard = async (tempDocId: string) => {

    try {

        const response = await axios({
            method: "GET",
            url: "/api/getTempCardApi",
            params: { tempDocId }
        })


        return response.data

    }
    catch (error) {

        console.log(error)

    }
}