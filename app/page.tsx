import EditorDisplay from './components/EditorDisplay'
import Navbar from './components/Navbar'
import React from 'react'

import HomeStyles from "./styles/Home.module.css"

import LinksForm from "./components/LinksForm"

export default function Home() {
  return (
    <>
    <Navbar />
    <main className={HomeStyles.links_main}>
        <EditorDisplay />
        <LinksForm />
    </main>
    </>
  );
}
