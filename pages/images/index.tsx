import React, { Fragment, useContext, useEffect, useState } from 'react';
import { PageHeader } from '../../features/layout/PageHeader/PageHeader';
import { dockerAPI, GetImagesResponse } from '../../api/DockerAPI';
import { ImagesList } from '../../features/images/ImagesList/ImagesList';
import { ProgressContext } from '../../features/layout/Progress/Progress';
import { DokkuClientError } from '../../features/layout/DokkuClientError/DokkuClientError';

const Images: React.FunctionComponent = () => {
  const [images, setImages] = useState<GetImagesResponse>(null);
  const [error, setError] = useState<Error>(null);
  const { show: showProgress, hide: hideProgress } = useContext(
    ProgressContext
  );
  useEffect(() => {
    showProgress();
    dockerAPI.getImages().then(setImages, setError).finally(hideProgress);
  }, [hideProgress, showProgress]);
  return (
    <Fragment>
      <PageHeader title="Images" />
      {images && (
        <ImagesList
          images={images.nonDangling}
          danglingImages={images.dangling}
        />
      )}
      {error && <DokkuClientError error={error} />}
    </Fragment>
  );
};

export default Images;
