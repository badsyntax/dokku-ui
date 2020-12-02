import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse, ResponseStatus } from '../../../../api/types';
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
        status: ResponseStatus.success,
        data: apps,
      });
      break;
    }
  }
};
