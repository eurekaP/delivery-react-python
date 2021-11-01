import React from 'react';

// material-ui
import { Button, Grid, Stack, TextField } from '@material-ui/core';

// project imports
import AnimateButton from '../../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../../../store/constant';

//-----------------------|| PROFILE 2 - CHANGE PASSWORD ||-----------------------//

const ChangePassword = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
                <TextField type="password" fullWidth label="Current Password" defaultValue="Selfing Listel" />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
                <TextField type="password" fullWidth label="New Password" defaultValue=" 30529399" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField type="password" fullWidth label="Confirm Password" defaultValue="395005" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Stack direction="row">
                    <AnimateButton>
                        <Button variant="outlined" size="large" color="primary">
                            Change Password
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;
