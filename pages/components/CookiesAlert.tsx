import React from 'react'

import AlertStyles from "../../styles/components/CookiesAlert.module.css"
import { confirmCookies } from '@/lib/helpers/cookies'

const CookiesAlert = ({ setAcceptedCookies }: any) => {

    const portfolioUrl = "https://www.lancehemphill.com/"

    // setting confirm cookies and changing accepted state
    const confirm = () => {
        confirmCookies()
        setAcceptedCookies(true)
    }

    return (
        <>
            <div className={AlertStyles.background}></div>
            <div className={AlertStyles.alert_wrapper}>

                <div className={AlertStyles.alert_card}>


                    <h2>This site uses cookies!</h2>

                    <p>This website uses cookies to enable specific functions
                    by storing data and tracking user activity. By clicking "Accept,"
                    you consent to the use of all cookies necessary for the website to
                    function correctly and to improve your experience. If you decline,
                    you will be redirected to a different page.
                    </p>

                    <div className={AlertStyles.alert_buttons}>
                        <button type="button" className={AlertStyles.accept_button} onClick={() => confirm()}>Accept</button>
                        <button type="button" className={AlertStyles.decline_button} onClick={() => window.location.href=portfolioUrl}>Decline</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CookiesAlert