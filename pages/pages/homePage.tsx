"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'

import Image from 'next/image'

import EditorDisplay from '../components/EditorDisplay'
import Navbar from '../components/Navbar'

import getLinks from '@/lib/hooks/getLinks'
import getLinkInfo from '@/lib/hooks/getLinkInfo'


import HomeStyles from "../../styles/Home.module.css"

import LinksForm from "../components/LinksForm"
import NameForm from '../components/NameForm'

import SaveNotifications from '../components/SaveNotifications'



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
  linkEmail: string
}

export default function Home() {


  const { data: session } = useSession()

  const [links, setLinks] = useState<Links | null>(null)
  const [linkInfo, setLinkInfo] = useState<Info | undefined>(undefined)
  const [avatar, setAvatar] = useState<string>("")

  const [steps, setSteps] = useState(1)

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  // grabbing links
  useEffect(() => {

    // if no session, check for locally stored links and return
    if (session === null) {
      console.log('No session available');
      

      const localLinks = localStorage.getItem("locallyStoredLinks")

      if(localLinks) {
        console.log("getting locally stored links")
        setLinks(JSON.parse(localLinks))
        return
      }


      return;
    }

    if(links !== null) {
      return;
    }

    // grabbing session stored links
    const sessionLinks = sessionStorage.getItem("sessionLinks")


    // if session stored links exists, set them to the links state
    if(sessionLinks) {
      console.log("getting cached links")
      setLinks(JSON.parse(sessionLinks))
      return;
    }
    else {

      // if no session links exists, make a fetch request to get links from db
      const fetchingLinks = async () => {

        console.log("making fetch request")
        const response = await getLinks()

        console.log(response)
        // after links are retrieved, store them so unnecessary are prevented
        sessionStorage.setItem("cachedLinks", JSON.stringify(response))
        setLinks(response)
      }
      
      fetchingLinks()
      return;
    }

    // use session
  }, [session])





  // grabbing link info
  useEffect(() => {

    // if no session, check for locally stored info and return
    if (session === null) {
      console.log('No session available');
      

      const localInfo = localStorage.getItem("locallyStoredInfo")

      if(localInfo) {
        console.log("getting locally stored info")
        setLinkInfo(JSON.parse(localInfo))
        return
      }


      return;
    }



    if(linkInfo !== undefined) return;


    // grabbing session stored info
    const sessionInfo = sessionStorage.getItem("sessionInfo")

    // if session stored information exists, set info to the info state
    if(sessionInfo === undefined) {

      console.log("getting session stored info")
      setLinkInfo(JSON.parse(sessionInfo))
      return;

    }
    else {

      console.log("in else statement")
      // if no session stored info exists, make a fetch request to get link info from db
      const fetchingLinks = async () => {

        console.log("making fetch request")

        const response = await getLinkInfo()
        console.log(response)

        // after link info is retrieved, store them so unnecessary fetches are prevented
        sessionStorage.setItem("sessionInfo", JSON.stringify(response))
        setLinkInfo(response)
      }

      fetchingLinks()
    }
  }, [session])




  useEffect(() => {

    // if no session, check for locally stored avatar and return
    if (session === null) {
      console.log('No session available');
    
      const localAvatar = localStorage.getItem("locallyStoredAvatar")

      if(localAvatar) {
        console.log("getting locally stored info")
        setAvatar(JSON.parse(localAvatar))
        return
      }

      return;
    }


    // grabbing session stored info
    const sessionAvatar = sessionStorage.getItem("sessionAvatar")

    // if stored avatar exists, set avatar to the avatar state
    if(sessionAvatar) {

      console.log("getting cached avatar")
      setAvatar(JSON.parse(sessionAvatar))
      return;

    }

  }, [session])

  


  return (
    <div className={HomeStyles.wrapper}>

      <Navbar setSteps={setSteps} steps={steps} linkInfo={linkInfo}/>
      <main className={HomeStyles.links_main}>
          {windowWidth > 1275 && <EditorDisplay links={links} steps={steps} linkInfo={linkInfo} avatar={avatar}/>}

          {steps === 1 && <LinksForm setLinks={setLinks} links={links}/>}

          {steps === 2 && <NameForm setLinkInfo={setLinkInfo} setAvatar={setAvatar} linkInfo={linkInfo} avatar={avatar} />}
      </main>

    </div>
  );
}