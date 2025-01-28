 
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie || '';
  const isAuthenticated = cookies.includes('access_token');

  res.status(200).json({ isAuthenticated });
}
