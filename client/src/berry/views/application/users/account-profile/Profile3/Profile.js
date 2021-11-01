import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Grid, Stack, TextField, Typography } from '@material-ui/core';

// project imports
import SubCard from './../../../../../ui-component/cards/SubCard';
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../../../store/constant';

// assets
import Avatar1 from './../../../../../assets/images/users/avatar-1.png';

// style constant
const useStyles = makeStyles((theme) => ({
    accountAvatar: {
        width: '100px',
        height: '100px',
        margin: '0 auto'
    },
    accountContent: {
        textAlign: 'center'
    }
}));

//-----------------------|| PROFILE 3 - PROFILE ||-----------------------//

const Profile = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={4}>
                <SubCard title="Profile Picture" contentClass={classes.accountContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar alt="User 1" src={Avatar1} className={classes.accountAvatar} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                Upload/Change Your Profile Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button variant="contained" color="primary" size="small">
                                    Upload Avatar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item sm={6} md={8}>
                <SubCard title="Edit Account Details">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic1"
                                fullWidth
                                label="Name"
                                variant="outlined"
                                defaultValue="Josephine"
                                helperText="Helper text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic6"
                                fullWidth
                                label="Email address"
                                variant="outlined"
                                defaultValue="name@example.com"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic4" fullWidth label="Company" variant="outlined" defaultValue="Materially Inc." />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic5" fullWidth label="Country" variant="outlined" defaultValue="USA" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                id="outlined-basic7"
                                fullWidth
                                label="Phone number"
                                variant="outlined"
                                defaultValue="4578-420-410 "
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField id="outlined-basic8" fullWidth label="Birthday" variant="outlined" defaultValue="31/01/2001" />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="contained" color="primary">
                                        Change Details
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Profile;
