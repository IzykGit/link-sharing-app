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


    // when user clicks share, use share function
    const shareCard = async () => {
        setDisableShare(true)

        // if there is a cardId cookie, then just go to share page
        if (cardId) {


            handleShareCookies()

            // show notification for 3 seconds
            setShowNotification(true)    
            setTimeout(() => {
                setDisableShare(false)
                setShowNotification(false)
            }, 3000)

            if(shareCookies === "0") {
                return;
            }

            // turn cardId to base64 string for better anonymity 
            const base64CardId = Buffer.from(cardId).toString('base64')

            // generate random url
            const genUrl = uuidv4()

            const copyUrl = `https://link-sharing-app-yzuc.vercel.app/pages/${genUrl}?sharedCard=${base64CardId}`

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
                return;
            }

            // creating temporary card doc
            await createTempCard({ links, linkInfo, avatar }).then(async (response) => {

                // turn cardId to base64 string for better anonymity 
                const base64CardId = Buffer.from(response.cardId).toString('base64')

                // generating random url
                const genUrl = uuidv4()


                const copyUrl = `https://link-sharing-app-yzuc.vercel.app/pages/${genUrl}?sharedCard=${base64CardId}`
                // copying the temp docs page to the users clipboard
                await navigator.clipboard.writeText(copyUrl)
            })


            return;
        }
    
    }

    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const backIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#633CFF">
            <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
        </svg>
    )

    const shareIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF">
            <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/>
        </svg>
    )

    return (
        <>
        <div className={PreviewStyles.background_div}></div>

        <div className={PreviewStyles.wrapper}>

            {showNotification && <ShareNotification showNotification={showNotification}/>}
            <header className={PreviewStyles.preview_header}>
                {windowWidth > 400 ? (
                    <>
                    <button type='button' className={PreviewStyles.editor_return} onClick={() => router.push("/pages/home")}>Back to Editor</button>
                    <button type="button" className={PreviewStyles.share_button} disabled={disableShare} onClick={() => shareCard()}>Share</button>
                    </>
                ) : (
                    <>
                    <button type='button' className={PreviewStyles.editor_return_icon} onClick={() => router.push("/pages/home")}>{backIcon}</button>
                    <button type="button" className={PreviewStyles.share_button_icon} disabled={disableShare} onClick={() => shareCard()}>{shareIcon}</button>
                    </>
                )}
                

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
