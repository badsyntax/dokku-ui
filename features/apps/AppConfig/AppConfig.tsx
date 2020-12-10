/* eslint-disable jsx-a11y/no-autofocus */
import React, { Fragment, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  ListItemSecondaryAction,
  Grid,
  withStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
import SettingsIcon from '@material-ui/icons/Settings';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { App } from '../../../dokku/types';
import { useStyles } from './AppConfig.styles';
import { AddConfigVarDialog } from '../AddConfigVarDialog/AddConfigVarDialog';
import EditIcon from '@material-ui/icons/Edit';
export interface AppConfigProps {
  app: App;
  onAddConfigVar: () => void;
}

const ListItemWithWiderSecondaryAction = withStyles((theme) => ({
  secondaryAction: {
    paddingRight: theme.spacing(12),
  },
}))(ListItem);

export const AppConfig: React.FunctionComponent<AppConfigProps> = ({
  app,
  onAddConfigVar,
}) => {
  const classes = useStyles();
  const [isAddVarFormVisible, setIsAddVarFormVisible] = useState<boolean>(
    false
  );
  const handleAddVarButtonClick = () => {
    setIsAddVarFormVisible(true);
  };

  const onAddConfigVarDialogClose = () => {
    setIsAddVarFormVisible(false);
  };

  const onCreateConfigVar = () => {
    setIsAddVarFormVisible(false);
    onAddConfigVar();
  };

  return (
    <Fragment>
      <AddConfigVarDialog
        open={isAddVarFormVisible}
        onClose={onAddConfigVarDialogClose}
        onCreate={onCreateConfigVar}
        app={app}
      />
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Config Vars
          </Typography>
          <Typography>Config vars change the way your app behaves.</Typography>
        </Grid>
        <Grid item xs={8}>
          <Box mb={2}>
            {!app.config?.length && (
              <Alert severity="info">No config vars</Alert>
            )}
            {!!app.config?.length && (
              <List>
                {app.config?.map((config) => {
                  const text = `${config.key}=${config.value}`;
                  return (
                    <ListItem
                      button
                      className={classes.withListActions}
                      key={text}
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{ noWrap: true }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddVarButtonClick}
          >
            Add Config Var
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};
