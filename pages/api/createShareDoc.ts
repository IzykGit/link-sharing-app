import React from 'react'
import clientPromise from '@/lib/mongodb';

const createShareDoc = async (user: any) => {

    try {
        const client = await clientPromise;
        const db = client.db("LinkShare")

        const shareModel = {
          userEmail: user.email,
          firstName: "",
          lastName: "",
          linkEmail: "",
          links: [],
          avatarId: ""
        }

        const result = await db.collection("shares").insertOne(shareModel)
        console.log("Inserted new doc", result)

    }
    catch (error) {
        console.error("Error creating doc", error)
    }
}

export default createShareDoc