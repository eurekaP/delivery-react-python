import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../AuthWrapper1';
import AuthCardWrapper from './../AuthCardWrapper';
import Logo from './../../../../ui-component/Logo';
import FirebaseResetPassword from './../firebase-forms/FirebaseResetPassword';
import BackgroundPattern1 from './../../../../ui-component/cards/BackgroundPattern1';
import Carousel from './../../../../ui-component/third-party/Carousel';

// assets
import AuthErrorCard from './../../../../assets/images/auth/auth-reset-error-card.svg';
import AuthPurpleCard from './../../../../assets/images/auth/auth-reset-purple-card.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    authPurpleCard: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '35%',
            left: '35%',
            width: '400px',
            height: '400px',
            backgroundImage: `url(${AuthPurpleCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite',
            [theme.breakpoints.down('lg')]: {
                left: '25%',
                top: '35%'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '12%',
            left: '25%',
            width: '400px',
            height: '270px',
            backgroundImage: `url(${AuthErrorCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite',
            animationDelay: '1s',
            [theme.breakpoints.down('lg')]: {
                top: '10%',
                left: '15%'
            }
        }
    }
}));

// carousel items
const items = [
    {
        title: 'Configurable Elements, East to Setup',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Configurable Elements, East to Setup',
        description: 'Powerful and easy to use multipurpose theme'
    },
    {
        title: 'Configurable Elements, East to Setup',
        description: 'Powerful and easy to use multipurpose theme'
    }
];

//============================|| AUTH1 - RESET PASSWORD ||============================//

const ResetPassword = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center" md={6} lg={7} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems={matchDownSM && 'center'}
                                    justifyContent={matchDownSM ? 'center' : 'space-between'}
                                >
                                    <Grid item>
                                        <Stack
                                            justifyContent={matchDownSM ? 'center' : 'flex-start'}
                                            textAlign={matchDownSM ? 'center' : ''}
                                        >
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Reset Password
                                            </Typography>
                                            <Typography color="textPrimary" gutterBottom variant="h4">
                                                Please choose new password.
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseResetPassword />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern1>
                        <Grid item container direction="column" justifyContent="flex-end">
                            <Grid item>
                                <span className={classes.authBlue}></span>
                                <span className={classes.authPurpleCard}></span>
                            </Grid>
                            <Grid item>
                                <Box pb={10}>
                                    <Carousel items={items} />
                                </Box>
                            </Grid>
                        </Grid>
                    </BackgroundPattern1>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ResetPassword;
