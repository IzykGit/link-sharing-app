"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import EditorDisplay from '../components/EditorDisplay'
import Navbar from '../components/Navbar'

import getLinks from '@/lib/getLinks'
import getLinkInfo from '@/lib/getLinkInfo'


import HomeStyles from "../../styles/Home.module.css"

import LinksForm from "../components/LinksForm"
import NameForm from '../components/NameForm'



export default function Home() {


  const { data: session } = useSession()


  const [links, setLinks] = useState(null)
  const [linkInfo, setLinkInfo] = useState()
  const [avatar, setAvatar] = useState("")


  const [steps, setSteps] = useState(1)
  const incrementSteps = () => setSteps(steps +  1)

  useEffect(() => {

    // checking if session is strictly null, this prevents session from being caught in the middle of a loading state
    if(session === null) {
      return
    }

    if(links) {
      return;
    }


    // grabbing cached links
    const cachedLinks = sessionStorage.getItem("cachedLinks")


    // if cached links exists, set them to the links state
    if(cachedLinks) {
      console.log("getting cached links")
      setLinks(JSON.parse(cachedLinks))
    }
    else {

      // if no cached links exists, make a fetch request to get links from db
      const fetchingLinks = async () => {

        console.log("making fetch request")
        const response = await getLinks()

        console.log(response)
        // after links are retrieved, cache them so unnecessary are prevented
        sessionStorage.setItem("cachedLinks", JSON.stringify(response))
        setLinks(response)
      }
      fetchingLinks()
    }

    // use session
  }, [session?.user, links])


  useEffect(() => {
    
    // if no session return
    if(session === null) return;

    if(linkInfo) return;

    // grabbing cached info
    const cachedInfo = sessionStorage.getItem("cachedInfo")

    if(cachedInfo) {

      console.log("getting cached info")
      setLinkInfo(JSON.parse(cachedInfo))
      return;

    }
    else {

      // if no cached info exists, make a fetch request to get link info from db
      const fetchingLinks = async () => {

        console.log("making fetch request")

        const response = await getLinkInfo()
        console.log(response)

        // after link info is retrieved, cache them so unnecessary are prevented
        sessionStorage.setItem("cachedInfo", JSON.stringify(response))
        setLinkInfo(response)
      }

      fetchingLinks()
    }
  }, [session])


  return (
    <div className={HomeStyles.wrapper}>
      <Navbar setSteps={setSteps} steps={steps}/>
      <main className={HomeStyles.links_main}>
          {<EditorDisplay links={links} steps={steps} linkInfo={linkInfo} avatar={avatar}/>}

          {steps === 1 && <LinksForm setLinks={setLinks} incrementSteps={incrementSteps} links={links}/>}

          {steps === 2 && <NameForm setLinkInfo={setLinkInfo} setAvatar={setAvatar} linkInfo={linkInfo}/>}
      </main>
    </div>
  );
}