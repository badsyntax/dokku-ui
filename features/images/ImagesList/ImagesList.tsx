import React, { useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '../../layout/Link/Link';
import { useStyles } from './styles';
import { AppActions } from './ImageActions';
import { ImageInfo } from 'dockerode';

export interface ImagesListProps {
  images: ImageInfo[];
  danglingImages: ImageInfo[];
}

export const ImagesList: React.FunctionComponent<ImagesListProps> = ({
  images,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApp, setSelectedApp] = useState<string>(null);

  const handleMenuClick = (app: string) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedApp(app);
    setAnchorEl(event.currentTarget);
  };

  const resetAnchorEl = () => setAnchorEl(null);

  return (
    <TableContainer component={Paper}>
      {/* <AppActions
        anchorEl={anchorEl}
        app={selectedApp}
        resetAnchorEl={resetAnchorEl}
      /> */}
      <Table aria-label="Apps">
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Image ID</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Size</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {images.map((image, i) => {
            const [name, tag] = image.RepoTags[0].split(':');
            const [type, id] = image.Id.split(':');
            const shortId = id.substr(0, 12);
            const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
            const s = Date.now() / 1000 - image.Created;
            const m = s / 60;
            const h = m / 60;
            const d = h / 24;
            const unit =
              d > 0 ? 'day' : h > 0 ? 'hour' : m > 0 ? 'minute' : 'second';
            const value = Math.floor(d || h || m || s);
            const created = rtf1.format(-1 * value, unit);
            const size = Math.floor(image.Size / 1024 / 1024);

            return (
              <TableRow key={image.RepoTags[0] || i}>
                <TableCell component="th" scope="row">
                  <Typography>
                    <Link href={`/images/${name}`}>{name}</Link>
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography>{tag}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography>{shortId}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography>{created}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography>{size}MB</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick(image.RepoTags[0])}
                    className={classes.menuButton}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
