import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


const index = () => {

  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if(!session || !session.user) {
      router.push("/auth/logIn")
    }
    else {
      router.push("/pages/home")
    }
  }, [])

  return null;
}

export default index
