import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, FormControlLabel, Grid, IconButton, MenuItem, Switch, TextField, Typography } from '@material-ui/core';

// project imports
import SubCard from './../../../../../ui-component/cards/SubCard';
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../../../store/constant';

// assets
import DesktopWindowsTwoToneIcon from '@material-ui/icons/DesktopWindowsTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SmartphoneTwoToneIcon from '@material-ui/icons/SmartphoneTwoTone';
import PhoneIphoneTwoToneIcon from '@material-ui/icons/PhoneIphoneTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    deviceName: {
        '& >span': {
            fontSize: '90%',
            fontWeight: '400'
        }
    },
    deviceState: {
        display: 'inline-flex',
        alignItems: 'center',
        '& >svg': {
            width: '0.7em',
            height: '0.7em',
            marginRight: '5px'
        }
    },
    textActive: {
        color: theme.palette.success.main
    },
    textMuted: {
        color: theme.palette.grey[400]
    }
}));

// select options
const currencies = [
    {
        value: 'Washington',
        label: 'Washington'
    },
    {
        value: 'India',
        label: 'India'
    },
    {
        value: 'Africa',
        label: 'Africa'
    },
    {
        value: 'New-York',
        label: 'New York'
    },
    {
        value: 'Malaysia',
        label: 'Malaysia'
    }
];

const experiences = [
    {
        value: 'Startup',
        label: 'Startup'
    },
    {
        value: '2-year',
        label: '2 year'
    },
    {
        value: '3-year',
        label: '3 year'
    },
    {
        value: '4-year',
        label: '4 year'
    },
    {
        value: '5-year',
        label: '5 year'
    }
];

//-----------------------|| PROFILE 1 - MY ACCOUNT ||-----------------------//

const MyAccount = () => {
    const classes = useStyles();
    const deviceStateActive = [classes['deviceState'], classes['textActive']];
    const deviceStateInactive = [classes['deviceState'], classes['textMuted']];

    const [currency, setCurrency] = React.useState('Washington');
    const handleChange1 = (event) => {
        setCurrency(event.target.value);
    };

    const [experience, setExperience] = React.useState('Startup');
    const handleChange2 = (event) => {
        setExperience(event.target.value);
    };

    const [state1, setState1] = React.useState({
        checkedB: false
    });
    const [state2, setState2] = React.useState({
        checkedB: false
    });
    const [state3, setState3] = React.useState({
        checkedB: true
    });
    const handleSwitchChange1 = (event) => {
        setState1({ ...state1, [event.target.name]: event.target.checked });
    };
    const handleSwitchChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
    };
    const handleSwitchChange3 = (event) => {
        setState3({ ...state3, [event.target.name]: event.target.checked });
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="General Settings">
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic5"
                                    fullWidth
                                    label="Username"
                                    helperText="Your Profile URL: https://pc.com/Ashoka_Tano_16"
                                    variant="outlined"
                                    defaultValue="Asoka_Tana_16"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-basic6"
                                    fullWidth
                                    label="Account Email"
                                    variant="outlined"
                                    defaultValue="demo@sample.com"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-select-language"
                                    select
                                    fullWidth
                                    label="Language"
                                    value={currency}
                                    onChange={handleChange1}
                                    variant="outlined"
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-select-experience1"
                                    select
                                    fullWidth
                                    label="Signing Using"
                                    value={experience}
                                    onChange={handleChange2}
                                    variant="outlined"
                                >
                                    {experiences.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Advance Settings">
                    <Grid container direction="column" spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                                Secure Browsing
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={state1.checkedB} onChange={handleSwitchChange1} name="checkedB" color="primary" />
                                }
                                label="Browsing Securely ( https ) when it's necessary"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                                Login Notifications
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={state2.checkedB} onChange={handleSwitchChange2} name="checkedB" color="primary" />
                                }
                                label="Notify when login attempted from other place"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                                Login Approvals
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch checked={state3.checkedB} onChange={handleSwitchChange3} name="checkedB" color="primary" />
                                }
                                label="Approvals is not required when login from unrecognized devices."
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                                Recognized Devices
                            </Typography>
                            <Grid container direction="column">
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <DesktopWindowsTwoToneIcon sx={{ fontSize: '1.15rem' }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography className={classes.deviceName} variant="subtitle1">
                                                Cent Desktop{' '}
                                                <Typography component="span" variant="subtitle2">
                                                    | 4351 Deans Lane, Chelmsford
                                                </Typography>{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={deviceStateActive.join(' ')} variant="subtitle2">
                                                <FiberManualRecordIcon />
                                                Current Active
                                                <IconButton>
                                                    <HighlightOffTwoToneIcon sx={{ fontSize: '1.15rem' }} />
                                                </IconButton>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <SmartphoneTwoToneIcon sx={{ fontSize: '1.15rem' }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography className={classes.deviceName} variant="subtitle1">
                                                Imho Tablet{' '}
                                                <Typography component="span" variant="subtitle2">
                                                    | 4185 Michigan Avenue
                                                </Typography>{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={deviceStateInactive.join(' ')} variant="subtitle2">
                                                <FiberManualRecordIcon />
                                                Active 5 days ago
                                                <IconButton>
                                                    <HighlightOffTwoToneIcon sx={{ fontSize: '1.15rem' }} />
                                                </IconButton>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <PhoneIphoneTwoToneIcon sx={{ fontSize: '1.15rem' }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography className={classes.deviceName} variant="subtitle1">
                                                Albs Mobile{' '}
                                                <Typography component="span" variant="subtitle2">
                                                    | 3462 Fairfax Drive, Montcalm
                                                </Typography>{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={deviceStateInactive.join(' ')} variant="subtitle2">
                                                <FiberManualRecordIcon />
                                                Active 1 month ago
                                                <IconButton>
                                                    <HighlightOffTwoToneIcon sx={{ fontSize: '1.15rem' }} />
                                                </IconButton>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                                Active Sessions
                            </Typography>
                            <Grid container direction="column">
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <DesktopWindowsTwoToneIcon className={classes.textActive} sx={{ fontSize: '1.15rem' }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography className={classes.deviceName} variant="subtitle1">
                                                Ceto Desktop{' '}
                                                <Typography component="span" variant="subtitle2">
                                                    | 4351 Deans Lane, Chelmsford
                                                </Typography>{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="text" color="error">
                                                Logout
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <SmartphoneTwoToneIcon className={classes.textActive} sx={{ fontSize: '1.15rem' }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography className={classes.deviceName} variant="subtitle1">
                                                Moon Tablet{' '}
                                                <Typography component="span" variant="subtitle2">
                                                    | 4185 Michigan Avenue
                                                </Typography>{' '}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="text" color="error">
                                                Logout
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ mt: 2 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Grid spacing={2} container justifyContent="flex-end">
                            <Grid item>
                                <AnimateButton>
                                    <Button variant="contained" color="primary">
                                        Update Profile
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <Button color="info">Clear</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default MyAccount;
