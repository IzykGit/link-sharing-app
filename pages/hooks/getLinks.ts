import axios from "axios";

const getLinks = async () => {

    try {

        const response = await axios({
            method: "GET",
            url: "/api/getLinksApi"
        })

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export default getLinks;