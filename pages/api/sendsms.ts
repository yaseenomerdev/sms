import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isSend: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { phone, message } = req.body;

  let isSend = false;
  if (!phone || !message)
    return res.status(400).json({
      isSend,
    });

  const response = await fetch(smsUrlWithParams(phone, message));

  if (response.ok) {
    isSend = true;
  }

  res.status(200).json({ isSend });
}

const smsUrlWithParams = (
  phone: string,
  message: string,
  user = "Alzarga",
  pwd = "80098"
): string => {
  return `http://212.0.129.229/bulksms/webacc.aspx?user=${user}&pwd=${pwd}&smstext=${message}&Sender=Alzarga&Nums=${phone}`;
};
