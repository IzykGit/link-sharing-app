import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";




export default async (req: NextApiRequest, res: NextApiResponse) => {


    // checking session
    const session = await getServerSession(req, res, authOptions)
    if(!session) return


    // grabbing link info
    const { firstName, lastName, email } = req.body

    const saveCookies = req.cookies.saveCookies;
    console.log("Save cookies:", saveCookies);


    // if user has no more save cookies then return, do not allow save
    if(saveCookies === "0") {
        console.log("No more saves, blocking request")
        return res.status(401).json({ message: "User ran out of saves, blocking unauthorized request" })
    }

    try {

        const client = await clientPromise;
        const db = client.db("LinkShare");

        let info = { firstName, lastName, email }

        // saving link info
        await db.collection("shares").updateOne(
            { userEmail: session.user?.email},
            { $set: { firstName: info.firstName, lastName: info.lastName, linkEmail: info.email }}
        )
        
        res.json("Success");
    } catch (error) {
        console.error(error);
    }

}