import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


const index = () => {

  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if(session === null || !session?.user) {
      router.push("/auth/signin")
    }
    else {
      router.push("/pages/home")
    }
  }, [session])

  return null;
}

export default index
