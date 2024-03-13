import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  const {
    firstName,
    lastName,
    email,
    message
  } = JSON.parse(body)

  const contactItem = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    message: message
  }

  if (req.method === 'POST') {
    const contactForUser = await prisma.contact.create({
      data: contactItem
    })

    return res.status(200).json(contactForUser);
  }

  res.end();
};