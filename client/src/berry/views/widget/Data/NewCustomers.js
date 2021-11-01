import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CardContent, Grid, Typography } from '@material-ui/core';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Avatar1 from './../../../assets/images/users/avatar-1.png';
import Avatar2 from './../../../assets/images/users/avatar-2.png';
import Avatar3 from './../../../assets/images/users/avatar-3.png';
import Avatar4 from './../../../assets/images/users/avatar-4.png';
import Avatar5 from './../../../assets/images/users/avatar-5.png';

// style constant
const useStyles = makeStyles((theme) => ({
    textActive: {
        width: '16px',
        height: '16px',
        verticalAlign: 'sub',
        color: theme.palette.success.main
    },
    timeIcon: {
        fontSize: '0.875rem',
        marginRight: '2px',
        verticalAlign: 'sub'
    },
    ScrollHeight: {
        height: '370px'
    }
}));

//===========================|| DATA WIDGET - NEW CUSTOMERS CARD ||===========================//

const NewCustomers = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <PerfectScrollbar className={classes.ScrollHeight}>
                <CardContent>
                    <Grid container spacing={gridSpacing} alignItems="center">
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar1} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        Alex Thompson
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Cheers!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" component="div" variant="caption">
                                                <FiberManualRecordIcon className={classes.textActive} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar2} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        John Doue
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                stay hungry stay foolish!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <FiberManualRecordIcon className={classes.textActive} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar3} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        Alex Thompson
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Cheers!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <WatchLaterTwoToneIcon className={classes.timeIcon} />
                                                30 min ago
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar4} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        John Doue
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                stay hungry stay foolish!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <WatchLaterTwoToneIcon className={classes.timeIcon} />
                                                10 min ago
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar5} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        Shirley Hoe
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Cheers!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <WatchLaterTwoToneIcon className={classes.timeIcon} />
                                                30 min ago
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar1} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        Alex Thompson
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Cheers!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <FiberManualRecordIcon className={classes.textActive} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar2} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        John Doue
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                stay hungry stay foolish!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <FiberManualRecordIcon className={classes.textActive} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar3} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        Alex Thompson
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Cheers!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <WatchLaterTwoToneIcon className={classes.timeIcon} />
                                                30 min ago
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar4} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        John Doue
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                stay hungry stay foolish!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <WatchLaterTwoToneIcon className={classes.timeIcon} />
                                                10 min ago
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="coverimage" src={Avatar5} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" component="div" variant="subtitle1">
                                        Shirley Hoe
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Cheers!
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align="left" variant="caption">
                                                <WatchLaterTwoToneIcon className={classes.timeIcon} />
                                                30 min ago
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </PerfectScrollbar>
        </MainCard>
    );
};

NewCustomers.propTypes = {
    title: PropTypes.string
};

export default NewCustomers;
