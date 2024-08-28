import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    // checking session
    const session = await getServerSession(req, res, authOptions)
    if(!session) return;

    try {

        const client = clientPromise;
        const db = client.db("LinkShare");

        // grabbing link info
        const result = await db.collection("shares").findOne(
            { userEmail: session.user?.email },
            {
                projection: { firstName: 1, lastName: 1, linkEmail: 1, _id: 0 }
            }
        )

        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).json(error)
    }
}