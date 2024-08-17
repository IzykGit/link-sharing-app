import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import EditorDisplayStyles from "../../styles/components/EditorDisplay.module.css"


interface Links {
    id: number,
    platform: string,
    url: string,
    img: string,
    color: string
}

interface Info {
    firstName: string,
    lastName: string,
    email: string
}

const EditorDisplay = ({ displayLinks, displayInfo, steps, avatar }: { displayLinks: any, displayInfo: any, steps: number, avatar: string }) => {

    const [links, setLinks] = useState<Links[]>([])

    const [info, setInfo] = useState<Info>()

    const [file, setFile] = useState("")

    useEffect(() => {
        setLinks(displayLinks)
    }, [displayLinks])

    useEffect(() => {
        setInfo(displayInfo)
    }, [displayInfo])


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



                {!(info?.firstName || info?.lastName) ? (
                    <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8"/>
                ) : (
                    <foreignObject width="160" height="32" x="73.5" y="185" className={EditorDisplayStyles.display_name}>
                        {displayInfo.firstName} {displayInfo.lastName}
                    </foreignObject>
                )}
                
                {!info?.email ? (
                    <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4"/>
                ) : (
                    <foreignObject width="237" height="44" x="35" y="214" className={EditorDisplayStyles.display_email}>{displayInfo.email}</foreignObject>
                )}


                {(steps === 1 || links[0]) && (
                    <>
                    <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8"/>
                    
                    {links[0] && (
                        
                        <foreignObject width="237" height="44" x="35" y="278">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: links[0].color }}
                            onClick={() => window.open(links[0].url, "_blank")}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={links[0].img} alt='' width={12.5} height={14.5}/>
                                    <p>{links[0].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>
                    )}
                    </>
                )}

                {(steps === 1 || links[1]) && (
                    <>
                    <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8"/>

                    {links[1] && (
                        
                        <foreignObject width="237" height="44" x="35" y="342">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: links[1].color }}
                            onClick={() => window.open(links[1].url, "_blank")}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={links[1].img} alt='' width={12.5} height={14.5}/>
                                    <p>{links[1].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>
                    )}
                    </>
                )}
                
                {(steps === 1 || links[2]) && (
                    <>
                    <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8"/>
                    {links[2] && (
                    
                        <foreignObject width="237" height="44" x="35" y="406">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: links[2].color }}
                            onClick={() => window.open(links[2].url, "_blank")}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={links[2].img} alt='' width={12.5} height={14.5}/>
                                    <p>{links[2].platform}</p>
                                </div>


                                <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                            </div>

                        </foreignObject>

                    )}
                    </>
                )}

                {(steps === 1 || links[3]) && (
                    <>
                    <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8"/>
                    {links[3] && (

                    <foreignObject width="237" height="44" x="35" y="470">

                        <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: links[3].color }}
                        onClick={() => window.open(links[3].url, "_blank")}>

                            <div className={EditorDisplayStyles.platform}>
                                <Image src={links[3].img} alt='' width={12.5} height={14.5}/>
                                <p>{links[3].platform}</p>
                            </div>


                            <Image src='/assets/images/icon-arrow-right.svg' alt='' width={16} height={16}/>

                        </div>

                    </foreignObject>
                    )}
                    </>
                )}
                

                {(steps === 1 || links[4]) && (
                    <>
                    <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8"/>
                    {links[4] && (
                        <foreignObject width="237" height="44" x="35" y="534">

                            <div className={EditorDisplayStyles.foreignObject_container} style={{ backgroundColor: links[4].color }}
                            onClick={() => window.location.href = links[4].url}>

                                <div className={EditorDisplayStyles.platform}>
                                    <Image src={links[4].img} alt='' width={12.5} height={14.5}/>
                                    <p>{links[4].platform}</p>
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