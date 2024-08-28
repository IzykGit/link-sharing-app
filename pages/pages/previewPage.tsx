import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';



import Cookies from "js-cookie"


import Image from 'next/image';

import PreviewStyles from "../../styles/Preview.module.css"

import { DetermineInfo } from '@/lib/helpers/determineInfo';
import { DetermineLinks } from '@/lib/helpers/determineLinks';
import { DetermineAvatar } from '@/lib/helpers/determineAvatar';
import { createTempCard } from '@/lib/hooks/createTempCard';
import ShareNotification from '../components/ShareNotification';
import { handleShareCookies } from '@/lib/helpers/cookies';



const Preview = () => {
    
    // getting session
    const { data: session } = useSession()

    const router = useRouter()


    const [showNotification, setShowNotification] = useState(false)

    const [disableShare, setDisableShare] = useState(false)

    // grabbing cardId cookie
    const cardId  = Cookies.get("cardId")
    const shareCookies = Cookies.get("shareCookies")

    // grabbing links, link info, and avatar
    const linkInfo = DetermineInfo()
    const links = DetermineLinks()
    const avatar = DetermineAvatar()

    console.log(shareCookies)

    // when user clicks share, use share function
    const shareCard = async () => {
        setDisableShare(true)

        if(shareCookies === "0") {
            console.log("No shares left")
            return;
        }

        // if there is a cardId cookie, then just go to share page
        if (cardId) {


            handleShareCookies()

            setShowNotification(true)    
            setTimeout(() => {
                setDisableShare(false)
                setShowNotification(false)
            }, 3000)

            console.log("card id exists, do not create new temp doc")

            if(shareCookies === "0") {
                console.log("No shares left")
                return;
            }

            // turn cardId to base64 string for better anonymity 
            const base64CardId = Buffer.from(cardId).toString('base64')

            // generate random url
            const genUrl = uuidv4()

            const copyUrl = `http://localhost:3000/pages/${genUrl}?sharedCard=${base64CardId}`

            // copying the temp docs page to the users clipboard
            await navigator.clipboard.writeText(copyUrl)

            return;
        } 

        // if there is no cardId cookie, then create a temporary card doc in db to be shared
        else {

            handleShareCookies()

            setShowNotification(true)
            setTimeout(() => {
                setDisableShare(false)
                setShowNotification(false)
            }, 3000)

            if(shareCookies === "0") {
                console.log("No shares left")
                return;
            }

            console.log("Card id does not exist, create new temp doc")
            // creating temporary card doc
            await createTempCard({ links, linkInfo, avatar }).then(async (response) => {

                // turn cardId to base64 string for better anonymity 
                const base64CardId = Buffer.from(response.cardId).toString('base64')

                // generating random url
                const genUrl = uuidv4()


                const copyUrl = `http://localhost:3000/pages/${genUrl}?sharedCard=${base64CardId}`
                // copying the temp docs page to the users clipboard
                await navigator.clipboard.writeText(copyUrl)
            })


            return;
        }
    
    }

    return (
        <>
        <div className={PreviewStyles.background_div}></div>

        <div className={PreviewStyles.wrapper}>

            {showNotification && <ShareNotification showNotification={showNotification}/>}
            <header className={PreviewStyles.preview_header}>

                <button type='button' className={PreviewStyles.editor_return} onClick={() => router.push("/pages/homePage")}>Back to Editor</button>

                <button type="button" className={PreviewStyles.share_button} disabled={disableShare} onClick={() => shareCard()}>Share</button>

            </header>
            <main className={PreviewStyles.main}>

                {(linkInfo || links.length > 0) && (
                    <div className={PreviewStyles.content_card}>

                    <div className={PreviewStyles.linkInfo}>
                        {avatar && <Image alt="" width={104} height={104} src={avatar} className={PreviewStyles.avatar}/>}
                        <h1>{linkInfo?.firstName} {linkInfo?.lastName}</h1>
                        <p>{linkInfo?.linkEmail}</p>
                    </div>

                    {links && (
                        <div className={PreviewStyles.links}>
                        {links.map((link: any) => (
                            <div key={link.url} role="button" className={PreviewStyles.button_div} style={{ backgroundColor: `${link.color}` }}>
                                <div>
                                    <Image src={link.img} alt='' width={16} height={16} className={PreviewStyles.link_image}/>
                                    <p>{link.platform}</p>
                                </div>

                                <Image src="/assets/images/icon-arrow-right.svg" alt='' width={16} height={16}/>
                            </div>
                        ))}

                        </div>
                    )}

                    
                    </div>
                )}


            </main>
        </div>
        </>
    )
}

export default Preview
