import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions, CardContent, Divider, Grid, Typography } from '@material-ui/core';

// project imports
import Avatar from './../../../ui-component/extended/Avatar';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsTwoTone';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartTwoTone';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    userCoverMain: {
        position: 'relative'
    }
}));

//==============================|| DATA WIDGET - FEEDS CARD ||==============================//

const FeedsCard = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Avatar color="primary">
                                        <NotificationsNoneOutlinedIcon />
                                    </Avatar>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="body2">
                                            You have 3 pending tasks.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align="left" variant="caption">
                                            Just Now
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Avatar color="error">
                                        <ShoppingCartOutlinedIcon />
                                    </Avatar>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="body2">
                                            New order received
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align="left" variant="caption">
                                            Just Now
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Avatar color="success">
                                        <DescriptionOutlinedIcon />
                                    </Avatar>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="body2">
                                            You have 3 pending tasks.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align="left" variant="caption">
                                            Just Now
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Avatar color="primary">
                                        <NotificationsNoneOutlinedIcon />
                                    </Avatar>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="body2">
                                            New order received
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align="left" variant="caption">
                                            Just Now
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Avatar color="warning">
                                        <ShoppingCartOutlinedIcon />
                                    </Avatar>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="body2">
                                            Order cancelled
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align="left" variant="caption">
                                            Just Now
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small" color="primary">
                    View all Feeds
                </Button>
            </CardActions>
        </MainCard>
    );
};

FeedsCard.propTypes = {
    title: PropTypes.string
};

export default FeedsCard;
