import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core';
import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper2 from './../AuthWrapper2';
import AuthCardWrapper from './../AuthCardWrapper';
import FirebaseLogin from './../login/FirebaseLogin';
import Logo from './../../../../ui-component/Logo';
import BackgroundPattern2 from './../../../../ui-component/cards/BackgroundPattern2';
import Carousel from './../../../../ui-component/third-party/Carousel';
import AuthFooter from './../../../../ui-component/cards/AuthFooter';

// assets
import imgMain from './../../../../assets/images/auth/img-a2-login.svg';

const useStyles = makeStyles((theme) => ({
    authImage: {
        maxWidth: '100%',
        margin: '0 auto',
        display: 'block',
        width: '300px',
        position: 'relative',
        zIndex: 5
    }
}));

// carousel items
const items = [
    {
        title: 'Components Based Design System',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Ready to use components',
        description: 'Ready made component to apply directly'
    },
    {
        title: 'Multiple dashboard and widgets',
        description: '100+ widgets and customize controls'
    }
];

//================================|| AUTH2 - LOGIN ||================================//

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper2>
            <Grid container justifyContent={matchDownSM ? 'center' : 'space-between'} alignItems="center">
                <Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
                    <Grid
                        sx={{ minHeight: '100vh' }}
                        container
                        alignItems={matchDownSM ? 'center' : 'flex-start'}
                        justifyContent={matchDownSM ? 'center' : 'space-between'}
                    >
                        <Grid item sx={{ display: { xs: 'none', md: 'block' }, m: 3 }}>
                            <RouterLink to="#">
                                <Logo />
                            </RouterLink>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' } }}
                        >
                            <Stack justifyContent="center" alignItems="center" spacing={5} m={2}>
                                <Box component={RouterLink} to="#" sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <Logo />
                                </Box>
                                <AuthCardWrapper border={matchDownMD}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography
                                                    color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    Hi, Welcome Back
                                                </Typography>
                                                <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                    Enter your credentials to continue
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FirebaseLogin login={2} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={RouterLink}
                                                    to="/pages/register/register2"
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Don't have an account?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 3 }}>
                            <AuthFooter />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern2>
                        <Grid item container justifyContent="center">
                            <Grid item xs={12}>
                                <Box>
                                    <Carousel items={items} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ position: 'relative' }}>
                                <img alt="Auth method" src={imgMain} className={classes.authImage} />
                            </Grid>
                        </Grid>
                    </BackgroundPattern2>
                </Grid>
            </Grid>
        </AuthWrapper2>
    );
};

export default Login;
