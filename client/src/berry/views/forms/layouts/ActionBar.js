import React from 'react';

// material-ui
import { Button, CardContent, CardActions, Divider, Grid, TextField, FormHelperText, Typography } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import InputLabel from './../../../ui-component/extended/Form/InputLabel';
import { gridSpacing } from './../../../store/constant';

//-----------------------|| ActionBar ||-----------------------//
function ActionBar() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6} lg={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MainCard title='Simple Action Bar' content={false}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <InputLabel>Name</InputLabel>
                                        <TextField fullWidth placeholder="Enter full name" />
                                        <FormHelperText>Please enter your full name</FormHelperText>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid container spacing={1}>
                                    <Grid item><Button variant="contained" color="secondary">Submit</Button></Grid>
                                    <Grid item><Button variant="outlined" color="primary">Clear</Button></Grid>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title='Action Button with Link' content={false}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <InputLabel>Name</InputLabel>
                                        <TextField fullWidth placeholder="Enter full name" />
                                        <FormHelperText>Please enter your full name</FormHelperText>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                                    <Grid item><Button variant="contained" color="secondary">Submit</Button></Grid>
                                    <Grid item><Typography variant="body2" sx={{ m: 0 }}>or</Typography></Grid>
                                    <Grid item><Button variant="text" color="primary">Clear</Button></Grid>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title='With side action button' content={false}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <InputLabel>Name</InputLabel>
                                        <TextField fullWidth placeholder="Enter full name" />
                                        <FormHelperText>Please enter your full name</FormHelperText>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                                            <Grid item><Button variant="contained" color="secondary">Submit</Button></Grid>
                                            <Grid item><Button variant="outlined" color="primary">Clear</Button></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid item><Button variant="contained" color="error">Delete</Button></Grid>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MainCard title='Right Align Action Bar' content={false}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <InputLabel>Name</InputLabel>
                                        <TextField fullWidth placeholder="Enter full name" />
                                        <FormHelperText>Please enter your full name</FormHelperText>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                                    <Grid item><Button variant="contained" color="secondary">Submit</Button></Grid>
                                    <Grid item><Button variant="outlined" color="primary">Clear</Button></Grid>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title='Horizontal Form' content={false}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                        <InputLabel horizontal sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                            Name :
                                    </InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={9} lg={8}>
                                        <TextField fullWidth placeholder="Enter full name" />
                                        <FormHelperText>Please enter your full name</FormHelperText>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} lg={4}>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item><Button variant="contained" color="secondary">Submit</Button></Grid>
                                            <Grid item><Button variant="outlined" color="primary">Clear</Button></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title='Top & Bottom Actions Bars' content={false}>
                            <CardActions>
                                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                    <Grid item>
                                        <Typography variant="h5" sx={{ m: 0 }}>Top Actions</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                                            <Grid item><Button variant="outlined" color="error">Delete</Button></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <Divider />
                            <CardContent>
                                <InputLabel>Name</InputLabel>
                                <TextField fullWidth placeholder="Enter full name" />
                                <FormHelperText>Please enter your full name</FormHelperText>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} lg={6}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item><Button variant="contained" color="secondary">Submit</Button></Grid>
                                            <Grid item><Button variant="outlined" color="primary">Clear</Button></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ActionBar;
