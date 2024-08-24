import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getLinks from "@/lib/getLinks";




interface Links {
    id: number,
    platform: string,
    url: string,
    img: string,
    color: string
}

export const DetermineLinks = (session: any) => {


    const [links, setLinks] = useState<Links[]>([])

    // grabbing links
    useEffect(() => {


        // if no session, check for local links and return
        if (!session) {
        console.log('No session available');
        

        const localLinks = localStorage.getItem("locallyStoredLinks")

        if(localLinks) {
            console.log("getting locally stored links")
            setLinks(JSON.parse(localLinks))
            return
        }


        return;
        }

        if(links.length !== 0) {
        return;
        }

        // grabbing stored links
        const cachedLinks = sessionStorage.getItem("cachedLinks")


        // if session stored links exists, set them to the links state
        if(cachedLinks) {
        console.log("getting cached links")
        setLinks(JSON.parse(cachedLinks))
        }
        else {

        // if no session stored links exists, make a fetch request to get links from db
        const fetchingLinks = async () => {

            console.log("making fetch request")
            const response = await getLinks()

            console.log(response)
            // after links are retrieved, store them so unnecessary fetches are prevented
            sessionStorage.setItem("cachedLinks", JSON.stringify(response))
            setLinks(response)
        }
        
        fetchingLinks()
        }

    // use session
    }, [session])


    return links
}
