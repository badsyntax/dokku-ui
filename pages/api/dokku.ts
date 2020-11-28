import type { NextApiRequest, NextApiResponse } from 'next';
import { dokkuClient } from '../../dokku/DokkuClient';

console.log('load routes');

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;
  switch (req.method) {
    case 'GET':
      const apps = await dokkuClient.runCommand('apps:list');
      res.statusCode = 200;
      res.json({ apps: apps });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
