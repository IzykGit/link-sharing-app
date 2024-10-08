import axios from "axios";

// grabbing links
const getLinks = async () => {

    try {

        const response = await axios({
            method: "GET",
            url: "/api/getLinksApi"
        })
        
        return response.data.links
    }
    catch (error) {
        console.log(error)
    }
}

export default getLinks;