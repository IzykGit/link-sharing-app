"use client"

import { useSession } from 'next-auth/react'

import EditorDisplay from '../components/EditorDisplay'
import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react'

import HomeStyles from "../../styles/Home.module.css"

import LinksForm from "../components/LinksForm"
import NameForm from '../components/NameForm'




export default function Home() {

  const { data: session } = useSession()

  const [displayLinks, setDisplayLinks] = useState([])
  const [displayInfo, setDisplayInfo] = useState()
  const [avatar, setAvatar] = useState("")



  const [steps, setSteps] = useState(2)

  const incrementSteps = () => setSteps(steps +  1)

  const [screenWidth, setScreenWidth] = useState(1500)

  useEffect(() => {

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return (
    <div className={HomeStyles.wrapper}>
      <Navbar setSteps={setSteps} steps={steps}/>
      <main className={HomeStyles.links_main}>
          {screenWidth > 1275 && <EditorDisplay displayLinks={displayLinks} steps={steps} displayInfo={displayInfo} avatar={avatar}/>}

          {steps === 1 && <LinksForm setDisplayLinks={setDisplayLinks} incrementSteps={incrementSteps} />}

          {steps === 2 && <NameForm setDisplayInfo={setDisplayInfo} setAvatar={setAvatar}/>}
      </main>
    </div>
  );
}