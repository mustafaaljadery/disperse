import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  const {
    email
  } = JSON.parse(body)

  const contactItem = {
    email: email,
  }

  if (req.method === 'POST') {
    const contactForUser = await prisma.newsletter.findFirst({
      where: {
        email: email
      }
    })

    return res.status(200).json(contactForUser);
  }

  res.end();
};