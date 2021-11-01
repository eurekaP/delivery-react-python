import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

// assets
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    bgPrimary: {
        background: theme.palette.primary.dark
    },
    textWhite: {
        color: '#fff'
    },
    weatherCardBody: {
        padding: '0px !important',
        '& svg': {
            width: '40px',
            height: '40px'
        }
    },
    noBorderFlatCardBlock: {
        padding: '25px 25px'
    }
}));

//===========================|| WIDGET STATISTICS - WEATHER CARD ||===========================//

const WeatherCard = () => {
    const classes = useStyles();
    const primarySunCard = [classes['noBorderFlatCardBlock'], classes['bgPrimary']];

    return (
        <Card>
            <CardContent className={classes.weatherCardBody}>
                <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={6} className={classes.noBorderFlatCardBlock}>
                        <Typography variant="h2" align="center">
                            19<sup>°</sup>
                        </Typography>
                        <Typography variant="subtitle2" align="center">
                            Sunny
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={primarySunCard.join(' ')}>
                        <Typography variant="subtitle2" align="center">
                            <WbSunnyTwoToneIcon align="center" className={classes.textWhite} />
                        </Typography>
                        <Typography variant="subtitle2" align="center" className={classes.textWhite}>
                            New York , NY
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
