import React, { Fragment, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Divider,
  TextField,
  IconButton,
} from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import { App } from '../../../dokku/types';
import { SectionDivider } from '../../layout/SectionDivider/SectionDivider';
import BackupIcon from '@material-ui/icons/Backup';
import ClearIcon from '@material-ui/icons/Clear';
import { CodeBlock } from '../../layout/CodeBlock/CodeBlock';
import { useStyles } from './AppDeploy.styles';
import { dokkuApi } from '../../../api/DokkuAPI';
import { ProgressButton } from '../../layout/ProgressButton/ProgressButton';

export interface AppDeployProps {
  app: App;
}

export const AppDeploy: React.FunctionComponent<AppDeployProps> = ({ app }) => {
  const classes = useStyles();
  const [dockerImage, setDockerImage] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDockerImageChange = (e) => {
    const value = e?.target.value || null;
    setDockerImage(value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formData = new FormData(e.target);
    dokkuApi
      .deployApp(app.name, formData)
      .then(
        () => {
          // onClose();
          // onCreate();
        },
        (e) => {
          setError(e.message);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };
  const gitCode = `git remote add dokku dokku@dokku.me:${app.name}\ngit push dokku`;
  return (
    <Fragment>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Deploy Docker Image
          </Typography>
          <Typography>Deploy a local or remote Docker image.</Typography>
        </Grid>
        <Grid item xs={8}>
          <form autoComplete="off" onSubmit={handleFormSubmit}>
            <Autocomplete
              freeSolo
              options={['image:version']}
              className={classes.autocomplete}
              value={dockerImage}
              onInputChange={onDockerImageChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Image"
                  fullWidth
                  variant="outlined"
                  placeholder="IMAGE:TAG"
                  name="dockerImage"
                  required
                />
              )}
            />
            <ProgressButton
              variant="outlined"
              startIcon={<BackupIcon />}
              disabled={!dockerImage || isLoading}
              showProgress={isLoading}
              type="submit"
            >
              Deploy
            </ProgressButton>
          </form>
        </Grid>
      </Grid>
      <SectionDivider />
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Deploy with Git
          </Typography>
          <Typography>
            Push to the dokku server to build the image and deploy.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <CodeBlock language="shell">{gitCode}</CodeBlock>
        </Grid>
      </Grid>
    </Fragment>
  );
};
