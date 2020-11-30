import type { NextApiRequest, NextApiResponse } from 'next';
import { dokkuClient } from '../../../../dokku/DokkuClient';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<string[]>
): Promise<void> => {
  const apps = await dokkuClient.getApps();
  res.statusCode = 200;
  res.json(apps);
};
