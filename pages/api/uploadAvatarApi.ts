"use server"

import clientPromise from "@/lib/mongodb";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

import fs from 'fs';
import { ObjectId } from "mongodb";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const file = req.body

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log(buffer)

    const session = await getServerSession(req, res, authOptions)
    if(!session) return;

    try {

        const client = await clientPromise;
        const db = client.db("LinkShare")

        const createAvatarId = await db.collection("shares").findOneAndUpdate(
            { userEmail: session.user!.email},
            {
                $set: { avatarId: new ObjectId() }
            },
            {
                projection: { avatarId: 1, _id: 0 }
            }       
        )

        const fileKey = createAvatarId!.data.avatarId

        const params = {
            Bucket: process.env.AWS_BUCKET as string,
            Key: fileKey,
            Body: buffer,
            ContentType: file.mimetype || 'application/octet-stream',
        };

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);

        res.status(200).json("Uploaded data")
    }
    catch (error) {
        res.status(500).json({ message: "failed to upload", error: error})
    }


}
