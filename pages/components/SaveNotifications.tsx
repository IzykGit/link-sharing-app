import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'

import { motion } from "framer-motion"

import Image from 'next/image'

import SaveStyles from "../../styles/components/SaveNotifications.module.css"
import SaveIcon from '../../public/assets/images/icon-changes-saved.svg'
import { notificationVariants } from '@/lib/framerMotion'

const SaveNotifications = ({ showNotification }: any) => {

    const { data: session } = useSession()

    const [saveCookies, setSaveCookies] = useState(Cookies.get('saveCookies'))

    if(session) {
        console.log(`Signed in user have ${saveCookies} left`)
    }
    else {
        console.log("No signed in user, no save cookies to track")
    }

    useEffect(() => {
        const cookiesValue = Cookies.get('saveCookies')
        setSaveCookies(cookiesValue);
        console.log(showNotification)
    }, [showNotification])


    return (
        <motion.div className={SaveStyles.alert_card} variants={notificationVariants} animate={showNotification ? "open" : "close"}>
            <Image src={SaveIcon} alt='' width={25} height={25}/>
            {session ? (

                saveCookies! !== "0" ? (
                    <p className={SaveStyles.notification_text}>Your changes have been saved! You have {saveCookies}/5 saves left!</p>
                ) : (
                    <p className={SaveStyles.notification_text}>You've run out of saves! Don't worry, you'll have more tomorrow!</p>
                )

            ) : (
                <p className={SaveStyles.notification_text}>Your changes have been saved!</p>
            )}
        </motion.div>

    )
}

export default SaveNotifications