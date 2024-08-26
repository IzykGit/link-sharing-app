import { useEffect, useState } from "react";
import getLinkInfo from "@/lib/hooks/getLinkInfo";
import { useSession } from "next-auth/react";


interface Info {
    firstName: string,
    lastName: string,
    linkEmail: string
}
  


export const DetermineInfo = () => {


    const [linkInfo, setLinkInfo] = useState<Info | null>(null)
    const { status } = useSession();

    // grabbing link info
    useEffect(() => {

        // waiting for the session to be fully loaded
        if (status === "loading") return;

        // if no session, check for locally stored info and return
        if (status === "unauthenticated") {
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


    }, [status])


    return linkInfo
}

