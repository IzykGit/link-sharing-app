import axios from "axios";

const getLinkInfo = async () => {

    try {

        const response = await axios({
            method: "GET",
            url: "/api/getLinkInfoApi"
        })

        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export default getLinkInfo;