import React from 'react';

// material-ui
import { Alert, AlertTitle, Button, Grid, TextField } from '@material-ui/core';

// project imports
import SubCard from './../../../../../ui-component/cards/SubCard';
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../../../store/constant';

//-----------------------|| PROFILE 1 - CHANGE PASSWORD ||-----------------------//

const ChangePassword = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Alert severity="warning" variant="outlined" sx={{ borderColor: 'warning.dark' }}>
                    <AlertTitle>Alert!</AlertTitle>
                    Your Password will expire in every 3 months. So change it periodically.
                    <strong> Do not share your password</strong>
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Change Password">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing} sx={{ mb: '14px' }}>
                            <Grid item xs={12} md={6}>
                                <TextField type="password" id="outlined-basic7" fullWidth label="Current Password" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={gridSpacing} sx={{ mb: '14px' }}>
                            <Grid item xs={12} md={6}>
                                <TextField type="password" id="outlined-basic8" fullWidth label="New Password" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField type="password" id="outlined-basic9" fullWidth label="Confirm Password" variant="outlined" />
                            </Grid>
                        </Grid>
                    </form>
                    <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
                        <Grid item>
                            <AnimateButton>
                                <Button variant="contained" color="primary">
                                    Change Password
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item>
                            <Button color="info">Clear</Button>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;
