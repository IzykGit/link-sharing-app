import { useEffect, useState } from "react";

const DetermineAvatar = (session: any) => {

    const [avatar, setAvatar] = useState("")

    useEffect(() => {

        // if no session, check for locally stored avatar and return
        if (!session) {
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
    
    }, [session])

    return avatar
}

export default DetermineAvatar