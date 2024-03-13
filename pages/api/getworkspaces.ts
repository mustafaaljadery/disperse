import axios from "axios";
import axiosRetry from "axios-retry"
import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../../utils/apiUrl";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  axiosRetry(axios, { retries: 3 });
  const result = await axios.get(`${apiUrl()}workspace/read/allworkspaces`)
  res.status(200).json(result.data)
}