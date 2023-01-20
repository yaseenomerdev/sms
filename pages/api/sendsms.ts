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
    throw new Error("message and phone number is require");

  try {
    const response = await fetch(smsUrlWithParams(phone, message));

    const text = await response.text();

    if (text != "OK") {
      throw new Error("message not send server error");
    }

    res.status(200).json({ isSend });
  } catch (error) {
    res.status(500).json({ isSend: false });
  }
}

const smsUrlWithParams = (
  phone: string,
  message: string,
  user = "Alzarga",
  pwd = "80098"
): string => {
  return `http://212.0.129.229/bulksms/webacc.aspx?user=${user}&pwd=${pwd}&smstext=${message}&Sender=Alzarga&Nums=${phone}`;
};
