import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const CardView = ({ selectedService, selectedEnvironment, deleteService }) => {
  const classes = useStyles(selectedService, selectedEnvironment)();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {selectedService} - details
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={deleteService} size="medium">
          Delete Service
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardView;
