// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../fire/nodeApp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.body;
  if (!uid)
    return res.status(400).json({
      error: "bad Reques",
    });

  try {
    await adminAuth.deleteUser(uid);
    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e, success: false });
  }
}
