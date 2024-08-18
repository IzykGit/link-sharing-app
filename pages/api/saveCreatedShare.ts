import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { firstName, lastName } = req.body

    try {
        const client = await clientPromise;
        const db = client.db("LinkShare");

        const info = { firstName, lastName }
        await db.collection("shares").insertOne(info)
        
        res.json("Success");
    } catch (e) {
        console.error(e);
    }
}