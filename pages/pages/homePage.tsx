"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import EditorDisplay from '../components/EditorDisplay'
import Navbar from '../components/Navbar'

import getLinks from '../../lib/getLinks'


import HomeStyles from "../../styles/Home.module.css"

import LinksForm from "../components/LinksForm"
import NameForm from '../components/NameForm'




export default function Home() {

  const { data: session } = useSession()

  const [links, setLinks] = useState([])
  const [displayInfo, setDisplayInfo] = useState()
  const [avatar, setAvatar] = useState("")



  const [steps, setSteps] = useState(1)

  const incrementSteps = () => setSteps(steps +  1)

  const [screenWidth, setScreenWidth] = useState(1300)

  useEffect(() => {
    const fetchingLinks = async () => {
        const response = await getLinks()
        console.log(response.links)
        setLinks(response.links)
    }

    fetchingLinks()
}, [session])

  // useEffect(() => {

  //   const handleResize = () => {
  //       setScreenWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);
    
  //   return () => {
  //       window.removeEventListener('resize', handleResize);
  //   };
  // }, []); 

  return (
    <div className={HomeStyles.wrapper}>
      <Navbar setSteps={setSteps} steps={steps}/>
      <main className={HomeStyles.links_main}>
          {screenWidth > 1275 && <EditorDisplay links={links} steps={steps} displayInfo={displayInfo} avatar={avatar}/>}

          {steps === 1 && <LinksForm setLinks={setLinks} incrementSteps={incrementSteps}/>}

          {steps === 2 && <NameForm setDisplayInfo={setDisplayInfo} setAvatar={setAvatar}/>}
      </main>
    </div>
  );
}