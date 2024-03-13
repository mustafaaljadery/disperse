import { prisma } from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    companySize
  } = JSON.parse(body)

  const contactItem = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phone,
    company_name: company,
    company_size: companySize
  }

  if (req.method === 'POST') {
    const contactForUser = await prisma.contactSales.create({
      data: contactItem
    })

    return res.status(200).json(contactForUser);
  }

  res.end();
};