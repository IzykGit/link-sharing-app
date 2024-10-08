import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { useRouter } from 'next/router'

import NavStyles from "../../styles/components/Navbar.module.css"

import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { handleCardCookies } from '../../lib/helpers/cookies'


const Navbar = ({ setSteps, steps, linkInfo }: { setSteps: Function, steps: Number, linkInfo: any } ) => {

    const { data: session } = useSession()

    const router = useRouter()


    // checking window width
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


    const windowReload = () => {
        window.location.reload()
    }

    const handleSignOut = () => {

        // clearing session storage to make sure cache does not persist after logout
        sessionStorage.clear()


        // signing out and redirecting back to login page
        signOut({ redirect: false })
        .then(() => {
            handleCardCookies()
            router.push("/");
        })
        .catch((error) => {
            console.error("Error during sign-out:", error);
        });
    }


    const linkIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path fill="" d="M8.523 11.72a.749.749 0 0 1 0 1.063l-.371.371A3.751 3.751 0 1 1 2.847 7.85l1.507-1.506A3.75 3.75 0 0 1 9.5 6.188a.753.753 0 0 1-1 1.125 2.25 2.25 0 0 0-3.086.091L3.908 8.91a2.25 2.25 0 0 0 3.183 3.183l.37-.371a.748.748 0 0 1 1.062 0Zm4.63-8.874a3.756 3.756 0 0 0-5.305 0l-.371.37A.751.751 0 1 0 8.539 4.28l.372-.37a2.25 2.25 0 0 1 3.182 3.182l-1.507 1.507a2.25 2.25 0 0 1-3.086.09.753.753 0 0 0-1 1.125 3.75 3.75 0 0 0 5.144-.152l1.507-1.507a3.756 3.756 0 0 0 .002-5.307v-.001Z"/>
        </svg>
    )

    const profileIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
            <path fill="" d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"/>
        </svg>
    )

    const previewIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path fill="#633CFF" d="M19.61 9.62c-.03-.064-.714-1.583-2.225-3.095-2.023-2.02-4.572-3.088-7.385-3.088-2.812 0-5.362 1.068-7.382 3.088C1.106 8.037.422 9.556.391 9.62a.944.944 0 0 0 0 .761c.029.064.713 1.583 2.226 3.095 2.021 2.02 4.57 3.086 7.383 3.086 2.813 0 5.362-1.067 7.381-3.086 1.513-1.512 2.197-3.03 2.226-3.095a.946.946 0 0 0 .003-.761Zm-3.599 2.578c-1.677 1.651-3.7 2.49-6.01 2.49-2.313 0-4.334-.839-6.01-2.491A10.185 10.185 0 0 1 2.307 10a10.192 10.192 0 0 1 1.686-2.196C5.667 6.15 7.688 5.312 10 5.312s4.333.839 6.009 2.492c.659.652 1.226 1.39 1.685 2.196a10.19 10.19 0 0 1-1.685 2.197h.002Zm-6.01-5.636a3.438 3.438 0 1 0 0 6.876 3.438 3.438 0 0 0 0-6.876Zm0 5A1.562 1.562 0 1 1 10 8.438a1.562 1.562 0 0 1 0 3.124Z"/>
        </svg>
    )

    const logout = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#633CFF">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
        </svg>
    )

    const signin = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#633CFF">
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
        </svg>
    )
    



    return (
        windowWidth > 925 ? (
            <header className={NavStyles.main}>
                <Image src="/assets/images/logo-devlinks-large.svg" alt='dev links' onClick={windowReload} width={146} height={32}/>

                <nav className={NavStyles.links}>
                    <a className={steps !== 1 ? NavStyles.navlink : NavStyles.navlink_active} onClick={() => setSteps(1)}>{linkIcon}Links</a>

                    <a className={steps !== 2 ? NavStyles.navlink : NavStyles.navlink_active} onClick={() => setSteps(2)}>{profileIcon}Profile Details</a>
                </nav>

                <div className={NavStyles.preview_container}>
                    <button type='button' className={NavStyles.preview} onClick={() => router.push("/pages/preview")}>Preview</button>


                    {/* if there is a session display sign out button, if no session display sign in button */}
                    {session && <button type="button" className={NavStyles.preview} onClick={() => handleSignOut()}>Sign Out</button>}
                    {!session && <button type="button" className={NavStyles.preview} onClick={() => handleSignOut()}>Sign In</button>}
                </div>
            </header>
        ) : (
            <header className={NavStyles.main_small}>
                <Image src="/assets/images/logo-devlinks-small.svg" alt='dev links' onClick={windowReload} width={100} height={32}/>

                <nav className={NavStyles.links_small}>
                    <a className={steps !== 1 ? NavStyles.navlink : NavStyles.navlink_active} onClick={() => setSteps(1)}>{linkIcon}</a>

                    <a className={steps !== 2 ? NavStyles.navlink : NavStyles.navlink_active} onClick={() => setSteps(2)}>{profileIcon}</a>
                </nav>

                <div className={NavStyles.preview_container}>
                    <button type='button' className={NavStyles.preview_small} onClick={() => router.push("/pages/preview")}>{previewIcon}</button>


                    {/* if there is a session display sign out button, if no session display sign in button */}
                    {session && <button type="button" className={NavStyles.preview_small} onClick={() => handleSignOut()}>{logout}</button>}
                    {!session && <button type="button" className={NavStyles.preview_small} onClick={() => handleSignOut()}>{signin}</button>}
                </div>
            </header>
        )
    )
}

export default Navbar