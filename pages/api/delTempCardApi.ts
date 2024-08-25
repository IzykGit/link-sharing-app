import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { cookies } from "next/headers";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    const cardCookies = cookies()

    const cardId = cardCookies.get("cardId")

    console.log(cardId)
    if(!cardId) return;

    try {

        const client = clientPromise;
        const db = client.db("LinkShare");

        await db.collection("tempshares").deleteOne({ tempCardCustomId: cardId })

        return res.status(200).json("Card deleted")
    }
    catch (error) {
        console.log(error)
    }
}