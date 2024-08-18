import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import NameFormStyles from "../../styles/components/NameForm.module.css"

import uploadImage from "../../public/assets/images/icon-upload-image.svg"
import { saveShare } from '../hooks/saveProfile'

const NameForm = ({ setDisplayInfo, setAvatar }: any) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [linkInfo, setLinkInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })


    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)

    const [file, setFile] = useState("")

    const handleImageClick = () => {
        if(inputRef.current) {
            inputRef.current.click()
        }
    }


    const handleTextInput = (event: any, key: string) => {
        setLinkInfo(prevState => {
            return {
                ...prevState,
                [key]: event.target.value
            }
        })

        setFirstNameError(false)
        setLastNameError(false)
    }

    useEffect(() => {
        setDisplayInfo(linkInfo)
    }, [linkInfo, setDisplayInfo])

    useEffect(() => {
        setAvatar(file)
    }, [file])




    const handleImageSet = (event: any) => {
        setFile(URL.createObjectURL(event.target.files[0]))
    }



    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(linkInfo.firstName === "") {
            setFirstNameError(true)
        }

        if(linkInfo.lastName === "") {
            setLastNameError(true)
        }

        if(firstNameError || lastNameError) return;


        saveShare(linkInfo.firstName, linkInfo.lastName)
    }

    return (
        
        <section className={NameFormStyles.NameForm}>

            <form className={NameFormStyles.name_form} onSubmit={handleSave}>
                <input type="file" name="inputImage" id="inputImage" style={{ display: "none" }} ref={inputRef} onChange={handleImageSet}/>

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
                                    <Image src={uploadImage} alt="" width={40} height={40} className={NameFormStyles.default_image}/>
                                    <p>+ Upload Image</p>
                                    </>
                                ) : (
                                    <>
                                    <div className={NameFormStyles.change_image}>
                                        <Image src={uploadImage} alt="" width={40} height={40} className={NameFormStyles.default_image}/>
                                        <p>+ Upload Image</p>
                                    </div>
                                    <Image src={file} alt='' width={193} height={193} className={NameFormStyles.uploaded_image}/>
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
                                value={linkInfo.firstName} onChange={(e) => handleTextInput(e, 'firstName')}/>

                                {firstNameError && <p className={NameFormStyles.field_error}>{"Can't be empty"}</p>}
                            </div>

                        </div>

                        <div className={NameFormStyles.input_divs}>

                            <label htmlFor="lastname">Last name*</label>
                            <div className={lastNameError ? NameFormStyles.text_input_error : NameFormStyles.text_input}>
                                <input type="text" name="lastname" id="lastname" placeholder='e.g. Appleseed'
                                value={linkInfo.lastName} onChange={(e) => handleTextInput(e, 'lastName')}/>

                                {lastNameError && <p className={NameFormStyles.field_error}>{"Can't be empty"}</p>}
                            </div>

                            
                        </div>

                        <div className={NameFormStyles.input_divs}>

                            <label htmlFor="email">Email</label>
                            <div className={NameFormStyles.text_input}>
                                <input type="email" name="email" id="email" placeholder='e.g. email@example.com'
                                value={linkInfo.email} onChange={(e) => handleTextInput(e, 'email')}/>
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