import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Cookies from 'js-cookie';

import { signIn } from 'next-auth/react';

import SignInStyles from "../../styles/SignIn.module.css";
import CookiesAlert from '../components/CookiesAlert';

const LogIn = () => {

    const router = useRouter();

    const consentCookie = Cookies.get("confirmCookie")

    const [acceptedCookies, setAcceptedCookies] = useState(false)


    // checking if the use has consented to cookies
    useEffect(() => {
        if(consentCookie) {
            setAcceptedCookies(true)
        }
        else {
            setAcceptedCookies(false)
        }
    }, [consentCookie])



    return (
        <>
        {/* if user has not consented to cookies, then display cookie policy */}
        {!acceptedCookies && <CookiesAlert setAcceptedCookies={setAcceptedCookies}/>}
        <main className={SignInStyles.main}>

            <Image src="/assets/images/logo-devlinks-large.svg" alt='' width={205} height={55}/>


            <div className={SignInStyles.signin_card}>

                <div className={SignInStyles.card_header}>
                    <h1 className={SignInStyles.h1}>Login</h1>
                    <p>Add your details below to get back into the app</p>
                </div>

                <button type='button' onClick={() => signIn("github")} className={SignInStyles.signin_button}><Image src="/assets/images/icon-github.svg" alt='' width={25} height={25}/>Sign in with Github</button>
                <button type='button' onClick={() => router.push("/pages/home")} className={SignInStyles.continue_button}>Continue without account</button>

                <div className={SignInStyles.create_account_div}>
                    <p>Don't have an account?</p>
                    <button type='button' onClick={() => signIn("github")}>Create account</button>
                </div>
            </div>
        </main>
        </>
    )
}

export default LogIn