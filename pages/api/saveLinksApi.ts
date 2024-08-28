
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodb";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";



export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Api started")


    // checking session
    const session = await getServerSession(req, res, authOptions)
    if(!session) return;
    console.log(session)

    const saveCookies = req.cookies.saveCookies;
    console.log("Save cookies:", saveCookies);


    // if the user has no more save cookies return, do not allow save
    if(saveCookies === "0") {
        console.log("No more saves, blocking request")
        return res.status(401).json({ message: "User ran out of saves, blocking unauthorized request" })
    }


    // grabbing inputFields/links
    const inputFields = req.body


    try {

        const client = await clientPromise;
        const db = client.db("LinkShare")


        // setting links
        await db.collection("shares").findOneAndUpdate(
            { userEmail: session.user!.email },
            {
                $set: { links: inputFields }
            },
            { returnDocument: "after" }
        )

        return res.status(200).json({ message: "Success" });
    }
    catch (error) {
        return res.send(error)
    }

}

