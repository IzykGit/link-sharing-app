import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { cookies } from "next/headers";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    const cardCookies = cookies()

    // grabbing card id
    const cardId = cardCookies.get("cardId")


    // if there is no card then return
    console.log(cardId)
    if(!cardId) return;

    try {

        const client = clientPromise;
        const db = client.db("LinkShare");

        // deleting temporary doc from db
        await db.collection("tempshares").deleteOne({ tempCardCustomId: cardId })

        return res.status(200).json("Card deleted")
    }
    catch (error) {
        console.log(error)
    }
}