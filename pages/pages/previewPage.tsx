import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';



import Cookies from "js-cookie"


import Image from 'next/image';

import PreviewStyles from "../../styles/Preview.module.css"

import DetermineInfo from '../hooks/determineInfo';
import DetermineLinks from '../hooks/determineLinks';
import DetermineAvatar from '../hooks/determineAvatar';
import { createTempCard } from '@/lib/hooks/createTempCard';



const Preview = () => {
    
    const { data: session } = useSession()

    const router = useRouter()

    const cardId  = Cookies.get("cardId")

    
    const linkInfo = DetermineInfo(session)
    const links = DetermineLinks(session)
    const avatar = DetermineAvatar(session)



    const shareCard = async () => {
            
        if (cardId) {

            console.log("card id exists, do not create new temp doc")
            const sharedCard = Buffer.from(cardId).toString('base64')
            const genUrl = uuidv4()
            router.push({
                pathname: `/pages/${genUrl}`,
                query: { sharedCard }
            })
            return

        } 
        else {

            
            console.log("Card id does not exist, create new temp doc")
            await createTempCard({ links, linkInfo, avatar }).then(response => {
                const sharedCard = Buffer.from(response.cardId).toString('base64')
                const genUrl = uuidv4()
                router.push({
                    pathname: `/pages/${genUrl}`,
                    query: { sharedCard }
                })
            })
        }
    
    }

    return (
        <>
        <div className={PreviewStyles.background_div}></div>

        <div className={PreviewStyles.wrapper}>


            <header className={PreviewStyles.preview_header}>

                <button type='button' className={PreviewStyles.editor_return} onClick={() => router.push("/pages/homePage")}>Back to Editor</button>

                <button type="button" className={PreviewStyles.share_button} onClick={() => shareCard()}>Share</button>

            </header>
            <main className={PreviewStyles.main}>
                <div className={PreviewStyles.content_card}>

                    <div className={PreviewStyles.linkInfo}>
                        <Image alt="" width={104} height={104} src={avatar} className={PreviewStyles.avatar}/>
                        <h1>{linkInfo?.firstName} {linkInfo?.lastName}</h1>
                        <p>{linkInfo?.linkEmail}</p>
                    </div>

                    <div className={PreviewStyles.links}>
                        {links?.map((link: any) => (
                            <div key={link.url} role="button" className={PreviewStyles.button_div} style={{ backgroundColor: `${link.color}` }}>
                                <div>
                                    <Image src={link.img} alt='' width={16} height={16} className={PreviewStyles.link_image}/>
                                    <p>Github</p>
                                </div>

                                <Image src="/assets/images/icon-arrow-right.svg" alt='' width={16} height={16}/>
                            </div>
                        ))}

                    </div>
                    
                </div>
            </main>

        </div>
        </>
    )
}

export default Preview
