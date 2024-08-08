"use client"

import React, { useState } from 'react'

import LinksFormStyles from "../styles/components/LinksForm.module.css"
import CustomDropStyles from "../styles/components/CustomDrop.module.css";

import { linkOptions } from '../data/options'

import { motion } from "framer-motion"


const LinksForm = () => {

    const [inputFields, setInputFields] = useState([ { platform: "", link: "" } ])
    const [linkNum, setLinkNum] = useState(0)

    const [selectedOption, setSelectedOption] = useState(linkOptions[0])
    const [dropDown, setDropDown] = useState(false)

    const addLink = () => {
        console.log("Link added")

        let newFields = { platform: "", link: "" }

        if(linkNum === 0) {
            setLinkNum(linkNum + 1)
            return;
        }
        else {
            setLinkNum(linkNum + 1)
            setInputFields([ ...inputFields, newFields ])
            return;
        }
        
    }

    const removeLink = (index: number) => {
        const newFields = inputFields.splice(index, 1)

        setLinkNum(linkNum - 1)
        setInputFields(newFields)
    }

    console.log(inputFields)



    const variants = {
        closed: { height: "0rem", padding: "0", border: "none", transition: { duration: 0.15 }},
        open: { height: "15rem", padding: "0.75rem 1rem", border: "1px solid #D9D9D9", transition: { duration: 0.15 } }
    }

    return (
        <section className={LinksFormStyles.form_section}>

            <form className={LinksFormStyles.links_form}>

                <div className={LinksFormStyles.form_content}>

                    <div className={LinksFormStyles.form_header}>
                        <h1>Customize your links</h1>
                        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
                    </div>
                    


                    <div className={LinksFormStyles.link_fields_container}>
                        <button type="button" className={LinksFormStyles.create_link} onClick={addLink}>+ Add New Link</button>


                        <div className={LinksFormStyles.link_fields}>
                            
                        
                        {linkNum ? (
                        inputFields.map((input, index) => (
                            <div key={input.platform} className={LinksFormStyles.new_link}>

                                <div className={LinksFormStyles.linkNum_remove}>
                                    <h2><img alt='' src='/assets/images/icon-drag-and-drop.svg'/>Link #{index + 1}</h2>
                                    <button type='button' onClick={() => removeLink(index)}>Remove</button>
                                </div>
                                

                                <div>

                                    {/* custom dropdown menu */}
                                    <div className={CustomDropStyles.dropdown}>

                                        <div className={CustomDropStyles.dropdown_select_container}>

                                            <label htmlFor='select' className={CustomDropStyles.drop_label}>Platform</label>

                                            <div className={CustomDropStyles.currect_select} id='select' onClick={() => setDropDown(!dropDown)}>

                                                <div>
                                                    <img src={selectedOption.img} alt=''/>
                                                    <p>{selectedOption.label}</p>
                                                </div>

                                                <img src='/assets/images/icon-chevron-down.svg' alt=''/>
                                            </div>
                                        </div>

                                        <motion.div className={CustomDropStyles.drop_options_container}
                                        initial="closed" animate={dropDown ? "open" : "closed"} variants={variants}
                                        >
                                            {linkOptions.map((option, index) => (
                                                <>
                                                <p key={index} role='button' onClick={() => { setSelectedOption(option), setDropDown(!dropDown)}} className={CustomDropStyles.drop_option}>
                                                    <img src={option.img}/>
                                                    {option.label}
                                                </p>
                                                </>
                                            ))}
                                        </motion.div>

                                        
                                    </div>
                                </div>

                            </div>
                        ))
                        ) : (
                            <div className={LinksFormStyles.empty_links}>
                                <img src='/assets/images/illustration-empty.svg' alt=''/>

                                <div className={LinksFormStyles.empty_links_text}>
                                    <h2>{"Let's"} get you started</h2>
                                    <p>Use the {"Add new link"} button to get started. Once you have more than one link, you can reorder and edit them.
                                    {"We're"} here to help you share your profiles with everyone!</p>
                                </div>
                            </div>
                        )}

                        </div>
                    </div>


                </div>



                <div className={LinksFormStyles.form_btn}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </section>
    )
}

export default LinksForm