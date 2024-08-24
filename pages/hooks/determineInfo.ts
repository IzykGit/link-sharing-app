import { useEffect, useState } from "react";
import getLinkInfo from "@/lib/getLinkInfo";


export const DetermineInfo = (session: any) => {


    const [linkInfo, setLinkInfo] = useState({ firstName: "", lastName: "", linkEmail: "" })

    // grabbing link info
    useEffect(() => {

        // if no session, check for locally stored info and return
        if (!session) {
        console.log('No session available');
            
    
        const localInfo = localStorage.getItem("locallyStoredInfo")
    
        if(localInfo) {
            console.log("getting locally stored info")
            setLinkInfo(JSON.parse(localInfo))
            return
        }
    
    
        return;
        }
    
    
    
        if(linkInfo) return;
    
    
        // grabbing session stored info
        const cachedInfo = sessionStorage.getItem("cachedInfo")
    
    // if stored information exists, set info to the info state
        if(cachedInfo) {

            console.log("getting cached info")
            setLinkInfo(JSON.parse(cachedInfo))
            return;

        }
        else {

        console.log("in else statement")
        // if no stored info exists, make a fetch request to get link info from db
        const fetchingLinks = async () => {

            console.log("making fetch request")

            const response = await getLinkInfo()
            console.log(response)

            // after link info is retrieved, store them so unnecessary fetches are prevented
            sessionStorage.setItem("cachedInfo", JSON.stringify(response))
            setLinkInfo(response)
        }

        fetchingLinks()
        }


    }, [session])


    return linkInfo
}
