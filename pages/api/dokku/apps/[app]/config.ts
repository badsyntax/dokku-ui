import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../../../api/types';
import { dokkuClient } from '../../../../../dokku/DokkuClient';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> => {
  try {
    const {
      query: { app },
    } = req;
    if (Array.isArray(app)) {
      throw new Error('App name must be a string');
    }
    switch (req.method) {
      case 'PUT': {
        const { key, value } = req.body;
        const response = await dokkuClient.addAppConfig(app, key, value);
        res.status(200).json({
          ok: true,
          message: response,
        });
        break;
      }
      default:
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};
