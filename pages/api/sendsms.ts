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

  const text = await response.text();

  console.log(text);

  if (text == "OK") {
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
