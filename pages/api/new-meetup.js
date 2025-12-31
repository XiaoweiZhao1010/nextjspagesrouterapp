// /api/new-meetup
import { getClient } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const mongoClient = await getClient();
    const db = mongoClient.db();
    const data = req.body;
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    return res.status(201).json({ message: "Meetup inserted!" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Inserting meetup failed." });
  }
}
