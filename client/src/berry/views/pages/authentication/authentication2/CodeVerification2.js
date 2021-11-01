import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core';
import { Box, Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper2 from './../AuthWrapper2';
import AuthCardWrapper from './../AuthCardWrapper';
import Logo from './../../../../ui-component/Logo';
import AnimateButton from './../../../../ui-component/extended/AnimateButton';
import FirebaseCodeVerification from '../firebase-forms/FirebaseCodeVerification';
import BackgroundPattern2 from './../../../../ui-component/cards/BackgroundPattern2';
import Carousel from './../../../../ui-component/third-party/Carousel';
import AuthFooter from './../../../../ui-component/cards/AuthFooter';

// assets
import imgMain from './../../../../assets/images/auth/img-a2-codevarify.svg';

const useStyles = makeStyles((theme) => ({
    authImage: {
        maxWidth: '100%',
        margin: '0 auto',
        display: 'block',
        width: '300px'
    }
}));

// carousel items
const items = [
    {
        title: 'Powerful and easy to use multi-purpose theme.',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Powerful and easy to use multi-purpose theme.',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Powerful and easy to use multi-purpose theme.',
        description: 'Powerful and easy to use multipurpose theme'
    }
];

//===========================|| AUTH2 - CODE VERIFICATION ||===========================//

const CodeVerification = () => {
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
                                        <Grid item xs={12}>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography
                                                    color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    Enter Verification Code
                                                </Typography>
                                                <Typography variant="subtitle1" fontSize="1rem">
                                                    We send you on mail.
                                                </Typography>
                                                <Typography variant="caption" fontSize="0.875rem" textAlign="center">
                                                    We’ve send you code on john.****@company.com
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FirebaseCodeVerification />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={RouterLink}
                                                    to="#"
                                                    variant="subtitle1"
                                                    sx={{ textAlign: 'center', textDecoration: 'none' }}
                                                >
                                                    Did not receive the email? Check your spam filter, or
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="outlined"
                                                    color="secondary"
                                                >
                                                    Resend Code
                                                </Button>
                                            </AnimateButton>
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
                            <Grid item xs={12}>
                                <img alt="Auth method" src={imgMain} className={classes.authImage} />
                            </Grid>
                        </Grid>
                    </BackgroundPattern2>
                </Grid>
            </Grid>
        </AuthWrapper2>
    );
};

export default CodeVerification;
