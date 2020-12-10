import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../../api/types';
import { dokkuClient } from '../../../../dokku/DokkuClient';
import { App } from '../../../../dokku/types';

async function createApp(
  app: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const apps = await dokkuClient.getApps();
  if (apps.includes(app)) {
    res.status(400).json({
      ok: false,
      message: 'Name is already taken',
    });
    return;
  }
  await dokkuClient.createApp(app);
  res.status(200).json({
    ok: true,
    message: 'App successfully created',
  });
}

async function getApp(
  app: string,
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<App>>
) {
  const storage = await dokkuClient.getAppStorage(app);
  const domains = await dokkuClient.getAppDomains(app);
  const network = await dokkuClient.getAppNetwork(app);
  // const proxyPorts = await dokkuClient.getAppProxyPorts(app);
  const proxyInfo = await dokkuClient.getAppProxyInfo(app);
  const processReport = await dokkuClient.getAppProcessReport(app);
  // const processInfo = await dokkuClient.getAppProcessInfo(app);
  const config = await dokkuClient.getAppConfig(app);

  res.status(200).json({
    ok: true,
    data: {
      name: app,
      storage,
      domains,
      network,
      proxyPorts: [],
      proxyInfo,
      processInfo: {},
      processReport,
      config,
    },
  });
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> => {
  // dokku ps:inspect gr20-discourse
  // dokku ps:report gr20-discourse
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
  try {
    const {
      query: { app },
    } = req;
    if (Array.isArray(app)) {
      throw new Error('App name must be a string');
    }
    switch (req.method) {
      case 'GET':
        await getApp(app, req, res);
        break;
      case 'PUT':
        await createApp(app, req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    res.status(500).end(e.message);
  }
};
