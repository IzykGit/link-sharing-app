"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'


import { useSession } from 'next-auth/react'

import NameFormStyles from "../../styles/components/NameForm.module.css"

import uploadIcon from "../../public/assets/images/icon-upload-image.svg"

import { saveLinkInfo } from '@/lib/saveLinkInfo'


const NameForm = ({ setLinkInfo, linkInfo, setAvatar }: any) => {

    const { data: session } = useSession()

    const inputRef = useRef<HTMLInputElement>(null);

    const [infoFields, setInfoFields] = useState(linkInfo ? linkInfo : {})

    useEffect(() => {
        setLinkInfo(infoFields)
        console.log("setting info")
    }, [infoFields])



    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)

    const [file, setFile] = useState("")
    const [fileURL, setFileURL] = useState("")

    

    const handleImageClick = () => {
        if(inputRef.current) {
            inputRef.current.click()
        }
    }


    const handleTextInput = (event: any, key: string) => {
        setInfoFields((prevState: any) => {
            return {
                ...prevState,
                [key]: event.target.value
            }
        })

        setFirstNameError(false)
        setLastNameError(false)
    }






    const handleImageSet = async (event: any) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            
            const reader = new FileReader()
            
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setFile(base64)
            }
            reader.readAsDataURL(selectedFile)

            setFileURL(fileURL)
            setAvatar(fileURL);
        }
    }



    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let hasError = false;

        if(infoFields.firstName === "") {
            setFirstNameError(true);
            hasError = true;
        }

        if(infoFields.lastName === "") {
            setLastNameError(true);
            hasError = true;
        }

        if(hasError) return;

        if(session === null || !session.user) {
            localStorage.setItem("locallyStoredInfo", JSON.stringify(infoFields));

            if(file) {
                localStorage.setItem("locallyStoredAvatar", JSON.stringify(file))
            }
            return;
        }

        sessionStorage.setItem("cachedInfo", JSON.stringify(infoFields))
        await saveLinkInfo(infoFields.firstName, infoFields.lastName, infoFields.email)
    }

    return (
        
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

                                {!file ? (
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
                                    <Image src={fileURL} alt='' width={193} height={193} className={NameFormStyles.uploaded_image}/>
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
                    <button type="submit">Save</button>
                </div>
            </form>
        </section>
    )
}

export default NameForm