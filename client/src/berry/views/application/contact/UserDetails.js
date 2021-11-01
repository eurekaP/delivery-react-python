import * as PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, Chip, Divider, Grid, IconButton, Typography, useScrollTrigger } from '@material-ui/core';

// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import { gridSpacing } from './../../../store/constant';

// assets
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import CallTwoToneIcon from '@material-ui/icons/CallTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import CakeTwoToneIcon from '@material-ui/icons/CakeTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import NotInterestedTwoToneIcon from '@material-ui/icons/NotInterestedTwoTone';

const avatarImage = require.context('./../../../assets/images/users', true);

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '342px'
    },
    btnProfile: {
        width: '100%'
    }
}));

// sticky details card
function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 130,
        target: window ? window() : undefined
    });

    return React.cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'relative',
            top: trigger ? '83px' : '0',
            width: trigger ? '318px' : '100%'
        }
    });
}

//-----------------------|| CONTACT CARD/LIST USER DETAILS ||-----------------------//

const UserDetails = ({ user, onClose, onEditClick, ...others }) => {
    const classes = useStyles();
    const theme = useTheme();

    let avatarProfile = user.avatar && avatarImage(`./${user.avatar}`).default;

    return (
        <ElevationScroll {...others}>
            <div className={classes.root}>
                <SubCard
                    sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                    }}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Avatar alt={user.name} src={avatarProfile} sx={{ width: '64px', height: '64px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" component="div" sx={{ fontSize: '16px' }}>
                                                {user.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Chip
                                                label="Work"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    bgcolor:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark.dark
                                                            : theme.palette.primary.light
                                                }}
                                            ></Chip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={onClose}>
                                        <HighlightOffTwoToneIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={classes.btnProfile}
                                        startIcon={<ChatBubbleTwoToneIcon />}
                                        onClick={onEditClick}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.btnProfile}
                                        startIcon={<NotInterestedTwoToneIcon />}
                                    >
                                        Block
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <BusinessTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">{user.company}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <WorkTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">{user.role}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <MailTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2" sx={{ mb: '5px' }}>
                                        {user.work_email}{' '}
                                        <Typography component="span" color="primary">
                                            work
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body2">
                                        {user.personal_email}{' '}
                                        <Typography component="span" color="secondary">
                                            Personal
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <CallTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2" sx={{ mb: '5px' }}>
                                        {user.work_phone}{' '}
                                        <Typography component="span" color="primary">
                                            work
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body2">
                                        {user.personal_phone}{' '}
                                        <Typography component="span" color="secondary">
                                            Personal
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <PinDropTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">{user.location}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <CakeTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2">November 30, 1997</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <InfoTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '18px', mr: '5px' }} />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="body2" sx={{ mb: '5px' }}>
                                        {user.birthdayText}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </div>
        </ElevationScroll>
    );
};

UserDetails.propTypes = {
    user: PropTypes.object,
    onClose: PropTypes.func,
    onEditClick: PropTypes.func
};

export default UserDetails;
