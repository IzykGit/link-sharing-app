import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Cookies from 'js-cookie';

import { useSession } from 'next-auth/react';

import { getTempCard } from '@/lib/hooks/getTempCard';
import { getUserCard } from '@/lib/hooks/getUserCard';

import SharedStyles from "../../styles/SharedStyles.module.css"

const Shareable = () => {

    const router = useRouter()
    const { sharedCard } = router.query


    const [card, setCard] = useState(Object)


    
    useEffect(() => {

        if(!router.isReady || !router.query) return;

        const fetchCard = async () => {


            const decodedId = Buffer.from(sharedCard as string, 'base64').toString('utf-8')
            const existingCookie = Cookies.get(`${decodedId.slice(0, 8)}`)

            if(!decodedId) return;


            if(existingCookie) {

                console.log("cookie data exists, do not fetch doc details")
                const parseCookie = JSON.parse(existingCookie)
                setCard(parseCookie)

                return

            }
            else {
                console.log("cookie does not exist, fetching doc details")

                await getTempCard(decodedId).then(response => {
                    console.log(response)
                    Cookies.set(`${decodedId.slice(0, 8)}`, JSON.stringify(response), { expires: 1/8, path: "", sameSite: "strict" })
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
                <div className={SharedStyles.linkInfo}>
                    {/* <Image alt="" width={104} height={104} src={card.avatar} className={SharedStyles.avatar}/> */}
                    <h1>{card.linkInfo?.firstName} {card.linkInfo?.lastName}</h1>
                    <p>{card.linkInfo?.linkEmail}</p>
                </div>
                <div className={SharedStyles.links}>
                    {card.links?.map((link: any) => (
                        <div key={link.url} role="button" className={SharedStyles.button_div} style={{ backgroundColor: `${link.color}` }}>
                            <div>
                                <Image src={link.img} alt='' width={16} height={16} className={SharedStyles.link_image}/>
                                <p>Github</p>
                            </div>
                            <Image src="/assets/images/icon-arrow-right.svg" alt='' width={16} height={16}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </main>
        </>
    )
}

export default Shareable