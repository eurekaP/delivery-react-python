import React from 'react';

// material-ui
import { Button, Grid, Stack, TextField, Typography } from '@material-ui/core';

// project imports
import SubCard from './../../../../../ui-component/cards/SubCard';
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../../../store/constant';

//-----------------------|| PROFILE 3 - SECURITY ||-----------------------//

const Security = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={8}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Change Password">
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic9" fullWidth label="Current password" variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic10" fullWidth label="New Password" variant="outlined" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic11" fullWidth label="Re-enter New Password" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row">
                                        <AnimateButton>
                                            <Button variant="contained" color="primary">
                                                Change Password
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6} md={4}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Delete Account">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        To deactivate your account, first delete its resources. If you are the only owner of any teams,
                                        either assign another owner or deactivate the team.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row">
                                        <AnimateButton>
                                            <Button variant="outlined" size="small" color="error">
                                                Deactivate Account
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Security;
