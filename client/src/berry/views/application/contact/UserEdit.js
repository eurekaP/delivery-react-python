import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Autocomplete,
    Avatar,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useScrollTrigger
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from '../../../ui-component/cards/SubCard';
import { gridSpacing } from './../../../store/constant';

// assets
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import CallTwoToneIcon from '@material-ui/icons/CallTwoTone';
import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import TodayTwoToneIcon from '@material-ui/icons/TodayTwoTone';

import User1 from './../../../assets/images/users/avatar-1.png';

const avatarImage = require.context('./../../../assets/images/users', true);

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '342px'
    },
    btnProfile: {
        width: '100%'
    },
    input: {
        display: 'none'
    },
    ScrollHeight: {
        height: 'calc(100vh - 83px)',
        overflowX: 'hidden'
    }
}));

const jobTypes = [
    { label: 'Work', id: 1 },
    { label: 'Personal', id: 2 }
];

// sticky edit card
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

//-----------------------|| CONTACT CARD/LIST USER EDIT ||-----------------------//

const UserEdit = ({ user, onCancel, onSave, ...others }) => {
    const classes = useStyles();
    const theme = useTheme();

    // save user to local state to update details and submit letter
    const [profile, setProfile] = useState({});
    useEffect(() => {
        setProfile(user);
    }, [user]);

    let avatarProfile = User1;
    if (profile) {
        avatarProfile = profile.avatar && avatarImage(`./${profile.avatar}`).default;
    }

    return (
        <ElevationScroll {...others}>
            <div className={classes.root}>
                <SubCard
                    sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                    }}
                    content={false}
                >
                    <PerfectScrollbar className={classes.ScrollHeight}>
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item>
                                        <Avatar alt="User 3" src={avatarProfile} sx={{ width: '64px', height: '64px' }} />
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <input
                                                    accept="image/*"
                                                    className={classes.input}
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                />
                                                <label htmlFor="contained-button-file">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="primary"
                                                        startIcon={<UploadTwoToneIcon />}
                                                    >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="caption">Image size should be 125kb Max.</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => onCancel(profile)}>
                                            <HighlightOffTwoToneIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Name</InputLabel>
                                    <OutlinedInput
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        type="text"
                                        label="Name"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <BusinessTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Company</InputLabel>
                                    <OutlinedInput
                                        value={profile.company}
                                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                        type="text"
                                        label="Company"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <BusinessTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Job Title</InputLabel>
                                    <OutlinedInput
                                        value={profile.role}
                                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                        type="text"
                                        label="Job Title"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <WorkTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={jobTypes}
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={[jobTypes[0]]}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Email</InputLabel>
                                    <OutlinedInput
                                        value={profile.work_email}
                                        onChange={(e) => setProfile({ ...profile, work_email: e.target.value })}
                                        type="text"
                                        label="Email"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MailTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={jobTypes}
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={[jobTypes[1]]}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Email</InputLabel>
                                    <OutlinedInput
                                        value={profile.personal_email}
                                        onChange={(e) => setProfile({ ...profile, personal_email: e.target.value })}
                                        type="text"
                                        label="Email"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MailTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="text" startIcon={<ControlPointIcon />}>
                                    Add New Email
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={jobTypes}
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={[jobTypes[0]]}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Phone Number</InputLabel>
                                    <OutlinedInput
                                        value={profile.work_phone}
                                        onChange={(e) => {
                                            setProfile({ ...profile, work_phone: e.target.value });
                                        }}
                                        type="text"
                                        label="Phone Number"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CallTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={jobTypes}
                                    getOptionLabel={(option) => option.label}
                                    defaultValue={[jobTypes[1]]}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Phone Number</InputLabel>
                                    <OutlinedInput
                                        value={profile.personal_phone}
                                        onChange={(e) => {
                                            setProfile({ ...profile, personal_phone: e.target.value });
                                        }}
                                        type="text"
                                        label="Phone Number"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CallTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="text" startIcon={<ControlPointIcon />}>
                                    Add New Phone
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Birthday</InputLabel>
                                    <OutlinedInput
                                        defaultValue="November 30, 1997"
                                        type="text"
                                        label="Birthday"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <TodayTwoToneIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Bio</InputLabel>
                                    <OutlinedInput
                                        defaultValue={profile.birthdayText}
                                        onChange={(e) => setProfile({ ...profile, birthdayText: e.target.value })}
                                        type="text"
                                        label="Bio"
                                        multiline
                                        rows={3}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.btnProfile}
                                            onClick={() => onSave(profile)}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.btnProfile}
                                            onClick={() => onCancel(profile)}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>
                </SubCard>
            </div>
        </ElevationScroll>
    );
};

UserEdit.propTypes = {
    user: PropTypes.object,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
};

export default UserEdit;
