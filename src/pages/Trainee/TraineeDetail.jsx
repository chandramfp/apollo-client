import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';

import { NoMatch } from '../index';
import trainee from './data/trainee';
import { Button } from '../../components/index';
import getDateFormatted from './helper';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    backgroundColor: '#424242',
    display: 'flex',
    alignItems: 'center',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  Text: {
    color: 'white',
    marginLeft: theme.spacing(5),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function TraineeDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { Traineeid } = useParams();
  const result = trainee.find((element) => element.id === Traineeid);

  if (!trainee.find((element) => element.id === Traineeid)) {
    return <NoMatch />;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <div className={classes.Text}>Thumbnail</div>
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {result.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {getDateFormatted(result.createdAt)}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {result.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <br />
      <div align="center">
        <Button value="Back" onClick={() => history.goBack()} />
      </div>

    </>
  );
}
