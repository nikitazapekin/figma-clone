



      import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RespTypes {
  isAuthorized: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get<RespTypes>(
      `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/get-cookie`,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json',
          Cookie: req.headers.cookie || '', 
         },
      }
    );

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(401).json({ isAuthorized: false, message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(401).json({ isAuthorized: false, message: 'Error checking token' });
  }
}
