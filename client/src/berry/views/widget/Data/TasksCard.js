import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions, CardContent, Divider, Grid, Link, Typography } from '@material-ui/core';

// project imports
import Avatar from './../../../ui-component/extended/Avatar';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
    textPrimary: {
        color: theme.palette.primary.main
    },
    projectTableMain: {
        position: 'relative',
        '&>*': {
            position: 'relative',
            zIndex: '5'
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '43px',
            width: '2px',
            height: '100%',
            background: '#ebebeb',
            zIndex: '1'
        }
    },
    avatarIcon: {
        top: '10px'
    }
}));

//==============================|| DATA WIDGET - TASKS CARD ||==============================//

const TasksCard = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing} alignItems="center" className={classes.projectTableMain}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="success" size="small" className={classes.avatarIcon}>
                                    <ThumbUpAltOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            8:50
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            You’re getting more and more followers, keep it up!
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="primary" size="small" className={classes.avatarIcon}>
                                    <QueryBuilderOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sat, 5 Mar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            Design mobile Application
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="error" size="small" className={classes.avatarIcon}>
                                    <BugReportOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sun, 17 Feb
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            <Link component={RouterLink} to="#" className={classes.textPrimary}>
                                                Jeny
                                            </Link>{' '}
                                            assign you a task{' '}
                                            <Link component={RouterLink} to="#" className={classes.textPrimary}>
                                                Mockup Design
                                            </Link>
                                            .
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="warning" size="small" className={classes.avatarIcon}>
                                    <ErrorOutlineOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sat, 18 Mar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            Design logo
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar color="success" size="small" className={classes.avatarIcon}>
                                    <ThumbUpAltOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="caption">
                                            Sat, 22 Mar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="body2">
                                            Design mobile Application
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
                    View all Projects
                </Button>
            </CardActions>
        </MainCard>
    );
};

TasksCard.propTypes = {
    title: PropTypes.string
};

export default TasksCard;
