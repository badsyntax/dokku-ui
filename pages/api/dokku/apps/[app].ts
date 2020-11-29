import type { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { app },
  } = req;
  res.statusCode = 200;
  res.json({
    name: app,
  });
};
