import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Badge, Button, CardActions, CardContent, Divider, Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Avatar1 from './../../../assets/images/users/avatar-1.png';
import Avatar2 from './../../../assets/images/users/avatar-2.png';
import Avatar3 from './../../../assets/images/users/avatar-3.png';

// style constant
const useStyles = makeStyles((theme) => ({
    userCoverMain: {
        position: 'relative'
    },
    timeIcon: {
        fontSize: '0.875rem',
        marginRight: '2px',
        verticalAlign: 'sub'
    }
}));

//===========================|| DATA WIDGET - USER ACTIVITY CARD ||===========================//

const UserActivity = ({ title }) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Badge
                                        overlap="circular"
                                        badgeContent={
                                            <FiberManualRecordIcon sx={{ color: theme.palette.success.main, fontSize: '14px' }} />
                                        }
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <Avatar alt="image" src={Avatar1} />
                                    </Badge>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" component="div" variant="subtitle1">
                                    John Deo
                                </Typography>
                                <Typography align="left" component="div" variant="subtitle2">
                                    Lorem Ipsum is simply dummy text.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left" variant="caption">
                                    <WatchLaterTwoToneIcon className={classes.timeIcon} /> 2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Badge
                                        overlap="circular"
                                        badgeContent={<FiberManualRecordIcon sx={{ color: theme.palette.error.main, fontSize: '14px' }} />}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <Avatar alt="image" src={Avatar2} />
                                    </Badge>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" component="div" variant="subtitle1">
                                    John Deo
                                </Typography>
                                <Typography align="left" component="div" variant="subtitle2">
                                    Lorem Ipsum is simply dummy text.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left" variant="caption">
                                    <WatchLaterTwoToneIcon className={classes.timeIcon} /> 2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Badge
                                        overlap="circular"
                                        badgeContent={
                                            <FiberManualRecordIcon sx={{ color: theme.palette.warning.main, fontSize: '14px' }} />
                                        }
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <Avatar alt="image" src={Avatar3} />
                                    </Badge>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" component="div" variant="subtitle1">
                                    John Deo
                                </Typography>
                                <Typography align="left" component="div" variant="subtitle2">
                                    Lorem Ipsum is simply dummy text.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left" variant="caption">
                                    <WatchLaterTwoToneIcon className={classes.timeIcon} /> 2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div className={classes.userCoverMain}>
                                    <Badge
                                        overlap="circular"
                                        badgeContent={
                                            <FiberManualRecordIcon sx={{ color: theme.palette.success.main, fontSize: '14px' }} />
                                        }
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <Avatar alt="image" src={Avatar1} />
                                    </Badge>
                                </div>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" component="div" variant="subtitle1">
                                    John Deo
                                </Typography>
                                <Typography align="left" component="div" variant="subtitle2">
                                    Lorem Ipsum is simply dummy text.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left" variant="caption">
                                    <WatchLaterTwoToneIcon className={classes.timeIcon} /> 2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small" color="primary">
                    View all Projects
                </Button>
            </CardActions>
        </MainCard>
    );
};

UserActivity.propTypes = {
    title: PropTypes.string
};

export default UserActivity;
