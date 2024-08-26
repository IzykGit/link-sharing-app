"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'


import { useSession } from 'next-auth/react'

import NameFormStyles from "../../styles/components/NameForm.module.css"

import uploadIcon from "../../public/assets/images/icon-upload-image.svg"

import { saveLinkInfo } from '@/lib/hooks/saveLinkInfo'
import { handleCardCookies, handleSaveCookies } from '../../lib/helpers/cookies'
import SaveNotifications from './SaveNotifications'


const NameForm = ({ setLinkInfo, linkInfo, setAvatar, avatar }: { setLinkInfo: Function, linkInfo: any, setAvatar: Function, avatar: string }) => {

    // getting the session
    const { data: session } = useSession()

    const inputRef = useRef<HTMLInputElement>(null);

    // checking for links info, if none, load default object
    const [infoFields, setInfoFields] = useState(linkInfo ? linkInfo : { firstName: "", lastName: "", linkEmail: ""})


    // setting the link info each time an info field is changed
    useEffect(() => {
        setLinkInfo(infoFields)
        console.log("setting info")
    }, [infoFields])


    // errors states to use to check field emptiness
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)

    const [showNotification, setShowNotification] = useState(false)

    const [disableSave, setDisableSave] = useState(false)
    

    // handler for adding image to image input
    const handleImageClick = () => {
        if(inputRef.current) {
            inputRef.current.click()
        }
    }


    // updating the values in the info fields state
    const handleTextInput = (event: any, key: string) => {
        setInfoFields((prevState: any) => {
            return {
                ...prevState,
                [key]: event.target.value
            }
        })

        // remove errors after an input is made
        setFirstNameError(false)
        setLastNameError(false)
    }





    // handling image select, setting image
    const handleImageSet = async (event: any) => {
        const selectedFile = event.target.files?.[0];


        if (selectedFile) {

            const reader = new FileReader()
            
            // convert image to a base64 string and then set it to the avatar state to be use globally
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setAvatar(base64)
            }
            reader.readAsDataURL(selectedFile)

        }
    }


    // handle the saving of link info and avatar
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setDisableSave(true)

        // no initial error
        let hasError = false;

        // if first name is empty then set first name error to true
        if(infoFields.firstName === "") {
            setFirstNameError(true);
            hasError = true;
        }

        // if last name is empty then set last name error to true
        if(infoFields.lastName === "") {
            setLastNameError(true);
            hasError = true;
        }

        // if any errors occur then return here
        if(hasError) return;



        // if there is no session then store the info and avatar locally
        if(session === null || !session.user) {
            localStorage.setItem("locallyStoredInfo", JSON.stringify(infoFields));
            if(avatar) {
                localStorage.setItem("locallyStoredAvatar", JSON.stringify(avatar))
            }

            // running card cookie handler
            handleCardCookies()

            setShowNotification(true)

            setTimeout(() => {
                setShowNotification(false)
                setDisableSave(false)
            }, 3000)

            return;
        }


        // if user is logged in then store the link info and avatar in the session storage
        sessionStorage.setItem("sessionAvatar", JSON.stringify(avatar))
        sessionStorage.setItem("sessionInfo", JSON.stringify(infoFields))
        await saveLinkInfo(infoFields.firstName, infoFields.lastName, infoFields.linkEmail).then(() => {

            setDisableSave(false)
            handleSaveCookies()

        })


        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
            setDisableSave(false)
        }, 3000)

        return;
    }

    return (
        <>
        {showNotification && <SaveNotifications showNotification={showNotification}/>}
        <section className={NameFormStyles.NameForm}>

            <form className={NameFormStyles.name_form} onSubmit={handleSave}>
                <input type="file" name="inputImage" id="inputImage" style={{ display: "none" }} ref={inputRef}
                accept='image/png, image/jpg' onChange={handleImageSet}/>

                <div className={NameFormStyles.form_content}>

                    <div className={NameFormStyles.form_header}>
                        <h1>Profile Details</h1>
                        <p>Add your details to create a personal touch to your profile.</p>
                    </div>
                    
                    <div className={NameFormStyles.image_preview}>
                        <h2>Profile picture</h2>


                        <div className={NameFormStyles.image_input_container}>

                            <div className={NameFormStyles.image_input} role='button' onClick={handleImageClick}>

                                {!avatar ? (
                                    <>
                                    <Image src={uploadIcon} alt="" width={40} height={40} className={NameFormStyles.default_image}/>
                                    <p>+ Upload Image</p>
                                    </>
                                ) : (
                                    <>
                                    <div className={NameFormStyles.change_image}>
                                        <Image src={uploadIcon} alt="" width={40} height={40} className={NameFormStyles.default_image}/>
                                        <p>+ Upload Image</p>
                                    </div>
                                    <Image src={avatar} alt='' width={193} height={193} className={NameFormStyles.uploaded_image}/>
                                    </>
                                )}
                            </div>

                            <p>Image must be below 1024x1024px. <br /> Use PNG or JPG format.</p>
                        </div>

                    </div>


                    <div className={NameFormStyles.input_fields}>

                        <div className={NameFormStyles.input_divs}>

                            <label htmlFor="firstname">First name*</label>
                            <div className={firstNameError ? NameFormStyles.text_input_error : NameFormStyles.text_input}>
                                <input type="text" name="firstname" id="firstname" placeholder='e.g. John'
                                value={infoFields.firstName} onChange={(e) => handleTextInput(e, 'firstName')}/>

                                {firstNameError && <p className={NameFormStyles.field_error}>{"Can't be empty"}</p>}
                            </div>

                        </div>

                        <div className={NameFormStyles.input_divs}>

                            <label htmlFor="lastname">Last name*</label>
                            <div className={lastNameError ? NameFormStyles.text_input_error : NameFormStyles.text_input}>
                                <input type="text" name="lastname" id="lastname" placeholder='e.g. Appleseed'
                                value={infoFields.lastName} onChange={(e) => handleTextInput(e, 'lastName')}/>

                                {lastNameError && <p className={NameFormStyles.field_error}>{"Can't be empty"}</p>}
                            </div>

                            
                        </div>

                        <div className={NameFormStyles.input_divs}>

                            <label htmlFor="linkEmail">Email</label>
                            <div className={NameFormStyles.text_input}>
                                <input type="email" name="linkEmail" id="linkEmail" placeholder='e.g. email@example.com'
                                value={infoFields.linkEmail} onChange={(e) => handleTextInput(e, 'linkEmail')}/>
                            </div>
                            

                        </div>

                    </div>

                </div>


                <div className={NameFormStyles.form_btn}>
                    <button type="submit" disabled={disableSave}>Save</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default NameForm