import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@material-ui/core';

// third party
import Timer from 'react-compound-timer';

// project imports
import AnimateButton from './../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../../store/constant';

// assets
import imageGrid from './../../../../assets/images/maintenance/img-soon-grid.svg';
import imageBlock from './../../../../assets/images/maintenance/img-soon-block.svg';
import imageBlueBlock from './../../../../assets/images/maintenance/img-soon-blue-block.svg';
import imagePurpleBlock from './../../../../assets/images/maintenance/img-soon-purple-block.svg';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    errorImg: {
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative'
    },
    errorContent: {
        maxWidth: '450px',
        margin: '0 auto',
        textAlign: 'center'
    },
    timer: {
        maxWidth: '450px',
        margin: '0 auto'
    },
    timerBlock: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.main,
        borderRadius: '12px',
        padding: '24px 0',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: '24px'
    },
    comingSoonBlock: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBlock: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '8s blink ease-in-out infinite'
    },
    imgBackground: {
        animation: '15s blink ease-in-out infinite'
    },
    imgBlue: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '15s wings ease-in-out infinite'
    },
    imgPurple: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '12s wings ease-in-out infinite'
    }
}));
//===========================|| COMING SOON 2 ||===========================//

const ComingSoon2 = () => {
    const classes = useStyles();

    return (
        <Card className={classes.comingSoonBlock}>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <div className={classes.errorContent}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1">Coming Soon</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Something new is on it's way</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.errorImg}>
                            <CardMedia component="img" image={imageGrid} title="Slider5 image" className={classes.imgBackground} />
                            <CardMedia component="img" image={imageBlock} title="Slider5 image" className={classes.imgBlock} />
                            <CardMedia component="img" image={imagePurpleBlock} title="Slider5 image" className={classes.imgPurple} />
                            <CardMedia component="img" image={imageBlueBlock} title="Slider5 image" className={classes.imgBlue} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Timer initialTime={60000 * 60 * 24 * 10 - 1000} direction="backward">
                            {() => (
                                <div className={classes.timer}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={3}>
                                            <div className={classes.timerBlock}>
                                                <Timer.Days />
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className={classes.timerBlock}>
                                                <Timer.Hours />
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className={classes.timerBlock}>
                                                <Timer.Minutes />
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className={classes.timerBlock}>
                                                <Timer.Seconds />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        </Timer>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.errorContent}>
                            <Grid container spacing={gridSpacing} alignItems="center">
                                <Grid item xs zeroMinWidth>
                                    <TextField fullWidth label="Email Address" />
                                </Grid>
                                <Grid item>
                                    <AnimateButton>
                                        <Button variant="contained" size="large" color="primary">
                                            <NotificationsActiveTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Notify Me
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ComingSoon2;
