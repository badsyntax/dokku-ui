import type { NextApiRequest, NextApiResponse } from 'next';
import { dokkuClient } from '../../../../dokku/DokkuClient';

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
  try {
    if (!Array.isArray(app)) {
      const storage = await dokkuClient.getAppStorage(app);
      // const appData = await dokkuClient.getAppData(app);
      console.log('appData', storage);
    }
    res.status(200).json({
      name: app,
    });
  } catch (e) {
    res.status(500).end(e.message);
  }
};
