import type { NextApiRequest, NextApiResponse } from 'next';
import { dockerClient } from '../../../../docker/DockerClient';
import { Images } from '../../../../docker/types';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Images>
): Promise<void> => {
  const [danglingImages, nonDanglingImages] = await Promise.all([
    dockerClient.listImages({
      filters: {
        dangling: {
          true: true,
        },
      },
    }),
    dockerClient.listImages({
      filters: {
        dangling: {
          false: true,
        },
      },
    }),
  ]);
  res.statusCode = 200;
  res.json({
    dangling: danglingImages,
    nonDangling: nonDanglingImages,
  });
};
