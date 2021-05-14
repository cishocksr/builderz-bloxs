import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
  },
}));

export default function Card({ card }) {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.card}>
        <Typography>{card.title}</Typography>
      </Paper>
    </div>
  );
}
