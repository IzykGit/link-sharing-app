import React from 'react'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'

import { motion } from "framer-motion"

import Image from 'next/image'

import ShareStyles from "../../styles/components/SaveNotifications.module.css"
import CopyIcon from '../../public/assets/images/icon-link-copied-to-clipboard.svg'
import { notificationVariants } from '@/lib/framerMotion'

const ShareNotification = ({ showNotification }: any) => {

    const { data: session } = useSession()


    // setting the amount of share cookies available
    const shareCookies = Cookies.get("shareCookies")



    // console.log for debugging
    if(session) {
        console.log(`Signed in user have ${shareCookies} left`)
    }
    else {
        console.log("No signed in user, no save cookies to track")
    }


    return (
        <motion.div className={ShareStyles.alert_card} variants={notificationVariants} animate={showNotification ? "open" : "close"}>
            <Image src={CopyIcon} alt='' width={25} height={25}/>
            {shareCookies! !== "0" ? (
                    <p className={ShareStyles.notification_text}>Your card has been copied! You have {shareCookies}/3 shares left!</p>
                ) : (
                    <p className={ShareStyles.notification_text}>You've run out of shares!</p>
            )}.
        </motion.div>

    )
}

export default ShareNotification