import React, { useState, useEffect } from 'react'


import PreviewStyles from "../../styles/Preview.module.css"



const page = () => {

    const [profile, setProfile] = useState([])


    return (
        <>
        <div className={PreviewStyles.background_div}></div>
        <header>

        </header>
        <main className={PreviewStyles.main}>
            <div className={PreviewStyles.content_card}>
                <p>content</p>
            </div>
        </main>
        </>
    )
}

export default page