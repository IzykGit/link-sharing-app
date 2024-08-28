import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Cookies from 'js-cookie';

import { getTempCard } from '@/lib/hooks/getTempCard';

import SharedStyles from "../../styles/SharedStyles.module.css"

const Shareable = () => {

    const router = useRouter()
    const { sharedCard } = router.query


    const [card, setCard] = useState(Object)


    
    useEffect(() => {

        // checking if the router is ready and if query exists
        if(!router.isReady || !router.query) return;

        const fetchCard = async () => {

            // decode the base64 cardId string
            const decodedId = Buffer.from(sharedCard as string, 'base64').toString('utf-8')

            //if there is no sharedCard then return
            if(!decodedId) return;

            // checking if card viewer has this cards share id stored
            const existingCookie = Cookies.get(`shareCookie_${decodedId.slice(0, 8)}`)


            // if the card viewer has viewed this specific card before, then grab the card from the cookie
            if(existingCookie) {

                console.log("cookie data exists, do not fetch doc details")
                const parseCookie = JSON.parse(existingCookie)
                setCard(parseCookie)

                return

            }
            /* if the card viewer has NOT viewed this card before then fetch the card from
            the database and then save it as a cookie */
            else {
                console.log("cookie does not exist, fetching doc details")

                await getTempCard(decodedId).then(response => {

                    console.log(response)
                    console.log("Fetching temp card")
                    

                    // giving all cookies the shareCookie_ prefix so they can easily be handled later
                    Cookies.set(`shareCookie_${decodedId.slice(0, 8)}`, JSON.stringify(response), { expires: 1/8, path: "/", sameSite: "strict" })
                    setCard(response)
                })
                return;

            }
        }

        fetchCard()
        
    }, [router.isReady, sharedCard])




    return (
        <>
        <div className={SharedStyles.background_div}></div>
        <main className={SharedStyles.main}>
            <div className={SharedStyles.content_card}>

                {card ? (
                    <>
                    <div className={SharedStyles.linkInfo}>
                        {/* <Image alt="" width={104} height={104} src={card.avatar} className={SharedStyles.avatar}/> */}
                        <p style={{ opacity: 0.5 }}>Avatars not available at this time</p>
                        <h1>{card.firstName} {card.lastName}</h1>
                        <p>{card.linkEmail}</p>
                        </div>
                        <div className={SharedStyles.links}>
                            {card.links?.map((link: any) => (
                                <div key={link.url} role="button" className={SharedStyles.button_div} style={{ backgroundColor: `${link.color}` }}
                                onClick={() => window.open(link.url, "_blank")}>
                                    <div>
                                        <Image src={link.img} alt='' width={16} height={16} className={SharedStyles.link_image}/>
                                        <p>{link.platform}</p>
                                    </div>
                                    <Image src="/assets/images/icon-arrow-right.svg" alt='' width={16} height={16}/>
                                </div>
                            ))}
                    </div>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}

                
            </div>
        </main>
        </>
    )
}

export default Shareable