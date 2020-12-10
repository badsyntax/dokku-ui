import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../../../api/types';
import { dockerClient } from '../../../../../docker/DockerClient';
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
        const { dockerImage } = req.body;
        if (!dockerImage) {
          throw new Error('invalid dockerImage');
        }
        const tag = 'latest';
        await new Promise((resolve) => {
          dockerClient.pull(dockerImage, (err, stream) => {
            if (err) {
              console.error(err);
            }
            stream.on('data', (data) => {
              console.log(data.toString('utf-8'));
            });
            stream.on('end', async () => {
              const image = await dockerClient.getImage(dockerImage);
              await image.tag({
                repo: `dokku/${app}`,
                tag,
              });
              console.log('tagged image');
              const response = await dokkuClient.deployApp(app, dockerImage);
              console.log('got resppnse', response);
              res.status(200).json({
                ok: true,
                message: response,
              });
              resolve();
            });
          });
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
