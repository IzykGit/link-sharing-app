import axios from "axios";

interface Links {
    id: number,
    platform: string,
    url: string,
    img: string,
    color: string
}

export const createTempCard = async ({ links, linkInfo, avatar }: { links: Array<Links>, linkInfo: any, avatar: string }) => {

    try {

        const response = await axios({
            method: "POST",
            url: "/api/createTempCardApi",
            data: { links, linkInfo }
        })

        console.log(response.data)
        return response.data

    }
    catch (error) {

        console.log(error)

    }
}