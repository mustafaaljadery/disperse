import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"
import axiosRetry from "axios-retry"
import { apiUrl } from "../../utils/apiUrl";


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { query: { link } } = req;
  axiosRetry(axios, { retries: 3 });

  const response = await axios.get(`${apiUrl()}youtube-link`, { params: { link: link } })

  res.status(200).json(response.data)
}