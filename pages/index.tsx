import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


const index = () => {

  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if(!session) {
      router.push("/auth/logIn")
    }
    else {
      router.push("/pages/homePage")
    }
  }, [])

  return null;
}

export default index
