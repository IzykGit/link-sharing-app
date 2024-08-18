import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { signIn, signOut, useSession } from 'next-auth/react';

import SignInStyles from "../../styles/SignIn.module.css";

const logIn = () => {

    const { data: session } = useSession()
    const router = useRouter();

    return (
        <main className={SignInStyles.main}>
            <Image src="/assets/images/logo-devlinks-large.svg" alt='' width={205} height={55}/>


            <div className={SignInStyles.signin_card}>

                <div className={SignInStyles.card_header}>
                    <h1 className={SignInStyles.h1}>Login</h1>
                    <p>Add your details below to get back into the app</p>
                </div>

                <button type='button' onClick={() => signIn("github")} className={SignInStyles.signin_button}><Image src="/assets/images/icon-github.svg" alt='' width={25} height={25}/>Sign in with Github</button>
                <button type='button' onClick={() => router.push("/pages/homePage")} className={SignInStyles.continue_button}>Continue without account</button>

                <div className={SignInStyles.create_account_div}>
                    <p>Don't have an account?</p>
                    <button type='button' onClick={() => signIn("github")}>Create account</button>
                </div>
            </div>
        </main>
    )
}

export default logIn