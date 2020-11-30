import type { NextApiRequest, NextApiResponse } from 'next';
import { dokkuClient } from '../../../../dokku/DokkuClient';
import { App } from '../../../../dokku/types';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<App>
): Promise<void> => {
  // dokku ps:inspect gr20-discourse
  // dokku logs gr20-discourse
  // dokku domains:report app
  // dokku network:report gr20-discourse
  // dokku proxy:ports gr20-discourse
  // dokku proxy:report demo-app
  // dokku docker-options:report gr20-discourse
  // dokku storage:list gr20-discourse
  // dokku resource:limit gr20-discourse
  // dokku scheduler-docker-local:report
  // dokku report app
  // dokku git:report komoot-challenge
  // dokku tags gr20-discourse

  const {
    query: { app },
  } = req;
  try {
    if (Array.isArray(app)) {
      throw new Error('App name must be a string');
    }
    const storage = await dokkuClient.getAppStorage(app);
    const domains = await dokkuClient.getAppDomains(app);
    const network = await dokkuClient.getAppNetwork(app);
    const proxyPorts = await dokkuClient.getAppProxyPorts(app);
    const proxyInfo = await dokkuClient.getAppProxyInfo(app);
    const processInfo = await dokkuClient.getAppProcessInfo(app);
    res.status(200).json({
      name: app,
      storage,
      domains,
      network,
      proxyPorts,
      proxyInfo,
      processInfo,
    });
  } catch (e) {
    console.error(e);
    res.status(500).end(e.message);
  }
};
