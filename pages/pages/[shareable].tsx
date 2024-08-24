import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

import DetermineInfo from '../hooks/determineInfo';
import DetermineLinks from '../hooks/determineLinks';
import DetermineAvatar from '../hooks/determineAvatar';


const Shareable = () => {

    
    const { data: session } = useSession()

    const router = useRouter()


    
    const linkInfo = DetermineInfo(session)

    const links = DetermineLinks(session)

    const avatar = DetermineAvatar(session)

    

    return (
        <div>
            <Image src={avatar} alt="" width={164} height={164}/>
            <h1>{linkInfo?.firstName}</h1>

            <p>{links[0]?.platform}</p>
        </div>
    )
}

export default Shareable