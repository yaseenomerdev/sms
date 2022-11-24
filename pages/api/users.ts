// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../fire/nodeApp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { users } = await adminAuth.listUsers();

  res.status(200).json(users);
}
