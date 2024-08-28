import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {


  // grabbing generated id
  const tempDocId = req.query.tempDocId;

  try {

    const client = await clientPromise;
    const db = client.db('LinkShare');

    console.log("Temp doc id", tempDocId)

    if (tempDocId) {

      // grabbing generated temporary doc
      const tempDoc = await db.collection("tempshares").findOne({ tempCardCustomId: tempDocId })
      console.log(tempDoc)
      return res.status(200).json(tempDoc)
    }
    else {

      return res.status(404).json({ message: "No card found" })
    }

  }
  catch (error) {
    console.error('Error during insert and index creation:', error);
  }

}
