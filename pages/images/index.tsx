import React, { Fragment, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dockerAPI, GetImagesResponse } from '../../api/DockerAPI';
import { ImagesList } from '../../features/images/ImagesList/ImagesList';

const Images: React.FunctionComponent = () => {
  const [images, setImages] = useState<GetImagesResponse>(null);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    dockerAPI
      .getImages()
      .then(setImages, setError)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Fragment>
      <PageHeader title="Images" />
      {isLoading && <CircularProgress />}
      {!isLoading && !error && (
        <ImagesList
          images={images.nonDangling}
          danglingImages={images.dangling}
        />
      )}
      {/* {!isLoading && error && <DokkuClientError error={error} />} */}
    </Fragment>
  );
};

export default Images;
