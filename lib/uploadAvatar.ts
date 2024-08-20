import axios from "axios";

export async function uploadAvatar(file: File) {
    
    console.log(file)

    try {

        const response = await axios({
            method: "POST",
            url: "/api/uploadAvatarApi",
            data: file
        })

        console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}