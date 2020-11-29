import type { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // dokku ps:inspect app
  // dokku logs app
  // dokku domains:report app
  // dokku network:report gr20-discourse
  // dokku proxy:ports gr20-discourse
  // dokku proxy:report demo-app
  // dokku docker-options:report gr20-discourse
  // dokku storage:list gr20-discourse
  // dokku resource:limit gr20-discourse
  // dokku scheduler-docker-local:report
  // dokku report app
  const {
    query: { app },
  } = req;
  res.statusCode = 200;
  res.json({
    name: app,
  });
};
