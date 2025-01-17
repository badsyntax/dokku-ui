import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../../api/types';
import { dokkuClient } from '../../../../dokku/DokkuClient';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const apps = await dokkuClient.getApps();
      res.status(200).json({
        ok: true,
        data: apps,
      });
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
