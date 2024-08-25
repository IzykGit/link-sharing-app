import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";




export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions)
    if(!session) return

    const { firstName, lastName, email } = req.body

    try {

        const client = await clientPromise;
        const db = client.db("LinkShare");

        let info = { firstName, lastName, email }


        await db.collection("shares").updateOne(
            { userEmail: session.user?.email},
            { $set: { firstName: info.firstName, lastName: info.lastName, linkEmail: info.email }}
        )
        
        res.json("Success");
    } catch (error) {
        console.error(error);
    }

}