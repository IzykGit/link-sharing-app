"use client"

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image';


import LinksFormStyles from "../../styles/components/LinksForm.module.css"
import CustomDropStyles from "../../styles/components/CustomDrop.module.css";

import { linkOptions } from '../../lib/options'

import { motion } from "framer-motion"
import { dropDownVariants } from '../../lib/framerMotion';

import { useSession } from 'next-auth/react'

import { updateLinks } from '../../lib/updateLinks';





// interface for Input Fields

interface InputFields {
    id: number,
    platform: string,
    url: string,
    img: string,
    color: string
}

interface Url {
    id: number
}


const LinksForm = ({ setLinks, links }: { setLinks: Function, links: any }) => {

    const { data: session } = useSession()

    const [inputFields, setInputFields] = useState<InputFields[]>(links ? links : [])

    const [dropDownStates, setDropDownStates] = useState<boolean[]>([])

    const [draggingStates, setDraggingStates] = useState<boolean[]>([])

    const [emptyUrls, setEmptyUrls] = useState<Url[]>([])
    const [incorrectUrls, setIncorrectUrls] = useState<Url[]>([])




    useEffect(() => {
        if(!links) {
            return;
        }
        else {
            setInputFields(links)
        }
    }, [links])

    useEffect(() => {
        setLinks(inputFields)
    }, [inputFields])


    useEffect(() => {

        if(!links) return

        // Only update state if necessary
        if (links.length === dropDownStates.length || inputFields.length === 5) {
            return
        }
        else {
            setDraggingStates(Array(inputFields.length).fill(false));
            setDropDownStates(Array(inputFields.length).fill(false));
            console.log(dropDownStates)
            console.log(draggingStates)
        }

    }, [dropDownStates, inputFields.length]);

    // adding new link input field
    const addLink = () => {
        console.log("Link added")


        // getting number of input fields
        const fieldCount = inputFields.length;


        if(inputFields.length < 5) {
            // creating new array item for drag and dropDown states
            setDropDownStates(prevState => [ ...prevState, false ])
            setDraggingStates(prevState => [ ...prevState, false ])
        }


        // if 5 input fields exist then return to prevent more being created
        if(fieldCount === 5) {
            return;
        }
        // if more than 1 input field, find the largest id, increment it by 1 and create a new field
        else if (fieldCount > 0) {

            const oldId = inputFields.reduce((a, b) => Math.max(a, b.id), -Infinity)
            
            const newField = { id: oldId + 1, platform: "Github", url: "", img: linkOptions[0].img, color: linkOptions[0].color };

            setInputFields(prevState => [ ...prevState, newField ])
            return;
        }
        // if no fields then create a new field with the id of 1
        else {
            setInputFields([{ id: 1, platform: "Github", url: "", img: linkOptions[0].img, color: linkOptions[0].color }])
        }
    }





    // removing input fields
    const removeLink = (Id: number) => {

        const fieldCount = inputFields.length


        // if last input field is removed, all states are reverted to original state
        if(fieldCount === 1) {

            setInputFields([]);
            setDropDownStates([]);
            setDraggingStates([]);
            return;

        }
        else {
            const newFields = inputFields.filter(inputField => inputField.id !== Id);
            
            setInputFields(newFields);

            setDropDownStates(dropDownStates.slice(0, -1));
            setDraggingStates(draggingStates.slice(0, -1));

            return;
        }

    }






    const handleInputChange = (event: any, Id: number) => {
        const newFields = [...inputFields];
        const fieldIndex = newFields.findIndex(field => field.id === Id);

        // checking if Id is valid
        if (fieldIndex !== -1) {
                newFields[fieldIndex].url = event.target.value;

                // updating input field values
                setInputFields(newFields); 

                // setting display links in handleInputChange function so links can be updated in real time on the editorDisplay
                setLinks(inputFields);
        }

        // resetting errors
        setEmptyUrls([])
        setIncorrectUrls([])
    }







    const handlePlatformSelect = (platform: string, inputId: number, imageSrc: string, color: string ) => {
        const newFields = [...inputFields];
        const fieldIndex = newFields.findIndex(field => field.id === inputId);


        if (fieldIndex !== -1) {
                newFields[fieldIndex].platform = platform;
                newFields[fieldIndex].img = imageSrc
                newFields[fieldIndex].color = color
                newFields[fieldIndex].url = ""
                setInputFields(newFields); 
        }

        // resetting errors
        setEmptyUrls([])
        setIncorrectUrls([])
    }

    



    // toggling dropdown states for each input field
    const toggleDropDown = (index: number) => {

        setDropDownStates(
            dropDownStates.map((state, i) => (i === index ? !state : state))
        );
    };

    // toggling drag states
    const toggleDrag = (index: number) => {

        setDraggingStates(
            draggingStates.map((state, i) => (i === index ? !state : state))
        )

        setEmptyUrls([])
        setIncorrectUrls([])
    }


    // fetching each platforms corresponding placeholder
    const getPlaceholder = (platform: string) => {

        const option = linkOptions.find(option => option.value === platform);
        return option ? option.placeholder : 'Enter your URL';
    };



    // handling the sorting of drag and drop

    const dragLink = useRef<number>(0)
    const draggedOverLink = useRef<number>(0)
    

    const handleSort = () => {
        
        const inputLinksCopy = [ ...inputFields ]
        const temp = inputLinksCopy[dragLink.current]

        inputLinksCopy[dragLink.current] = inputLinksCopy[draggedOverLink.current]
        inputLinksCopy[draggedOverLink.current] = temp;

        setInputFields(inputLinksCopy)
    }






    const saveLinks = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // checking to see if any input fields are empty, is there are any empty fields, create an array of their ids
        const newEmptyUrls = inputFields.filter(input => input.url === "").map(input => ({ id: input.id }));
        
        // checking to see if any input field urls are incorrect (does not match the platforms base url), if there are any incorrect urls, create an array of their ids
        const newIncorrectUrls = inputFields.filter(input => !linkOptions.some(option => input.url.includes(option.placeholder))).map(input => ({ id: input.id }));


        if (newEmptyUrls.length > 0) {

            const alreadyExists = emptyUrls.some(url => newEmptyUrls.some(newUrl => url.id === newUrl.id))
            console.log(alreadyExists)

            if(alreadyExists) return;


            setEmptyUrls(prevState => [ ...prevState, ...newEmptyUrls ]);

            console.log("empty urls found");
            console.log(emptyUrls)

            return;
        }

        if (newIncorrectUrls.length > 0) {
            
            const alreadyExists = incorrectUrls.some(url => newIncorrectUrls.some(newUrl => url.id === newUrl.id))
            console.log(alreadyExists)

            if(alreadyExists) return;

            setIncorrectUrls(prevState => [ ...prevState, ...newIncorrectUrls ])

            console.log("incorrect urls found");
            console.log(incorrectUrls)

            return;
        }

        // checking is a user is logged in, if not, store the links locally and move to next screen
        if(!session || !session.user) {
            localStorage.setItem("locallyStoredLinks", JSON.stringify(inputFields))
            return;
        }





        // caching saved links
        sessionStorage.setItem("cachedLinks", JSON.stringify(inputFields))

        // updating saved links in database
        await updateLinks(inputFields)


        
        return;
    }

    return (
        <section className={LinksFormStyles.form_section}>

            <form className={LinksFormStyles.links_form} onSubmit={saveLinks}>

                <div className={LinksFormStyles.form_content}>


                    {/* title of current step */}
                    <div className={LinksFormStyles.form_header}>
                        <h1>Customize your links</h1>
                        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
                    </div>
                    


                    <div className={LinksFormStyles.link_fields_container}>
                        <button type="button" className={LinksFormStyles.create_link} onClick={addLink}>+ Add New Link</button>


                        <div className={LinksFormStyles.link_fields}>
                            
                        

                        {/* looping through all created input fields  */}
                        {inputFields.length !== 0 ? (
                        inputFields.map((input, index) => (

                            <div key={input.id} className={!draggingStates[index] ? LinksFormStyles.new_link : LinksFormStyles.new_link_drag}
                            onDragEnter={() => draggedOverLink.current = index} onDragOver={event => event.preventDefault()} draggable={draggingStates[index]}>


                                {/* showcasing links index as well along with remove button and drag and drop icon */}
                                <div className={LinksFormStyles.linkNum_remove}>
                                    <h2>
                                        
                                    <Image alt='' src='/assets/images/icon-drag-and-drop.svg'
                                    onDragStart={() => {(dragLink.current = index); toggleDrag(index)}}
                                    onDragEnd={() => {handleSort(); toggleDrag(index)}}
                                    width={10} height={10}/>
                                    
                                    Link #{index + 1}</h2>

                                    <button type='button' onClick={() => removeLink(input.id)}>Remove</button>
                                </div>
                                

                                <div>

                                    {/* custom dropdown menu */}
                                    <div className={CustomDropStyles.dropdown}>


                                        {/* drop down selection showing current selection */}
                                        <div className={CustomDropStyles.dropdown_select_container}>

                                            <label htmlFor='select' className={CustomDropStyles.drop_label}>Platform</label>

                                            <div className={CustomDropStyles.currect_select} id='select' onClick={() => { toggleDropDown(index) }}>

                                                {/* displaying current platform with its corresponding image */}
                                                <div>
                                                    <Image src={input.img} alt='' width={16} height={16}/>
                                                    <p>{input.platform}</p>
                                                </div>


                                                <Image src='/assets/images/icon-chevron-down.svg' alt='' width={12} height={6}/>
                                            </div>

                                        </div>





                                        {/* drop down container containing every platform */}
                                        <motion.div className={CustomDropStyles.drop_options_container} 
                                        initial="closed" animate={dropDownStates[index] ? "open" : "closed"} variants={dropDownVariants}>

                                            {linkOptions.map((option) => (
                                                <p key={option.id} role='button' onClick={() => { toggleDropDown(index), handlePlatformSelect(option.value, input.id, option.img, option.color ) }}
                                                className={option.value !== inputFields[index].platform ? CustomDropStyles.drop_option : CustomDropStyles.drop_option_selected}>
                                                    <Image src={option.img} alt='' width={16} height={16}/>
                                                    {option.value}
                                                </p>

                                            ))}
                                        </motion.div>



                                    </div>
                                </div>
                                

                                {/* input link field for each platform */}
                                <div className={LinksFormStyles.link_url_container}>
                                    
                                    <label htmlFor=''>Link</label>

                                    <div className={!(emptyUrls.some(url => url.id === input.id) || incorrectUrls.some(url => url.id === input.id)) ? LinksFormStyles.link_url : LinksFormStyles.link_url_error}>

                                        <input type="url" onChange={(event) => handleInputChange(event, input.id)}
                                         placeholder={getPlaceholder(input.platform)} value={input.url} className={LinksFormStyles.links_url_input}/>

                                        {emptyUrls.map(url => (
                                            url.id === input.id && (
                                                <div key={input.id} className={LinksFormStyles.input_error}>
                                                    <p>{"Can't be empty"}</p>
                                                </div>
                                            )
                                        ))}

                                        {incorrectUrls.map(url => (
                                            url.id === input.id && (
                                                <div key={input.id} className={LinksFormStyles.input_error}>
                                                    <p>{"Please check the URL"}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>

                                </div>



                            </div>
                        ))
                        ) : (


                            // if no links have been created then empty links image and text is shown
                            <div className={LinksFormStyles.empty_links}>
                                <Image src='/assets/images/illustration-empty.svg' alt='' width={249} height={160}/>

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


                {/* save button for the form */}
                <div className={LinksFormStyles.form_btn}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </section>
    )
}

export default LinksForm