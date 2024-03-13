import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

export async function merseConversion(size: number) {
  axiosRetry(axios, { retries: 3 });
  try {
    const visitorId = localStorage.getItem('merse-user');
    let result: any = await axios.post(
      `${apiUrl()}referrals/conversion`,
      null,
      {
        params: {
          visitorId: visitorId,
          size: size,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
