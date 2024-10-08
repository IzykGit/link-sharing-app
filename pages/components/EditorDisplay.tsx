"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { useSession } from 'next-auth/react'

import EditorDisplayStyles from "../../styles/components/EditorDisplay.module.css"



const EditorDisplay = ({ links, linkInfo, steps, avatar }: { links: any, linkInfo: any, steps: number, avatar: string }) => {

    const { data: session } = useSession()

    const [displayLinks, setDisplayLinks] = useState(links || [])
    const [displayInfo, setDisplayInfo] = useState(linkInfo || {})

    useEffect(() => {
        if (links) {
            setDisplayLinks(links)
        }
    }, [links])

    useEffect(() => {
        if (linkInfo) {
            setDisplayInfo(linkInfo)
        }
    }, [linkInfo])

    return (
        <section className={EditorDisplayStyles.editor_main}>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632" className={EditorDisplayStyles.svg}>
                <path stroke="#737373" d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"/>
                <path fill="#fff" stroke="#737373" d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"/>
                
                {!avatar ? (
                    <circle cx="153.5" cy="112" r="48" fill="#EEE"/>
                ) : (
                    <foreignObject x="104.5" y="64" width="193" height="193">
                        <Image src={avatar} alt='' width={96} height={96} style={{ borderRadius: "100%", border: "3px solid #633CFF"}}/>
                    </foreignObject>
                )}



                {!(displayInfo?.firstName || displayInfo?.lastName) ? (
                    <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8"/>
                ) : (
                    <foreignObject width="250" height="42" x="33.5" y="185" className={EditorDisplayStyles.display_name}>
                        {displayInfo.firstName} {displayInfo.lastName}
                    </foreignObject>
                )}
                
                {!displayInfo?.linkEmail ? (
                    <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4"/>
                ) : (
                    <foreignObject width="237" height="44" x="35" y="214" className={EditorDisplayStyles.display_email}>{displayInfo.linkEmail}</foreignObject>
                )}


                {(steps === 1 || displayLinks[0]) && (
                    <>
                    <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8"/>
                    
                    {displayLinks[0] && (
                        
                        <foreignObject width="237" height="44" x="35" y="278" className={EditorDisplayStyles.foreignObject}>

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: displayLinks[0].color }}
                            onClick={() => window.open(displayLinks[0].url, "_blank")}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={displayLinks[0].img} alt='' width={12.5} height={14.5}/>
                                    <p>{displayLinks[0].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>
                    )}
                    </>
                )}

                {(steps === 1 || displayLinks[1]) && (
                    <>
                    <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8"/>

                    {displayLinks[1] && (
                        
                        <foreignObject width="237" height="44" x="35" y="342">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: displayLinks[1].color }}
                            onClick={() => window.open(displayLinks[1].url, "_blank")}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={displayLinks[1].img} alt='' width={12.5} height={14.5}/>
                                    <p>{displayLinks[1].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>
                    )}
                    </>
                )}
                
                {(steps === 1 || displayLinks[2]) && (
                    <>
                    <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8"/>
                    {displayLinks[2] && (
                    
                        <foreignObject width="237" height="44" x="35" y="406">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: displayLinks[2].color }}
                            onClick={() => window.open(displayLinks[2].url, "_blank")}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={displayLinks[2].img} alt='' width={12.5} height={14.5}/>
                                    <p>{displayLinks[2].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>

                    )}
                    </>
                )}

                {(steps === 1 || displayLinks[3]) && (
                    <>
                    <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8"/>
                    {displayLinks[3] && (

                    <foreignObject width="237" height="44" x="35" y="470">

                        <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: displayLinks[3].color }}
                        onClick={() => window.open(displayLinks[3].url, "_blank")}>

                            <div className={EditorDisplayStyles.platform}>
                                <Image src={displayLinks[3].img} alt='' width={12.5} height={14.5}/>
                                <p>{displayLinks[3].platform}</p>
                            </div>


                            <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                        </div>

                    </foreignObject>
                    )}
                    </>
                )}
                

                {(steps === 1 || displayLinks[4]) && (
                    <>
                    <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8"/>
                    {displayLinks[4] && (
                        <foreignObject width="237" height="44" x="35" y="534">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: displayLinks[4].color }}
                            onClick={() => window.location.href = displayLinks[4].url}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={displayLinks[4].img} alt='' width={12.5} height={14.5}/>
                                    <p>{displayLinks[4].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>
                    )}
                    </>
                )}
            </svg>
        </section>
    )
}

export default EditorDisplay