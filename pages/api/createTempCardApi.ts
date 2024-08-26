"use server"

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '@/lib/mongodb';

import { serialize } from "cookie";
import { v4 as uuidv4 } from 'uuid';

export default async (req: NextApiRequest, res: NextApiResponse) => {



    const { links, linkInfo, avatar } = req.body
    console.log("getting data:", req.body)

    const cardId = req.cookies.cardId;
    console.log("checking cardId")

    if (cardId) {
        return res.status(200).json({ message: "cardId already exists", cardId });
    }

    const shareCookies = req.cookies.shareCookies;
    console.log("Save cookies:", shareCookies);

    if(shareCookies === "0") {
        console.log("No more shares, blocking request")
        return res.status(401).json({ message: "User ran out of shares, blocking unauthorized request" })
    }

    try {

        const client = await clientPromise;
        const db = client.db("LinkShare")

        const newId = uuidv4()
        console.log("generating new id:", newId)
            
        const maxCookieAge = 10800

        res.setHeader(
            "Set-Cookie",
            serialize("cardId", newId, {
                path: "/",
                maxAge: maxCookieAge,
                expires: new Date(Date.now() + maxCookieAge * 1000),
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
        );

        console.log("creating new cookie")

        const tempCardModel = {
            firstName: linkInfo.firstName,
            lastName: linkInfo.lastName,
            linkEmail: linkInfo.linkEmail,
            links: links,
            avatar: avatar,
            createdAt: new Date(),
            tempCardCustomId: newId
        }

        console.log("creating new temp card")

        const result = await db.collection("tempshares").insertOne(tempCardModel)
        console.log("Inserted new doc", result)

        await db.collection("tempshares").createIndex({ createdAt: 1 }, { expireAfterSeconds: maxCookieAge })

        return res.status(200).json({ cardId: newId})

    }
    catch (error) {
        console.error("Error creating doc", error)
    }

}
