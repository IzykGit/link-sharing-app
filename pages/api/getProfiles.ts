import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("LinkShare");
        const movies = await db
            .collection("shares")
            .find({})
            .toArray();
        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}