// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendEmailVerification, signInWithCustomToken } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../fire/nodeApp";

type Data = {
  error?: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, displayName, password } = req.body;
  if (!email || !displayName || !password)
    return res.status(400).json({
      error: "bad Reques",
    });

  const user = await adminAuth.createUser({
    email,
    displayName,
    password,
  });

  res.status(200).json({ user });
}
