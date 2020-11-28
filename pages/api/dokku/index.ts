import type { NextApiRequest, NextApiResponse } from 'next';
import { dokkuClient } from '../../../dokku/DokkuClient';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  try {
    switch (req.method) {
      case 'GET':
        const apps = await dokkuClient.getApps();
        res.statusCode = 200;
        res.json({ apps });
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    res.status(500).end(`Internal Server Error: ${e.message}`);
  }
};
