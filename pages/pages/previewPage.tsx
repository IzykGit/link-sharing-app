import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

import getLinks from '@/lib/getLinks'
import getLinkInfo from '@/lib/getLinkInfo'


import PreviewStyles from "../../styles/Preview.module.css"



const page = () => {
    
    const { data: session } = useSession()

    const [linkInfo, setLinkInfo] = useState()
    const [links, setLinks] = useState()
    const [avatar, setAvatar] = useState("")

    console.log(links)
    console.log(linkInfo)


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

        if(links !== null) {
        return;
        }

        // grabbing cached links
        const cachedLinks = sessionStorage.getItem("cachedLinks")


        // if cached links exists, set them to the links state
        if(cachedLinks) {
        console.log("getting cached links")
        setLinks(JSON.parse(cachedLinks))
        }
        else {

        // if no cached links exists, make a fetch request to get links from db
        const fetchingLinks = async () => {

            console.log("making fetch request")
            const response = await getLinks()

            console.log(response)
            // after links are retrieved, cache them so unnecessary are prevented
            sessionStorage.setItem("cachedLinks", JSON.stringify(response))
            setLinks(response)
        }
        
        fetchingLinks()
        }

    // use session
    }, [session])





    // grabbing link info
    useEffect(() => {

        // if no session, check for local info and return
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


        // grabbing cached info
        const cachedInfo = sessionStorage.getItem("cachedInfo")

        // if cached information exists, set info to the info state
        if(cachedInfo) {

        console.log("getting cached info")
        setLinkInfo(JSON.parse(cachedInfo))
        return;

        }
        else {

        console.log("in else statement")
        // if no cached info exists, make a fetch request to get link info from db
        const fetchingLinks = async () => {

            console.log("making fetch request")

            const response = await getLinkInfo()
            console.log(response)

            // after link info is retrieved, cache them so unnecessary are prevented
            sessionStorage.setItem("cachedInfo", JSON.stringify(response))
            setLinkInfo(response)
        }

        fetchingLinks()
        }


    }, [session])

    useEffect(() => {

        const findAvatar = localStorage.getItem("locallyStoredAvatar")
        if(!findAvatar) {
            console.log("not found")
        }
        else {
            console.log("Avatar:", JSON.parse(findAvatar))
            setAvatar(JSON.parse(findAvatar))
        }
    }, [session])


    return (
        <>
        <div className={PreviewStyles.background_div}></div>
        <header>

        </header>
        <main className={PreviewStyles.main}>
            <div className={PreviewStyles.content_card}>
                <p>content</p>
                <Image alt="" width={50} height={50} src={avatar}/>
            </div>
        </main>
        </>
    )
}

export default page
