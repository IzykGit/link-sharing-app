import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const DetermineAvatar = () => {

    const [avatar, setAvatar] = useState("")
    const { status } = useSession();

    useEffect(() => {

        // waiting for the session to be fully loaded
        if (status === "loading") return;

        // if no session, check for locally stored avatar and return
        if (status === "unauthenticated") {
          console.log('No session available');
        
          const localAvatar = localStorage.getItem("locallyStoredAvatar")
    
          if(localAvatar) {
            console.log("getting locally stored info")
            setAvatar(JSON.parse(localAvatar))
            return
          }
    
          return;
        }
    
    
        // grabbing session stored info
        const sessionAvatar = sessionStorage.getItem("sessionAvatar")
    
        // if stored avatar exists, set avatar to the avatar state
        if(sessionAvatar) {
    
          console.log("getting session stored avatar")
          setAvatar(JSON.parse(sessionAvatar))
          return;
    
        }
    
    }, [status])

    return avatar
}

