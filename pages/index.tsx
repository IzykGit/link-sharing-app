import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


const index = () => {

  const { data: session } = useSession()
  const router = useRouter();


  if(session === null || !session.user) {
      router.push("/auth/signin")
  }
  else {
    router.push("/pages/home")
  }


  return null;
}

export default index
