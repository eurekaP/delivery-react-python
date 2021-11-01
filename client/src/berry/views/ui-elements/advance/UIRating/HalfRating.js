import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Rating } from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1)
        }
    }
}));

//===============================|| UI RATING - HALF ||===============================//

export default function HalfRating() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justifyContent="center">
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
            <Grid container justifyContent="center">
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
            </Grid>
        </div>
    );
}
