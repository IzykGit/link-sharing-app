import { useEffect, useState } from "react";
import getLinkInfo from "@/lib/hooks/getLinkInfo";


interface Info {
    firstName: string,
    lastName: string,
    linkEmail: string
}
  


export const DetermineInfo = (session: any) => {


    const [linkInfo, setLinkInfo] = useState<Info | null>(null)

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
        const sessionInfo = sessionStorage.getItem("sessionInfo")
    
    // if stored information exists, set info to the info state
        if(sessionInfo) {

            console.log("getting session stored info")
            setLinkInfo(JSON.parse(sessionInfo))
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
            sessionStorage.setItem("sessionInfo", JSON.stringify(response))
            setLinkInfo(response)
        }

        fetchingLinks()
        }


    }, [session])


    return linkInfo
}

